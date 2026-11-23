/* exported CATEGORIES, getSavedOrder, saveOrder, clearSavedOrder */
// Хранение выбранных блюд в localStorage.
// Храним только id блюд в виде объекта { категория: id },
// например {"soup": 3, "main-course": 7, "salad": null, "drink": 12, "dessert": null}.

const STORAGE_KEY = 'food-construct-order';
const CATEGORIES = ['soup', 'main-course', 'salad', 'drink', 'dessert'];

function getSavedOrder() {
    const result = {};
    CATEGORIES.forEach((category) => {
        result[category] = null;
    });

    let saved = null;
    try {
        saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
        saved = null;
    }

    if (saved && typeof saved === 'object') {
        CATEGORIES.forEach((category) => {
            if (Number.isInteger(saved[category])) {
                result[category] = saved[category];
            }
        });
    }

    return result;
}

// Принимает объект { категория: блюдо или null } и сохраняет только id.
function saveOrder(selected) {
    const ids = {};
    CATEGORIES.forEach((category) => {
        ids[category] = selected[category] ? selected[category].id : null;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

function clearSavedOrder() {
    localStorage.removeItem(STORAGE_KEY);
}
