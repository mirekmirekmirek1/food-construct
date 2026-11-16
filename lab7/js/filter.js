// Фильтрация блюд внутри каждой категории.

function applyFilter(category, kind) {
    const container = document.querySelector(`.dishes[data-category="${category}"]`);

    container.querySelectorAll('.dish').forEach((card) => {
        card.hidden = kind !== null && card.dataset.kind !== kind;
    });
}

document.querySelectorAll('.filters').forEach((filters) => {
    filters.addEventListener('click', (event) => {
        const button = event.target.closest('.filters__button');
        if (!button) {
            return;
        }

        const wasActive = button.classList.contains('active');

        filters.querySelectorAll('.filters__button').forEach((item) => {
            item.classList.remove('active');
        });

        if (wasActive) {
            applyFilter(filters.dataset.category, null);
        } else {
            button.classList.add('active');
            applyFilter(filters.dataset.category, button.dataset.kind);
        }
    });
});
