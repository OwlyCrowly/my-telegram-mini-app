// Инициализация Mini App
Telegram.WebApp.ready();

function sendData() {
    // Отправляем данные в Telegram
    Telegram.WebApp.sendData("Кнопка нажата!");
    // Закрываем Mini App
    Telegram.WebApp.close();
}