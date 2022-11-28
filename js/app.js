const mainEl = document.querySelector('.main');
const wrapper = document.createElement('div')

const formEl = document.createElement('form');
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputsValue = Object.fromEntries(new FormData(e.target));
  const response = await fetch(`
    https://api.github.com/users/${inputsValue.name}
  `);

  if (response.ok) {
    const data = await response.json();
    wrapper.appendChild(createProfileEl(data))
    mainEl.appendChild(wrapper);
    inputEl.value = '';
  } else {
    alert("Такого користувача не існує")
  }
})

const inputEl = document.createElement('input');
inputEl.classList.add('search-input');
inputEl.setAttribute('name', 'name')

const searchButtonEl = document.createElement('button')
searchButtonEl.classList.add('search-button');
searchButtonEl.setAttribute('type', 'submit');
searchButtonEl.innerHTML = "Пошук";

formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);
mainEl.appendChild(formEl);

function createProfileEl(profileData) {
  const element = document.createElement('div');
  element.classList.add('profile');
  element.innerHTML = `
    <img class="search-image" src=${profileData.avatar_url}></img>
    <p class="search-text"><span>Ім'я: </span>${profileData.name}</p>
    <p class="search-text"><span>Місто: </span>${profileData.location}</p>
    <p class="search-text"><span>Про себе: </span>${profileData.bio}</p>
  `
  element.appendChild(createDeleteBtnEl())
  return element;
}

function createDeleteBtnEl() {
  const element = document.createElement('button');
  element.classList.add('delete-button');
  element.innerText = "Видалити";
  element.addEventListener('click', (e) => {
    wrapper.innerHTML = ''
  })

  return element
}