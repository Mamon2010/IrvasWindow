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
        if (classContent[b].classList.contains('hide')) {
            classContent[b].classList.remove('hide');
            classContent[b].classList.add('show');
            classLink[b].classList.add(classAdd);
        }
    }

    /////табы Glazing

    let glazingSlider = document.querySelector('.glazing_slider'),
        glazingBlock = document.querySelectorAll('.glazing_block'),
        glazingBlockA = document.querySelectorAll('.glazing_block_a'),
        glazingContent = document.querySelectorAll('.glazing_content');

    hideTabContent(1, glazingBlock, glazingContent, 'active');

    glazingSlider.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('glazing_block_a')) {
            for (let i = 0; i < glazingBlockA.length; i++) {
                if (target == glazingBlockA[i]) {
                    hideTabContent(0, glazingBlock, glazingContent, 'active');
                    showTabContent(i, glazingBlock, glazingContent, 'active');
                    break;
                }
            }
        }
    });

    /////табы декорации
    let decorationTabcontent = document.querySelectorAll('.decoration_tabcontent'),
        decorationlink = document.querySelectorAll('.decoration_link'),
        decorationlinkA = document.querySelectorAll('.decoration_link_a'),
        decorationSlider = document.querySelector('.decoration_slider');

    hideTabContent(1, decorationlink, decorationTabcontent, 'after_click');

    decorationSlider.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('decoration_link_a')) {
            for (let i = 0; i < decorationlinkA.length; i++) {
                if (target == decorationlinkA[i]) {
                    hideTabContent(0, decorationlink, decorationTabcontent, 'after_click');
                    showTabContent(i, decorationlink, decorationTabcontent, 'after_click');
                    break;
                }
            }
        }
    });

}

export default tabs;