console.log('hello world')

const hambMenu = document.querySelector('.hamburger-menu') as HTMLElement
const navMenu = document.getElementById('navMenu') as HTMLElement
const navBar = document.querySelector('.navBar') as HTMLElement
const spanToBreak = document.querySelectorAll('.brSm') as NodeListOf<HTMLElement>

hambMenu.addEventListener('click', function() {
    navMenu.classList.toggle('show')
    navMenu.classList.toggle('hide',!navMenu.classList.contains('show'))
    hambMenu.classList.toggle('openHam') 
    navBar.classList.toggle('expand')
})

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
    } else {
        navBar.classList.remove('scrolled')
    }
}

const picAnimation = () => {
    document.querySelectorAll('.bioLandingPicContainer img').forEach(img => {
        if (window.pageYOffset >= 600 && window.pageYOffset < 1650) {
            img.classList.add('in-view')
        } else if (window.pageYOffset < 400 || window.pageYOffset > 1651) {
            img.classList.remove('in-view')
        }
    })
    document.querySelectorAll('.charityLandingPicContainer img').forEach(img => {
        if (window.pageYOffset >= 1950 && window.pageYOffset < 2650) {
            img.classList.add('in-view')
        } else if (window.pageYOffset < 1900 ) {
            img.classList.remove('in-view')
        }
    })

    document.querySelectorAll('.achCards').forEach(img => {
        if (window.pageYOffset > 1450 && window.pageYOffset <= 2400) {
            img.classList.add('in-view')
        } else if (window.pageYOffset < 1100 || window.pageYOffset > 2500) {
            img.classList.remove('in-view')
        }
    })
}

window.addEventListener('resize',navBarAdjToScreen)
navBarAdjToScreen()

window.addEventListener('scroll',() => { 
    // console.log(window.pageYOffset)
    navScrolling() 
    picAnimation()
})
navScrolling()
picAnimation()

console.log('all the time 4 try')