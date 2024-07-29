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
let startTime = Date.now();
let minimumDuration = 2000;

function incrementLoader(actualDuration) {
  return new Promise((resolve) => {
    let a = 0;
    let interval = setInterval(function () {
      let elapsedTime = Date.now() - startTime;
      let totalDuration = Math.max(actualDuration, minimumDuration);
      a = Math.min((elapsedTime / totalDuration) * 100, 100);
      document.querySelector("#loader h1").innerHTML = Math.floor(a) + "%";

      if (a >= 100) {
        clearInterval(interval);
        resolve();
      }
    }, 20); // Update every 50ms for smoother increment
  });
}

tl.from("#loader", {
  bottom: "-100%",
  duration: 1.2,
  delay: 0,
});

window.addEventListener("load", function () {
  let loadTime = Date.now() - startTime;

  incrementLoader(loadTime).then(() => {
    tl.to("#loader", {
      top: "-100%",
      delay: 0.3,
      duration: 1.2,
      onComplete: function () {
        document.getElementById("loader").style.display = "none";
      },
    }).from("#nav #nav-part--1 .logo, #nav-part--2 ul li", {
      y: "-100%",
      duration: 0.15,
      opacity: 0,
      easing: "easeOut",
      stagger: 0.1,
    });
  });
});

incrementLoader(minimumDuration);

function redirectToEmail() {
  var email = "armies_help@boooea.com";
  var subject = "Help Request";
  var body = "Please provide details about your issue.";

  var mailtoLink =
    "mailto:" +
    email +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);

  var win = window.open(mailtoLink, "_blank");

  // Fallback to common webmail services if mailto link fails
  setTimeout(function () {
    if (!win || win.closed || typeof win.closed == "undefined") {
      var gmailLink =
        "https://mail.google.com/mail/?view=cm&fs=1&to=" +
        email +
        "&su=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
      var yahooLink =
        "https://compose.mail.yahoo.com/?to=" +
        email +
        "&subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
      var outlookLink =
        "https://outlook.live.com/owa/?path=/mail/action/compose&to=" +
        email +
        "&subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      if (
        confirm(
          "It looks like your email client isn't configured. Would you like to open Gmail?"
        )
      ) {
        window.open(gmailLink, "_blank");
      } else if (confirm("Would you like to open Yahoo Mail?")) {
        window.open(yahooLink, "_blank");
      } else if (confirm("Would you like to open Outlook?")) {
        window.open(outlookLink, "_blank");
      } else {
        alert(
          "You were unable to redirect to email. Please copy the email address: " +
            email
        );
      }
    }
  }, 1000);
}

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
