const musicContainer = document.querySelector('.music-container');
const imageContainer = document.querySelector('.img-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

// song titles 
const songs = ['Bruno Mars - Just The Way You Are', 'Dave - Starlight', 'Dave - Law of Attraction', 'Ed Sheeran - Thinking Out Loud', 'Maroon 5 -  Girls Like You ft cardi B'];


let songIndex = 1;

loadSong(songs[songIndex])

function loadSong(song) {
    title.innerText = song;
    audio.src = `Music/${song}.mp3`
    cover.src = `Images/${song}.jpeg`
}

//play Song 
function playSong() {
    musicContainer.classList.add('play');
    imageContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}
//pause Song
function pauseSong() {
    musicContainer.classList.remove('play');
    imageContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause()
}


function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}


function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        musicContainer.classList.remove('play');
        musicContainer.classList.add('pause');
        pauseSong();
    } else {
        musicContainer.classList.add('play');
        musicContainer.classList.remove('pause');
        playSong();
    }
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)


audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
})

audio.addEventListener('ended', nextSong)