"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
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
        if (!navBar.classList.contains('scrolledAlways')) {
            navBar.classList.remove('scrolled');
        }
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
// const images = document.querySelectorAll('.picToEn') as NodeListOf<HTMLImageElement>
// images.forEach(image => {
//     image.addEventListener('click', function() {
//         if (!document.fullscreenElement) {
//             this.requestFullscreen().catch(err => {
//                 alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
//             })
//         } else {
//             if (document.exitFullscreen) {
//                 document.exitFullscreen()
//             }
//         }
//     })
//     document.addEventListener('fullscreenchange', (event) => {
//         if (document.fullscreenElement) {
//             console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
//             image.classList.add('fullscreen-mode') // Add the class when entering full screen
//         } else {
//             console.log('Leaving full-screen mode.')
//             image.classList.remove('fullscreen-mode') // Remove the class when exiting
//         }
//     })
// })
var container = document.querySelector('#bigPic');
// let scrollInterval: any = null // This will hold the interval ID
// let isHovering = false // Tracks if the mouse is over the container
// // Function to start scrolling
// function startScrolling(amount: any) {
//     if (!scrollInterval) { // Only set the interval if it's not already set
//         scrollInterval = setInterval(() => {
//             container.scrollBy({ left: amount, behavior: 'smooth' })
//         }, 300) // Adjust the speed as necessary
//     }
// }
// // Function to stop scrolling
// function stopScrolling() {
//     clearInterval(scrollInterval);
//     scrollInterval = null
// }
// // Mouse enter and leave events
// container.addEventListener('mouseenter', () => {
//     isHovering = true
//     container.classList.add('hover-active') // Optional: add visual feedback
// })
// container.addEventListener('mouseleave', () => {
//     isHovering = false
//     container.classList.remove('hover-active') // Optional: remove visual feedback
//     stopScrolling() // Ensure scrolling stops when mouse leaves the container
// })
// // Keydown event for starting scroll
// document.addEventListener('keydown', (event) => {
//     if (isHovering && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
//         const scrollAmount = event.key === 'ArrowLeft' ? -250 : 250
//         startScrolling(scrollAmount)
//     }
// })
// // Keyup event for stopping scroll
// document.addEventListener('keyup', (event) => {
//     if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
//         stopScrolling()
//     }
// })
var allNotActiveTitles = document.querySelectorAll('.secTitles');
allNotActiveTitles.forEach(function (listEl) {
    listEl.addEventListener('click', function () {
        allNotActiveTitles = document.querySelectorAll('.secTitles');
        console.log(listEl);
        if (!listEl.classList.contains('active')) {
            var titleActive = __spreadArray([], allNotActiveTitles, true).filter(function (el) { return el.classList.contains('active'); })[0];
            titleActive.classList.remove('active');
            listEl.classList.add('active');
        }
    });
});
emailjs.init('o69p_GM3kd5oX3hnI');
(_a = document.getElementById('myForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    emailjs.sendForm('default_service', 'template_bxw793c', this)
        .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        alert("Email sent successfully!");
    }, function (error) {
        console.log('FAILED...', error);
        alert("Failed to send email.");
    });
});
// Cloudinary
// Load Cloudinary module
var cloudinary_1 = require("cloudinary");
// Configure Cloudinary with your credentials
cloudinary_1.v2.config({
    cloud_name: 'Chef_Kapernaros',
    api_key: '556769291727766',
    api_secret: 'GHtqk_rLeOkCE56JDM4IDYjW1dw'
});
// Function to fetch and log all image URLs
// A simple function to list assets
function listAssets() {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, cloudinary_1.v2.api.resources()];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching resources:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
listAssets();
console.log('all the time 4 try');
