/* global dishes, loadDishes, apiRequest, showNotification */
// Страница «Заказы»: история заказов, просмотр, редактирование и удаление.

// Поля заказа с id блюд и подписи к ним.
const DISH_FIELDS = [
    { field: 'soup_id', label: 'Суп' },
    { field: 'main_course_id', label: 'Основное блюдо' },
    { field: 'salad_id', label: 'Салат/стартер' },
    { field: 'drink_id', label: 'Напиток' },
    { field: 'dessert_id', label: 'Десерт' }
];

const ASAP_TEXT = 'Как можно скорее (с 7:00 до 23:00)';

let orders = [];
let currentOrderId = null; // заказ, открытый в модальном окне

const viewModal = document.getElementById('view-modal');
const editModal = document.getElementById('edit-modal');
const deleteModal = document.getElementById('delete-modal');
const editForm = document.getElementById('edit-form');

// ---------- Вспомогательные функции ----------

// Создает элемент с классом и текстом. textContent защищает от HTML в данных с сервера.
function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}

// "2024-11-23 20:01:00" или "2024-11-23T20:01:00" -> "23.11.2024 20:01"
function formatDate(value) {
    const date = new Date(String(value).replace(' ', 'T'));
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    const pad = (number) => String(number).padStart(2, '0');
    return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} `
        + `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// Сервер может вернуть время как "21:00:00", нам нужно "21:00".
function formatTime(value) {
    return value ? String(value).slice(0, 5) : '';
}

function getDeliveryText(order) {
    return order.delivery_type === 'by_time' ? formatTime(order.delivery_time) : ASAP_TEXT;
}

// Список блюд заказа: [{ label: 'Суп', dish: {...} }, ...]
function getOrderDishes(order) {
    const result = [];
    DISH_FIELDS.forEach(({ field, label }) => {
        const dish = dishes.find((item) => item.id === order[field]);
        if (dish) {
            result.push({ label, dish });
        }
    });
    return result;
}

function getOrderCost(order) {
    return getOrderDishes(order).reduce((sum, item) => sum + item.dish.price, 0);
}

function findOrder(id) {
    return orders.find((order) => order.id === id);
}

// ---------- Таблица заказов ----------

function createActionButton(action, icon, title, orderId) {
    const button = createElement('button', 'orders-table__action');
    button.type = 'button';
    button.dataset.action = action;
    button.dataset.id = orderId;
    button.title = title;
    button.setAttribute('aria-label', title);
    button.append(createElement('i', `bi ${icon}`));
    return button;
}

function renderOrders() {
    const list = document.getElementById('orders-list');
    const message = document.getElementById('orders-message');
    const wrapper = document.getElementById('orders-wrapper');

    list.replaceChildren();

    if (orders.length === 0) {
        message.textContent = 'Вы еще не оформили ни одного заказа.';
        message.hidden = false;
        wrapper.hidden = true;
        return;
    }

    message.hidden = true;
    wrapper.hidden = false;

    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        const names = getOrderDishes(order).map((item) => item.dish.name).join(', ');

        const actions = createElement('td', 'orders-table__actions');
        actions.append(
            createActionButton('view', 'bi-eye', 'Подробнее', order.id),
            createActionButton('edit', 'bi-pencil', 'Редактировать', order.id),
            createActionButton('delete', 'bi-trash', 'Удалить', order.id)
        );

        row.append(
            createElement('td', '', index + 1),
            createElement('td', '', formatDate(order.created_at)),
            createElement('td', 'orders-table__dishes', names),
            createElement('td', '', `${getOrderCost(order)}₽`),
            createElement('td', '', getDeliveryText(order)),
            actions
        );
        list.append(row);
    });
}

// Сначала новые заказы.
function sortOrders() {
    orders.sort((a, b) => new Date(String(b.created_at).replace(' ', 'T'))
        - new Date(String(a.created_at).replace(' ', 'T')));
}

// ---------- Модальные окна ----------

function createRow(label, value) {
    const row = createElement('div', 'modal__row');
    row.append(createElement('span', '', label), createElement('span', '', value));
    return row;
}

// Состав заказа и стоимость (нужны и в просмотре, и в редактировании).
function fillDishes(container, totalElement, order) {
    container.replaceChildren();
    getOrderDishes(order).forEach(({ label, dish }) => {
        container.append(createRow(label, `${dish.name} (${dish.price}₽)`));
    });
    totalElement.textContent = `Стоимость: ${getOrderCost(order)}₽`;
}

