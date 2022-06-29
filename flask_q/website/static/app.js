let controller;
let slideScene;
let pageScene;
let detailScene;

function animateSlides() {
  //Init Controller
  controller = new ScrollMagic.Controller();
  //Select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //Loop over each sllide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    //GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    //Create Scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "slide"
      // })
      .addTo(controller);
    //New ANimation
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    //Create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "page",
      //   indent: 200
      // })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}
const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");
// const bodyColor = document.querySelector("body")
function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}
function activeCursor(e) {
  const item = e.target;
  if (
    item.id === "logo" ||
    item.classList.contains("burger") ||
    item.classList.contains("date1") ||
    item.classList.contains("tog")
  ) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "Click";
  } else {
    mouse.classList.remove("explore-active");
    mouseTxt.innerText = "";
    gsap.to(".title-swipe", 1, { y: "100%" });
  }
}
function navToggle(e) {
  if (!e.target.classList.contains("active") && !e.target.classList.contains("tog")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 3.35, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -3.35, background: "black" });
    gsap.to("#logo", 1, { color: "black" });
    gsap.to(".date1", 1, { color: "black" });
    gsap.to(".faba", 1, { color: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".date1", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}

//Barba Page Transitions
const logo = document.querySelector("#logo");
const date = document.querySelector(".date");
var logoutTemp = document.getElementsByClassName("appear")
var logoutRemoV = document.getElementsByClassName("appear")

var burger3 = document.getElementsByClassName("burger")

// function autoRefresh() {
//     window.location = window.location.href;
// }

// barba.init({
//   views: [
//     {
//       namespace: "logo",
//       beforeEnter() {
//         animateSlides();
//         logo.href = "/";
//         let code = "f"
//         changeBackgroundColor(code)

//       },
//       beforeLeave() {
//         slideScene.destroy();
//         pageScene.destroy();
//         controller.destroy();
//       },
//     },
//     {
//       namespace: "fashion",
//       beforeEnter() {
//         logo.href = "/";
//         detailAnimation();
//       },
//       beforeLeave() {
//         controller.destroy();
//         detailScene.destroy();
//       },
//     },
//     {
//       namespace:"fashion1",
//       beforeEnter() {
//         logo.href = "/";
//         let code = "e"
//         changeBackgroundColor(code)
//       },
//       beforeLeave() {
//         controller.destroy();
//       },
//     },
//     {
//       namespace: "login",
//       beforeEnter() {
//         var burger2 = document.querySelector(".burger");
//         burger2.addEventListener("click", navToggle);
//         // detailAnimation();
//       },
//       beforeLeave() {
//         controller.destroy();
//         detailScene.destroy();
//       },
//     },
//   ],
//   transitions: [
//     {
//       leave({ current, next }) {
//         let done = this.async();
//         //An Animation
//         const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
//         tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
//         tl.fromTo(
//           ".swipe",
//           0.75,
//           { x: "-100%" },
//           { x: "0%", onComplete: done },
//           "-=0.5"
//         );
//       },
//       enter({ current, next }) {
//         let done = this.async();
        
//         //Scroll to the top
//         window.scrollTo(0, 0);
//         //An Animation
//         const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
//         tl.fromTo(
//           ".swipe",
//           1,
//           { x: "0%" },

//           { x: "100%", stagger: 0.2, onComplete: done }
//         );
//         tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
//         tl.fromTo(
//           ".nav-header",
//           1,
//           { y: "-100%" },
//           { y: "0%", ease: "power2.inOut" },
//           "-=1.5"
//         );
//       },
//     },
//   ],
// });

function changeBackgroundColor(code){
  if(code === "e"){
    document.body.style.background = "#f0725c";
  }else{
    document.body.style.background = "#17181a"
  }
}
function navDropEffectInHome(){
    const nav2 = document.querySelector(".nav-header");
    const slidTl1 = gsap.timeline({
      defaults: { ease: "power2.inOut" },
    });
    slidTl1.fromTo(nav2,1.2,{ y: "-100%" }, { y: "0%",ease: "power2.inOut" }, "-=.5");
}



function colorCh(){
  const pathname = window.location.pathname;
  let code = "e"
  if (pathname === "/rsvpform"){
    changeBackgroundColor(code)
  }
  else{
    changeBackgroundColor("z")
  }
}

//EventListeners
window.addEventListener("load", colorCh);
window.addEventListener("load", navDropEffectInHome);
window.addEventListener("load", animateSlides);
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

function deleteRSVP(rsvpId) {
  fetch("/delete-rsvp", {
    method: "POST",
    body: JSON.stringify({ rsvpId: rsvpId }),
  }).then((_res) => {
    window.location.href = "/admin";
  });
}