const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"), 
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
progressBar = wrapper.querySelector(".progress-bar");

const endPopup = document.getElementsByClassName("end-popup");
const ipPopup = document.getElementsByClassName("ip-popup");
const loader = document.getElementsByClassName("loader");
const popupButton = document.getElementsByClassName("presave-button");

let loop = false;

do{
    
    $.getJSON("https://api.ipify.org?format=json", function(data) {
        if((Cookies.get('ip') === data.ip) || (typeof(Cookies.get('ip')) === 'string')){
            ipPopup[0].style.display = "block";
            wrapper.style.display = "inline";
            loader[0].style.display = "none";
        }else if ((Cookies.get('ip') === undefined)){
            wrapper.style.display = "inline";
            loader[0].style.display = "none";
        }else{
            loop = true;
        }
    });

}while (loop);

window.addEventListener("load", ()=>{
    musicName.innerText = "cubone";
    musicArtist.innerText = "Tafka";
    musicImg.src = './images/cubone.gif';
    mainAudio.src = './audio/cubone.mp3';
})

function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}


function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}


playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
})

popupButton[0].addEventListener("click", ()=>{
    window.open('https://open.spotify.com/artist/3HAOBK4t6nqZN6zaUE8I9D', '_blank');
})

popupButton[1].addEventListener("click", ()=>{
    window.open('https://open.spotify.com/artist/3HAOBK4t6nqZN6zaUE8I9D', '_blank');
})

mainAudio.addEventListener("timeupdate", (e)=>{

    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");
    mainAudio.addEventListener("loadeddata", ()=>{        

        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    
    });

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

    if (currentSec > 28 && Cookies.get('ip') === undefined ){
        
        $.getJSON("https://api.ipify.org?format=json", function(data) {  
            Cookies.set('ip', data.ip, { expires: 365 , path: '' }); 
        });

    }

    if (mainAudio.ended) {

        endPopup[0].style.display = "block";
        progressBar.style.width = '0%';
        playPauseBtn.querySelector("i").innerText = "play_arrow";
        musicCurrentTime.innerText = "0:00";

    }

});