function openViewModal(order) {
    const body = document.getElementById('view-body');
    body.replaceChildren();

    body.append(
        createRow('Дата оформления', formatDate(order.created_at)),
        createElement('h3', 'modal__subtitle', 'Доставка'),
        createRow('Имя получателя', order.full_name),
        createRow('Адрес доставки', order.delivery_address),
        createRow('Время доставки', getDeliveryText(order)),
        createRow('Телефон', order.phone),
        createRow('Email', order.email)
    );

    if (order.comment) {
        body.append(
            createElement('h3', 'modal__subtitle', 'Комментарий'),
            createElement('p', 'modal__text', order.comment)
        );
    }

    const dishesList = createElement('div');
    const total = createElement('p', 'modal__total');
    fillDishes(dishesList, total, order);
    body.append(createElement('h3', 'modal__subtitle', 'Состав заказа'), dishesList, total);

    viewModal.showModal();
}

function updateEditTimeField() {
    const timeInput = editForm.elements.delivery_time;
    const byTime = editForm.elements.delivery_type.value === 'by_time';
    timeInput.disabled = !byTime;
    timeInput.required = byTime;
}

function openEditModal(order) {
    document.getElementById('edit-date').textContent = formatDate(order.created_at);

    editForm.elements.full_name.value = order.full_name;
    editForm.elements.delivery_address.value = order.delivery_address;
    editForm.elements.delivery_type.value = order.delivery_type;
    editForm.elements.delivery_time.value = formatTime(order.delivery_time);
    editForm.elements.phone.value = order.phone;
    editForm.elements.email.value = order.email;
    editForm.elements.comment.value = order.comment || '';
    updateEditTimeField();

    fillDishes(document.getElementById('edit-dishes'), document.getElementById('edit-total'), order);

    editModal.showModal();
}

function getCurrentTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

async function saveOrder(event) {
    event.preventDefault();

    const order = findOrder(currentOrderId);
    const timeInput = editForm.elements.delivery_time;

    // Время проверяем и отправляем, только если его поменяли (или включили доставку ко времени).
    // Иначе старый заказ на 17:00 нельзя было бы сохранить вечером, даже поменяв одно имя.
    const timeChanged = !timeInput.disabled
        && (order.delivery_type !== 'by_time' || timeInput.value !== formatTime(order.delivery_time));

    if (timeChanged && timeInput.value < getCurrentTime()) {
        showNotification('Время доставки не может быть раньше текущего времени');
        return;
    }

    // В FormData попадут только доступные для редактирования поля формы.
    // Отключенное поле времени (доставка «как можно скорее») не отправляется.
    const data = new FormData(editForm);
    if (!timeChanged) {
        data.delete('delivery_time');
    }
    const saveButton = editForm.querySelector('button[type="submit"]');
    saveButton.disabled = true;

    try {
        const updated = await apiRequest(`/orders/${currentOrderId}`, {
            method: 'PUT',
            body: data
        });
        const index = orders.findIndex((order) => order.id === currentOrderId);
        orders[index] = { ...orders[index], ...updated };
        renderOrders();
        editModal.close();
        showNotification('Заказ успешно изменён');
    } catch (error) {
        showNotification(`Не удалось изменить заказ. ${error.message}`);
    } finally {
        saveButton.disabled = false;
    }
}

async function deleteOrder() {
    const confirmButton = document.getElementById('delete-confirm');
    confirmButton.disabled = true;

    try {
        await apiRequest(`/orders/${currentOrderId}`, { method: 'DELETE' });
        orders = orders.filter((order) => order.id !== currentOrderId);
        renderOrders();
        deleteModal.close();
        showNotification('Заказ успешно удалён');
    } catch (error) {
        showNotification(`Не удалось удалить заказ. ${error.message}`);
    } finally {
        confirmButton.disabled = false;
    }
}

// ---------- Обработчики событий ----------

document.getElementById('orders-list').addEventListener('click', (event) => {
    const button = event.target.closest('.orders-table__action');
    if (!button) {
        return;
    }

    const order = findOrder(Number(button.dataset.id));
    if (!order) {
        return;
    }
    currentOrderId = order.id;

    if (button.dataset.action === 'view') {
        openViewModal(order);
    } else if (button.dataset.action === 'edit') {
        openEditModal(order);
    } else {
        deleteModal.showModal();
    }
});

// Крестик, «Ок» и «Отмена» закрывают окно, в котором находятся.
document.querySelectorAll('[data-close]').forEach((button) => {
    button.addEventListener('click', () => {
        button.closest('dialog').close();
    });
});

editForm.querySelectorAll('input[name="delivery_type"]').forEach((radio) => {
    radio.addEventListener('change', updateEditTimeField);
});

editForm.addEventListener('submit', saveOrder);
document.getElementById('delete-confirm').addEventListener('click', deleteOrder);

// Загружаем блюда и заказы одновременно: блюда нужны, чтобы показать названия и цены.
Promise.all([apiRequest('/orders'), loadDishes()])
    .then(([loadedOrders]) => {
        orders = loadedOrders;
        sortOrders();
        renderOrders();
    })
    .catch((error) => {
        console.error(error);
        const message = document.getElementById('orders-message');
        message.textContent = `Не удалось загрузить заказы. ${error.message}`;
        message.classList.add('dishes__error');
    });
