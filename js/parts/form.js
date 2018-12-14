"use strict";

function sendForm() {

    let message = {
            success: "Спасибо за обращение, мы с вами скоро свяжемся",
            fail: "Что то пошло не так"
        },
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');


    //Функция для реквеста
    function httpRequest(form) {
        let input = form.getElementsByTagName('input');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            form.appendChild(statusMessage);

            //собираем данные для отправки
            let formData = new FormData(form),
                obj = {};

            formData.forEach(function(value, key) {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);

            //создаем функцию отправки в которой создаем промис
            function sendData(data) {
                return new Promise(function(resolve, reject) {

                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                    request.addEventListener('readystatechange', function() {
                        if (request.readyState === 4) {
                            if (request.status == 200) {
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    });
                    request.send(data);
                });
                //end sendData
            }

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            sendData(json)
                // .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.success)
                .catch(() => statusMessage.innerHTML = message.fail)
                .then(clearInput)
                .then(setTimeout(() => {
                    // $('.status').remove();
                    document.querySelector('form .status').remove();
                }, 3000));
        });
    }

    let inputContact = document.querySelectorAll('[name = user_phone]');

    // Form Modal Request a call
    let callForm = document.querySelector('.form');
    httpRequest(callForm);

    // // Form Modal Request an engineer
    // let engineerForm = document.querySelector('.popup');
    // httpRequest(formContact);

    //Функция для валидации номера телефона
    let validatePhone = (input) => {
        return /^(8|\+7|\+)\d{0,10}$/.test(input.value);
    };

    //Валидация телефона
    inputContact.forEach((item) => {
        item.addEventListener('input', () => {
            if (!validatePhone(item)) {
                // event.preventDefault();
                item.value = item.value.slice(0, -1);
            } else {
                item.value = item.value;
            }
        });
    });
}

export default sendForm;