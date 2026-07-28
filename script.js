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

// MENÚ HAMBURGUESA EN MÓVIL
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const menuIcon = menuToggle ? menuToggle.querySelector("i") : null;

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Cambia el icono entre hamburguesa (bars) y la "X" (xmark)
    if (menuIcon) {
      if (navLinks.classList.contains("active")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
      } else {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
      }
    }
  });

  // Cerrar el menú automáticamente al hacer clic en un enlace
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      if (menuIcon) {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
      }
    });
  });
}

// LÓGICA DE CARRUSEL EN TARJETAS DE PROYECTOS
document.querySelectorAll('.project-card').forEach(card => {
  const images = card.querySelectorAll('.carousel-track img');
  const prevBtn = card.querySelector('.carousel-btn.prev');
  const nextBtn = card.querySelector('.carousel-btn.next');
  
  if (images.length <= 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    return;
  }

  let currentIndex = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
      showImage(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
      showImage(currentIndex);
    });
  }
});

// MODAL PARA AMPLIAR IMÁGENES DE PROYECTOS
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("modalCaption");
const modalClose = document.getElementById("modalClose");

if (modal && modalImg && modalClose) {
  // Abrir modal al hacer clic en cualquier imagen del carrusel
  document.querySelectorAll(".carousel-track img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.textContent = img.alt || "Vista previa del proyecto";
    });
  });

  // Cerrar modal al hacer clic en la "X"
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar modal al hacer clic fuera de la imagen (en el fondo oscuro)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Cerrar modal con la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });
}