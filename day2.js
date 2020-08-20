const form = document.querySelector(".js-dateForm");
const dateInput = form.querySelector("input");
const dDay = document.querySelector(".js-d-day");


const DATE_I = "dateTarget";
const DATE_T = "dateToday";
const SHOW_D = "show";

function saveDateInput(text) {
    localStorage.setItem(DATE_I, text);
}

function askForDate() {
    form.classList.add(SHOW_D);
    form.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
    event.preventDefault();
    const num = dateInput.value.replace(/[^0-9]/g,'');
    if (num.length == 8) {
        const yearInput = num.substring(0,4);
        const monthInput = num.substring(4,6);
        const dayInput = num.substring(6);
        //const dateInputTemp = new Date(yearInput, monthInput, dayInput);
        if (monthInput < 1 || monthInput > 12) {
            alert("Please enter a valid date");
        } 
        else if (dayInput < 1 || dayInput > 31) {
            alert("Please enter a valid date");
        }
        else if ((monthInput == 4 || monthInput == 6 || monthInput == 9 || monthInput == 11) && dayInput == 31) {
            alert("Please enter a valid date");
        }
        else if (monthInput == 2) {
            const leap = (yearInput % 4 == 0 && (yearInput % 100 != 0 || yearInput % 400 == 0));
            if (day>29 || (day==29 && !leap)) {
                alert("Please enter a valid date");
            } else {
                const dateInputF = new Date(yearInput, monthInput-1, dayInput);
                saveDateInput(dateInputF);
                diffDate(dateInputF,getDateToday());
            }
        }
        else {
            const dateInputF = new Date(yearInput, monthInput-1, dayInput);
            saveDateInput(dateInputF);
            diffDate(dateInputF,getDateToday());
            
        }
    } else {
        alert("Please enter a date again");
    }
}

//save today's date
function saveDateToday(text) {
    localStorage.setItem(DATE_T, text);
}

//load today's date
function getDateToday() {
    
    let dateToday = new Date();
    const yearToday = dateToday.getFullYear();
    const monthToday = dateToday.getMonth();
    const dayToday = dateToday.getDate();
    const dateTodayTemp = new Date(yearToday, monthToday, dayToday);
    saveDateToday(dateTodayTemp);
    return dateTodayTemp;
}

//change js-d-day innertext
function showDDay(diff) {
    form.classList.remove(SHOW_D);
    dDay.classList.add(SHOW_D);
    if (diff > 0) {
        dDay.innerText = `D - ${diff}`;
    } else if(diff < 0) {
        const diffP = -diff;
        dDay.innerText = `D + ${diffP}`;
    } else if (isNaN(diff)) {
        dDay.innerText = `ERRORRRRRRRRRRRRRRRR.... :-|`;
    }
}

//diff 
function diffDate(dateI,dateT) {
    const diff = dateI - dateT;
    const forDay = 1000*60*60*24;
    const diffF = diff/forDay;
    showDDay(diffF);
}



//load data
function loadDate() {
    const loadedDateTarget = localStorage.getItem(DATE_I);
    if (loadedDateTarget == null) {
        askForDate();
    } else {
        diffDate(loadedDateTarget, getDateToday());
        
    }
}

////(*function check if the saved date of "today" match)

function init() {
    loadDate();
    //(add *function later?) like setInterval(*function, 1000);
}

init();