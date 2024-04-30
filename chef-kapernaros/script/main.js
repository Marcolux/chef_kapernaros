"use strict";
console.log('hello world');
const hambMenu = document.querySelector('.hamburger-menu');
const navMenu = document.getElementById('navMenu');
const navBar = document.querySelector('.navBar');
const spanToBreak = document.querySelectorAll('.brSm');
hambMenu.addEventListener('click', function () {
    navMenu.classList.toggle('show');
    navMenu.classList.toggle('hide', !navMenu.classList.contains('show'));
    hambMenu.classList.toggle('openHam');
    navBar.classList.toggle('expand');
});
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
    }
    else {
        navBar.classList.remove('scrolled');
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
        if (window.pageYOffset > 1250) {
            img.classList.add('in-view');
        }
        else if (window.pageYOffset < 1150) {
            img.classList.remove('in-view');
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
    // console.log(window.pageYOffset)
    navScrolling();
    picAnimation();
});
navScrolling();
picAnimation();
const images = document.querySelectorAll('.picToEn');
images.forEach(image => {
    image.addEventListener('click', function () {
        if (!document.fullscreenElement) {
            this.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        }
        else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
    document.addEventListener('fullscreenchange', (event) => {
        if (document.fullscreenElement) {
            console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
            image.classList.add('fullscreen-mode'); // Add the class when entering full screen
        }
        else {
            console.log('Leaving full-screen mode.');
            image.classList.remove('fullscreen-mode'); // Remove the class when exiting
        }
    });
});
const container = document.querySelector('#bigPic');
let scrollInterval = null; // This will hold the interval ID
let isHovering = false; // Tracks if the mouse is over the container
// Function to start scrolling
function startScrolling(amount) {
    if (!scrollInterval) { // Only set the interval if it's not already set
        scrollInterval = setInterval(() => {
            container.scrollBy({ left: amount, behavior: 'smooth' });
        }, 300); // Adjust the speed as necessary
    }
}
// Function to stop scrolling
function stopScrolling() {
    clearInterval(scrollInterval);
    scrollInterval = null;
}
// Mouse enter and leave events
container.addEventListener('mouseenter', () => {
    isHovering = true;
    container.classList.add('hover-active'); // Optional: add visual feedback
});
container.addEventListener('mouseleave', () => {
    isHovering = false;
    container.classList.remove('hover-active'); // Optional: remove visual feedback
    stopScrolling(); // Ensure scrolling stops when mouse leaves the container
});
// Keydown event for starting scroll
document.addEventListener('keydown', (event) => {
    if (isHovering && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        const scrollAmount = event.key === 'ArrowLeft' ? -250 : 250;
        startScrolling(scrollAmount);
    }
});
// Keyup event for stopping scroll
document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        stopScrolling();
    }
});
let allNotActiveTitles = document.querySelectorAll('.secTitles');
allNotActiveTitles.forEach(listEl => {
    listEl.addEventListener('click', () => {
        allNotActiveTitles = document.querySelectorAll('.secTitles');
        if (!listEl.classList.contains('active')) {
            const titleActive = [...allNotActiveTitles].filter(el => el.classList.contains('active'))[0];
            const titleIdToRemove = titleActive.id;
            titleActive.classList.remove('active');
            listEl.classList.add('active');
            const titleIdToShow = listEl.id;
            const sectToClean = container.querySelector(`#${titleIdToRemove}`);
            sectToClean === null || sectToClean === void 0 ? void 0 : sectToClean.classList.add('hide');
            const sectToShow = container.querySelector(`#${titleIdToShow}`);
            sectToShow === null || sectToShow === void 0 ? void 0 : sectToShow.classList.remove('hide');
        }
    });
});
console.log('all the time 4 try');
