
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
        carouselElement.innerHTML = ''
        
        const picture = newPicturesList.getSinglePic(index) as Picture
        if (index < newPicturesList.getLastIndex() && index !== 0) {

            carouselElement.innerHTML = `
                <div id="picShowing" class="flex flex-alignItems-center">
                    <button class="p-20" id="prevPicture">
                        <i class="fa-solid fa-chevron-left fontSize40"></i>
                    </button>
                    <div class="flex flex-justifyContent-center flex-alignItems-center picDiv" >
                        <img class="picToEn" src="${picture.src}">
                    </div>
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
                    <div class="flex flex-justifyContent-center flex-alignItems-center picDiv" >
                        <img class="picToEn" src="${picture.src}">
                    </div>

                    <div class="p-20"></div>
                </div>
            `
        } else if (index === 0) {

            carouselElement.innerHTML = `
                <div id="picShowing" class="flex flex-alignItems-center">
                    <div class="p-20"></div>

                    <div class="flex flex-justifyContent-center flex-alignItems-center  picDiv" >
                        <img class="picToEn" src="${picture.src}">
                    </div>
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

        },150) 
    
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

    document.addEventListener('keydown', function(event) {
        if (event.key === "ArrowLeft") {  // Left arrow key
            movePicture(-1)
        } else if (event.key === "ArrowRight") {  // Right arrow key
            movePicture(1)
        }
    }) 
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
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714608753/Niko/f_f_14_dulpgp.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611082/Niko/f_f_16_i861kj.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611418/Niko/f_f_19_cygdn0.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612983/Niko/f_f_32_jvdutb.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607529/Niko/f_f_11_metou3.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607192/Niko/f_f_9_zacdoe.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,h_1200,c_fill/v1714603600/Niko/f_f_3_ypggwg.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,h_1200,c_fill/v1714604103/Niko/f_f_4_tu7gvz.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,c_fill/v1714604694/Niko/f_f_5_pti2yn.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607390/Niko/f_f_10_y0mfzb.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611192/Niko/f_f_17_dhcths.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611927/Niko/f_f_24_bl55y4.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714613141/Niko/f_f_34_zcya8h.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714613623/Niko/f_f_37_pxhi3p.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715041545/viber_image_2024-05-06_19-19-15-109_gco6hq.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715041545/viber_image_2024-05-06_19-19-34-967_shgs66.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044783/viber_image_2024-05-06_20-09-18-396_erkru4.jpg"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044784/viber_image_2024-05-06_20-12-45-373_xckkgu.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714613295/Niko/f_f_35_zgjzm4.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611315/Niko/f_f_18_nwuxra.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715041546/viber_image_2024-05-06_09-14-52-204_kcwld6.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715041545/viber_image_2024-05-06_19-23-35-469_u0xdb4.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715041545/viber_image_2024-05-06_18-16-04-970_nxefty.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715041545/viber_image_2024-05-06_19-22-41-400_kjycqo.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,h_1200,c_fill/v1714601356/Niko/f_f_2_bpez7h.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714696956/20231222_160947_lzbtfg.jpg"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,h_1200,c_fill/v1714605010/Niko/f_f_6_lapp0q.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714605777/Niko/f_f_7_f2s8zh.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714606635/Niko/f_f_8_lbql67.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607629/Niko/f_f_12_lw4pkp.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607919/Niko/f_f_13_njsqqk.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714610871/Niko/f_f_15_syo3bh.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611504/Niko/f_f_20_yxq3gm.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611614/Niko/f_f_21_n0jrv2.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611684/Niko/f_f_22_agudmu.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611853/Niko/f_f_23_zgxxng.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612087/Niko/f_f_25_oai4zu.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612235/Niko/f_f_26_oi8rbi.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612584/Niko/f_f_28_uvsrep.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612645/Niko/f_f_29_rznm8c.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612758/Niko/f_f_30_le2dkm.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612846/Niko/f_f_31_hetsw8.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714613151/Niko/f_f_33_ke48sd.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714613366/Niko/f_f_36_j484sl.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714613639/Niko/f_f_38_mfwtlr.webp"},


        
    ]

    const growingInGreeceList_src = [
        { src: 'growingInGreeceList'},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618491/Niko/niko-growing%20greece/g_g_17_mrjstu.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714614499/Niko/niko-growing%20greece/g_g_5_qva7un.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714615983/Niko/niko-growing%20greece/g_g_10_h4dbvx.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714614491/Niko/niko-growing%20greece/g_g_4_peo48x.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714616225/Niko/niko-growing%20greece/g_g_12_nw6vmq.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714615676/Niko/niko-growing%20greece/g_g_8_xaopxm.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714615465/Niko/niko-growing%20greece/g_g_7_tyzfaa.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714615279/Niko/niko-growing%20greece/g_g_6_vtni3k.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714616872/Niko/niko-growing%20greece/g_g_15_o0hg55.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715042825/viber_image_2024-05-06_19-45-23-203_zf7az0.jpg"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715042825/viber_image_2024-05-06_19-43-41-114_ysefnx.jpg"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714614484/Niko/niko-growing%20greece/g_g_3_xbjxxr.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715042394/viber_image_2024-05-01_23-10-59-123_qe9moc.jpg"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/w_1100,h_1000,c_fill/v1714614217/Niko/niko-growing%20greece/g_g_1_r7i5t5.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715042558/viber_image_2024-05-06_19-41-34-011_pso3vm.jpg"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715042653/viber_image_2024-05-06_19-42-54-272_boedrs.jpg"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/w_1300,h_900,c_fill/v1714614224/Niko/niko-growing%20greece/g_g_2_myfflq.webp"},
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714617566/Niko/niko-growing%20greece/g_g_16_jrjtzg.webp"},
        
    ]

    const charityEventsList_src = [
        {src:"charityEventsList"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618577/Niko/charity%20events/c_e_5_ybs4do.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618551/Niko/charity%20events/c_e_2_wnpmve.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618559/Niko/charity%20events/c_e_3_wup5of.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618542/Niko/charity%20events/c_e_1_nnx7ps.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618568/Niko/charity%20events/c_e_4_lxljgw.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618586/Niko/charity%20events/c_e_6_jgwge1.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619085/Niko/charity%20events/c_e_7_jvuw9w.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618606/Niko/charity%20events/c_e_8_wskun4.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618751/Niko/charity%20events/c_e_9_afuwys.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618761/Niko/charity%20events/c_e_10_v4gaep.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618771/Niko/charity%20events/c_e_11_ffbduo.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618781/Niko/charity%20events/c_e_12_pdspri.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1715043466/viber_image_2024-05-06_18-16-05-002_fw3f69.jpg"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1715043465/viber_image_2024-05-06_18-16-04-986_pfvada.jpg"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1715043469/viber_image_2024-05-06_19-21-37-845_ffk9gl.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619460/Niko/competitions/c_s_2_tfjvel.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1715043470/viber_image_2024-05-06_19-24-23-920_c1p4hs.jpg"},
    ]
    const competitionShows_src = [
        {src:"competitionShows"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619837/Niko/competitions/c_s_8_a7ucnk.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619857/Niko/competitions/c_s_10_cgzqss.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1715043709/viber_image_2024-05-01_23-12-10-266_s3fepo.jpg"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619451/Niko/competitions/c_s_1_nzov2c.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619771/Niko/competitions/c_s_5_qhlsa1.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619828/Niko/competitions/c_s_6_qbbqox.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619847/Niko/competitions/c_s_9_a90wfg.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044353/viber_image_2024-05-06_20-09-37-226_wcqxyh.jpg"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044354/viber_image_2024-05-06_20-10-02-886_kxyucd.jpg"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044356/viber_image_2024-05-06_20-10-58-696_eaq8r7.jpg"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044357/viber_image_2024-05-06_20-11-37-388_msbjub.jpg"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044360/viber_image_2024-05-06_20-11-49-074_ydicli.jpg"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044481/viber_image_2024-05-06_20-13-05-582_asboxj.jpg"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044483/viber_image_2024-05-06_20-13-28-286_o6c2sf.jpg"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044484/viber_image_2024-05-06_20-13-56-208_gkkp0i.jpg"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044520/viber_image_2024-05-06_20-14-21-324_ehbbdj.jpg"},
        // {src:"AAAAAA"},
    ]
    const onThePass_src = [
        {src:"onThePass"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620128/Niko/on%20the%20pass/o_t_p_4_efmsmz.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620119/Niko/on%20the%20pass/o_t_p_3_wnefgs.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620109/Niko/on%20the%20pass/o_t_p_2_q4hmvq.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620100/Niko/on%20the%20pass/o_t_p_1_va8hpk.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620341/Niko/on%20the%20pass/o_t_p_5_z9bvsq.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620351/Niko/on%20the%20pass/o_t_p_6_abdl2b.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620361/Niko/on%20the%20pass/o_t_p_7_xtkrv7.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620371/Niko/on%20the%20pass/o_t_p_8_f5uqa0.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620536/Niko/on%20the%20pass/o_t_p_9_babbqd.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620546/Niko/on%20the%20pass/o_t_p_10_k8dkae.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620557/Niko/on%20the%20pass/o_t_p_11_spnsd6.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620568/Niko/on%20the%20pass/o_t_p_12_mglkcu.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620784/Niko/on%20the%20pass/o_t_p_13_bs7c0y.webp"},
        {src:"https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620795/Niko/on%20the%20pass/o_t_p_14_f2im1y.webp"},
    ]
    const allSources = [friendsCelebList_src, growingInGreeceList_src, charityEventsList_src, competitionShows_src, onThePass_src]

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

  