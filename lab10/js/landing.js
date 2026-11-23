// Форма обратной связи на лендинге.
// Отправлять ее некуда (у API нет такого метода), поэтому только проверяем поля
// стилями Bootstrap и показываем сообщение об успехе.

const feedbackForm = document.getElementById('feedback-form');
const feedbackSuccess = document.getElementById('feedback-success');

feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!feedbackForm.checkValidity()) {
        // Класс was-validated включает красные/зеленые подсказки Bootstrap.
        feedbackForm.classList.add('was-validated');
        feedbackSuccess.hidden = true;
        return;
    }

    feedbackForm.reset();
    feedbackForm.classList.remove('was-validated');
    feedbackSuccess.hidden = false;
});
