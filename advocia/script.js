/* Antônio Advocacia — INTERAÇÕES PREMIUM */

// HEADER SCROLL
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});


// SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// MENU MOBILE
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});


// MENU ATIVO AO ROLAR
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const y = window.scrollY + 140;

  sections.forEach(sec => {
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + sec.id
        );
      });
    }
  });
});


// FAQ ANIMADO
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});


// REVEAL ANIMAÇÃO (SUAVE + PROFISSIONAL)
const revealEls = document.querySelectorAll(
  '.step, .card, .diff, .contact-item, .faq-item, .stat, .testimonial, .plan, .testimonial'
);

revealEls.forEach((el, i) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(15px)';
  el.style.transition = 'all 0.2s ease';
  el.style.transitionDelay = `${i * 0.03}s`;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));


// FORMULÁRIO COM EFEITO
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', e => {
  e.preventDefault();

  const btn = form.querySelector('button');
  btn.innerHTML = 'Enviando...';
  btn.style.opacity = 0.7;

  const data = new FormData(form);
  const nome = data.get('nome');

  const msg = `Olá! Meu nome é ${nome}. ${data.get('mensagem')}`;

  setTimeout(() => {
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`, '_blank');
    
    btn.innerHTML = 'Enviado ✔';
    btn.style.opacity = 1;

    form.reset();
  }, 1000);
});


// 🎯 CARROSSEL DE DEPOIMENTOS (AUTOMÁTICO + DATAS)
let current = 0;

function showTestimonial(index) {
  const items = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dot');
  
  items.forEach(item => item.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  items[index].classList.add('active');
  dots[index].classList.add('active');
  current = index;
}

// Clique nos dots
document.querySelectorAll('.testimonial-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    showTestimonial(parseInt(dot.dataset.index));
  });
});

// Auto rotation
setInterval(() => {
  const items = document.querySelectorAll('.testimonial');
  current = (current + 1) % items.length;
  showTestimonial(current);
}, 5000);


// ANIMAÇÕES ADICIONAIS NO SCROLL
const animatedElements = document.querySelectorAll('.plan, .testimonial');

animatedElements.forEach(el => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });
  observer.observe(el);
});


// ANIMAÇÃO DE NÚMEROS NO HERO
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value;
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}


// YEAR
document.getElementById('year').textContent = new Date().getFullYear();


// CARD TOGGLE - Áreas de Atuação
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.closest('.card');
    const textSpan = this.querySelector('.btn-text');
    
    // Toggle this card
    card.classList.toggle('expanded');
    
    // Update button text
    if (card.classList.contains('expanded')) {
      this.innerHTML = 'Ver menos <i class="fas fa-arrow-up"></i>';
    } else {
      this.innerHTML = 'Saiba mais <i class="fas fa-arrow-right"></i>';
    }
  });
});
