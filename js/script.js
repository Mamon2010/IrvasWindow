window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    //Объект для сбора данных с формы калькулятора 
    let data = {};
    //Общие функции открытия/закрытия модальных окон
    function showModalView(popup) {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModalView(closeDialog, closeBtn) {
        closeBtn.forEach((item) => {
            item.addEventListener('click', () => {
                closeDialog.style.display = 'none';
                document.body.style.overflow = '';
                data = {};
            });
        });
        closeDialog.addEventListener('click', (event) => {
            let target = event.target;
            if (target == closeDialog) {
                closeDialog.style.display = 'none';
                document.body.style.overflow = '';
                data = {};
            }
        });
    }

    // модальное окно Вызвать замерщика
    let headerBtn = document.querySelector('.header_btn'),
        popupEngineer = document.querySelector('.popup_engineer'),
        popupClose = document.querySelectorAll('.popup_close');

    headerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showModalView(popupEngineer);
    });

    closeModalView(popupEngineer, popupClose);

    // модальное окно Заказать обратный звонок

    let phoneBackLink = document.querySelector('.phone_link'),
        popup = document.querySelector('.popup');

    phoneBackLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModalView(popup);
    });

    // модальное окно Спросите у нашего специалиста!

    let feedbackPhoneLink = document.querySelector('.phone_link_question');

    feedbackPhoneLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModalView(popup);
    });

    closeModalView(popup, popupClose);

    //через 60 секунд выдавать модальное окно  
    setTimeout(() => {
        showModalView(popup);
    }, 60000);


    ///////////////////////////

    let message = {
            success: "Спасибо за обращение, мы с вами скоро свяжемся",
            fail: "Что то пошло не так"
        },
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');


    //Функция для реквеста
    function httpRequest(form, objData) {
        let input = form.getElementsByTagName('input');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            form.appendChild(statusMessage);

            //собираем данные для отправки
            let formData = new FormData(form);
            // obj = {};

            formData.forEach(function(value, key) {
                objData[key] = value;
            });

            let json = JSON.stringify(objData);

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
    let callForm = document.querySelectorAll('.form');
    callForm.forEach((item) => {
        httpRequest(item, data);
    });

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


    function continueModalView(popupNew, popupOld) {
        popupNew.style.display = 'block';
        document.body.style.overflow = 'hidden';
        popupOld.style.display = 'none';
    }


    // модальное окно рассчитать стоимость
    let btnCalc = document.querySelectorAll('.popup_calc_btn'),
        popupCalc = document.querySelector('.popup_calc'),
        popupCalcClose = document.querySelectorAll('.popup_calc_close');


    btnCalc.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            showModalView(popupCalc);
        });
    });

    closeModalView(popupCalc, popupCalcClose);

    //после нажатия в калькуляторе на Далее в калькуляторе
    let calcContinue = document.querySelectorAll('.popup_calc_button'),
        popupContinueProfile = document.querySelector('.popup_calc_profile'),
        popupContinueProfileClose = document.querySelectorAll('.popup_calc_profile_close');


    calcContinue.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            continueModalView(popupContinueProfile, popupCalc);
            data.viewType = document.getElementById('view_type').value;
        });
    });


    closeModalView(popupContinueProfile, popupContinueProfileClose);

    // после нажатия кнопки далее в профайле
    let calcFormContinue = document.querySelectorAll('.popup_calc_profile_button'),
        popupFormContinueForm = document.querySelector('.popup_calc_end'),
        popupFormContinueClose = document.querySelectorAll('.popup_calc_end_close');

    calcFormContinue.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            continueModalView(popupFormContinueForm, popupContinueProfile);
        });
    });


    closeModalView(popupFormContinueForm, popupFormContinueClose);


    /////////////выбор остекления.
    let smallIcons = document.querySelectorAll('.balcon_icons a img'),
        bigIcons = document.querySelectorAll('.big_img img');


    function hide(a, tabBigHide, tabIconHide) {
        for (let i = a; i < tabBigHide.length; i++) {
            tabBigHide[i].classList.remove('show');
            tabIconHide[i].classList.remove('do_image_more');
            tabBigHide[i].classList.add('hide');
        }
    }

    hide(1, bigIcons, smallIcons);

    function show(b, tabBigShow, tabIconMore) {
        if (tabBigShow[b].classList.contains('hide')) {
            tabBigShow[b].classList.add('show');
            tabIconMore[b].classList.add('do_image_more');
            tabBigShow[b].style.justifyContent = 'center';
            tabBigShow[b].style.margin = '60px';
        }
    }

    function calcPreview() {
        for (let i = 0; i < smallIcons.length; i++) {
            smallIcons[i].addEventListener('click', (e) => {
                e.preventDefault();
                for (let a = 0; a < bigIcons.length; a++) {
                    if (i == a) {
                        hide(0, bigIcons, smallIcons);
                        show(i, bigIcons, smallIcons);
                    }
                }
            });
        }
    }

    calcPreview();

    ////заполнение только цифр в размеры
    let width = document.getElementById('width'),
        height = document.getElementById('height');

    function validateNum(input) {
        return /\d$/.test(input.value);
    }

    function validateSize(input, dataName) {
        input.addEventListener('input', () => {
            if (!validateNum(input)) {
                input.value = input.value.slice(0, -1);
            }
            data[dataName] = input.value;
        });
    }

    validateSize(width, 'width');
    validateSize(height, 'height');

    ////// Чекбоксы Cold и Warm

    let checkBox = document.querySelectorAll('.popup_calc_profile .checkbox');

    checkBox.forEach((item) => {
        item.addEventListener('click', (e) => {
            let target = e.target;
            if (item.checked) {
                checkBox.forEach((item) => {
                    if (target != item) {
                        item.checked = false;
                    }
                });
            }
        });
    });



    // console.log(data);
    // data.cold = cold.checked;
    // data.warm = warm.checked;






    // function changeCheckbox(checkBoxCold, checkBoxWarm) {
    //     checkBoxCold.addEventListener('click', () => {
    //         if (checkBoxCold.checked) {
    //             // checkBoxCold.checked = false;
    //             checkBoxWarm.checked = true;
    //         } else {
    //             // checkBoxCold.checked = true;
    //             checkBoxWarm.checked = false;
    //         }
    //     });
    //     checkBoxWarm.addEventListener('click', () => {
    //         if (checkBoxWarm.checked) {
    //             // checkBoxWarm.checked = true;
    //             checkBoxCold.checked = true;
    //         } else {
    //             // checkBoxWarm.checked = false;
    //             checkBoxCold.checked = false;
    //         }
    //     });
    // }

    function hideTabContent(a, classLink, classContent, classRemove = '') {
        for (let i = a; i < classContent.length; i++) {
            classContent[i].classList.remove('show');
            classContent[i].classList.add('hide');
            classLink[i].classList.remove(classRemove);
        }
    }

    function showTabContent(b, classLink, classContent, classAdd = '') {
        if (classContent[b].classList.contains('hide')) {
            classContent[b].classList.remove('hide');
            classContent[b].classList.add('show');
            classLink[b].classList.add(classAdd);
        }
    }

    /////табы декорации
    let decorationTabcontent = document.querySelectorAll('.decoration_tabcontent'),
        decorationlink = document.querySelectorAll('.decoration_link'),
        decorationlinkA = document.querySelectorAll('.decoration_link_a'),
        decorationSlider = document.querySelector('.decoration_slider'),
        decorationItem = document.querySelectorAll('.decoration_item');

    hideTabContent(1, decorationlink, decorationTabcontent, 'after_click');

    decorationSlider.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.closest('.decoration_item').classList.contains('decoration_item')) {
            for (let i = 0; i < decorationlinkA.length; i++) {
                if (target.closest('.decoration_item') == decorationItem[i]) {
                    hideTabContent(0, decorationlink, decorationTabcontent, 'after_click');
                    showTabContent(i, decorationlink, decorationTabcontent, 'after_click');
                    break;
                }
            }
        }
    });


    /////табы Glazing

    let glazingSlider = document.querySelector('.glazing_slider'),
        glazingBlock = document.querySelectorAll('.glazing_block'),
        glazingBlockA = document.querySelectorAll('.glazing_block_a'),
        glazingContent = document.querySelectorAll('.glazing_content');

    hideTabContent(1, glazingBlock, glazingContent, 'active');

    glazingSlider.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.closest('div').classList.contains('glazing_block')) {
            for (let i = 0; i < glazingBlockA.length; i++) {
                if (target.closest('div') == glazingBlock[i]) {
                    hideTabContent(0, glazingBlock, glazingContent, 'active');
                    showTabContent(i, glazingBlock, glazingContent, 'active');
                    break;
                }
            }
        }
    });

    ////Открытие картинок наших работ
    let divImage = document.createElement('div'),
        workSection = document.querySelector('.works'),
        bigImgLink = document.querySelectorAll('.big_img_link'),
        bigImage = document.createElement('Img'),

        workImage = document.querySelectorAll('.workImage');

    divImage.classList.add('popup');
    workSection.appendChild(divImage);
    divImage.style.justifyContent = 'center';
    divImage.style.display = 'none';
    divImage.style.alignItems = 'center';
    divImage.appendChild(bigImage);

    workImage.forEach((item, i) => {
        item.addEventListener('click', () => {
            bigImgLink.forEach((item, a) => {
                if (i == a) {
                    bigImage.setAttribute('src', item.href);
                }
            });
        });
    });

    workSection.addEventListener('click', function(e) {
        e.preventDefault();
        let target = e.target;
        if (target && target.classList.contains('workImage')) {
            divImage.style.display = 'flex';
        }
        if (target && target.matches('div.popup')) {
            divImage.style.display = 'none';
        }
    });



    //////Таймер

    let deadLine = '12.31.2018';

    function getTimeRemaining(endtime) {
        let d = new Date().getTimezoneOffset() * 60 * 1000,
            t = Date.parse(endtime) - Date.parse(new Date()), // + d,
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t / (1000 * 60 * 60) % 60),
            days = Math.floor(t / (1000 * 60 * 60 * 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function timeForm(time) {
        let res = time;
        if (time < 0) {
            res = '00';
        } else if (time < 10) {
            res = '0' + time;
        }

        return res;
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            days.textContent = timeForm(t.days);
            hours.textContent = timeForm(t.hours);
            minutes.textContent = timeForm(t.minutes);
            seconds.textContent = timeForm(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('timer', deadLine);

});