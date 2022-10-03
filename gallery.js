const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body"); //блокирует скрол в боди
const lockPadding = document.querySelectorAll(".lock-padding"); //

let unlock = true; //по умолчанию true, чтобы не было двойных нажатий

const timeout = 800;

if (popupLinks.length > 0) { //проверка, есть ли вообще ссылки 
    for (let i = 0; i < popupLinks.length; i++) { //запускается цикл
        const popupLink = popupLinks[i]; // все найденные ссылки сохраняются в переменной
        popupLink.addEventListener("click", function (e) { //на заполненную переменную вешаем событие (клик)
            constpopupName = popupLink.getAttribute("href").replace("#", ""); //при клике из атрибута href удаляется решётка и остаётся чистое имя
            const curentPopup = document.getElementById(popupName); //в переменную кладём полученный элемент с определённым именем
            popupOpen(curentPopup); //полученный элемент перекладываем в функцию, которая будет открывать
            e.preventDefault(); //запрещаем при клике на ссылку (href) перезагружать страницу
        });
    }
}
const popupCloseIcon = document.querySelectorAll(".close-popup"); //для закрытия объекта (не только по крестику), которые есть в popup с этим классом
if (popupCloseIcon.length > 0) { // проверка, есть ли такие объекты вообще      
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener("click", function (e) { //получив колкнертный объект, вешаем на него клик
            popupClose(el.closest(".popup")); //в функцию отправляется объект, который является ближайшим родителем нажатой ссылки с определённым классом
            e.preventDefault(); //блокировка ссылки
        });
    }
}


function popupOpen(curentPopup) {
    if (curentPopup && unlock) { //идёт проверка, есть ли объект и открыта ли переменная unlock
        const popupActive = document.querySelector(".popup.open"); //получаем объект с классом popup и open, то есть открытый
        if (popupActive) { // и если он существует, то его надо закрыть
            popupClose(popupActive, false);
        } else {
            bodyLock(); //и если открытого объекта нет, то блокируем скролл
        }
        curentPopup.classList.add("open"); //сюда передаём объект, отловленный по идентификатору и он открывается
        curentPopup.addEventListener("click", function (e) { //при открывшемся popup сразу вешается событие клик
            if (!e.target.closest(".popup__content")) {  // этим условиемся отсекается всё, кроме тёмной области 
                popupClose(e.target.closest(".popup")); // проверяется, если у родителя нет объекта с классом popup__content, то тогда popup закрывается
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) { // сюда передаётся активный объект (32 строка)
    if (unlock) {
        popupActive.classList.remove("open"); // у активного popup забирается класс open и он закрывается
        if (doUnlock) {
            bodyUnLock();
        }
    }
}



function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px"; // высчитаем разницу между шириной вьюпорта и шириной объекта внутри него. 
    //Это надо для того, чтобы узнать ширину скролла для ликвидации перемещения экрана при открытии и закрытии

    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) { //отбираются все объекты с классом lockPadiing, чтобы затем добавить разницу пикселей при всплывании popup и тем самым избежать смещений
            const el = lockPadding[i];
            el.getElementsByClassName.paddingRiht = lockPaddingValue; // блокирует сдвигание картинки на ширину скролла
        }
    }
    body.style.paddingRight = lockPaddingValue; // полученное значение ширины скролла присваеваем переменной в качестве паддинга, причём меняя ширину body 
    body.classList.add("lock"); //добавляется класс lock, по которому убирается скролл

    unlock = false; //временно блокируется переменная unLock
    setTimeout(function () {
        unlock = true;
    }, timeout); // и через какое-то время она деблокируется
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = "0px";
            }
        }
        body.style.paddingRight = "0px"; //убирается ранее добавленный к body паддинг 
        body.classList.remove("lock"); //и убирается класс lock 
    }, timeout); // скролл открывается только когда заканчивается анимация popup, чтобы он не смещался

    unlock = false; //временно блокируется переменная unLock
    setTimeout(function () {
        unlock = true;
    }, timeout); // и через какое-то время она деблокируется
}


document.addEventListener("keydown", function (e) { //слушаем нажатие клавиши
    if (UIEvent.which === 27) { //код клавиши esc. Вариант: e.which вычёркивался как устаревший (deprecated)
        const popupActive = document.querySelector(".popup.open"); //отлавливаем элемент с классом open
        popupClose(popupActive); //активный popup отправляется в функцию popupClose и закрывается
    }
});

