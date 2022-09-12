"use strict"

$(document).ready(function () {
    $('.header__burger').click(function (event) {
        $('.header__burger, .header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    })
});

//обрабатывает события, DOMContentLoaded запускается когда 
//первоначальный HTML документ будет полностью загружен и разобран, 
//без ожидания полной загрузки таблиц стилей, изображений и фреймов.

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(event) {
        event.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form); //вытягивает все данные из заполненных полей
        formData.append('image', formImage.files[0]); //добавляем в переменную изображение

        if (error === 0) { //при успешной валидации запускается ajax
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData

            });
            if (response.ok) {

            } else {

            } // *******************************


        } else {
            alert('Lūdzu, aizpildiet obligātus laukus');

        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value); //regex поверяет правильность заполнения поля email
    }


    //Получаем инпут file в переменную
    const formImage = document.getElementById('formImage');
    //Получаем див для превью в переменную
    const formPreview = document.getElementById('formPreview');

    //Слушаем изменения в инпуте file
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {
        // проверка типа файла
        if (!['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/jpg'].includes(file.type)) {
            alert("Drīkst pievienot tikai attēlus");
            formImage.value = '';
            return;
        }
        // проверка размера файла (<2 Мб)
        if (file.size > 2 * 1024 * 1024) {
            alert("Attēla izmēram jābūt mazāk par 2Mb");
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Photo">`;
        };
        reader.onerror = function (e) {
            alert('Kļūda!');
        };
        reader.readAsDataURL(file);

    }

}
);