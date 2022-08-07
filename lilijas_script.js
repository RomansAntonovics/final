"use strict"
$(document).ready(function() {
    $('.header__burger').click(function(event) {
        $('.header__burger, .header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    })
});

//обрабатывает события, DOMContentLoaded запускается когда 
//первоначальный HTML документ будет полностью загружен и разобран, 
//без ожидания полной загрузки таблиц стилей, изображений и фреймов.

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
e.prevenDefault();

let error = formValidate(form);
    }
    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');
    }
}
) ;