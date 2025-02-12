let countdownInterval; // змінна для зберігання ID інтервалу

function startCount() {
    // Отримуємо значення з поля вводу дати
    const targetDate = document.getElementById('targetDate').value;
    const resultElement = document.getElementById('resultCalculate'); // елемент для результату

    ////// Перевірка на неправильні введені дані
    if (!targetDate) {
        resultElement.innerHTML = 'Please select a date!';
        resultElement.style.color = 'red';
        return;
    }

    // Якщо дата вибрана, то очищаємо повідомлення про помилку
    resultElement.innerHTML = '';  // Очищаємо текст в span

    // Перетворюємо введену дату в об'єкт Date
    const targetDateObj = new Date(targetDate);

    // Перевірка, чи дата не в минулому
    const currentDate = new Date();
    if (targetDateObj <= currentDate) {
        resultElement.innerHTML = 'Please select a future date';
        resultElement.style.color = 'red';
        return;
    }

    // Очищаємо попередній інтервал, якщо він є
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    // Функція для отримання зворотного відліку
    function getTimeToTargetDate() {
        let now = new Date();
        let diff = targetDateObj - now;

        if (diff <= 0) {
            resultElement.innerHTML = 'The selected date has arrived!';
            resultElement.style.color = 'green';
            clearInterval(countdownInterval); // зупиняємо відлік, коли дата досягнута
            return;
        }

        // Обчислення кількості секунд, хвилин, годин, днів
        let secLeft = Math.floor(diff / 1000 % 60);
        let minLeft = Math.floor(diff / (1000 * 60) % 60);
        let hourLeft = Math.floor(diff / (1000 * 60 * 60) % 24);
        let dayLeft = Math.floor(diff / (1000 * 60 * 60 * 24));

        // Обчислення кількості років, місяців і днів
        let yearLeft = Math.floor(dayLeft / 365.25);  // Рік складається з 365.25 днів для врахування високосних років
        let monthLeft = Math.floor((dayLeft % 365.25) / 30.44);  // Приблизно 30.44 днів у місяці (середнє значення)
        let dayLeftInMonth = Math.floor((dayLeft % 365.25) % 30.44);  // Залишок днів у місяці після обчислення місяців

        // Виведення результату в елементи
        document.getElementById('years').innerText = yearLeft < 10 ? `0${yearLeft}` : yearLeft;
        document.getElementById('months').innerText = monthLeft < 10 ? `0${monthLeft}` : monthLeft;
        document.getElementById('days').innerText = dayLeftInMonth < 10 ? `0${dayLeftInMonth}` : dayLeftInMonth;
        document.getElementById('hours').innerText = hourLeft < 10 ? `0${hourLeft}` : hourLeft;
        document.getElementById('minutes').innerText = minLeft < 10 ? `0${minLeft}` : minLeft;
        document.getElementById('seconds').innerText = secLeft < 10 ? `0${secLeft}` : secLeft;
    }

    // Оновлюємо відлік кожну секунду
    countdownInterval = setInterval(getTimeToTargetDate, 1000);
}
