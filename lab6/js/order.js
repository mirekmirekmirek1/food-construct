/* global dishes */
/* exported selectedDishes */
// Выбор блюд и подсчет стоимости заказа.

const selectedDishes = {
    'soup': null,
    'main-course': null,
    'salad': null,
    'drink': null,
    'dessert': null
};

function updateOrder() {
    const categories = Object.keys(selectedDishes);
    const hasSelected = categories.some((category) => selectedDishes[category] !== null);
    let total = 0;

    document.getElementById('order-empty').hidden = hasSelected;

    categories.forEach((category) => {
        const dish = selectedDishes[category];
        const item = document.querySelector(`.order-summary__item[data-category="${category}"]`);
        const text = item.querySelector('.order-summary__dish');
        const input = document.getElementById(`input-${category}`);

        item.hidden = !hasSelected;

        if (dish) {
            text.textContent = `${dish.name} ${dish.price}₽`;
            input.value = dish.keyword;
            total += dish.price;
        } else {
            text.textContent = text.dataset.empty;
            input.value = '';
        }
    });

    document.getElementById('order-total').hidden = !hasSelected;
    document.getElementById('order-total-price').textContent = `${total}₽`;
}

function highlightCard(category, keyword) {
    const container = document.querySelector(`.dishes[data-category="${category}"]`);

    container.querySelectorAll('.dish').forEach((card) => {
        card.classList.toggle('dish--selected', card.dataset.dish === keyword);
    });
}

function selectDish(keyword) {
    const dish = dishes.find((item) => item.keyword === keyword);
    if (!dish) {
        return;
    }

    selectedDishes[dish.category] = dish;
    highlightCard(dish.category, dish.keyword);
    updateOrder();
}

function resetOrder() {
    Object.keys(selectedDishes).forEach((category) => {
        selectedDishes[category] = null;
        highlightCard(category, null);
    });
    updateOrder();
}

document.querySelectorAll('.dishes').forEach((container) => {
    container.addEventListener('click', (event) => {
        const button = event.target.closest('.dish__button');
        if (!button) {
            return;
        }
        selectDish(button.closest('.dish').dataset.dish);
    });
});

document.querySelector('.order-form').addEventListener('reset', resetOrder);

updateOrder();
