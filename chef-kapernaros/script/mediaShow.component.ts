
interface Picture {
    src: string
}

class singlePic {
    data: Picture 
    next: singlePic | null
  
    constructor(data: any) {
      this.data = data
      this.next = null
    }
}
  
class picCollection {
    
    head: singlePic | null
    tail: singlePic | null
    id: string
    
    constructor(id: string) {
        this.head = null
        this.tail = null
        this.id = id
    }
    
    append(data: Picture): void {
        const newSinglePic = new singlePic(data)
        if (!this.head) {
            this.head = newSinglePic
            this.tail = newSinglePic
        } else if (this.tail) { 
            this.tail.next = newSinglePic
            this.tail = newSinglePic
        }
    }
    
    getSinglePic(index: number): Picture | null { 
        let currentSinglePic = this.head
        let count = 0
        // if currentSinglePic === null means that the while loop reached the end of the list because it will replace the currentPicture with is next currentSinglePic = currentSinglePic.next
        while (currentSinglePic !== null) {
            if (count === index) return currentSinglePic.data
            count++
            currentSinglePic = currentSinglePic.next
        }
        return null
    }

    getLastIndex(): number { 
        let currentSinglePic = this.head
        let count = 0
        
        while (currentSinglePic !== null) {  
            count++
            currentSinglePic = currentSinglePic.next
        }
        return count - 1
    }
}

function initPicCollection(newPicturesList: picCollection, collection: Picture[]) {


    let bigPic = document.querySelector(`#bigPic`) as HTMLDivElement
    let carouselElement = bigPic.querySelector(`#singlePicCont`) as HTMLDivElement
    carouselElement.innerHTML = ''
    let first = collection.shift() as Picture

    if (!newPicturesList.head) {
        collection.forEach(picture => { newPicturesList.append(picture) })
    }


    function showPicture(index: number) {

        const picture = newPicturesList.getSinglePic(index) as Picture

        if (index < newPicturesList.getLastIndex() && index !== 0) {

            carouselElement.innerHTML = `
                <div id="picShowing" class="flex flex-alignItems-center">
                    <button class="p-20" id="prevPicture">
                        <i class="fa-solid fa-chevron-left fontSize40"></i>
                    </button>
                    <img class="picToEn" src="${picture.src}">
                    <button class="p-20" id="nextPicture">
                        <i class="fa-solid fa-chevron-right fontSize40"></i>
                    </button>
                </div>
            `
        } else if ( index === newPicturesList.getLastIndex()) {
            carouselElement.innerHTML = `
                <div id="picShowing" class="flex flex-alignItems-center">
                    <button class="p-20" id="prevPicture">
                        <i class="fa-solid fa-chevron-left fontSize40"></i>
                    </button>
                    <img class="picToEn" src="${picture.src}">

                    <button class="p-20" id="nextPicture"></button>
                </div>
            `
        } else if (index === 0) {

            carouselElement.innerHTML = `
                <div id="picShowing" class="flex flex-alignItems-center">
                    <button class="p-20" id="prevPicture"></button>

                    <img class="picToEn" src="${picture.src}">
                    <button class="p-20" id="nextPicture">
                        <i class="fa-solid fa-chevron-right fontSize40"></i>
                    </button>
                </div>
            `
        }
        setTimeout(()=>{

            const imgs = carouselElement.querySelector('img') as HTMLImageElement
            const imgShowing = carouselElement.querySelector('#picShowing') as HTMLImageElement
            imgs.classList.add('show')
            imgs.addEventListener('click', function() {
                imgs.requestFullscreen()
                imgShowing.classList.add('fullscreen-mode')
            })

            document.addEventListener('fullscreenchange', () => {
                if (!document.fullscreenElement) { imgShowing.classList.remove('fullscreen-mode')  }
            })    
        },350)
    
        const prevButton = document.getElementById('prevPicture') as HTMLElement
        const nextButton = document.getElementById('nextPicture') as HTMLElement
        
        if (prevButton) {
            prevButton.addEventListener('click', () => { movePicture(-1) })
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => { movePicture(1) })
        }
    }

    // initial Picture showing on first load defined by currentPictureIndex
    showPicture(0)
    let currentPictureIndex = 0

    function movePicture(n: number) {
        currentPictureIndex = currentPictureIndex + n
        // Wrap the index if it goes out of bounds
        const totalPictures = newPicturesList.getLastIndex()
        if (currentPictureIndex >= totalPictures) {
            currentPictureIndex = totalPictures
        } else if (currentPictureIndex === 0) {
            currentPictureIndex = 0
        }
        
        showPicture(currentPictureIndex)
    }
    collection.unshift(first)
    console.log('carousel running 1')
}
  
