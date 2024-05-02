var singlePic = /** @class */ (function () {
    function singlePic(data) {
        this.data = data;
        this.next = null;
    }
    return singlePic;
}());
var picCollection = /** @class */ (function () {
    function picCollection(id) {
        this.head = null;
        this.tail = null;
        this.id = id;
    }
    picCollection.prototype.append = function (data) {
        var newSinglePic = new singlePic(data);
        if (!this.head) {
            this.head = newSinglePic;
            this.tail = newSinglePic;
        }
        else if (this.tail) {
            this.tail.next = newSinglePic;
            this.tail = newSinglePic;
        }
    };
    picCollection.prototype.getSinglePic = function (index) {
        var currentSinglePic = this.head;
        var count = 0;
        // if currentSinglePic === null means that the while loop reached the end of the list because it will replace the currentPicture with is next currentSinglePic = currentSinglePic.next
        while (currentSinglePic !== null) {
            if (count === index)
                return currentSinglePic.data;
            count++;
            currentSinglePic = currentSinglePic.next;
        }
        return null;
    };
    picCollection.prototype.getLastIndex = function () {
        var currentSinglePic = this.head;
        var count = 0;
        while (currentSinglePic !== null) {
            count++;
            currentSinglePic = currentSinglePic.next;
        }
        return count - 1;
    };
    return picCollection;
}());
function initPicCollection(newPicturesList, collection) {
    var bigPic = document.querySelector("#bigPic");
    var carouselElement = bigPic.querySelector("#singlePicCont");
    carouselElement.innerHTML = '';
    var first = collection.shift();
    if (!newPicturesList.head) {
        collection.forEach(function (picture) { newPicturesList.append(picture); });
    }
    function showPicture(index) {
        var picture = newPicturesList.getSinglePic(index);
        if (index < newPicturesList.getLastIndex() && index !== 0) {
            carouselElement.innerHTML = "\n                <div id=\"picShowing\" class=\"flex flex-alignItems-center\">\n                    <button class=\"p-20\" id=\"prevPicture\">\n                        <i class=\"fa-solid fa-chevron-left fontSize40\"></i>\n                    </button>\n                    <div class=\"flex flex-justifyContent-center flex-alignItems-center\" style=\"width: 500px; height: 66vh; background-color: #FFF\">\n                        <img class=\"picToEn\" src=\"".concat(picture.src, "\">\n                    </div>\n                    <button class=\"p-20\" id=\"nextPicture\">\n                        <i class=\"fa-solid fa-chevron-right fontSize40\"></i>\n                    </button>\n                </div>\n            ");
        }
        else if (index === newPicturesList.getLastIndex()) {
            carouselElement.innerHTML = "\n                <div id=\"picShowing\" class=\"flex flex-alignItems-center\">\n                    <button class=\"p-20\" id=\"prevPicture\">\n                        <i class=\"fa-solid fa-chevron-left fontSize40\"></i>\n                    </button>\n                    <div class=\"flex flex-justifyContent-center flex-alignItems-center\" style=\"width: 500px; height: 66vh; background-color: #FFF\">\n                        <img class=\"picToEn\" src=\"".concat(picture.src, "\">\n                    </div>\n\n                    <button class=\"p-20\" id=\"nextPicture\"></button>\n                </div>\n            ");
        }
        else if (index === 0) {
            carouselElement.innerHTML = "\n                <div id=\"picShowing\" class=\"flex flex-alignItems-center\">\n                    <button class=\"p-20\" id=\"prevPicture\"></button>\n\n                    <div class=\"flex flex-justifyContent-center flex-alignItems-center\" style=\"width: 500px; height: 66vh; background-color: #FFF\">\n                        <img class=\"picToEn\" src=\"".concat(picture.src, "\">\n                    </div>\n                    <button class=\"p-20\" id=\"nextPicture\">\n                        <i class=\"fa-solid fa-chevron-right fontSize40\"></i>\n                    </button>\n                </div>\n            ");
        }
        setTimeout(function () {
            var imgs = carouselElement.querySelector('img');
            var imgShowing = carouselElement.querySelector('#picShowing');
            imgs.classList.add('show');
            imgs.addEventListener('click', function () {
                imgs.requestFullscreen();
                imgShowing.classList.add('fullscreen-mode');
            });
            document.addEventListener('fullscreenchange', function () {
                if (!document.fullscreenElement) {
                    imgShowing.classList.remove('fullscreen-mode');
                }
            });
        }, 150);
        var prevButton = document.getElementById('prevPicture');
        var nextButton = document.getElementById('nextPicture');
        if (prevButton) {
            prevButton.addEventListener('click', function () { movePicture(-1); });
        }
        if (nextButton) {
            nextButton.addEventListener('click', function () { movePicture(1); });
        }
    }
    // initial Picture showing on first load defined by currentPictureIndex
    showPicture(0);
    var currentPictureIndex = 0;
    function movePicture(n) {
        currentPictureIndex = currentPictureIndex + n;
        // Wrap the index if it goes out of bounds
        var totalPictures = newPicturesList.getLastIndex();
        if (currentPictureIndex >= totalPictures) {
            currentPictureIndex = totalPictures;
        }
        else if (currentPictureIndex === 0) {
            currentPictureIndex = 0;
        }
        showPicture(currentPictureIndex);
    }
    document.addEventListener('keydown', function (event) {
        if (event.key === "ArrowLeft") { // Left arrow key
            movePicture(-1);
        }
        else if (event.key === "ArrowRight") { // Right arrow key
            movePicture(1);
        }
    });
    collection.unshift(first);
    console.log('carousel running 1');
}
// Wait for the DOM to fully load before initializing the carousel
document.addEventListener('DOMContentLoaded', function () {
    var friendsCelebList = new picCollection('friendsCelebList');
    var growingInGreeceList = new picCollection('growingInGreeceList');
    var charityEventsList = new picCollection('charityEventsList');
    var competitionShows = new picCollection('competitionShows');
    var onThePass = new picCollection('onThePass');
    var allLists = [
        friendsCelebList,
        growingInGreeceList,
        charityEventsList,
        competitionShows,
        onThePass
    ];
    var friendsCelebList_src = [
        { src: 'friendsCelebList' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,h_1200,c_fill/v1714601166/Niko/friends_celeb_1_ydwv20.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,h_1200,c_fill/v1714601356/Niko/f_f_2_bpez7h.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,h_1200,c_fill/v1714603600/Niko/f_f_3_ypggwg.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,h_1200,c_fill/v1714604103/Niko/f_f_4_tu7gvz.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,c_fill/v1714604694/Niko/f_f_5_pti2yn.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_80,w_800,h_1200,c_fill/v1714605010/Niko/f_f_6_lapp0q.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714605777/Niko/f_f_7_f2s8zh.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714606635/Niko/f_f_8_lbql67.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607192/Niko/f_f_9_zacdoe.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607390/Niko/f_f_10_y0mfzb.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607529/Niko/f_f_11_metou3.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607629/Niko/f_f_12_lw4pkp.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714607919/Niko/f_f_13_njsqqk.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714608753/Niko/f_f_14_dulpgp.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714610871/Niko/f_f_15_syo3bh.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611082/Niko/f_f_16_i861kj.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611192/Niko/f_f_17_dhcths.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611315/Niko/f_f_18_nwuxra.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611418/Niko/f_f_19_cygdn0.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611504/Niko/f_f_20_yxq3gm.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611614/Niko/f_f_21_n0jrv2.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611684/Niko/f_f_22_agudmu.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611853/Niko/f_f_23_zgxxng.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714611927/Niko/f_f_24_bl55y4.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612087/Niko/f_f_25_oai4zu.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612235/Niko/f_f_26_oi8rbi.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612392/Niko/f_f_27_uzpolq.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612584/Niko/f_f_28_uvsrep.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612645/Niko/f_f_29_rznm8c.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612758/Niko/f_f_30_le2dkm.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612846/Niko/f_f_31_hetsw8.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714612983/Niko/f_f_32_jvdutb.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714613151/Niko/f_f_33_ke48sd.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714613141/Niko/f_f_34_zcya8h.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714613295/Niko/f_f_35_zgjzm4.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714613366/Niko/f_f_36_j484sl.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714613623/Niko/f_f_37_pxhi3p.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714613639/Niko/f_f_38_mfwtlr.webp" },
    ];
    var growingInGreeceList_src = [
        { src: 'growingInGreeceList' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714614499/Niko/niko-growing%20greece/g_g_5_qva7un.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714615983/Niko/niko-growing%20greece/g_g_10_h4dbvx.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714616134/Niko/niko-growing%20greece/g_g_11_sxxf3p.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714614491/Niko/niko-growing%20greece/g_g_4_peo48x.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714615869/Niko/niko-growing%20greece/g_g_9_dxdqpz.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714616225/Niko/niko-growing%20greece/g_g_12_nw6vmq.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714615676/Niko/niko-growing%20greece/g_g_8_xaopxm.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714615465/Niko/niko-growing%20greece/g_g_7_tyzfaa.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714615279/Niko/niko-growing%20greece/g_g_6_vtni3k.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714614484/Niko/niko-growing%20greece/g_g_3_xbjxxr.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/w_1100,h_1000,c_fill/v1714614217/Niko/niko-growing%20greece/g_g_1_r7i5t5.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/w_1300,h_900,c_fill/v1714614224/Niko/niko-growing%20greece/g_g_2_myfflq.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714616486/Niko/niko-growing%20greece/g_g_14_jcxgcs.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714616872/Niko/niko-growing%20greece/g_g_15_o0hg55.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714617566/Niko/niko-growing%20greece/g_g_16_jrjtzg.webp" },
    ];
    var charityEventsList_src = [
        { src: "charityEventsList" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618542/Niko/charity%20events/c_e_1_nnx7ps.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618551/Niko/charity%20events/c_e_2_wnpmve.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618559/Niko/charity%20events/c_e_3_wup5of.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618568/Niko/charity%20events/c_e_4_lxljgw.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618577/Niko/charity%20events/c_e_5_ybs4do.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618586/Niko/charity%20events/c_e_6_jgwge1.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619085/Niko/charity%20events/c_e_7_jvuw9w.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618606/Niko/charity%20events/c_e_8_wskun4.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618751/Niko/charity%20events/c_e_9_afuwys.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618761/Niko/charity%20events/c_e_10_v4gaep.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618771/Niko/charity%20events/c_e_11_ffbduo.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618781/Niko/charity%20events/c_e_12_pdspri.webp" },
    ];
    var competitionShows_src = [
        { src: "competitionShows" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619451/Niko/competitions/c_s_1_nzov2c.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619460/Niko/competitions/c_s_2_tfjvel.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619469/Niko/competitions/c_s_3_etu3kj.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619478/Niko/competitions/c_s_4_rptc6s.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619771/Niko/competitions/c_s_5_qhlsa1.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619828/Niko/competitions/c_s_6_qbbqox.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619837/Niko/competitions/c_s_8_a7ucnk.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619847/Niko/competitions/c_s_9_a90wfg.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619857/Niko/competitions/c_s_10_cgzqss.webp" }
    ];
    var onThePass_src = [
        { src: "onThePass" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620128/Niko/on%20the%20pass/o_t_p_4_efmsmz.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620119/Niko/on%20the%20pass/o_t_p_3_wnefgs.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620109/Niko/on%20the%20pass/o_t_p_2_q4hmvq.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620100/Niko/on%20the%20pass/o_t_p_1_va8hpk.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620341/Niko/on%20the%20pass/o_t_p_5_z9bvsq.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620351/Niko/on%20the%20pass/o_t_p_6_abdl2b.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620361/Niko/on%20the%20pass/o_t_p_7_xtkrv7.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620371/Niko/on%20the%20pass/o_t_p_8_f5uqa0.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620536/Niko/on%20the%20pass/o_t_p_9_babbqd.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620546/Niko/on%20the%20pass/o_t_p_10_k8dkae.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620557/Niko/on%20the%20pass/o_t_p_11_spnsd6.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620568/Niko/on%20the%20pass/o_t_p_12_mglkcu.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620784/Niko/on%20the%20pass/o_t_p_13_bs7c0y.webp" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620795/Niko/on%20the%20pass/o_t_p_14_f2im1y.webp" },
    ];
    var allSources = [friendsCelebList_src, growingInGreeceList_src, charityEventsList_src, competitionShows_src, onThePass_src];
    var allNotActiveTi = document.querySelectorAll('.secTitles');
    allNotActiveTi.forEach(function (listEl) {
        listEl.addEventListener('click', function () {
            allNotActiveTi = document.querySelectorAll('.secTitles');
            var picColl = allLists.filter(function (list) { return list.id === listEl.id; });
            var picSource = allSources.filter(function (list) { return list[0].src === listEl.id; });
            initPicCollection(picColl[0], picSource[0]);
        });
    });
    allNotActiveTi[0].click();
});
