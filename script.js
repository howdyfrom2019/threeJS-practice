const audioResources = document.getElementsByClassName("audio-file");
const playButtons = document.getElementsByClassName("play");
const pauseButtons = document.getElementsByClassName("pause");
const progressTracker = document.getElementById("line");
const sections = document.getElementsByClassName("album");
const navigation = document.getElementsByClassName("circle");
const fullPage = document.getElementsByClassName("full-page");
const title = document.getElementsByClassName("song-title")[0];
const singer = document.getElementsByClassName("singer-3")[0];
const highlight = document.getElementsByClassName("song-highlight")[0];
const diskInner = document.getElementsByClassName("disk_inner");

const gradientColor = [
  ["#DF3371", "#25ADDC"],
  ["#13a113", "#00ff00"],
  ["#b10000", "#d59b79"],
  ["#6b3c28", "#a57f5d"],
  ["#cc4b2c", "#ed4c26"],
];
const text = [
  { title: "Gradation", singer: "10cm", highLight: "달콤한 색감이 물들어 조금씩 <br />정신 차렸을 땐 알아볼 수도 없지" },
  { title: "After Like", singer: "IVE", highLight: "아마 꿈만 같겠지만 분명 꿈이 아니야<br/>달리 설명할 수 없는, 이건 사랑일 거야" },
  { title: "Nxde", singer: "(G)I-DLE", highLight: "쉿, yes, I'm a nxde.<br />Yes, I'm a nxde" },
  { title: "STAR WALKIN'", singer: "Lill Nas X", highLight: "Don't ever say it's over<br />if I'm breathing" },
  { title: "I want to", singer: "MINO", highLight: "조명 빛이 넘 밝아도<br />타이밍이 안 좋아도 걍 하고 싶어!" },
]
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

const changeBackgroundColor = () => {
  const background = fullPage[0];
  background.style.background = "linear-gradient(305.74deg,"+ gradientColor[currPage][0] +" 10.26%, "+ gradientColor[currPage][1] + " 92.21%)";
}

const changeText = () => {
  const { title: currTitle, singer: currSinger, highLight: currHighLight } = text[currPage];
  title.innerText = currTitle;
  singer.innerText = currSinger;
  console.log(text[currPage]);
  highlight.innerHTML = currHighLight;
}

const changeDiskColor = () => {
  diskInner[currPage].style.backgroundColor = gradientColor[currPage][0];
}

const nextPage = (index) => {
  for (let i = 0; i < navigation.length; i++) {
    const el = navigation[i];
    el.classList.remove("active");
    sections[i].classList.remove("active");
  }
  navigation[index].classList.add("active");
  sections[index].classList.add("active");
  currPage = index;
  changeBackgroundColor();
  changeText();
  changeDiskColor();
}

for (let i = 0; i < playButtons.length; i++) {
  playButtons[i].addEventListener("click", () => toggleMusic(i));
  pauseButtons[i].addEventListener("click", () => toggleMusic(i));
  audioResources[i].addEventListener("timeupdate", fillProgress);
  navigation[i].addEventListener("click", () => nextPage(i));
}
