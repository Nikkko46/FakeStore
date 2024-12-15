const isLoggedIn = localStorage.getItem('isLoggedIn');

const logout = () => {
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'Login.html';
};

if (isLoggedIn) {
  const logoutButton = document.createElement('button');
  logoutButton.textContent = 'Logout';
  logoutButton.onclick = logout;
  authContainer.appendChild(logoutButton);
} 

else {
  const loginLink = document.createElement('a');
  loginLink.href = 'Login.html';
  loginLink.textContent = 'Login';
  authContainer.appendChild(loginLink);
}