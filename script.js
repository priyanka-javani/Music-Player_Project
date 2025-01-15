const playPauseBtn = document.getElementById('play-pause');
const audioPlayer = document.getElementById('audio-player');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let isPlaying = false;

const songs = [
    { title: "Hanuman Chalisa", artist: "by Udit Narayan", file: "song1.mp3", cover: "cover1.jpg" },
    { title: "Ram Siya Ram", artist: " by Ajay-Atul, Parampara Thakur, and Sachet Tandon", file: "song2.mp3", cover: "cover2.jpg" },
    { title: "Ram Aayenge", artist: "by Vishal Mishra", file: "song3.mp3", cover: "cover3.jpg" }
];

let currentSongIndex = 0;

// Load song details
function loadSong(songIndex) {
    const song = songs[songIndex];
    audioPlayer.src = song.file;
    document.getElementById('song-name').textContent = song.title;
    document.getElementById('song-artist').textContent = song.artist;
    document.getElementById('cover').src = song.cover;
    durationDisplay.textContent = formatTime(audioPlayer.duration);
}

// Format time to mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Play/Pause Button
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
});

// Change progress bar
progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

// Next Button
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }
});

// Previous Button
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }
});

// Initial song load
loadSong(currentSongIndex);
