function loadFunction() {
    showDateTimeGreeting();
    showBackground();
    getNameFromLocalStorage();
    getFocusFromLocalStorage();
    getCityFromLocalStorage();
    
};

//variabes for time & data changes
const time = document.querySelector(".time"),
    data = document.querySelector(".data"),
    greeting = document.querySelector(".greeting"),
    name = document.querySelector(".name"),
    focus = document.querySelector(".focus");
let hour;

//variabes for background changes
const body = document.querySelector('body'),
    src = 'url(assets/images/';

const morningImageArray = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg'],
      dayImageArray = ['16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg'],
      eveningImageArray = ['31.jpg', '32.jpg', '33.jpg', '34.jpg', '35.jpg', '36.jpg', '37.jpg', '38.jpg', '39.jpg', '40.jpg', '41.jpg', '42.jpg', '43.jpg', '44.jpg', '45.jpg'],
      nightImageArray = ['46.jpg', '47.jpg', '48.jpg', '49.jpg', '50.jpg', '51.jpg', '52.jpg', '53.jpg', '54.jpg', '55.jpg', '56.jpg', '57.jpg', '58.jpg', '59.jpg', '60.jpg'];
const timesOfDayArray = [morningImageArray, dayImageArray, eveningImageArray, nightImageArray];

shuffle(timesOfDayArray);

let currentMorningArray = morningImageArray.slice(0, 6);
let currentDayArray = dayImageArray.slice(0, 6);
let currentEveningArray = eveningImageArray.slice(0, 6);
let currentNightArray = nightImageArray.slice(0, 6);
let currentTotalArray = currentMorningArray.concat(currentDayArray, currentEveningArray, currentNightArray);

//***TIME & DATE & GREETING***
setInterval(showDateTimeGreeting, 1000);

function showDateTimeGreeting() {
    showTime();
    showDate();
    showGreeting();
}

function showTime() {
    let displayTime = new Date(),
        hour = displayTime.getHours(),
        min = displayTime.getMinutes(),
        sec = displayTime.getSeconds();

    min = (min < 10) ? '0' + min : min;
    sec = (sec < 10) ? '0' + sec : sec;

    time.innerHTML = hour + ':' + min + ':' + sec;
}

function showDate() {
    let displayDate = new Date(),
        date = displayDate.getDate(),
        month = displayDate.getMonth(),
        year = displayDate.getFullYear(),
        weekDay = displayDate.getDay();
    switch (month) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    };
    switch (weekDay) {
        case 0:
            weekDay = "Sunday";
            break;
        case 1:
            weekDay = "Monday";
            break;
        case 2:
            weekDay = "Tuesday";
            break;
        case 3:
            weekDay = "Wednesday";
            break;
        case 4:
            weekDay = "Thursday";
            break;
        case 5:
            weekDay = "Friday";
            break;
        case 6:
            weekDay = "Saturday";
            break;
    };
    data.innerHTML = weekDay + ', ' + date + ' ' + month + ' ' + year;
}

function showGreeting() {
    let hour = new Date().getHours();
    let greetingText;
    if (hour >= 6 && hour < 12) {
        greetingText = 'Good morning,';
    } else if (hour >= 12 && hour < 18) {
        greetingText = 'Good day,';
    } else if (hour >= 18 && hour < 24) {
        greetingText = 'Good afternoon,';
    } else {
        greetingText = 'Good night,';
    }
    greeting.innerHTML = greetingText;
}

//***BACKGROUND***

let currentPartOfDay;
let prevPartOfDay;
let indexCurrentBackground = 0;

function showBackground() {
    let hour = new Date().getHours();

    // get part of day
    let currentArray;
    if (hour >= 6 && hour < 12) {
        currentPartOfDay = 'morning';
        currentArray = currentMorningArray;
    } else if (hour >= 12 && hour < 18) {
        currentPartOfDay = 'day';
        currentArray = currentDayArray;
    } else if (hour >= 18 && hour < 24) {
        currentPartOfDay = 'evening';
        currentArray = currentEveningArray;
    } else {
        currentPartOfDay = 'night';
        currentArray = currentNightArray;
    }
    //if it is new part if day - start change background from 1st img in new array
    //if it is the last background in array - start getting background from the beginnig
    if (prevPartOfDay !== currentPartOfDay || indexCurrentBackground >= currentArray.length) {
        indexCurrentBackground = 0;
    }
    body.style.backgroundImage = src + currentPartOfDay + '/' + currentArray[indexCurrentBackground] + ')';
    indexCurrentBackground++;
    prevPartOfDay = currentPartOfDay;
}
setInterval(showBackground, 1000 * 60 * 60); //change background every hour

// ***NAME, FOCUS & LOCAL STORAGE***

name.addEventListener('click', clearField);
focus.addEventListener('click', clearField);
name.addEventListener('keypress', setNameToLocalStorage);
focus.addEventListener('keypress', setFocusToLocalStorage);

