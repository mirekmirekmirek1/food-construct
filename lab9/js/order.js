/* global dishes, CATEGORIES, getSavedOrder, saveOrder, isValidCombo, getOrderError, showNotification */
/* exported restoreOrder */
// Выбор блюд на странице «Собрать ланч» и панель перехода к оформлению.

const selectedDishes = {
    'soup': null,
    'main-course': null,
    'salad': null,
    'drink': null,
    'dessert': null
};

function updatePanel() {
    const panel = document.getElementById('checkout-panel');
    const link = document.getElementById('checkout-link');
    let total = 0;
    let hasSelected = false;

    CATEGORIES.forEach((category) => {
        const dish = selectedDishes[category];
        if (dish) {
            total += dish.price;
            hasSelected = true;
        }
    });

    panel.hidden = !hasSelected;
    document.getElementById('checkout-total').textContent = `${total}₽`;

    const ready = isValidCombo(selectedDishes);
    link.classList.toggle('checkout-panel__link--disabled', !ready);
}

function highlightCard(category, keyword) {
    const container = document.querySelector(`.dishes[data-category="${category}"]`);

    container.querySelectorAll('.dish').forEach((card) => {
        card.classList.toggle('dish--selected', card.dataset.dish === keyword);
    });
}

// Блюдо ищем в массиве по data-dish (keyword), как в ЛР4.
// В localStorage потом сохраняется его id.
function selectDish(keyword) {
    const dish = dishes.find((item) => item.keyword === keyword);
    if (!dish) {
        return;
    }

    selectedDishes[dish.category] = dish;
    highlightCard(dish.category, dish.keyword);
    saveOrder(selectedDishes);
    updatePanel();
}

// Вызывается после загрузки блюд: берет id из localStorage и выделяет блюда.
function restoreOrder() {
    const saved = getSavedOrder();

    CATEGORIES.forEach((category) => {
        const dish = dishes.find((item) => item.id === saved[category]);
        selectedDishes[category] = dish || null;
        highlightCard(category, dish ? dish.keyword : null);
    });

    updatePanel();
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

// Пока состав не подходит ни под одно комбо, ссылка не работает
// и показывает, чего не хватает.
document.getElementById('checkout-link').addEventListener('click', (event) => {
    const error = getOrderError(selectedDishes);
    if (error) {
        event.preventDefault();
        showNotification(error);
    }
});
