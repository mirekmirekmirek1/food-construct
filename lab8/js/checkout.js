/* global dishes, loadDishes, apiRequest, createDishCard, CATEGORIES, getSavedOrder, saveOrder,
   clearSavedOrder, getOrderError, showNotification */
// Страница «Оформить заказ»: состав заказа, удаление блюд и отправка заказа на сервер.

const orderDishes = {
    'soup': null,
    'main-course': null,
    'salad': null,
    'drink': null,
    'dessert': null
};

const form = document.querySelector('.order-form');
const timeInput = document.getElementById('delivery-time');

// Карточки выбранных блюд в разделе «Состав заказа».
function renderCards() {
    const container = document.getElementById('order-dishes');
    const selected = CATEGORIES.map((category) => orderDishes[category]).filter((dish) => dish !== null);

    container.replaceChildren();
    selected.forEach((dish) => {
        container.append(createDishCard(dish, 'Удалить'));
    });

    container.hidden = selected.length === 0;
    document.getElementById('order-empty').hidden = selected.length > 0;
}

// Список блюд и итоговая стоимость в левой части формы.
function renderSummary() {
    let total = 0;

    CATEGORIES.forEach((category) => {
        const dish = orderDishes[category];
        const text = document.querySelector(`.order-summary__dish[data-category="${category}"]`);

        if (dish) {
            text.textContent = `${dish.name} ${dish.price}₽`;
            total += dish.price;
        } else {
            text.textContent = text.dataset.empty;
        }
    });

    document.getElementById('order-total-price').textContent = `${total}₽`;
}

function renderOrder() {
    renderCards();
    renderSummary();
}

function removeDish(keyword) {
    const category = CATEGORIES.find((item) => orderDishes[item] && orderDishes[item].keyword === keyword);
    if (!category) {
        return;
    }

    orderDishes[category] = null;
    saveOrder(orderDishes);
    renderOrder();
}

// Поле времени нужно только для доставки «К указанному времени».
function updateTimeField() {
    const byTime = form.elements.delivery_type.value === 'by_time';
    timeInput.disabled = !byTime;
    timeInput.required = byTime;
}

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Собирает данные формы в том виде, в котором их ждет сервер.
function createOrderData() {
    const data = new FormData(form);

    data.set('subscribe', form.elements.subscribe.checked ? '1' : '0');

    CATEGORIES.forEach((category) => {
        const dish = orderDishes[category];
        if (dish) {
            // main-course -> main_course_id
            data.set(`${category.replace('-', '_')}_id`, dish.id);
        }
    });

    return data;
}

async function submitOrder(event) {
    event.preventDefault();

    const comboError = getOrderError(orderDishes);
    if (comboError) {
        showNotification(comboError);
        return;
    }

    if (form.elements.delivery_type.value === 'by_time' && timeInput.value < getCurrentTime()) {
        showNotification('Время доставки не может быть раньше текущего времени');
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
        await apiRequest('/orders', {
            method: 'POST',
            body: createOrderData()
        });

        // Заказ оформлен: очищаем localStorage, состав заказа и форму.
        clearSavedOrder();
        CATEGORIES.forEach((category) => {
            orderDishes[category] = null;
        });
        form.reset();
        updateTimeField();
        renderOrder();
        showNotification('Заказ успешно оформлен! Скоро мы привезем ваш ланч.');
    } catch (error) {
        // Данные в localStorage не трогаем, чтобы можно было попробовать еще раз.
        showNotification(`Не удалось оформить заказ. ${error.message}`);
    } finally {
        submitButton.disabled = false;
    }
}

function showLoadError() {
    const message = document.getElementById('order-empty');
    message.textContent = 'Не удалось загрузить меню. Попробуйте обновить страницу.';
    message.classList.add('dishes__error');
    message.hidden = false;
}

document.getElementById('order-dishes').addEventListener('click', (event) => {
    const button = event.target.closest('.dish__button');
    if (!button) {
        return;
    }
    removeDish(button.closest('.dish').dataset.dish);
});

form.querySelectorAll('input[name="delivery_type"]').forEach((radio) => {
    radio.addEventListener('change', updateTimeField);
});

// После сброса формы радиокнопки меняются, поэтому обновляем поле времени
// чуть позже, когда браузер уже очистит форму.
form.addEventListener('reset', () => {
    setTimeout(updateTimeField);
});

form.addEventListener('submit', submitOrder);

updateTimeField();

loadDishes()
    .then(() => {
        const saved = getSavedOrder();
        CATEGORIES.forEach((category) => {
            orderDishes[category] = dishes.find((dish) => dish.id === saved[category]) || null;
        });
        renderOrder();
    })
    .catch((error) => {
        console.error(error);
        showLoadError();
    });
