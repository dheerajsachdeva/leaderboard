import './style.css';

const gameID = 'mnHvUZAg6OidlpkQBftf';
const addScoreURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;
const refresh = document.querySelector('.refresh');

// Creating a new game by sending request
// eslint-disable-next-line
const newGame = async () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: '{ "name": "My cool new game" }',
  };
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', options);
  const gameID = await response.json();
  return gameID;
};

const userName = document.querySelector('#name');
const scoreDetail = document.querySelector('#score');
const form = document.querySelector('form');

// To add users to API
const createUser = async (user, score) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
      score,
    }),
  };
  const response = await fetch(addScoreURL, options);
  const users = await response.json();
  return users;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const user = userName.value;
  const score = scoreDetail.value;
  if (!user && !score) {
    return;
  }
  createUser(user, score);
  form.reset();
});

const displayUser = async () => {
  // eslint-disable-next-line
  let response = await getUser();
  let innerHTML = '';
  response.result.forEach((element) => {
    innerHTML += `<li>${element.user} : ${element.score}</li>`;
  }); const list = document.querySelector('.scoresList');
  list.innerHTML = innerHTML;
};

// To get users from the API
const getUser = async () => {
  const response = await fetch(addScoreURL);
  const user = await response.json();
  displayUser();
  return user;
};

refresh.addEventListener('click', (event) => {
  event.preventDefault();
  displayUser();
});

displayUser();
