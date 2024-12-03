const psychologists = [
  { name: "Александр Вечерин", price: 2500, image: "aleksandr_vecherin.jpg" },
  { name: "Елена Горбунова", price: 2000, image: "elena_gorbunova.png" },
  { name: "Ольга Молчанова", price: 3000, image: "olga_molchanova.png" },
  { name: "Елена Воеводина", price: 1500, image: "elena_voevodina.png" },
  { name: "Татьяна Шмарина", price: 1100, image: "tatyana_shmarina.png" },
  { name: "Елена Львова", price: 1900, image: "elena_lvova.png" }
];

const psychologistsContainer = document.querySelector('.psychologists');
const cartItems = document.getElementById('cart-items');
const checkoutButton = document.getElementById('checkout');
const resultDiv = document.getElementById('result'); // Добавлено для отображения результата

function createPsychologistCard(psychologist) {
  const card = document.createElement('div');
  card.classList.add('psychologist');
  card.innerHTML = `
    <img src="${psychologist.image}" alt="${psychologist.name}" style="max-width: 150px; height: auto; margin-bottom: 10px;">
    <h3>${psychologist.name}</h3>
    <p>Цена: ${psychologist.price} руб.</p>
    <button class="add-to-cart" data-name="${psychologist.name}" data-price="${psychologist.price}">Добавить в корзину</button>
  `;
  return card;
}


psychologists.forEach(psychologist => {
  psychologistsContainer.appendChild(createPsychologistCard(psychologist));
});

let cart = [];

psychologistsContainer.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const name = event.target.dataset.name;
    const price = parseInt(event.target.dataset.price);
    addToCart(name, price);
  }
});

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}


function updateCart() {
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<li>Корзина пустая</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name}: ${item.price} руб. 60 мин.`;
            cartItems.appendChild(li);
        });
    }
}

checkoutButton.addEventListener('click', () => {
  const orderData = {
    items: cart.map(item => ({ name: item.name, price: item.price }))
  };

  const encodedData = encodeURIComponent(JSON.stringify(orderData));
  const url = `https://www.google.com/search?q=${encodedData}`;

  window.open(url, '_blank'); // Открывает в новой вкладке
  cart = [];
  updateCart();
});
