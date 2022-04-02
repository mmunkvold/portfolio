const nav = document.getElementById("navbar");
const navbar = document.querySelector(".navbar-nav");
const toggle = document.querySelector(".nav__toggle");

if (toggle) {
  toggle.addEventListener("click", () => {
    navbar.classList.toggle("show");
    toggle.classList.toggle("show");
  });
}

if (navbar) {
  navbar.addEventListener("click", () => {
    navbar.classList.remove("show");
    toggle.classList.remove("show");
  });
}

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY;

  if (scrollPos) {
    if (scrollPos > 10) {
      nav.classList.add("scroll");
    }
  } else {
    nav.classList.remove("scroll");
  }
});
