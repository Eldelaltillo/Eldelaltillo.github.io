// 1. SCROLL SUAVE AL HACER CLIC EN ENLACES DEL MENÚ
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// 2. CONMUTADOR DE TEMA CLARO / OSCURO (LIGHT/DARK MODE)
const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

// Cargar preferencia previa del usuario
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light") {
  document.body.classList.add("light-mode");
  if (themeIcon) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    let theme = "dark";
    if (document.body.classList.contains("light-mode")) {
      theme = "light";
      if (themeIcon) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      }
    } else {
      if (themeIcon) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      }
    }

    localStorage.setItem("theme", theme);
  });
}

// 3. EFECTO DESVANECER FOTO DE FONDO DEL HERO AL HACER SCROLL
const heroBg = document.querySelector(".hero-bg");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  if (heroBg && windowHeight > 0) {
    let opacityVal = 1 - (scrollPosition / windowHeight);
    if (opacityVal < 0) opacityVal = 0;
    heroBg.style.opacity = opacityVal;
  }
});

// 4. ANIMACIÓN DE APARICIÓN SEGURA (REVEAL ON SCROLL)
const sections = document.querySelectorAll("section:not(.hero)");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }
  });
};

// Se ejecuta inmediatamente cuando el DOM está listo para no bloquear la carga
document.addEventListener("DOMContentLoaded", () => {
  sections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  });

  // Disparar reveal inicial inmediato
  revealOnScroll();
});

window.addEventListener("scroll", revealOnScroll);