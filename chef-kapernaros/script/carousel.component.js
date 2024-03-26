var singleSlide = /** @class */ (function () {
    function singleSlide(data) {
        this.data = data;
        this.next = null;
    }
    return singleSlide;
}());
var slidesList = /** @class */ (function () {
    function slidesList() {
        this.head = null;
        this.tail = null;
    }
    slidesList.prototype.append = function (data) {
        var newSingleSlide = new singleSlide(data);
        if (!this.head) {
            this.head = newSingleSlide;
            this.tail = newSingleSlide;
        }
        else if (this.tail) { // Tail is not null if the list isn't empty
            this.tail.next = newSingleSlide;
            this.tail = newSingleSlide;
        }
    };
    slidesList.prototype.getSingleSlide = function (index) {
        var currentSingleSlide = this.head;
        var count = 0;
        while (currentSingleSlide !== null) {
            if (count === index)
                return currentSingleSlide.data;
            count++;
            currentSingleSlide = currentSingleSlide.next;
        }
        return null;
    };
    return slidesList;
}());
// Define functions for carousel functionality
function initCarousel() {
    var slide1 = {
        description: 'Born and raised in Piraeus, Greece, Chef Nikolaos Kapernaros began his career studying at the Greek Culinary Institute &amp; working on islands such as Rhodes, Kos and Crete.',
        leftBG: '#000B4C',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1709573633/Kapernaros_middle_pic_3_kqhnrm.png'
    };
    var slide2 = {
        description: 'description 2',
        leftBG: '#262626',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1709578128/Kapernaros_bio_landing_1_lprh8i.png'
    };
    var slide3 = {
        description: 'description 3',
        leftBG: '#000000',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1709578128/Kapernaros_bio_landing_2_wn33pg.png'
    };
    var slide4 = {
        description: 'description 4',
        leftBG: '#262626',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1709578128/Kapernaros_bio_landing_3_sd75kp.png'
    };
    var slide5 = {
        description: 'description 5',
        leftBG: '#000B4C',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1709578127/Kapernaros_bio_landing_4_l6yclh.png'
    };
    var newSlidesList = new slidesList();
    // Append slide objects
    newSlidesList.append(slide1);
    newSlidesList.append(slide2);
    newSlidesList.append(slide3);
    newSlidesList.append(slide4);
    newSlidesList.append(slide5);
    var carouselElement = document.querySelector('#carousel');
    var timelineElement = document.querySelector('#timeline');
    var prevButton = document.getElementById('prevSlide');
    var nextButton = document.getElementById('nextSlide');
    var lineWhite = document.getElementById('lineWhite');
    function showSlide(index) {
        console.log(index);
        carouselElement.innerHTML = "";
        var slide = newSlidesList.getSingleSlide(index);
        carouselElement.innerHTML = "\n                <div class=\"flex singleCarouselSlide\">\n                    <div id=\"slideDescription\" class=\"flex flex-column flex-justifyContent-spaceAround\" style=\"background-color: ".concat(slide.leftBG, "\">              \n                        <div class=\"p-20 m-20\" style=\"border: 1px solid #C4B980\">\n                            <p class=\"fontSize18\">").concat(slide.description, "</p>\n                        </div>       \n                    </div>\n                    <div id=\"slidePic\">\n                        <img class=\"\" src=\"").concat(slide.rightBG, "\" alt=\"\">\n                    </div>\n                </div>\n            ");
        timelineElement.style.background = slide.leftBG;
        if (index >= 4) {
            nextButton.style.display = 'none';
            lineWhite.style.height = '50%';
            lineWhite.style.top = '0px';
            lineWhite.style.bottom = '';
        }
        else if (index === 0) {
            prevButton.style.display = 'none';
            lineWhite.style.height = '50%';
            lineWhite.style.bottom = '0px';
            lineWhite.style.top = '';
        }
        else if (index > 0 && index <= 4) {
            prevButton.style.display = '';
            nextButton.style.display = '';
            lineWhite.style.height = '100%';
        }
    }
    showSlide(0);
    var currentSlideIndex = 0;
    function moveSlide(n) {
        currentSlideIndex = currentSlideIndex + n;
        // Wrap the index if it goes out of bounds
        var totalSlides = 4;
        if (currentSlideIndex >= totalSlides) {
            currentSlideIndex = totalSlides;
        }
        else if (currentSlideIndex === 0) {
            currentSlideIndex = 0;
        }
        showSlide(currentSlideIndex);
    }
    prevButton.addEventListener('click', function () { return moveSlide(-1); });
    nextButton.addEventListener('click', function () { return moveSlide(1); });
    console.log('carousel running');
}
// Wait for the DOM to fully load before initializing the carousel
document.addEventListener('DOMContentLoaded', function () {
    initCarousel(); // Call the initialization function once the DOM is ready
});
