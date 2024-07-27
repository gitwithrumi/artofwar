function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
init();

var tl = gsap.timeline();

function time() {
  var a = 0;
  setInterval(function () {
    a = a + Math.floor(Math.random() * 17) + 1;
    if (a < 100) {
      document.querySelector("#loader h1").innerHTML = a + "%";
    } else {
      a = 100;
      document.querySelector("#loader h1").innerHTML = a + "%";
    }
  }, 120);
}

tl.to("#loader h1", {
  delay: 0.5,
  duration: 0.8,
  onStart: time(),
});

tl.to("#loader", {
  top: "-100%",
  delay: 0.5,
  duration: 1.1,
});

gsap.from("#nav #nav-part--1 .logo, #nav-part--2 ul li", {
  y: "-100%",
  duration: 0.3,
  delay: 2.7,
  opacity: 0,
  stagger: 0.1,
});

function toggleAnswer(id) {
  const answer = document.getElementById(`answer${id}`);
  const item = answer.parentElement;

  if (answer.style.maxHeight === "0px" || answer.style.maxHeight === "") {
    answer.style.maxHeight = answer.scrollHeight + "px";
    item.classList.add("open");
  } else {
    answer.style.maxHeight = "0";
    item.classList.remove("open");
  }
}

var cursor = document.querySelector(".cursor");
var cursorinner = document.querySelector(".cursor2");
var a = document.querySelectorAll("a");
var button = document.querySelectorAll("button");
var iframe = document.querySelector("iframe");

document.addEventListener("mousemove", function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
});

document.addEventListener("mousemove", function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + "px";
  cursorinner.style.top = y + "px";
});

document.addEventListener("mousedown", function () {
  cursor.classList.add("click");
  cursorinner.classList.add("cursorinnerhover");
});

document.addEventListener("mouseup", function () {
  cursor.classList.remove("click");
  cursorinner.classList.remove("cursorinnerhover");
});

a.forEach((item) => {
  item.addEventListener("mouseover", () => {
    cursor.classList.add("hover");
  });
  item.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

button.forEach((item) => {
  item.addEventListener("mouseover", () => {
    cursor.classList.add("hover");
  });
  item.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

iframe.addEventListener("mouseover", () => {
  cursor.classList.add("hide-cursor");
  cursorinner.classList.add("hide-cursor");
});

iframe.addEventListener("mouseout", () => {
  cursor.classList.remove("hide-cursor");
  cursorinner.classList.remove("hide-cursor");
});

document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const navbar = document.getElementById("nav");

  window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // Downscroll
      navbar.style.opacity = "0"; // Hide navbar
      navbar.style.zIndex = "-1";
    } else {
      // Upscroll
      navbar.style.opacity = "1"; // Show navbar
      navbar.style.zIndex = "9999";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  });
});
