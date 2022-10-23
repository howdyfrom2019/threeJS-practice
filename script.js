const audioResources = document.getElementsByClassName("audio-file");
const playButtons = document.getElementsByClassName("play");
const pauseButtons = document.getElementsByClassName("pause");
const progressTracker = document.getElementById("line");
const sections = document.getElementsByClassName("album");
const navigation = document.getElementsByClassName("circle");
let currPage = 0;
const totalPage = sections.length;

const allMusicStop = (index) => {
  for (let i = 0; i < audioResources.length; i++) {
    const audio = audioResources[i];
    if (audio.readyState < 2) return;
    if (i !== index) {
      audio.pause();
      audio.currentTime = 0;
    }
  }
}

const toggleMusic = (index) => {
  if (audioResources[index].readyState < 2) return;
  allMusicStop(index);
  audioResources[index].volume = 0.5;
  if (audioResources[index].duration > 0 && !audioResources[index].paused) {
    audioResources[index].pause();
    pauseButtons[index].classList.replace("visible", "invisible");
    playButtons[index].classList.replace("invisible", "visible");
  } else {
    audioResources[index].play();
    pauseButtons[index].classList.replace("invisible", "visible");
    playButtons[index].classList.replace("visible", "invisible");
  }
}

const fillProgress = (e) => {
  let currentTime = e.target.currentTime;
  const duration = e.target.duration;
  progressTracker.style.width = Math.floor((currentTime / duration) * 100) + "%";
}

const nextPage = (index) => {
  console.log(navigation);
  for (let i = 0; i < navigation.length; i++) {
    const el = navigation[i];
    el.classList.remove("active");
    sections[i].classList.remove("active");
  }
  navigation[index].classList.add("active");
  sections[index].classList.add("active");
  currPage = index;
}

for (let i = 0; i < playButtons.length; i++) {
  playButtons[i].addEventListener("click", () => toggleMusic(i));
  pauseButtons[i].addEventListener("click", () => toggleMusic(i));
  audioResources[i].addEventListener("timeupdate", fillProgress);
  navigation[i].addEventListener("click", () => nextPage(i));
}
