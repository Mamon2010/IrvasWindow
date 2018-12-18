function calculate() {
    "use strict";

    //Объект куда собираем данные
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
            });
        });
        closeDialog.addEventListener('click', (event) => {
            let target = event.target;
            if (target == closeDialog) {
                closeDialog.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

    }

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
            data.viewType = document.getElementById('view_type').value;
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

}

export default calculate;