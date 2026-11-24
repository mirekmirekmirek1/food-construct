/* exported createDishCard */
// Создание карточки блюда. Используется на страницах «Собрать ланч» и «Оформить заказ».

function createDishCard(dish, buttonText) {
    const card = document.createElement('div');
    card.className = 'dish';
    card.dataset.dish = dish.keyword;
    card.dataset.kind = dish.kind;

    const image = document.createElement('img');
    image.className = 'dish__image';
    image.src = dish.image;
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
    button.textContent = buttonText;

    card.append(image, price, name, count, button);
    return card;
}
