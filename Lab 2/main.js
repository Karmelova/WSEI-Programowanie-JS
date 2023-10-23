// notatnik z zajęć
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let imgs = document.querySelectorAll('.carousel-img');
let dots = document.querySelectorAll('.dot');
let totalImgs = imgs.length;
let imgPosition = 0;
const main = document.querySelector('main')

// Event Listeners
next.addEventListener('click', nextImg);
prev.addEventListener('click', prevImg);


// Update Position
function updatePosition (){
    //   Images
      for(let img of imgs){
        img.classList.remove('visible');
        img.classList.add('hidden');
      }
      imgs[imgPosition].classList.remove('hidden');
      imgs[imgPosition].classList.add('visible')
    //   Dots
      for (let dot of dots) {
         dot.className = dot.className.replace(" active", "");
      }
        dots[imgPosition].classList.add('active');
      
    }

// Next Img
function nextImg(){
    if (imgPosition === totalImgs -1){
          imgPosition = 0;
      } else{
          imgPosition++;
      }
      updatePosition();
  }
  //Previous Image
  function prevImg(){
    if (imgPosition === 0){
          imgPosition = totalImgs-1;
      } else{
          imgPosition--;
      }
      updatePosition();
  }

  // Dot Position
dots.forEach((dot, dotPosition) => {
    dot.addEventListener("click", () => {
      imgPosition = dotPosition
      updatePosition(dotPosition)
    })
  })

    // jednorazowe wykonanie kodu po określonym czasie
const timeoutRef = setTimeout(
    () => {
        main.innerHTML = 'Msg from setTimeout'
    },
    2000
)
// wykonywanie kodu co określony czas
let licznik = 0
const intervalRef = setInterval(
    () => {
        main.innerHTML = `Msg from setInterval: ${licznik++}`
    },
    4000
)

// kasujemy setInterval
// clearInterval(intervalRef)

// kasujemy setTimeout
// clearTimeout(intervalRef)


// window.requestAnimationFrame