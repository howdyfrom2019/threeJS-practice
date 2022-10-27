let [windowWidth, windowHeight] = [window.innerWidth, window.innerHeight];

window.onload = () => {
  const cards = document.getElementsByClassName("card");
  const [hitBtn, stayBtn] = document.querySelectorAll("button");

  const cardSetting = () => {
    Array.from(cards).forEach((card, i) => {
      TweenMax.to(card, 1, {
        top : windowHeight / 2 - (i * 40),
        left : windowWidth / 2 + (i * 40 - 200),
        rotation : 0,
        ease : Power3.easeInOut,
        delay : i * .2
      })
    })
  }

  const cardRandom = () => {
    Array.from(cards).forEach((card, i) => {
      TweenMax.to(card, 1, {
        top : Math.random() * windowHeight,
        left : Math.random() * windowWidth,
        rotation : Math.random()*180,
        ease : Power4.easeInOut,
        delay : i * .1
      })
    })
  }

  const resize = () => {
    [windowWidth, windowHeight] = [window.innerWidth, window.innerHeight];
    cardSetting();
  }

  hitBtn.addEventListener("click", () => cardRandom());
  stayBtn.addEventListener("click", () => cardSetting());
  window.addEventListener("resize", () => resize());

}