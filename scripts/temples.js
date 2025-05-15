const currentYear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');
const headerMenu = document.querySelector('.header__menu');
const navEl = document.querySelector('.header__nav');

const today = new Date();
const templesLarge = window.matchMedia('(min-width: 425px)');

currentYear.textContent += today.getFullYear();
lastModified.textContent += document.lastModified;

function hideHambBtn(event) {
    if (event.matches) {
        headerMenu.classList.add('js-hide-content');
    } else {
        headerMenu.classList.remove('js-hide-content');
    }
}

function showNavBarOnBiggerScreen(event) {
    if (event.matches) {
        navEl.classList.add('js-show-header-nav');
    } else {
        navEl.classList.remove('js-show-header-nav')
    }
}

function handleClickOnMenu() {
    headerMenu.classList.toggle('show');
    navEl.classList.toggle('js-show-header-nav');
}


headerMenu.addEventListener('click', handleClickOnMenu);
templesLarge.addEventListener('change', showNavBarOnBiggerScreen)
templesLarge.addEventListener('change', hideHambBtn);

showNavBarOnBiggerScreen(templesLarge);
hideHambBtn(templesLarge);