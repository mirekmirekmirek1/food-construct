/* global dishes, loadDishes, createDishCard, restoreOrder */
// Вывод карточек блюд на страницу «Собрать ланч».

function displayDishes() {
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

    sortedDishes.forEach((dish) => {
        const container = document.querySelector(`.dishes[data-category="${dish.category}"]`);
        if (container) {
            container.append(createDishCard(dish, 'Добавить'));
        }
    });
}

function showLoadError() {
    document.querySelectorAll('.dishes').forEach((container) => {
        const message = document.createElement('p');
        message.className = 'dishes__error';
        message.textContent = 'Не удалось загрузить меню. Попробуйте обновить страницу.';
        container.append(message);
    });
}

loadDishes()
    .then(() => {
        displayDishes();
        restoreOrder();
    })
    .catch((error) => {
        console.error(error);
        showLoadError();
    });
