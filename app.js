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
}