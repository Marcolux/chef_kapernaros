
interface Slide {
    description: string
    leftBG: string
    rightBG: string
    picNote: string | null
}

class singleSlide {
    data: Slide 
    next: singleSlide | null
  
    constructor(data: any) {
      this.data = data
      this.next = null
    }
}
  
class slidesList {
    
    head: singleSlide | null
    tail: singleSlide | null
    
    constructor() {
        this.head = null
        this.tail = null
    }
    
    append(data: Slide): void {
        const newSingleSlide = new singleSlide(data)
        if (!this.head) {
            this.head = newSingleSlide
            this.tail = newSingleSlide
        } else if (this.tail) { 
            this.tail.next = newSingleSlide
            this.tail = newSingleSlide
        }
    }
    
    getSingleSlide(index: number): Slide | null { 
        let currentSingleSlide = this.head
        let count = 0
        // if currentSingleSlide === null means that the while loop reached the end of the list because it will replace the currentSlide with is next currentSingleSlide = currentSingleSlide.next
        while (currentSingleSlide !== null) {
            if (count === index) return currentSingleSlide.data
            count++
            currentSingleSlide = currentSingleSlide.next
        }
        return null
    }

    getLastIndex(): number { 
        let currentSingleSlide = this.head
        let count = 0
        
        while (currentSingleSlide !== null) {  
            count++
            currentSingleSlide = currentSingleSlide.next
        }
        return count - 1
    }
}



function initCarousel() {
    const slide1 = {
        description: 'Born and raised in Piraeus, Greece, Chef Nikolaos Kapernaros began his career studying at the Greek Culinary Institute &amp; working on islands such as Rhodes, Kos and Crete.',
        leftBG: '#000B4C',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1711495614/Niko/Rectangle_55_rwurxu.png',
        picNote: 'Piraeus, Attica'
    }
    const slide2 = {
        description: 'Grand Resort Lagonissi, Greece, a private peninsula Luxury Resort and member of Leading Hotels of the World.  There, he worked his way up to being the Head Chef for royalty, international athletes, movie stars &amp; musicians during their stay at the resort.',
        leftBG: '#262626',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1711495915/Niko/Rectangle_54_lltm3q.png',
        picNote: 'Lagonissi, Attica'
    }
    const slide3 = {
        description: 'In 2011, Chef Kapernaros began teaching at the Culinary Institute of Greece, Anavissos, showcasing the cooking styles of Greek, French, Mediterranean and international cuisines. Chef Kapernaros and team worked closely with the Greek Government and the Council of the European Union on exhibitions featuring Greek cuisine and environmental sustainability.',
        leftBG: '#000000',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1711495906/Niko/Rectangle_52_xrwyz8.png',
        picNote: 'Culinary Institute of Greece, Anavissos, Attica'
    }
    const slide4 = {
        description: 'In 2018, Niko, his wife Pam and daughter Chrysa moved to Chicago. They welcomed their newest member in January 2021, making them a family of four.',
        leftBG: '#262626',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1712186480/Niko/chef-kapernaros.family2_kxxwzi.jpg',
        picNote: ''
    }
    const slide5 = {
        description: 'In June 2018, Chef Niko began carving a new path in the Windy City as Chef de Cuisine at the Hyatt Regency Chicago.',
        leftBG: '#262626',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1712191409/Niko/Untitled_design_14_hjsup9.png',
        picNote: 'Hyatt Regency Chicago'
    }
    const slide6 = {
        description: 'In 2021, he joined the Avli restaurant group and opened Avli on the Park, located in Chicago Lakeshore East, to lead and expand the vision of contemporary Greek cuisine, where everything is made from scratch.',
        leftBG: '#000B4C',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1712191635/Niko/IMG_20210701_161941_808_qdmrcm.jpg',
        picNote: 'Avli on the Park, Lakeshore East, Chicago'
    }
    
    
    const newSlidesList = new slidesList()
    
    // Append slide objects
    newSlidesList.append(slide1)
    newSlidesList.append(slide2)
    newSlidesList.append(slide3)
    newSlidesList.append(slide4)
    newSlidesList.append(slide5)
    newSlidesList.append(slide6)
    
    let carouselElement = document.querySelector('#carousel') as HTMLDivElement

    function showSlide(index: number) {

        const slide = newSlidesList.getSingleSlide(index) as Slide
        carouselElement.innerHTML = `
            <div class="flex singleCarouselSlide">
                <div id="timeline" class="flex flex-column flex-justifyContent-spaceAround">
                    
                    <div id="lineWhite"></div>
                    <div id="circleWhite"></div>
                </div>
                    
                <div id="slideDescription" class="flex flex-column flex-justifyContent-center flex-alignItems-center" style="background-color: ${slide.leftBG}"> 
                    <i id="prevSlide" class="fa-solid fa-chevron-up fontSize40"></i>            
                    <div id="slideText" class="p-20 mx-30" style="border: 1px solid #C4B980">
                        <p class="fontSize18">${slide.description}</p>
                    </div> 
                    <i id="nextSlide" class="fa-solid fa-chevron-down fontSize40"></i>     
                </div>
                <div id="slidePic">
                    <img id="slideImg" class="" src="${slide.rightBG}" alt="">
                    <p class="m-0">${slide.picNote}</p>
                </div>
            </div>
        `
            
        const prevButton = document.getElementById('prevSlide') as HTMLElement
        const nextButton = document.getElementById('nextSlide') as HTMLElement
        const slideImg = document.getElementById('slideImg') as HTMLElement
        const slideText = document.getElementById('slideText') as HTMLElement
        
        prevButton.addEventListener('click', () => moveSlide(-1))
        nextButton.addEventListener('click', () => moveSlide(1))
        
        let timelineElement = document.querySelector('#timeline') as HTMLDivElement
        const lineWhite = document.getElementById('lineWhite') as HTMLElement
        timelineElement.style.background = slide.leftBG

        if (index >= newSlidesList.getLastIndex()) {
            nextButton.style.display = 'none'
            lineWhite.style.height = '50%'
            lineWhite.style.top = '0px'
            lineWhite.style.bottom = ''
            
        } else if (index === 0) {
            prevButton.style.display = 'none'
            lineWhite.style.height = '50%'
            lineWhite.style.bottom = '0px'
            lineWhite.style.top = ''
        } else if (index > 0 && index <= newSlidesList.getLastIndex() ) {
            prevButton.style.display = ''
            nextButton.style.display = ''
            lineWhite.style.height = '100%'
        }
    
        // Animations
        setTimeout(()=>{
            if (slideImg && slideText) {
                slideImg.style.width = '100%'
                slideText.style.scale = '1'
            }
        },200)
    }

    // initial slide showing on first load defined by currentSlideIndex
    showSlide(0)
    let currentSlideIndex = 0

    function moveSlide(n: number) {
        currentSlideIndex = currentSlideIndex + n
        // Wrap the index if it goes out of bounds
        const totalSlides = newSlidesList.getLastIndex()
        if (currentSlideIndex >= totalSlides) {
            currentSlideIndex = totalSlides
        } else if (currentSlideIndex === 0) {
            currentSlideIndex = 0
        }
        
        showSlide(currentSlideIndex)
    }

    console.log('carousel running')
}
  
// Wait for the DOM to fully load before initializing the carousel
document.addEventListener('DOMContentLoaded', function() {
    initCarousel() // Call the initialization function once the DOM is ready
})

  