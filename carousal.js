const carousalSlide = document.querySelector('.carousal-slide');
const carousalImageWidth = 940;
const carousalNoOfImages = document.querySelectorAll('.carousal-slide img').length;
const timeDelay = 3000;

let carousalSlideCounter = 0;
let repeat;

function slideCarousal(carousalSlidePosition) {
  carousalSlide.style.transform = `translateX(${-((carousalImageWidth + 10) * carousalSlidePosition)}px)`;
  document.getElementsByName('carousal-radio-btn')[carousalSlidePosition].checked = true;
}

function moveCarousalSlideNext() {
  carousalSlideCounter++;
  if (carousalSlideCounter >= carousalNoOfImages) {
    carousalSlideCounter = 0; // Loop back to the first image
  }
  slideCarousal(carousalSlideCounter);
}

function moveCarousalSlidePrev() {
  carousalSlideCounter--;
  if (carousalSlideCounter < 0) {
    carousalSlideCounter = carousalNoOfImages - 1; // Loop to the last image when going before the first one
  }
  slideCarousal(carousalSlideCounter);
}

function autoChangeCarousalSlide() {
  moveCarousalSlideNext();
  repeat = setTimeout(autoChangeCarousalSlide, timeDelay);
}

// Event listeners
document.getElementsByName('carousal-radio-btn').forEach((elem) => {
  elem.addEventListener('change', function (event) {
    clearTimeout(repeat);
    carousalSlideCounter = event.target.value - 1;
    slideCarousal(carousalSlideCounter);
    repeat = setTimeout(autoChangeCarousalSlide, timeDelay);
  });
});

const carousalNextBtn = document.querySelector('#nextBtn');
carousalNextBtn.addEventListener('click', () => {
  moveCarousalSlideNext();
  clearTimeout(repeat);
  repeat = setTimeout(autoChangeCarousalSlide, timeDelay);
});

const carousalPrevBtn = document.querySelector('#prevBtn');
carousalPrevBtn.addEventListener('click', () => {
  moveCarousalSlidePrev();
  clearTimeout(repeat);
  repeat = setTimeout(autoChangeCarousalSlide, timeDelay);
});

// Initialize Auto Carousal Slider
repeat = setTimeout(autoChangeCarousalSlide, timeDelay);
