
$('form').submit(function () {
   setTimeout(function () {
      +$('#search').val();
   }, 100);
});

// Canvas animation
// DOM selectors
const stars = document.getElementById("stars");
const starsCtx = stars.getContext("2d");
const slider = document.querySelector(".slider input");
const output = document.querySelector("#speed");

// global variables
let screen,
   starsElements,
   starsParams = { speed: 2, number: 300, extinction: 4 };

// run stars
setupStars();
updateStars();

// handle slider
output.innerHTML = slider.value;
slider.oninput = function () {
   output.innerHTML = this.value;
   starsParams.speed = this.value;
};

// update stars on resize to keep them centered
window.onresize = function () {
   setupStars();
};

// star constructor
function Star() {
   this.x = Math.random() * stars.width;
   this.y = Math.random() * stars.height;
   this.z = Math.random() * stars.width;

   this.move = function () {
   this.z -= starsParams.speed;
   if (this.z <= 0) {
      this.z = stars.width;
   }
   };

   this.show = function () {
   let x, y, rad, opacity;
   x = (this.x - screen.c[0]) * (stars.width / this.z);
   x = x + screen.c[0];
   y = (this.y - screen.c[1]) * (stars.width / this.z);
   y = y + screen.c[1];
   rad = stars.width / this.z;
   opacity =
      rad > starsParams.extinction ? 1.5 * (2 - rad / starsParams.extinction) : 1;

   starsCtx.beginPath();
   starsCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
   starsCtx.arc(x, y, rad, 0, Math.PI * 2);
   starsCtx.fill();
   };
}

// setup <canvas>, create all the starts
function setupStars() {
   screen = {
   w: window.innerWidth,
   h: window.innerHeight,
   c: [window.innerWidth * 0.5, window.innerHeight * 0.5]
   };
   window.cancelAnimationFrame(updateStars);
   stars.width = screen.w;
   stars.height = screen.h;
   starsElements = [];
   for (let i = 0; i < starsParams.number; i++) {
   starsElements[i] = new Star();
   }
}

// redraw the frame
function updateStars() {
   starsCtx.fillStyle = "#22222242";
   starsCtx.fillRect(0, 0, stars.width, stars.height);
   starsElements.forEach(function (s) {
   s.show();
   s.move();
   });
   window.requestAnimationFrame(updateStars);
}



// Card Hover Glass
VanillaTilt.init(document.querySelectorAll(".glass-eff"), {
max: 10,
speed: 400,
glare: true,
"max-glare": 0.5
});

VanillaTilt.init(document.querySelectorAll(".glass-eff-card-v"), {
max: 5,
speed: 100,
glare: true,
"max-glare": 0.5
});

// scroll Value
window.addEventListener("scroll", (event) => {
   let scroll = this.scrollY;
   if(this.scrollY){
      // console.log('scroll');
   } else if(!this.scrollY){
      // console.log('stoped');
   }
   
   // console.log(scroll)
});


// Click Animation
function clickEffect(e){
var d=document.createElement("div");
d.className="clickEffect";
d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
document.body.appendChild(d);
d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
}
document.addEventListener('click',clickEffect);


// Text Animation
var TxtRotate = function (el, toRotate, period) {
this.toRotate = toRotate;
this.el = el;
this.loopNum = 0;
this.period = parseInt(period, 10) || 2000;
this.txt = "";
this.tick();
this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
var i = this.loopNum % this.toRotate.length;
var fullTxt = this.toRotate[i];

if (this.isDeleting) {
   this.txt = fullTxt.substring(0, this.txt.length - 1);
} else {
   this.txt = fullTxt.substring(0, this.txt.length + 1);
}

this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

var that = this;
var delta = 300 - Math.random() * 100;

if (this.isDeleting) {
   delta /= 2;
}

if (!this.isDeleting && this.txt === fullTxt) {
   delta = this.period;
   this.isDeleting = true;
} else if (this.isDeleting && this.txt === "") {
   this.isDeleting = false;
   this.loopNum++;
   delta = 500;
}

setTimeout(function () {
   that.tick();
}, delta);
};

window.onload = function () {
var elements = document.getElementsByClassName("txt-rotate");
for (var i = 0; i < elements.length; i++) {
   var toRotate = elements[i].getAttribute("data-rotate");
   var period = elements[i].getAttribute("data-period");
   if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
   }
}
// INJECT CSS
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
document.body.appendChild(css);
};


// domain Search
$('.from-name-price').hide();

$('.input-search-name').keyup(function(){
let inputVal = $(this).val();
let getLength = inputVal.length;

$('.f-n-p-left-s div span').text(inputVal);

// element Show And Hide
if(getLength >= 1){
   $('.from-name-price').show(200);
} else {
   $('.from-name-price').hide();
}

// Price Calculation
if(getLength >= 1 && getLength <= 2){
   $('.f-n-p-right-s strong').text('$2000.00/yr');
}
else if(getLength === 3){
   $('.f-n-p-right-s strong').text('$640.00/yr');
}
else if(getLength === 4){
   $('.f-n-p-right-s strong').text('$160.00/yr');
}
else if(getLength >= 5){
   $('.f-n-p-right-s strong').text('$5.00/yr');
}

// domain Taken Validation
if(inputVal === 'asif'){
   $('.f-n-p-icon').html('<i class="fa-solid fa-xmark"></i>');
   $('.f-n-p-left-s p').html('Taken');
   $('.f-n-p-left-s p').css("background-color", "red");
   $('.f-n-p-right-s strong').hide();
   $('.f-n-p-right-s a').text('$ Make Offer');
} else {
   $('.f-n-p-icon').html('<i class="fa-solid fa-check"></i>');
   $('.f-n-p-left-s p').html('available');
   $('.f-n-p-left-s p').css("background-color", "#0779e4");
   $('.f-n-p-right-s strong').show();
   $('.f-n-p-right-s a').text('BUY');
}
// console.log(getLength);
});


// nav Close btn
$('.close-icon---brix').click(function(){
   $('.navigation.w-nav').css({top:0});
});