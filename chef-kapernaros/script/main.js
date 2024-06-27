"use strict";
var _a;
console.log('hello world');
const hambMenu = document.querySelector('.hamburger-menu');
const navMenu = document.getElementById('navMenu');
const navBar = document.querySelector('.navBar');
const spanToBreak = document.querySelectorAll('.brSm');
const socialMedia = document.querySelector('#socialMedia');
if (hambMenu) {
    hambMenu.addEventListener('click', function () {
        navMenu.classList.toggle('show');
        navMenu.classList.toggle('hide', !navMenu.classList.contains('show'));
        hambMenu.classList.toggle('openHam');
        navBar.classList.toggle('expand');
    });
}
const navBarAdjToScreen = () => {
    if (window.innerWidth < 750 && navBar.classList.contains('biggerScreen')) {
        navBar.classList.add('mobileView');
        navBar.classList.remove('biggerScreen');
        spanToBreak.forEach(el => {
            if (!el.firstChild || el.firstChild.nodeName !== 'BR') {
                const brEl = document.createElement('br');
                el.prepend(brEl);
            }
        });
    }
    else if (window.innerWidth >= 750 && !navBar.classList.contains('biggerScreen')) {
        navBar.classList.remove('mobileView');
        navBar.classList.add('biggerScreen');
        spanToBreak.forEach(el => {
            if (el.firstChild && el.firstChild.nodeName === 'BR') {
                el.removeChild(el.firstChild);
            }
        });
    }
};
const navScrolling = () => {
    if (window.pageYOffset > 30) {
        navBar.classList.add('scrolled');
        if (socialMedia)
            socialMedia.classList.remove('hide');
    }
    else {
        if (!navBar.classList.contains('scrolledAlways')) {
            navBar.classList.remove('scrolled');
            if (socialMedia)
                socialMedia.classList.add('hide');
        }
    }
};
const picAnimation = () => {
    document.querySelectorAll('.bioLandingPicContainer img').forEach(img => {
        if (window.pageYOffset >= 600) {
            img.classList.add('in-view');
        }
        else if (window.pageYOffset < 500) {
            img.classList.remove('in-view');
        }
    });
    document.querySelectorAll('.achCards').forEach(img => {
        if (window.innerWidth < 770) {
            if (window.pageYOffset > 1000) {
                img.classList.add('in-view');
            }
            else if (window.pageYOffset < 950) {
                img.classList.remove('in-view');
            }
        }
        else {
            if (window.pageYOffset > 1250) {
                img.classList.add('in-view');
            }
            else if (window.pageYOffset < 1150) {
                img.classList.remove('in-view');
            }
        }
    });
    document.querySelectorAll('.charityLandingPicContainer img').forEach(img => {
        if (window.pageYOffset >= 1950) {
            img.classList.add('in-view');
        }
        else if (window.pageYOffset < 1850) {
            img.classList.remove('in-view');
        }
    });
};
window.addEventListener('resize', navBarAdjToScreen);
navBarAdjToScreen();
window.addEventListener('scroll', () => {
    navScrolling();
    picAnimation();
});
navScrolling();
picAnimation();
const container = document.querySelector('#bigPic');
let allNotActiveTitles = document.querySelectorAll('.secTitles');
allNotActiveTitles.forEach(listEl => {
    listEl.addEventListener('click', () => {
        allNotActiveTitles = document.querySelectorAll('.secTitles');
        if (!listEl.classList.contains('active')) {
            const titleActive = [...allNotActiveTitles].filter(el => el.classList.contains('active'))[0];
            titleActive.classList.remove('active');
            listEl.classList.add('active');
        }
    });
});
emailjs.init('0wA6kpUaumn2FNdbg');
const messageSent = document.querySelector('#messageSent');
const inputText = document.querySelectorAll('.inputText');
const inputTextSelect = document.querySelectorAll('select.inputText');
(_a = document.getElementById('myForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    emailjs.sendForm('service_m5a5vcb', 'template_1jfyvjh', this)
        .then(function (response) {
        messageSent.classList.remove('hide');
        inputText.forEach(text => text.value = '');
        inputTextSelect.forEach(text => text.value = 'Select One');
        console.log('SUCCESS!', response.status, response.text);
        setTimeout(() => { messageSent.classList.add('hide'); }, 5000);
    }, function (error) {
        console.log('FAILED...', error);
        alert("Failed to send email.");
    });
});
// Setting a cookie with SameSite=Lax
document.cookie = "key=value; SameSite=Lax";
