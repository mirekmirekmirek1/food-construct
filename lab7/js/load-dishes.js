/* exported dishes, loadDishes */
// Загрузка списка блюд с сервера.

const API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

// Сюда попадают блюда после загрузки. Используется в order.js.
let dishes = [];

async function loadDishes() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
    }

    dishes = await response.json();
    return dishes;
}
