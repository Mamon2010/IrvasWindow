function tabs() {
    "use strict";

    function hideTabContent(a, classLink, classContent, classRemove = '') {
        for (let i = a; i < classContent.length; i++) {
            classContent[i].classList.remove('show');
            classContent[i].classList.add('hide');
            classLink[i].classList.remove(classRemove);
        }
    }

    function showTabContent(b, classLink, classContent, classAdd = '') {
        classContent[b].classList.remove('hide');
        classContent[b].classList.add('show');
        classLink[b].classList.add(classAdd);
    }

    /////табы Glazing

    let glazingSlider = document.querySelector('.glazing_slider'),
        glazingBlock = document.querySelectorAll('.glazing_block'),
        glazingBlockA = document.querySelectorAll('.glazing_block_a'),
        glazingContent = document.querySelectorAll('.glazing_content');

    hideTabContent(1, glazingBlockA, glazingContent, 'active');
    showTabContent(0, glazingBlockA, glazingContent, 'active');

    glazingSlider.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.closest('div').classList.contains('glazing_block')) {
            for (let i = 0; i < glazingBlockA.length; i++) {
                if (target.closest('div') == glazingBlock[i]) {
                    hideTabContent(0, glazingBlockA, glazingContent, 'active');
                    showTabContent(i, glazingBlockA, glazingContent, 'active');
                    break;
                }
            }
        }
    });
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


}

export default tabs;