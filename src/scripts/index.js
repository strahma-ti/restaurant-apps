import 'regenerator-runtime'; 
import '../styles/main.css';

console.log('Hello Coders! :)');

async function fetchRestaurantData() {
  try {
    const response = await fetch('https://restaurant-api.dicoding.dev/list');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const restaurantListContainer = document.getElementById('restaurant-list');

    data.restaurants.forEach(restaurant => {
      const restaurantDiv = document.createElement('div');
      restaurantDiv.classList.add('restaurant-item');

      const loveButton = document.createElement('span');
      loveButton.classList.add('love-button');
      loveButton.innerHTML = '&#10084;';

      loveButton.addEventListener('click', () => {
        loveButton.classList.toggle('loved');
      });

      const imageElement = document.createElement('img');
      imageElement.src = `https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`;
      imageElement.alt = restaurant.name;        

      const nameLinkElement = document.createElement('a');
      nameLinkElement.classList.add('restaurant-name');
      nameLinkElement.id = 'skip-content';
      nameLinkElement.textContent = restaurant.name;
      nameLinkElement.href = '#' + restaurant.id;

      const descriptionElement = document.createElement('div');
      descriptionElement.classList.add('restaurant-description');
      descriptionElement.textContent = restaurant.description;

      const cityElement = document.createElement('div');
      cityElement.classList.add('restaurant-city');
      cityElement.textContent = `${restaurant.city}`;

      const ratingElement = document.createElement('div');
      ratingElement.classList.add('restaurant-rating');
      ratingElement.textContent = `${restaurant.rating}`;

      restaurantDiv.appendChild(loveButton);
      restaurantDiv.appendChild(imageElement);
      restaurantDiv.appendChild(nameLinkElement);
      restaurantDiv.appendChild(descriptionElement);
      restaurantDiv.appendChild(cityElement);
      restaurantDiv.appendChild(ratingElement);

      restaurantListContainer.appendChild(restaurantDiv);
    });
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

window.addEventListener('load', fetchRestaurantData);

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

const navWrapper = document.querySelector('.nav-wrapper');

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    navWrapper.classList.add('scrolled');
  } else {
    navWrapper.classList.remove('scrolled');
  }
});