// Wait for the DOM to fully load before initializing the carousel
document.addEventListener('DOMContentLoaded', function() {

    const friendsCelebList = new picCollection('friendsCelebList')
    const growingInGreeceList = new picCollection('growingInGreeceList')
    const charityEventsList = new picCollection('charityEventsList')
    const competitionShows = new picCollection('competitionShows')
    const onThePass = new picCollection('onThePass')

    const allLists: picCollection[] = [
        friendsCelebList,
        growingInGreeceList,
        charityEventsList,
        competitionShows,
        onThePass
    ]

    const friendsCelebList_src = [
        { src: 'friendsCelebList'},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,h_1200,c_fill/v1714601166/Niko/friends_celeb_1_ydwv20.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,h_1200,c_fill/v1714601356/Niko/f_f_2_bpez7h.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,h_1200,c_fill/v1714603600/Niko/f_f_3_ypggwg.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,h_1200,c_fill/v1714604103/Niko/f_f_4_tu7gvz.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,c_fill/v1714604694/Niko/f_f_5_pti2yn.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,h_1200,c_fill/v1714605010/Niko/f_f_6_lapp0q.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714605777/Niko/f_f_7_f2s8zh.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714606635/Niko/f_f_8_lbql67.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607192/Niko/f_f_9_zacdoe.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607390/Niko/f_f_10_y0mfzb.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607529/Niko/f_f_11_metou3.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607629/Niko/f_f_12_lw4pkp.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607919/Niko/f_f_13_njsqqk.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714608753/Niko/f_f_14_dulpgp.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609169/Niko/IMG_20220409_014025_756_hdxn1q.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609175/Niko/IMG_20230427_014541_976_v4l2dq.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609182/Niko/IMG_20230427_014541_962_jjyubs.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609188/Niko/IMG_20211013_232202_678_mba28l.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609195/Niko/IMG_20230427_014542_012_mgyxej.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609202/Niko/chef-kapernaros.pic1_kfa6q4.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609208/Niko/0-02-01-d1cbb862e95655f9de70c014b3d5de577f5f7d7e254eb68fd8faac49e4117cc7_32f11885e251badf_pnyuja.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609216/Niko/0-02-01-da1f1307d893546b9ff70b3a7ff23d99510b9fc61b81d29b80b1f83c2aa6a2ea_21ef0346a984fe60_fjxmk3.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609224/Niko/IMG_20211030_233514_527_gcowcm.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609231/Niko/IMG_20190619_110847_219_uaeq7y.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609238/Niko/IMG_20230427_094628_086_tluaxx.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609247/Niko/IMG_20220506_140708_077_vs0ipp.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609255/Niko/IMG_20220716_124026_531_i7ojsm.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609260/Niko/IMG_20230313_231738_057_cc62mi.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609268/Niko/IMG_20231015_235042_366_lc5jdz.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609282/Niko/IMG_20230427_014542_180_sr3c1i.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609289/Niko/IMG_20231015_235041_946_spkz2f.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714609298/Niko/IMG_20230430_093533_025_s1tzgr.webp"},
        { src: "AAAAAA"},
        { src: "AAAAAA"},
        { src: "AAAAAA"},


        
    ]

    const growingInGreeceList_src = [
        { src: 'growingInGreeceList'},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714588368/viber_image_2024-04-03_18-24-05-958_exnogl.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714588373/viber_image_2024-04-03_18-24-06-061_vu6r6n.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714588359/chef-kapernaros.growing-3_qky1ka.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714588359/chef-kapernaros.growing-2_ynixxn.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714588359/chef-kapernaros.growing-1_wuqge2.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714588367/viber_image_2024-04-03_18-24-05-864_y2iddp.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714588368/viber_image_2024-04-03_18-24-05-883_khfhow.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714588360/DSC_0832_pdjreg.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714588360/received_10154563095763189_jtd9qj.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714588360/received_1283942424950699_lqddle.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714588360/DSC_0664_hhhg9j.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714588360/FB_IMG_1586845370822_fxplne.webp"},
        
    ]
    const allSources = [friendsCelebList_src ,growingInGreeceList_src]

    

    let allNotActiveTi = document.querySelectorAll('.secTitles') as NodeListOf<HTMLLIElement>
    allNotActiveTi.forEach( listEl => {
        listEl.addEventListener('click', () => {
            allNotActiveTi = document.querySelectorAll('.secTitles') as NodeListOf<HTMLLIElement>
            const picColl = allLists.filter(list => list.id === listEl.id) 
            const picSource = allSources.filter(list => list[0].src === listEl.id)
            initPicCollection(picColl[0], picSource[0])
        })
    })
    allNotActiveTi[0].click()
})

  