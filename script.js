'use strict'

const switcher = document.querySelector('.btn-theme');
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',];
let words = [];
let wordIndex = 0;
let startTime = Date.now();
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

switcher.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme')

    var className = document.body.className;
    if(className == "light-theme") {
        this.textContent = "D";
    }
    else {
        this.textContent = "L";
    }

    console.log('current class name: ' + className);

});

document.getElementById('start').addEventListener('click', () => {
    //получаем котировку
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    //помещение цитаты в массив слов 
    words = quote.split(' ');
    //сброс индекса слова для отслеживания
    wordIndex = 0;

    // Обновление пользовательского интерфейса 
    // Создание массива элементов span, чтобы мы могли установить класс
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    // Преобразовать в строку и установить как innerHTML при отображении цитаты 
    quoteElement.innerHTML = spanWords.join('');
    // Подсветка первого слова
    quoteElement.childNodes[0].className = 'highlight';
    // Очистить все предыдущие сообщения 
    messageElement.innerText = '';

    // Настроить текстовое поле 
    // Очистить текстовое поле
    typedValueElement.value = '';
    // устанавливаем фокус 
    typedValueElement.focus();
    // устанавливаем обработчик события

    // Запускаем таймер
    startTime = new Date().getTime();
})

typedValueElement.addEventListener('input', () => {
    // Получаем текущее слово 
    const currentWord = words[wordIndex];
     // получаем текущее значение
    const typedValue = typedValueElement.value;
  
    if (typedValue === currentWord && wordIndex === words.length - 1) {
      // конец предложения
      // Отображение
      const elapsedTime = new Date().getTime() - startTime;
      const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
      messageElement.innerText = message;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      // конец слова
      // очищаем typedValueElement для нового слова
      typedValueElement.value = '';
      // перейти к следующему слову
      wordIndex++;
      // сбросить имя класса для всех элементов в кавычка
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      // выделить новое слово
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      // в данный момент правильно
      // выделить следующее слово
      typedValueElement.className = '';
    } else {
      // состояние ошибки
      typedValueElement.className = 'error';
    }
  });