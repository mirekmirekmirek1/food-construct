/* global dishes */
// Вывод карточек блюд на страницу.

const IMAGE_FOLDER = '../images/menu/';

function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish';
    card.dataset.dish = dish.keyword;

    const image = document.createElement('img');
    image.className = 'dish__image';
    image.src = `${IMAGE_FOLDER}${dish.image}.jpg`;
    image.alt = dish.name;
    image.width = 480;
    image.height = 480;

    const price = document.createElement('p');
    price.className = 'dish__price';
    price.textContent = `${dish.price}₽`;

    const name = document.createElement('p');
    name.className = 'dish__name';
    name.textContent = dish.name;

    const count = document.createElement('p');
    count.className = 'dish__count';
    count.textContent = dish.count;

    const button = document.createElement('button');
    button.className = 'dish__button';
    button.type = 'button';
    button.textContent = 'Добавить';

    card.append(image, price, name, count, button);
    return card;
}

function displayDishes() {
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

    sortedDishes.forEach((dish) => {
        const container = document.querySelector(`.dishes[data-category="${dish.category}"]`);
        if (container) {
            container.append(createDishCard(dish));
        }
    });
}

displayDishes();
