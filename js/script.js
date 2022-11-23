const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"), 
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
playPauseBtnIcon = wrapper.querySelector(".play-pause i");

const popup = document.getElementsByClassName("popup");
const loader = document.getElementsByClassName("loader");
const popupButton = document.getElementsByClassName("presave-button");

let loop = false;

do{
    $.getJSON("https://api.ipify.org?format=json", function(data) {
        if((Cookies.get('ip') === data.ip) || (typeof(Cookies.get('ip')) === 'string')){
            popup[0].style.display = "block";
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

mainAudio.addEventListener("timeupdate", (e)=>{

    const currentTime = e.target.currentTime;

    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){
        currentSec = `0${currentSec}`;
    }

    if (currentSec > 28 && Cookies.get('ip') === undefined ){
        
        $.getJSON("https://api.ipify.org?format=json", function(data) {  
            Cookies.set('ip', data.ip, { expires: 365 , path: '' }); 
        });

    }

    if (mainAudio.ended) {

        popup[0].style.display = "block";
        playPauseBtn.querySelector("i").innerText = "play_arrow";

    }

});
