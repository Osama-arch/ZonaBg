"use strict";
// mobile menu
const mobileButton = document.querySelector(".mobile-btn");
const navContainer = document.querySelector("nav");
const toggleNavbar = () => {
  if (navContainer.classList.contains("show")) {
    navContainer.classList.remove("show");
    document.body.style.overflowY = "unset";
  } else {
    navContainer.classList.add("show");
    document.body.style.overflowY = "hidden";
  }
};
mobileButton.addEventListener("click", toggleNavbar);

// button Вижте планове

const priceButton = document.querySelector(".hero-btn");
const serviceSection = document.getElementById("service");

priceButton.addEventListener("click", function (e) {
  e.preventDefault();

  serviceSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
});

// video speed
const videoHero = document.querySelector(".video-hero");
const videoBg = document.querySelector(".bg-video ");
videoHero.playbackRate = 0.8;
videoBg.playbackRate = 0.5;

// Form validation
const form = document.getElementById("contact-form");
const userName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const question = document.getElementById("question");

// Input error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.classList.remove("success");
  formControl.classList.add("error");
  const small = formControl.querySelector("small");
  small.innerText = message;
};
// Input Success
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.classList.remove("error");
  formControl.classList.add("success");
};
// check rquired
function checkRequired(input) {
  if (input.value.trim() === "") {
    showError(input, `изисква се`);
    return false;
  }
  return true;
}

// check email
function checkEmail(input) {
  if (checkRequired(input)) {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(input.value.trim())) {
      showError(input, "Имейлът не е невалиден");
      return false;
    }
  } else return false;
  showSuccess(input);
  return true;
}

// check phone
function checkPhone(input) {
  if (checkRequired(input)) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!regex.test(input.value.trim())) {
      showError(input, "Имейлът не е невалиден");
      return false;
    }
  } else return false;
  showSuccess(input);
  return true;
}

// check length
function checkLength(input, min, max) {
  if (checkRequired(input)) {
    if (input.value.length < min) {
      showError(input, `трябва да съдържа поне ${min} знака`);
      return false;
    } else if (input.value.length > max) {
      showError(input, `трябва да бъде по-малко от ${max} знака`);
      return false;
    }
  } else return false;
  showSuccess(input);
  return true;
}

//  check validation
const checkValidation = () => {
  checkEmail(email);
  checkLength(userName, 3, 15);
  checkPhone(phone);
  checkLength(question, 20);
  if (
    checkLength(userName, 3, 15) &&
    checkEmail(email) &&
    checkPhone(phone) &&
    checkLength(question, 20, 999)
  )
    return true;
  return false;
};

// submit form
form.addEventListener("submit", function (event) {
  if (!checkValidation()) {
    event.preventDefault();
    event.stopPropagation();
  }
});

// domain input validation

const domainBtn = document.querySelectorAll(".domain-input_variants");
const domainInput = document.getElementById("domain");
const domainCheck = document.getElementById("domain-check");

domainBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.value) {
      domainInput.value =
        "www." +
        domainInput.value
          .toLowerCase()
          .replace("www.", "")
          .replace(".com", "")
          .replace(".org", "")
          .replace(".net", "") +
        e.target.value;
    }
  });
});

function is_domain(str) {
  const regexp = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/i;

  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}

domainCheck.addEventListener("click", (e) => {
  e.preventDefault();
  if (is_domain(domainInput.value)) {
    showSuccess(domainInput);
  } else {
    showError(domainInput, "името на вашия домейн не е правилно");
  }
});
// animation
const sections = document.querySelectorAll(".section");
const navLi = document.querySelectorAll(".navigation ul li");
const animationElements = document.querySelectorAll(
  ".animate-on-scroll, .animate-top-down, .hero",
);
let currentSection;

//  trigger navlink when clicked
let navIsClicked = false;
navLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    navIsClicked = true;
    currentSection = e.target.getAttribute("href").replace("#", "");
    activeLink();
    setTimeout(() => {
      navIsClicked = false;
    }, 1000);
    if (navContainer.classList.contains("show")) {
      setTimeout(() => {
        toggleNavbar();
      }, 200);
    }
  });
});
document.addEventListener("scrollend", () => {
  navIsClicked = false;
});

// add active class
const activeLink = () => {
  navLi.forEach((li) => {
    const link = li.firstElementChild;
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
};

// reset page
window.addEventListener("load", (e) => {
  if (currentSection) {
    location.hash = `#${currentSection}`;
  } else {
    location.hash = "#hero";
  }
  currentSection = location.hash.replace("#", "");
  activeLink();
  animationElements.forEach((el) => observer.observe(el));
});

// trigger section in view
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        entry.target.classList.remove("animate");
        return;
      } else {
        entry.target.classList.add("animate");
        const id = entry.target.getAttribute("id");
        if (
          id === "hero" ||
          id === "service" ||
          id === "tech" ||
          id === "contacts"
        ) {
          currentSection = id;
        }
      }
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.01 },
);

// active link on scroll
//  using current from observer
let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
  const currentScrollPos = window.pageYOffset;
  //  change active link
  if (currentScrollPos < 200) {
    currentSection = "hero";
  }
  if (!navIsClicked) {
    activeLink();
    location.hash = `#${currentSection}`;
  }
  // hide menu on scroll
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else if (!navContainer.classList.contains("show")) {
    document.getElementById("header").style.top = "-80px";
  }
  prevScrollpos = currentScrollPos;

  // animate on scroll
  animationElements.forEach((el) => observer.observe(el));
};
