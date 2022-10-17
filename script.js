const audioResources = document.getElementsByClassName("audio-file");
const playButtons = document.getElementsByClassName("play");
const pauseButtons = document.getElementsByClassName("pause");
const progressTracker = document.getElementById("line");

const toggleMusic = (index) => {
  setTimeout(() => {
    audioResources[index].volume = 0.4;
    if (audioResources[index].duration > 0 && !audioResources[index].paused) {
      audioResources[index].pause();
      pauseButtons[index].classList.replace("visible", "invisible");
      playButtons[index].classList.replace("invisible", "visible");
    } else {
      audioResources[index].play();
      pauseButtons[index].classList.replace("invisible", "visible");
      playButtons[index].classList.replace("visible", "invisible");
    }
  }, 200);
}

const fillProgress = (e) => {
  let currentTime = e.target.currentTime;
  const duration = e.target.duration;
  progressTracker.style.width = Math.floor((currentTime / duration) * 100) + "%";
}

playButtons[0].addEventListener("click", () => toggleMusic(0));
pauseButtons[0].addEventListener("click", () => toggleMusic(0));
audioResources[0].addEventListener("timeupdate", fillProgress);