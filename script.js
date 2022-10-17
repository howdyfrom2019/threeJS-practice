let audioResources = document.getElementsByClassName("audio-file");
audioResources[0].volume = 0.5;
setTimeout(() => {
  audioResources[0].play();
}, 1000);
