const API_KEY = 'e4e67488a82d1c4e66366cb461522afc';

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    showWeatherPage();
  }
});

function login() {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  if (user && pass) {
    localStorage.setItem('isLoggedIn', 'true');
    showWeatherPage();
  } else {
    alert('Введите имя и пароль');
  }
}

function logout() {
  localStorage.removeItem('isLoggedIn');
  document.getElementById('weather-container').style.display = 'none';
  document.getElementById('auth-container').style.display = 'block';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('weather').innerHTML = '';
}

function showWeatherPage() {
  document.getElementById('auth-container').style.display = 'none';
  document.getElementById('weather-container').style.display = 'flex';
  getWeather();
}

async function getWeather() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${API_KEY}&units=metric&lang=ru`);
    if (!response.ok) throw new Error('Ошибка получения данных, возможна проблема с апи ключем');

    const data = await response.json();

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
      <img src="${iconUrl}" alt="${data.weather[0].description}" />
      <p><strong>Температура:</strong> ${data.main.temp.toFixed(1)}°C</p>
      <p><strong>Описание:</strong> ${capitalizeFirstLetter(data.weather[0].description)}</p>
      <p><strong>Влажность:</strong> ${data.main.humidity}%</p>
      <p><strong>Скорость ветра:</strong> ${data.wind.speed} м/с</p>
    `;
  } catch (err) {
    alert('Не удалось получить погоду: ' + err.message);
  }
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
