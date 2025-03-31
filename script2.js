Let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser'))  || null;
let cart = JSON.parse(localStorage.getItem('cart'))  || [];


function login(){
    const username = document.getElementById('Login-username').value
    const password = document.getElementById('Login-password').value

    if (users[username] && users[username] === password){
        currentUser = username
        localStorage.setItem('currentuser', username)
        updateUserInfo()
        showMainContent()
        alert('welcome to Toyota, ' + username + '!')

    }
    else{
        alert('wrong credentials , brah!')
    }
}

function signup(){
    const username = document.getElementById('signup-username').value
    const password = document.getElementById('signup-password').value

    if (users[username]){
        alert('username already taken!')
    }

    else {
        users[username] = password
        localStorage.setItem('users', JSON.stringify(users))
        alert('Sign up complete! Log in now.')
        toggleAuth()

    }



}


function logout(){
    currentUser = null;
    localStorage.removeItem('currentUser')
    updateUserInfo()
    hideMainContent()
    scrollToSection('auth')
}
