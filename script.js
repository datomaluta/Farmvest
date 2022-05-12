"use strict";

/// Sticky navigation
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const sectionIntro = document.querySelector(".section__intro");
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) document.body.classList.add("sticky");
  else document.body.classList.remove("sticky");
};

const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

navObserver.observe(sectionIntro);
///////////////////////////////////////

/// Section Reveal
const allSections = document.querySelectorAll(".section");
console.log(allSections);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/// page navigation

document.querySelector(".menu__list").addEventListener("click", function (e) {
  // e.preventDefault();
  if (!e.target.classList.contains("menu__list-link")) return;
  //   console.log(e.target);
  const link = e.target;
  const id = link.getAttribute("href");
  const section = document.querySelector(id);
  // console.log(section);
  section.scrollIntoView({ behavior: "smooth" });
});

document
  .querySelector(".navigation__btns")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("navigation__btns-link")) return;
    const id = e.target.getAttribute("href");
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: "smooth" });
  });

document.querySelector(".logo").addEventListener("click", function (e) {
  e.preventDefault();
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".prev");
const btnRight = document.querySelector(".next");
const dotContainer = document.querySelector(".dots");
console.log(slides);

let curslide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

goToSlide(0);
createDots();
activateDot(0);

btnRight.addEventListener("click", function (e) {
  if (curslide === maxSlide - 1) {
    curslide = 0;
  } else {
    curslide++;
  }
  goToSlide(curslide);
  activateDot(curslide);
});

btnLeft.addEventListener("click", function () {
  if (curslide === 0) {
    curslide = maxSlide - 1;
  } else {
    curslide--;
  }
  goToSlide(curslide);
  activateDot(curslide);
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});

//// burger fucntional
const burger = document.querySelector(".btn__burger");
const menu = document.querySelector(".menu__list");
const close = document.querySelector(".btn__close");
console.log(close);
const mob__getstart = document.querySelector(".getstart");

burger.addEventListener("click", function () {
  console.log("burger");
  // menu.style.background = "red";
  menu.classList.toggle("nav__hidden");
  menu.classList.toggle("general__visible");
  menu.classList.toggle("mob__menu");
  close.classList.toggle("invisible");
  document.body.style.overflowY = "hidden";
  mob__getstart.classList.toggle("mob__get");
  // document.querySelector(".mob__menu").style.left = "0";
});

close.addEventListener("click", function () {
  menu.classList.toggle("nav__hidden");
  close.classList.toggle("invisible");
  menu.classList.remove("mob__menu");
  document.body.style.overflowY = "visible";
  mob__getstart.classList.toggle("mob__get");
});

menu.addEventListener("click", function (e) {
  if (e.target.classList.contains("menu__list-link")) {
    menu.classList.toggle("nav__hidden");
    menu.classList.toggle("mob__menu");
    close.classList.toggle("invisible");
    document.body.style.overflowY = "visible";
    mob__getstart.classList.toggle("mob__get");
  }
});

mob__getstart.addEventListener("click", function (e) {
  e.preventDefault();
  menu.classList.toggle("nav__hidden");
  menu.classList.toggle("mob__menu");
  close.classList.toggle("invisible");
  document.body.style.overflowY = "visible";
  mob__getstart.classList.toggle("mob__get");
  const id = e.target.getAttribute("href");
  const section = document.querySelector(id);
  section.scrollIntoView({ behavior: "smooth" });
});
