import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080/api' });

async function login(email, password) {
  const body = {
    email,
    password,
  };

  try {
    const { data } = await api.post('/auth/login', body);

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    window.location.href = '/index.html';
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  const loginForm = document.querySelector('form#login');

  loginForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = new FormData(loginForm);

    const email = formData.get('email');
    const password = formData.get('password');

    login(email, password);
  });
}

main();
