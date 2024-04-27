var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
        if (window.pageYOffset >= 600) {
            img.classList.add('in-view');
        }
        else if (window.pageYOffset < 500) {
            img.classList.remove('in-view');
        }
    });
    document.querySelectorAll('.achCards').forEach(function (img) {
        if (window.pageYOffset > 1250) {
            img.classList.add('in-view');
        }
        else if (window.pageYOffset < 1150) {
            img.classList.remove('in-view');
        }
    });
    document.querySelectorAll('.charityLandingPicContainer img').forEach(function (img) {
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
window.addEventListener('scroll', function () {
    // console.log(window.pageYOffset)
    navScrolling();
    picAnimation();
});
navScrolling();
picAnimation();
var images = document.querySelectorAll('.picToEn');
images.forEach(function (image) {
    image.addEventListener('click', function () {
        if (!document.fullscreenElement) {
            this.requestFullscreen().catch(function (err) {
                alert("Error attempting to enable full-screen mode: ".concat(err.message, " (").concat(err.name, ")"));
            });
        }
        else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
    document.addEventListener('fullscreenchange', function (event) {
        if (document.fullscreenElement) {
            console.log("Element: ".concat(document.fullscreenElement.id, " entered full-screen mode."));
            image.classList.add('fullscreen-mode'); // Add the class when entering full screen
        }
        else {
            console.log('Leaving full-screen mode.');
            image.classList.remove('fullscreen-mode'); // Remove the class when exiting
        }
    });
});
var container = document.querySelector('#bigPic');
var scrollInterval = null; // This will hold the interval ID
var isHovering = false; // Tracks if the mouse is over the container
// Function to start scrolling
function startScrolling(amount) {
    if (!scrollInterval) { // Only set the interval if it's not already set
        scrollInterval = setInterval(function () {
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
container.addEventListener('mouseenter', function () {
    isHovering = true;
    container.classList.add('hover-active'); // Optional: add visual feedback
});
container.addEventListener('mouseleave', function () {
    isHovering = false;
    container.classList.remove('hover-active'); // Optional: remove visual feedback
    stopScrolling(); // Ensure scrolling stops when mouse leaves the container
});
// Keydown event for starting scroll
document.addEventListener('keydown', function (event) {
    if (isHovering && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        var scrollAmount = event.key === 'ArrowLeft' ? -250 : 250;
        startScrolling(scrollAmount);
    }
});
// Keyup event for stopping scroll
document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        stopScrolling();
    }
});
var allNotActiveTitles = document.querySelectorAll('.secTitles');
allNotActiveTitles.forEach(function (listEl) {
    listEl.addEventListener('click', function () {
        allNotActiveTitles = document.querySelectorAll('.secTitles');
        if (!listEl.classList.contains('active')) {
            var titleActive = __spreadArray([], allNotActiveTitles, true).filter(function (el) { return el.classList.contains('active'); })[0];
            var titleIdToRemove = titleActive.id;
            titleActive.classList.remove('active');
            listEl.classList.add('active');
            var titleIdToShow = listEl.id;
            var sectToClean = container.querySelector("#".concat(titleIdToRemove));
            sectToClean === null || sectToClean === void 0 ? void 0 : sectToClean.classList.add('hide');
            var sectToShow = container.querySelector("#".concat(titleIdToShow));
            sectToShow === null || sectToShow === void 0 ? void 0 : sectToShow.classList.remove('hide');
        }
    });
});
console.log('all the time 4 try');
