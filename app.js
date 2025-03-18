/* Код от 17.03 просто кнопка для обновления

Telegram.WebApp.ready();

async function getCurrency() {
  try {
    // Публичное API ЦБ РФ (не требует ключа)
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    
    // Курс доллара
    const usdRate = data.Valute.USD.Value.toFixed(2);
    
    // Обновляем интерфейс
    document.getElementById('rate').textContent = `${usdRate} ₽`;
  } catch (error) {
    document.getElementById('rate').textContent = 'Ошибка загрузки';
  }
}*/

Telegram.WebApp.ready();

// Добавляем элементы для статуса
const createLoader = () => {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div class="loader-spinner"></div>
        <div class="loader-text">Обновление данных...</div>
    `;
    document.body.appendChild(loader);
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    createLoader();
    getCurrency(); // Первое обновление
    setInterval(getCurrency, 300000); // Каждые 5 минут
});

// Управление лоадером
const loader = {
    show: () => document.getElementById('loader').style.display = 'flex',
    hide: () => document.getElementById('loader').style.display = 'none'
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Создаем лоадер только если его нет
    if (!document.getElementById('loader')) {
        const loaderElement = document.createElement('div');
        loaderElement.id = 'loader';
        loaderElement.innerHTML = `
            <div class="loader-spinner"></div>
            <div class="loader-text">Обновление данных...</div>
        `;
        document.body.appendChild(loaderElement);
    }
    
    getCurrency(); // Первый запрос
});

async function getCurrency() {
    try {
        loader.show(); // Показать лоадер
        
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js?t=' + Date.now());
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        const usdRate = data.Valute.USD.Value.toFixed(2);
        
        // Обновляем интерфейс
        document.getElementById('rate').textContent = `${usdRate} ₽`;
        
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('rate').textContent = 'Ошибка загрузки';
        
    } finally {
        // Гарантированно скрываем лоадер через 0.5 сек
        setTimeout(() => loader.hide(), 500);
    }
}