function clearField(e) {
    e.currentTarget.textContent = '';
}
// onblur
name.onblur = function (event) {
    if (event.target.innerText.trim() !== '') {
        localStorage.setItem('name', event.target.innerText);
    }
    getNameFromLocalStorage();
}

focus.onblur = function (event) {
    if (event.target.innerText.trim() !== '') {
        localStorage.setItem('focus', event.target.innerText);
    }
    getFocusFromLocalStorage();
}

//getItem from local storage
function getNameFromLocalStorage() {
    if (!localStorage.getItem('name')) {
        name.textContent = '[Enter name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

function getFocusFromLocalStorage() {
    if (!localStorage.getItem('focus')) {
        focus.textContent = '[Enter focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

//settItem to local storage
function setNameToLocalStorage(event) {
    if (event.code === 'Enter') {
        if (event.target.innerText.trim() !== '') {
            localStorage.setItem('name', event.target.innerText);
        }
        name.textContent = localStorage.getItem('name');
        name.blur();
    }
}

function setFocusToLocalStorage(event) {
    if (event.code === 'Enter') {
        if (event.target.innerText.trim() !== '') {
            localStorage.setItem('focus', event.target.innerText);
        }
        focus.textContent = localStorage.getItem('focus');
        focus.blur();
    }
}

//***BUTTON PREVIEW***

// random sort morning-day-evening-night arrays 
function shuffle(timesOfDayArray) {

    console.log(morningImageArray);

    for (let index = 0; index < timesOfDayArray.length; index++) { //for morning, day..-array
        let timeOfDay = timesOfDayArray[index];
        for (let i = timeOfDay.length - 1; i > 0; i--) { //for img in morning, day..-array
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            // change elements
            // the same code: let t = array[i]; array[i] = array[j]; array[j] = t
            [timeOfDay[i], timeOfDay[j]] = [timeOfDay[j], timeOfDay[i]];
        }
    }
    console.log(morningImageArray);

}

let previewImagesIndex = null;

function previewButtonClick() {
    if (previewImagesIndex === null) {
        let currentArray;
        switch (currentPartOfDay) {
            case 'morning':
                currentArray = currentMorningArray;
                break;
            case 'day':
                currentArray = currentDayArray;
                break;
            case 'evening':
                currentArray = currentEveningArray;
                break;
            case 'night':
                currentArray = currentNightArray;
                break;
        }
        let nameOfBackground = currentArray[indexCurrentBackground];
        let indexOfBackground = currentTotalArray.indexOf(nameOfBackground);
        previewImagesIndex = indexOfBackground;
    }
    previewImagesIndex = (previewImagesIndex + 1) % currentTotalArray.length; //if index will be greater than array, index start from beginning
    body.style.backgroundImage = src + 'total' + '/' + currentTotalArray[previewImagesIndex] + ')';
    //console.log(previewImagesIndex);
}

//***BLOCKQUOTE***

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnQuote = document.querySelector('.btn_quote');

async function getQuote() {
    let data = null;
    do {
        try {
            data = await fetchQuoteJson();
            blockquote.textContent = data.value;
            figcaption.textContent = "Chuck Norris";
        } catch (error) {
            console.log('Error on fetching quote json ' + error);
        }
    } while (data === null);
}
document.addEventListener('DOMContentLoaded', getQuote); //when HTML loaded, without waiting for stylesheets, img..
btnQuote.addEventListener('click', getQuote);

async function fetchQuoteJson() {
    const url = `https://api.chucknorris.io/jokes/random`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

//***WEATHER***
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.weather-wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const imgSad = document.querySelector('.sad');
const text = document.querySelector('.text-for-not-found');
async function getWeather() {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=1ce0d4fb4fda8a9ad083a4369a9d645e&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.message == 'city not found'){
        weatherIcon.className = '';
        imgSad.className = 'img-display';
        temperature.textContent = '';
        text.textContent = 'City not found';
        text.classList.add('not-found');
        wind.textContent = '';
        humidity.textContent = '';
    }
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
   
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    imgSad.className = 'sad';
    text.textContent = '';
    text.className = 'text-for-not-found'; 
    temperature.textContent = `${data.main.temp}°C`;
    wind.textContent = `wind: ${data.wind.speed} meter/sec`;
    humidity.textContent = `humidity: ${data.main.humidity} %`;
}
function setCity(event) {
    if (event.code === 'Enter') {
        if (event.target.innerText.trim() !== '') {
            localStorage.setItem('city', event.target.innerText);
        }
        getWeather();
        city.blur();
    }
}
   
function getCityFromLocalStorage() {
    if (localStorage.getItem('city')) {
        city.textContent = localStorage.getItem('city');
    } else if (!localStorage.getItem('city')) {
        city.textContent = 'Minsk';
    }
}

city.onblur = function (event) {
    if (event.target.innerText.trim() !== '') {
        localStorage.setItem('city', event.target.innerText);
    }
    getCityFromLocalStorage();
    getWeather();
}
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('click', clearField);
