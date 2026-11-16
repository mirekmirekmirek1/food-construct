/* global selectedDishes */
// Проверка состава ланча перед отправкой формы и вывод уведомлений.

// Допустимые комбо (десерт можно добавить к любому из них).
const COMBOS = [
    ['soup', 'main-course', 'salad', 'drink'],
    ['soup', 'main-course', 'drink'],
    ['soup', 'salad', 'drink'],
    ['main-course', 'salad', 'drink'],
    ['main-course', 'drink']
];

function isValidCombo(selected) {
    const mainCategories = Object.keys(selected).filter(
        (category) => category !== 'dessert' && selected[category] !== null
    );

    return COMBOS.some((combo) => combo.length === mainCategories.length
        && combo.every((category) => mainCategories.includes(category)));
}

// Возвращает текст уведомления или null, если заказ можно отправлять.
function getOrderError(selected) {
    if (isValidCombo(selected)) {
        return null;
    }

    const soup = selected.soup !== null;
    const main = selected['main-course'] !== null;
    const salad = selected.salad !== null;
    const drink = selected.drink !== null;
    const dessert = selected.dessert !== null;

    if (!soup && !main && !salad && !drink && !dessert) {
        return 'Ничего не выбрано. Выберите блюда для заказа';
    }
    if (soup && !main && !salad) {
        return 'Выберите главное блюдо/салат/стартер';
    }
    if (salad && !soup && !main) {
        return 'Выберите суп или главное блюдо';
    }
    if (!soup && !main && !salad) {
        return 'Выберите главное блюдо';
    }
    return 'Выберите напиток';
}

function showNotification(message) {
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.setAttribute('role', 'alertdialog');

    const text = document.createElement('p');
    text.className = 'notification__text';
    text.textContent = message;

    const button = document.createElement('button');
    button.className = 'notification__button';
    button.type = 'button';
    button.textContent = 'Окей 👌';
    button.addEventListener('click', () => notification.remove());

    notification.append(text, button);
    document.body.append(notification);
    button.focus();
}

document.querySelector('.order-form').addEventListener('submit', (event) => {
    const error = getOrderError(selectedDishes);
    if (error) {
        event.preventDefault();
        showNotification(error);
    }
});
