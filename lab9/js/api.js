/* exported dishes, loadDishes, apiRequest */
// Работа с сервером: общий адрес API, ключ и функция для запросов.

const API_BASE = 'https://edu.std-900.ist.mospolytech.ru/labs/api';

// Ключ из личного кабинета (UUIDv4). Без него сервер не отвечает на запросы.
const API_KEY = '00000000-0000-4000-8000-000000000000';

// Сюда попадают блюда после загрузки.
let dishes = [];

// Отправляет запрос на сервер и возвращает ответ в виде объекта.
// Если что-то пошло не так, выбрасывает ошибку с понятным текстом.
async function apiRequest(path, options = {}) {
    const url = `${API_BASE}${path}?api_key=${API_KEY}`;
    let response;

    try {
        response = await fetch(url, options);
    } catch {
        throw new Error('Не удалось связаться с сервером. Проверьте подключение к интернету.');
    }

    let data = null;
    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok || (data && data.error)) {
        const message = data && data.error ? data.error : `Ошибка сервера (код ${response.status})`;
        throw new Error(message);
    }

    return data;
}

async function loadDishes() {
    dishes = await apiRequest('/dishes');
    return dishes;
}
