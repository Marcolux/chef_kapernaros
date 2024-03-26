// Define your linked list, node classes, and any other necessary data structures
interface Slide {
    description: string
    leftBG: string
    rightBG: string
}

class singleSlide {
    data: Slide // Consider using a more specific type based on what your singleSlides will store
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
        } else if (this.tail) { // Tail is not null if the list isn't empty
            this.tail.next = newSingleSlide
            this.tail = newSingleSlide
        }
    }
    
    getSingleSlide(index: number): Slide | null { // Consider a more specific return type
        let currentSingleSlide = this.head
        let count = 0
        while (currentSingleSlide !== null) {
            if (count === index) return currentSingleSlide.data
            count++
            currentSingleSlide = currentSingleSlide.next
        }
        return null
    }
}


  
// Define functions for carousel functionality
function initCarousel() {
    const slide1 = {
        description: 'Born and raised in Piraeus, Greece, Chef Nikolaos Kapernaros began his career studying at the Greek Culinary Institute &amp; working on islands such as Rhodes, Kos and Crete.',
        leftBG: '#000B4C',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1709573633/Kapernaros_middle_pic_3_kqhnrm.png'
    }
    const slide2 = {
        description: 'description 2',
        leftBG: '#262626',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1709578128/Kapernaros_bio_landing_1_lprh8i.png'
    }
    const slide3 = {
        description: 'description 3',
        leftBG: '#000000',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1709578128/Kapernaros_bio_landing_2_wn33pg.png'
    }
    const slide4 = {
        description: 'description 4',
        leftBG: '#262626',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1709578128/Kapernaros_bio_landing_3_sd75kp.png'
    }
    const slide5 = {
        description: 'description 5',
        leftBG: '#000B4C',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1709578127/Kapernaros_bio_landing_4_l6yclh.png'
    }
    
    const newSlidesList = new slidesList()
    
    // Append slide objects
    newSlidesList.append(slide1)
    newSlidesList.append(slide2)
    newSlidesList.append(slide3)
    newSlidesList.append(slide4)
    newSlidesList.append(slide5)
    
    let carouselElement = document.querySelector('#carousel') as HTMLDivElement
    let timelineElement = document.querySelector('#timeline') as HTMLDivElement
    const prevButton = document.getElementById('prevSlide') as HTMLButtonElement
    const nextButton = document.getElementById('nextSlide') as HTMLButtonElement
    const lineWhite = document.getElementById('lineWhite') as HTMLButtonElement


    function showSlide(index: number) {
        console.log(index)
        carouselElement.innerHTML = ``
        const slide = newSlidesList.getSingleSlide(index) as Slide
    
            carouselElement.innerHTML = `
                <div class="flex singleCarouselSlide">
                    <div id="slideDescription" class="flex flex-column flex-justifyContent-spaceAround" style="background-color: ${slide.leftBG}">              
                        <div class="p-20 m-20" style="border: 1px solid #C4B980">
                            <p class="fontSize18">${slide.description}</p>
                        </div>       
                    </div>
                    <div id="slidePic">
                        <img class="" src="${slide.rightBG}" alt="">
                    </div>
                </div>
            `
            timelineElement.style.background = slide.leftBG

            if (index >= 4) {
                nextButton.style.display = 'none'
                lineWhite.style.height = '50%'
                lineWhite.style.top = '0px'
                lineWhite.style.bottom = ''
                
            } else if (index === 0) {
                prevButton.style.display = 'none'
                lineWhite.style.height = '50%'
                lineWhite.style.bottom = '0px'
                lineWhite.style.top = ''
            } else if (index > 0 && index <= 4 ) {
                prevButton.style.display = ''
                nextButton.style.display = ''
                lineWhite.style.height = '100%'
                
    
            }
    }
    showSlide(0)

    
    let currentSlideIndex = 0
    function moveSlide(n: number) {
        currentSlideIndex = currentSlideIndex + n
        // Wrap the index if it goes out of bounds
        const totalSlides = 4
        if (currentSlideIndex >= totalSlides) {
            currentSlideIndex = totalSlides
        } else if (currentSlideIndex === 0) {
            currentSlideIndex = 0
        }
        
        showSlide(currentSlideIndex)
    }


    prevButton.addEventListener('click', () => moveSlide(-1))
    nextButton.addEventListener('click', () => moveSlide(1))

    console.log('carousel running')
}
  
// Wait for the DOM to fully load before initializing the carousel
document.addEventListener('DOMContentLoaded', function() {
    initCarousel() // Call the initialization function once the DOM is ready
})

  