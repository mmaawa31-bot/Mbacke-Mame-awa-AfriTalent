// AfrITalent - Fichier JS principal
console.log("AfrITalent chargé - Commit 1");
// Mode sombre
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Vérification du thème 
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
}

// Quand on clique sur 🌙
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}
// Navbar + bouton remonter
const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-lg');
    } else {
      navbar.classList.remove('shadow-lg');
    }

    if (window.scrollY > 300) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
// COMMIT 7 - Fade-in des sections
const sections = document.querySelectorAll('.stats-section');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.2 });

sections.forEach(sec => fadeObserver.observe(sec));

// COMMIT 7 Compteurs animés
const counters = document.querySelectorAll('.counter');
const countObserver = new IntersectionObserver((allEntries) => {
  allEntries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = 50;

      const updateCount = () => {
        const inc = target / speed;
        if (count < target) {
          count += inc;
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + '+';
        }
      };
      updateCount();
      countObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => countObserver.observe(counter));

// Commit 8 : Filtrage dynamique freelances par catégorie
const filterBtns = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.freelance-card');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
// Commit 8 Validation formulaire contact
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Reset erreurs
    document.querySelectorAll('.error').forEach(span => span.textContent = '');

    // Validation nom requis
    if (name.value.trim() === '') {
      name.nextElementSibling.textContent = 'Le nom est requis';
      isValid = false;
    }

    // Validation email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
      email.nextElementSibling.textContent = 'L\'email est requis';
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      email.nextElementSibling.textContent = 'Email invalide';
      isValid = false;
    }

    // Validation message 20 caractères min
    if (message.value.trim().length < 20) {
      message.nextElementSibling.textContent = 'Message trop court, 20 caractères minimum';
      isValid = false;
    }

    // Si tout est valide
    if (isValid) {
      alert('Message envoyé avec succès !');
      contactForm.reset();
    }
  });
}