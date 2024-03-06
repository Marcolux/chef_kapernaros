console.log('hello world');
var hambMenu = document.querySelector('.hamburger-menu');
var navMenu = document.getElementById('navMenu');
var navBar = document.querySelector('.navBar');
var spanToBreak = document.querySelectorAll('.brSm');
hambMenu.addEventListener('click', function () {
    navMenu.classList.toggle('show');
    navMenu.classList.toggle('hide', !navMenu.classList.contains('show'));
    hambMenu.classList.toggle('openHam');
    navBar.classList.toggle('expand');
});
var navBarAdjToScreen = function () {
    if (window.innerWidth < 750 && navBar.classList.contains('biggerScreen')) {
        navBar.classList.add('mobileView');
        navBar.classList.remove('biggerScreen');
        spanToBreak.forEach(function (el) {
            if (!el.firstChild || el.firstChild.nodeName !== 'BR') {
                var brEl = document.createElement('br');
                el.prepend(brEl);
            }
        });
    }
    else if (window.innerWidth >= 750 && !navBar.classList.contains('biggerScreen')) {
        navBar.classList.remove('mobileView');
        navBar.classList.add('biggerScreen');
        spanToBreak.forEach(function (el) {
            if (el.firstChild && el.firstChild.nodeName === 'BR') {
                el.removeChild(el.firstChild);
            }
        });
    }
};
var navScrolling = function () {
    if (window.pageYOffset > 30) {
        navBar.classList.add('scrolled');
    }
    else {
        navBar.classList.remove('scrolled');
    }
};
var picAnimation = function () {
    document.querySelectorAll('.bioLandingPicContainer img').forEach(function (img) {
        if (window.pageYOffset >= 600 && window.pageYOffset < 1650) {
            img.classList.add('in-view');
        }
        else if (window.pageYOffset < 400 || window.pageYOffset > 1651) {
            img.classList.remove('in-view');
        }
    });
    document.querySelectorAll('.charityLandingPicContainer img').forEach(function (img) {
        if (window.pageYOffset >= 1850 && window.pageYOffset < 2650) {
            img.classList.add('in-view');
        }
        else if (window.pageYOffset < 1800 || window.pageYOffset > 2651) {
            img.classList.remove('in-view');
        }
    });
    document.querySelectorAll('.achCards').forEach(function (img) {
        if (window.pageYOffset > 1450 && window.pageYOffset <= 2400) {
            img.classList.add('in-view');
        }
        else if (window.pageYOffset < 1100 || window.pageYOffset > 2500) {
            img.classList.remove('in-view');
        }
    });
};
window.addEventListener('resize', navBarAdjToScreen);
navBarAdjToScreen();
window.addEventListener('scroll', function () {
    console.log(window.pageYOffset);
    navScrolling();
    picAnimation();
});
navScrolling();
picAnimation();
console.log('all the time 4 try');
