function modalView() {
    "use strict";

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


}

export default modalView;