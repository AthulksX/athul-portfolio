const doc = document;
const navbar = doc.getElementById("navbar");
const navLinks = Array.from(doc.querySelectorAll(".nav-link"));
const hamburger = doc.getElementById("hamburger");
const navMenu = doc.getElementById("navMenu");
const typedTextEl = doc.getElementById("typedText");
const projectModal = doc.getElementById("projectModal");
const modalTitle = doc.getElementById("modalTitle");
const modalTech = doc.getElementById("modalTech");
const modalDesc = doc.getElementById("modalDesc");
const form = doc.getElementById("contactForm");
const formStatus = doc.getElementById("formStatus");
const yearEl = doc.getElementById("year");

const typePhrases = [
  "System Administrator",
  "IT Support Engineer",
  "Automation Developer",
  "R&D Engineer",
];

let typeIndex = 0;
let charIndex = 0;
let deleting = false;

function setYear() {
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function updateNavbar() {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function scrollSpy() {
  const sections = doc.querySelectorAll("main section[id]");
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.id;

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${id}`
        );
      });
    }
  });
}

function toggleMenu() {
  const open = navMenu.classList.toggle("open");
  hamburger.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", open);
}

function closeMenu() {
  navMenu.classList.remove("open");
  hamburger.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
}

function typeLoop() {
  const phrase = typePhrases[typeIndex];
  if (!deleting) {
    typedTextEl.textContent = phrase.slice(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    typedTextEl.textContent = phrase.slice(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex === 0) {
      deleting = false;
      typeIndex = (typeIndex + 1) % typePhrases.length;
    }
  }

  const speed = deleting ? 45 : 90;
  setTimeout(typeLoop, speed);
}

function animateOnScroll() {
  const revealElements = doc.querySelectorAll(".fade-in, .timeline-item");
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < triggerBottom) {
      el.classList.add("visible");
    }
  });
}

function openProjectModal(card) {
  const title = card.dataset.title;
  const tech = card.dataset.tech;
  const desc = card.dataset.desc;

  modalTitle.textContent = title;
  modalTech.textContent = tech;
  modalDesc.textContent = desc;

  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  doc.body.style.overflow = "hidden";
}

function closeProjectModal() {
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  doc.body.style.overflow = "";
}

function handleProjectClicks(event) {
  const action = event.target.dataset.action;
  if (!action) return;

  if (action === "openProject") {
    const card = event.target.closest(".project-card");
    if (card) openProjectModal(card);
  }

  if (action === "closeModal") {
    closeProjectModal();
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please complete all fields before sending.";
    formStatus.classList.add("show");
    return;
  }

  if (!validateEmail(email)) {
    formStatus.textContent = "Please enter a valid email address.";
    formStatus.classList.add("show");
    return;
  }

  formStatus.textContent = "Thanks! Your message has been sent. I’ll get back to you soon.";
  formStatus.classList.add("show");
  form.reset();

  setTimeout(() => {
    formStatus.classList.remove("show");
  }, 6500);
}

function init() {
  setYear();
  updateNavbar();
  scrollSpy();
  typeLoop();
  animateOnScroll();

  window.addEventListener("scroll", () => {
    updateNavbar();
    scrollSpy();
    animateOnScroll();
  });

  hamburger.addEventListener("click", toggleMenu);
  navMenu.addEventListener("click", (event) => {
    if (event.target.classList.contains("nav-link")) {
      closeMenu();
    }
  });

  doc.addEventListener("click", handleProjectClicks);
  doc.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && projectModal.classList.contains("open")) {
      closeProjectModal();
    }
  });

  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
}

init();
