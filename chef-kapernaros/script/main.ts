console.log('hello world')

const hambMenu = document.querySelector('.hamburger-menu') as HTMLElement
const navMenu = document.getElementById('navMenu') as HTMLElement
const navBar = document.querySelector('.navBar') as HTMLElement
const spanToBreak = document.querySelectorAll('.brSm') as NodeListOf<HTMLElement>
const socialMedia = document.querySelector('#socialMedia') as HTMLElement

if (hambMenu) {
    hambMenu.addEventListener('click', function() {
        navMenu.classList.toggle('show')
        navMenu.classList.toggle('hide',!navMenu.classList.contains('show'))
        hambMenu.classList.toggle('openHam') 
        navBar.classList.toggle('expand')
    })
}

const navBarAdjToScreen = () => {
    
    if (window.innerWidth < 750 && navBar.classList.contains('biggerScreen')) {
       
        navBar.classList.add('mobileView')
        navBar.classList.remove('biggerScreen')
        spanToBreak.forEach(el => {
            if (!el.firstChild || el.firstChild.nodeName !== 'BR') {
                const brEl = document.createElement('br')
                el.prepend(brEl)
            }
        })
    } else if (window.innerWidth >= 750 && !navBar.classList.contains('biggerScreen')) {
        
        navBar.classList.remove('mobileView')
        navBar.classList.add('biggerScreen')
        spanToBreak.forEach(el => {
            if (el.firstChild && el.firstChild.nodeName === 'BR') {
                el.removeChild(el.firstChild)
            }
        })
    }
}

const navScrolling = ()=>{
    if (window.pageYOffset > 30) {
        navBar.classList.add('scrolled')
        if (socialMedia) socialMedia.classList.remove('hide')
        
    } else {
        if (!navBar.classList.contains('scrolledAlways')) {
            navBar.classList.remove('scrolled')
            if (socialMedia) socialMedia.classList.add('hide')
        }
    }
}

const picAnimation = () => {
    document.querySelectorAll('.bioLandingPicContainer img').forEach(img => {
        if (window.pageYOffset >= 600) {
            img.classList.add('in-view')
        } else if (window.pageYOffset < 500) {
            img.classList.remove('in-view')
        }
    })
    document.querySelectorAll('.achCards').forEach(img => {
        if (window.innerWidth < 770) {
            if (window.pageYOffset > 1000) {
                img.classList.add('in-view')
            } else if (window.pageYOffset < 950) {
                img.classList.remove('in-view')
            }

        } else {

            if (window.pageYOffset > 1250) {
                img.classList.add('in-view')
            } else if (window.pageYOffset < 1150) {
                img.classList.remove('in-view')
            }
        }
    })
    document.querySelectorAll('.charityLandingPicContainer img').forEach(img => {
        if (window.pageYOffset >= 1950) {
            img.classList.add('in-view')
        } else if (window.pageYOffset < 1850) {
            img.classList.remove('in-view')
        }
    })
}

window.addEventListener('resize',navBarAdjToScreen)
navBarAdjToScreen()

window.addEventListener('scroll',() => { 
    navScrolling() 
    picAnimation()
})
navScrolling()
picAnimation()

const container = document.querySelector('#bigPic') as HTMLDivElement
let allNotActiveTitles = document.querySelectorAll('.secTitles') as NodeListOf<HTMLLIElement>

allNotActiveTitles.forEach( listEl => {
    listEl.addEventListener('click', () => {
        allNotActiveTitles = document.querySelectorAll('.secTitles') as NodeListOf<HTMLLIElement>

        if (!listEl.classList.contains('active')) {
            const titleActive = [...allNotActiveTitles].filter(el => el.classList.contains('active'))[0]
            titleActive.classList.remove('active')
            listEl.classList.add('active')
        }
    })
})

declare var emailjs: any
emailjs.init('0wA6kpUaumn2FNdbg')
const messageSent = document.querySelector('#messageSent') as HTMLElement
const inputText = document.querySelectorAll('.inputText') as NodeListOf <HTMLInputElement>
const inputTextSelect = document.querySelectorAll('select.inputText') as  NodeListOf<HTMLSelectElement>

document.getElementById('myForm')?.addEventListener('submit', function(event) {
    event.preventDefault() // Prevent the default form submission
    emailjs.sendForm('service_m5a5vcb', 'template_1jfyvjh', this)
    .then(function(response: any) {
        messageSent.classList.remove('hide')
        inputText.forEach(text => text.value= '')
        inputTextSelect.forEach(text => text.value= 'Select One')
        console.log('SUCCESS!', response.status, response.text)
        setTimeout(()=>{ messageSent.classList.add('hide') }, 5000)
    }, function(error: any) {
        console.log('FAILED...', error)
        alert("Failed to send email.")
    })
})


// Setting a cookie with SameSite=Lax
document.cookie = "key=value; SameSite=Lax";
