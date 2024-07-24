const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
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

document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const navbar = document.getElementById("nav");

  window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // Downscroll
      navbar.style.opacity = "0"; // Hide navbar
    } else {
      // Upscroll
      navbar.style.opacity = "1"; // Show navbar
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  });
});
