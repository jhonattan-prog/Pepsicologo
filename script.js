/* ============================================
   LANDING PAGE — PSICÓLOGA
   JavaScript — Interações e animações
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ─── Referências DOM ───
    const navbar = document.getElementById('navbar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.navbar__mobile-link, .navbar__mobile-cta');
    const faqItems = document.querySelectorAll('.faq__item');
    const contactForm = document.getElementById('contactForm');
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');


    /* ============================================
       NAVBAR — Efeito ao rolar (scroll)
    ============================================ */
    let lastScrollY = 0;
    const SCROLL_THRESHOLD = 50;

    function handleNavbarScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > SCROLL_THRESHOLD) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }

        lastScrollY = currentScrollY;
    }

    // Usa requestAnimationFrame para performance
    let navbarTicking = false;
    window.addEventListener('scroll', () => {
        if (!navbarTicking) {
            window.requestAnimationFrame(() => {
                handleNavbarScroll();
                navbarTicking = false;
            });
            navbarTicking = true;
        }
    }, { passive: true });


    /* ============================================
       MENU MOBILE — Hamburger
    ============================================ */
    function toggleMobileMenu() {
        const isOpen = hamburgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenu.setAttribute('aria-hidden', !isOpen);
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
        
        // Trava o scroll do body quando o menu está aberto
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMobileMenu() {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    // Fecha ao clicar em link do menu mobile
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Fecha com Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });


    /* ============================================
       LINKS ÂNCORA — Scroll suave
    ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    /* ============================================
       NAVBAR — Destaque do link ativo
    ============================================ */
    const navLinks = document.querySelectorAll('.navbar__link');
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveSection() {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    let activeSectionTicking = false;
    window.addEventListener('scroll', () => {
        if (!activeSectionTicking) {
            window.requestAnimationFrame(() => {
                highlightActiveSection();
                activeSectionTicking = false;
            });
            activeSectionTicking = true;
        }
    }, { passive: true });


    /* ============================================
       FAQ — Accordion
    ============================================ */
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            const answer = item.querySelector('.faq__answer');
            
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle do item clicado
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isActive);
        });

        // Navegação por teclado
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });


    /* ============================================
       ANIMAÇÕES DE REVELAÇÃO — Intersection Observer
    ============================================ */
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Para de observar após revelar (performance)
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: mostra tudo sem animação
        revealElements.forEach(el => {
            el.classList.add('revealed');
        });
    }


    /* ============================================
       FORMULÁRIO — Validação e feedback
    ============================================ */
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = document.getElementById('form-submit-btn');
            const originalText = submitBtn.textContent;
            
            // Feedback visual de envio
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Coleta os dados do formulário
            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            // Envia assincronamente ao Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                const res = await response.json();
                if (response.status === 200) {
                    // Sucesso no envio
                    submitBtn.textContent = '✓ Mensagem enviada!';
                    submitBtn.style.backgroundColor = 'var(--color-primary)';
                    submitBtn.style.borderColor = 'var(--color-primary)';
                    contactForm.reset();
                } else {
                    // Erro retornado pela API
                    console.error('Erro Web3Forms:', res);
                    submitBtn.textContent = 'Erro ao enviar!';
                    submitBtn.style.backgroundColor = '#d32f2f'; // Vermelho de erro
                    submitBtn.style.borderColor = '#d32f2f';
                }
            })
            .catch((error) => {
                // Erro de conexão/rede
                console.error('Erro de rede:', error);
                submitBtn.textContent = 'Erro de conexão!';
                submitBtn.style.backgroundColor = '#d32f2f';
                submitBtn.style.borderColor = '#d32f2f';
            })
            .finally(() => {
                // Restaura o estado original do botão após 4 segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                }, 4000);
            });
        });
    }


    /* ============================================
       MÁSCARA DE TELEFONE (simples)
    ============================================ */
    const phoneInput = document.getElementById('contact-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                }
            }
            
            e.target.value = value;
        });
    }


    /* ============================================
       ANO ATUAL NO COPYRIGHT
    ============================================ */
    const copyrightEl = document.querySelector('.footer__copyright');
    if (copyrightEl) {
        const currentYear = new Date().getFullYear();
        copyrightEl.innerHTML = copyrightEl.innerHTML.replace('2024', currentYear);
    }
});
