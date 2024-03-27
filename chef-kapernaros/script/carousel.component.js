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
function initCarousel() {
    var slide1 = {
        description: 'Born and raised in Piraeus, Greece, Chef Nikolaos Kapernaros began his career studying at the Greek Culinary Institute &amp; working on islands such as Rhodes, Kos and Crete.',
        leftBG: '#000B4C',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1711495614/Niko/Rectangle_55_rwurxu.png'
    };
    var slide2 = {
        description: 'Grand Resort Lagonissi, Greece, a private peninsula Luxury Resort and member of Leading Hotels of the World.  There, he worked his way up to being the Head Chef for royalty, international athletes, movie stars &amp; musicians during their stay at the resort.',
        leftBG: '#262626',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1711495915/Niko/Rectangle_54_lltm3q.png'
    };
    var slide3 = {
        description: 'In 2011, Chef Kapernaros began teaching at the Culinary Institute of Greece, Anavissos, showcasing the cooking styles of Greek, French, Mediterranean and other international cuisines. Chef Kapernaros and team worked closely with the Greek Government and the Council of the European Union on exhibitions featuring Greek cuisine and environmental sustainability.',
        leftBG: '#000000',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1711495906/Niko/Rectangle_52_xrwyz8.png'
    };
    var slide4 = {
        description: 'In 2018, Chef Kapernaros and his family moved to Chicago. He began carving a new career path in the Windy City as Chef de Cuisine at the Hyatt Regency Chicago. Two months into his new position, he won 1st place at the Hyatt Good Taste Series Competition.',
        leftBG: '#262626',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1711495899/Niko/Group_62_tsi44d.png'
    };
    var slide5 = {
        description: 'In 2021, he joined the Avli Restaurant group and opened Avli on the Park, located in Chicago Lakeshore East, to lead and expand the vision of contemporary Greek cuisine, where everything is made from scratch.',
        leftBG: '#000B4C',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1711495893/Niko/Group_65_tv5key.png'
    };
    var newSlidesList = new slidesList();
    // Append slide objects
    newSlidesList.append(slide1);
    newSlidesList.append(slide2);
    newSlidesList.append(slide3);
    newSlidesList.append(slide4);
    newSlidesList.append(slide5);
    var carouselElement = document.querySelector('#carousel');
    function showSlide(index) {
        var slide = newSlidesList.getSingleSlide(index);
        carouselElement.innerHTML = "\n            <div class=\"flex singleCarouselSlide\">\n                <div id=\"timeline\" class=\"flex flex-column flex-justifyContent-spaceAround\">\n                    \n                    <div id=\"lineWhite\"></div>\n                    <div id=\"circleWhite\"></div>\n                </div>\n                    \n                <div id=\"slideDescription\" class=\"flex flex-column flex-justifyContent-center flex-alignItems-center\" style=\"background-color: ".concat(slide.leftBG, "\"> \n                    <i id=\"prevSlide\" class=\"fa-solid fa-chevron-up fontSize40\"></i>            \n                    <div class=\"p-20 mx-30\" style=\"border: 1px solid #C4B980\">\n                        <p class=\"fontSize18\">").concat(slide.description, "</p>\n                    </div> \n                    <i id=\"nextSlide\" class=\"fa-solid fa-chevron-down fontSize40\"></i>     \n                </div>\n                <div id=\"slidePic\">\n                    <img id=\"slideImg\" class=\"\" src=\"").concat(slide.rightBG, "\" alt=\"\">\n                </div>\n            </div>\n        ");
        var prevButton = document.getElementById('prevSlide');
        var nextButton = document.getElementById('nextSlide');
        var slideImg = document.getElementById('slideImg');
        prevButton.addEventListener('click', function () { return moveSlide(-1); });
        nextButton.addEventListener('click', function () { return moveSlide(1); });
        var timelineElement = document.querySelector('#timeline');
        var lineWhite = document.getElementById('lineWhite');
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
        setTimeout(function () {
            if (slideImg) {
                slideImg.style.width = '100%';
            }
        }, 200);
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
    console.log('carousel running');
}
// Wait for the DOM to fully load before initializing the carousel
document.addEventListener('DOMContentLoaded', function () {
    initCarousel(); // Call the initialization function once the DOM is ready
});
