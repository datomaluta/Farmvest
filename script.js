"use strict";

/// Sticky navigation
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const sectionIntro = document.querySelector(".section__intro");
const headerHeight = header.getBoundingClientRect().height;
console.log(headerHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) document.body.classList.add("sticky");
  else document.body.classList.remove("sticky");
};

const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

navObserver.observe(sectionIntro);
///////////////////////////////////////

/// Section Reveal
const allSections = document.querySelectorAll(".section");
// console.log(allSections);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
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
  e.preventDefault();
  if (!e.target.classList.contains("menu__list-link")) return;
  const link = e.target;
  const id = link.getAttribute("href");
  const section = document.querySelector(id);
  section.scrollIntoView({ behavior: "smooth" });

  if (header.classList.contains("nav-open")) {
    document.body.classList.toggle("no-scroll");
  }
  header.classList.toggle("nav-open");
});

/// navigation buttons / sign in and get started - scroll functionality
// document
//   .querySelector(".navigation__btns")
//   .addEventListener("click", function (e) {
//     e.preventDefault();
//     if (!e.target.classList.contains("navigation__btns-link")) return;
//     const id = e.target.getAttribute("href");
//     const section = document.querySelector(id);
//     section.scrollIntoView({ behavior: "smooth" });
//   });

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
// console.log(slides);

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

const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
};
init();

// event listeners
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

/// Burger Functionality
const btnMobilenav = document.querySelector(".btn-mobile-nav");
btnMobilenav.addEventListener("click", function () {
  header.classList.toggle("nav-open");
  document.body.classList.toggle("no-scroll");
});
