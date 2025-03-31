  // Auth System
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let currentUser = localStorage.getItem('currentUser') || null;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function login() {
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      if (users[username] && users[username] === password) {
          currentUser = username;
          localStorage.setItem('currentUser', username);
          updateUserInfo();
          showMainContent();
          alert('Welcome to Toyota, ' + username + '!');
      } else {
          alert('Wrong credentials, brah!');
      }
  }

  function signup() {
      const username = document.getElementById('signup-username').value;
      const password = document.getElementById('signup-password').value;
      if (users[username]) {
          alert('Username already taken!');
      } else {
          users[username] = password;
          localStorage.setItem('users', JSON.stringify(users));
          alert('Sign up complete! Log in now.');
          toggleAuth();
      }
  }

  function toggleAuth() {
      const loginForm = document.getElementById('login-form');
      const signupForm = document.getElementById('signup-form');
      loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
      signupForm.style.display = signupForm.style.display === 'none' ? 'block' : 'none';
  }

  function updateUserInfo() {
      const userInfo = document.getElementById('user-info');
      if (currentUser) {
          userInfo.innerHTML = `${currentUser} | <a href="#" onclick="logout()">Logout</a>`;
      } else {
          userInfo.innerHTML = `Guest | <a href="#auth">Login</a>`;
      }
  }

  function logout() {
      currentUser = null;
      localStorage.removeItem('currentUser');
      updateUserInfo();
      hideMainContent();
      scrollToSection('auth');
  }

  function showMainContent() {
      document.getElementById('auth').style.display = 'none';
      document.getElementById('main-content').style.display = 'block';
      scrollToSection('home');
      updateCart();
      attachCartListeners(); // Attach listeners when content is shown
  }

  function hideMainContent() {
      document.getElementById('auth').style.display = 'flex';
      document.getElementById('main-content').style.display = 'none';
  }

  // Navigation
  document.querySelectorAll('.navbar a').forEach(anchor => {
      anchor.addEventListener('click', e => {
          e.preventDefault();
          if (currentUser) {
              scrollToSection(anchor.getAttribute('href').slice(1));
              if (anchor.getAttribute('href') === '#cart') {
                  updateCart();
              }
          } else {
              alert('Log in first, brah!');
              scrollToSection('auth');
          }
      });
  });

  function scrollToSection(id) {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }

  // Cart Functionality
  function addToCart(name, price) {
      cart.push({ name, price: parseInt(price) });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${name} added to your cart! Check it out in da Cart section, brah!`);
      updateCart();
  }

  function attachCartListeners() {
      document.querySelectorAll('.add-to-cart').forEach(button => {
          button.removeEventListener('click', handleCartClick); // Prevent duplicates
          button.addEventListener('click', handleCartClick);
      });
  }

  function handleCartClick(e) {
      const button = e.target;
      const name = button.getAttribute('data-name');
      const price = button.getAttribute('data-price');
      addToCart(name, price);
  }

  function updateCart() {
      const cartContainer = document.getElementById('cart-container');
      cartContainer.innerHTML = '';
      if (cart.length === 0) {
          cartContainer.innerHTML = '<p style="color: #ccc;">Your cart is empty, brah!</p>';
      } else {
          cart.forEach((item, index) => {
              const cartItem = document.createElement('div');
              cartItem.className = 'cart-item';
              cartItem.innerHTML = `
                  <span>${item.name} - $${item.price.toLocaleString()}</span>
                  <button onclick="removeFromCart(${index})">Remove</button>
              `;
              cartContainer.appendChild(cartItem);
          });
      }
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      document.getElementById('cart-total').textContent = `Total: $${total.toLocaleString()}`;
  }

  function removeFromCart(index) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
      alert('Item removed from cart, brah!');
  }

  // Contact Form
  function submitContact(e) {
      e.preventDefault();
      const form = e.target;
      form.style.animation = 'formPop 0.5s reverse';
      setTimeout(() => {
          alert('Message sent! Toyota crew will hit you back soon.');
          form.reset();
          form.style.animation = 'formPop 0.5s';
      }, 500);
  }

  // FAQ Toggle
  function toggleFAQ(item) {
      const answer = item.querySelector('.faq-answer');
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  }


  // Initialize
  window.onload = () => {
      updateUserInfo();
      if (currentUser) {
          showMainContent();
      } else {
          hideMainContent();
      }
  };












 
      