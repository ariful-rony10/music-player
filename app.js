const musicContainer = document.querySelector('.music-container')
const playButton = document.querySelector('#play-button')
const previousButton = document.querySelector('#previous-button')
const nextButton = document.querySelector('#next-button')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#music-cover')

// Song title
const songs = ['hey', 'summer', 'ukulele']
// Keep track of the song
let songIndex = 2;
// Initially load song into the dom
loadSong(songs[songIndex])
// Update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `musics/${song}.mp3`;
    cover.src = `images/${song}.jpeg`;
}
function playSong() {
    musicContainer.classList.add('play')
    playButton.querySelector('i.fas').classList.remove('fa-play')
    playButton.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}
function pauseSong() {
    musicContainer.classList.remove('play')
    playButton.querySelector('i.fas').classList.add('fa-play')
    playButton.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}
function previousSong() {
    songIndex--
    if(songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}
function nextSong() {
    songIndex++
    if(songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// Event listeners
playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})
// Change song events
previousButton.addEventListener('click', previousSong)
nextButton.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)