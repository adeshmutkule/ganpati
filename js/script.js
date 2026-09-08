/* =============================================
   GANPATI FESTIVAL WEBSITE - JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== SITE UTILITIES ===== */
  const body = document.body;
  const siteLoader = document.getElementById('siteLoader');
  if (siteLoader) {
    window.addEventListener('load', () => {
      setTimeout(() => siteLoader.classList.add('is-hidden'), 350);
    }, { once: true });
  }
  document.querySelectorAll('img:not(.brand-logo):not(.site-loader img)').forEach(image => {
    image.loading = 'lazy';
    image.decoding = 'async';
  });
  const navMenu = document.querySelector('.ganpati-navbar .navbar-nav');

  const panchangDate = document.getElementById('panchangDate');
  if (panchangDate) {
    const today = new Date();
    const weekday = today.toLocaleDateString('mr-IN', { weekday: 'long' });
    const formattedDate = today.toLocaleDateString('mr-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const tithi = today.getMonth() === 8 && today.getDate() >= 14 && today.getDate() <= 24
      ? 'गणेशोत्सव कालावधी'
      : 'दैनिक भक्ती दिवस';
    const quotes = [
      'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।',
      'गणपती बाप्पा मोरया, मंगलमूर्ती मोरया!',
      'शुभ कार्याची सुरुवात श्री गणेशाच्या नावाने करा.',
      'बाप्पाची भक्ती मनात ठेवा, प्रत्येक दिवस मंगलमय करा.'
    ];
    panchangDate.textContent = formattedDate;
    document.getElementById('panchangDay').textContent = weekday;
    document.getElementById('panchangTithi').textContent = tithi;
    document.getElementById('dailyQuote').textContent = quotes[today.getDay() % quotes.length];
  }

  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  body.appendChild(progressBar);
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ===== NAVBAR SCROLL EFFECT ===== */
  const navbar = document.getElementById('mainNavbar');
  if (navbar) {
    const handleNavbarScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    handleNavbarScroll();
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  }

  /* ===== ACTIVE NAV LINK ===== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.ganpati-navbar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ===== SMOOTH SCROLLING ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 70;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });

        // Close mobile navbar on click
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const navbarToggler = document.querySelector('.navbar-toggler');
          if (navbarToggler) navbarToggler.click();
        }
      }
    });
  });

  /* ===== SCROLL REVEAL ANIMATIONS ===== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ===== COUNTER ANIMATION ===== */
  const counters = document.querySelectorAll('[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const startTime = performance.now();

        const animateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(easeOut * target) + suffix;
          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            el.textContent = target + suffix;
          }
        };
        requestAnimationFrame(animateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ===== COUNTDOWN TIMER ===== */
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    // Ganesh Chaturthi 2026: September 14, 2026
    const festivalDate = new Date('2026-09-14T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = festivalDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
      } else {
        ['cd-days', 'cd-hours', 'cd-minutes', 'cd-seconds'].forEach(id => {
          const element = document.getElementById(id);
          if (element) element.textContent = '00';
        });
      }
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ===== FESTIVAL STATUS ===== */
  const eventStatus = document.getElementById('eventStatus');
  if (eventStatus) {
    const start = new Date('2026-09-14T00:00:00');
    const end = new Date('2026-09-25T00:00:00');
    const now = new Date();
    if (now < start) {
      const days = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
      eventStatus.innerHTML = `<i class="bi bi-hourglass-split me-2"></i>Celebration begins in <strong>${days} day${days === 1 ? '' : 's'}</strong>`;
    } else if (now < end) {
      eventStatus.innerHTML = '<i class="bi bi-broadcast me-2"></i><strong>Celebration is live today!</strong> Join us at Vishal Ganpati Mandir, Ahilyanagar.';
    } else {
      eventStatus.innerHTML = '<i class="bi bi-heart-fill me-2"></i>Thank you for celebrating with us. See you next year!';
    }
  }

  /* ===== FLOATING PETALS ===== */
  const petalsContainer = document.querySelector('.petals-container');
  if (petalsContainer) {
    const petalCount = 20;
    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('div');
      petal.classList.add('petal');
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = (Math.random() * 8 + 7) + 's';
      petal.style.animationDelay = (Math.random() * 10) + 's';
      petal.style.opacity = Math.random() * 0.5 + 0.3;
      petalsContainer.appendChild(petal);
    }
  }

  /* ===== GALLERY FILTER ===== */
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

  /* ===== LIGHTBOX ===== */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentImageIndex = 0;
    let visibleImages = [];

    const getVisibleImages = () => {
      return Array.from(galleryItems).filter(item => item.style.display !== 'none');
    };

    const showLightbox = (index) => {
      visibleImages = getVisibleImages();
      if (index >= visibleImages.length) index = 0;
      if (index < 0) index = visibleImages.length - 1;
      currentImageIndex = index;
      const img = visibleImages[index].querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const visible = getVisibleImages();
        const idx = visible.indexOf(item);
        showLightbox(idx);
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightbox(currentImageIndex - 1);
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightbox(currentImageIndex + 1);
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (e.key === 'ArrowLeft') showLightbox(currentImageIndex - 1);
      if (e.key === 'ArrowRight') showLightbox(currentImageIndex + 1);
    });
  }

  /* ===== YOUTUBE VIDEO PLAYER ===== */
  document.querySelectorAll('[data-youtube-id]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const videoId = trigger.dataset.youtubeId;
      const player = document.createElement('iframe');
      player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      player.title = 'Ganpati Festival video';
      player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      player.referrerPolicy = 'strict-origin-when-cross-origin';
      player.allowFullscreen = true;

      const playerContainer = trigger.classList.contains('video-wrapper')
        ? trigger
        : trigger.querySelector('.video-card-thumb');
      if (playerContainer) {
        playerContainer.replaceChildren(player);
        playerContainer.classList.add('youtube-playing');
      }
    }, { once: true });
  });

  /* ===== CONTACT FORM (frontend only) ===== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      if (contactForm.action.startsWith('https://formsubmit.co/')) {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
          const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { Accept: 'application/json' }
          });
          if (!response.ok) throw new Error('Submission failed');

          submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Message Sent!';
          submitBtn.classList.add('btn-success');
          const successPanel = document.getElementById('contactSuccess');
          if (successPanel) {
            contactForm.classList.add('d-none');
            successPanel.classList.add('is-visible');
          }
          contactForm.reset();
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-success');
          }, 4000);
        } catch (error) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.submit();
        }
        return;
      }
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Message Sent!';
        submitBtn.classList.add('btn-success');
        const successPanel = document.getElementById('contactSuccess');
        if (successPanel) {
          contactForm.classList.add('d-none');
          successPanel.classList.add('is-visible');
        }

        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('btn-success');
        }, 4000);
      }, 1500);
    });
  }

  const newRegistration = document.getElementById('newRegistration');
  if (newRegistration) {
    newRegistration.addEventListener('click', () => {
      const successPanel = document.getElementById('contactSuccess');
      if (successPanel) successPanel.classList.remove('is-visible');
      if (contactForm) contactForm.classList.remove('d-none');
    });
  }

  /* ===== SCROLL DOWN INDICATOR ===== */
  const scrollDown = document.querySelector('.scroll-down');
  if (scrollDown) {
    scrollDown.addEventListener('click', () => {
      const nextSection = document.querySelector('.countdown-section') || document.querySelector('section:nth-of-type(2)');
      if (nextSection) {
        window.scrollTo({ top: nextSection.offsetTop - 60, behavior: 'smooth' });
      }
    });
  }

  /* ===== PARALLAX HERO ===== */
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
          heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.2;
        }
      }
    }, { passive: true });
  }

  const chatbot = document.createElement('section');
  chatbot.className = 'local-chatbot';
  chatbot.innerHTML = `
    <div class="local-chatbot-panel" role="dialog" aria-label="Ganpati information assistant" aria-hidden="true">
      <div class="local-chatbot-header">
        <div>
          <strong>Bappa Seva</strong>
          <span>आपल्या सेवेसाठी online</span>
        </div>
        <button class="local-chatbot-close" type="button" aria-label="Close assistant"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="local-chatbot-messages" aria-live="polite"></div>
      <div class="local-chatbot-suggestions">
        <button type="button" data-chat-question="आरतीची वेळ काय आहे?">आरतीची वेळ</button>
        <button type="button" data-chat-question="कार्यक्रम कोणते आहेत?">कार्यक्रम</button>
        <button type="button" data-chat-question="Contact आणि location द्या">Contact</button>
      </div>
      <form class="local-chatbot-form">
        <label class="visually-hidden" for="local-chatbot-input">Ask Bappa Seva</label>
        <input id="local-chatbot-input" type="text" placeholder="तुमचा प्रश्न विचारा..." autocomplete="off">
        <button type="submit" aria-label="Send message"><i class="bi bi-send-fill"></i></button>
      </form>
    </div>
    <button class="local-chatbot-toggle" type="button" aria-label="Open Bappa Seva assistant" aria-expanded="false">
      <i class="bi bi-chat-heart-fill"></i><span>Help</span>
    </button>`;
  body.appendChild(chatbot);

  const chatbotPanel = chatbot.querySelector('.local-chatbot-panel');
  const chatbotToggle = chatbot.querySelector('.local-chatbot-toggle');
  const chatbotClose = chatbot.querySelector('.local-chatbot-close');
  const chatbotMessages = chatbot.querySelector('.local-chatbot-messages');
  const chatbotForm = chatbot.querySelector('.local-chatbot-form');
  const chatbotInput = chatbot.querySelector('#local-chatbot-input');

  const addChatMessage = (message, sender) => {
    const messageElement = document.createElement('div');
    messageElement.className = `local-chat-message ${sender}`;
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };

  const getLocalChatReply = (question) => {
    const query = question.toLowerCase().trim().replace(/[?!.,।]+$/g, '');
    if (!query) return 'कृपया तुमचा प्रश्न लिहा. मी Bappa Seva आहे आणि आनंदाने मदत करेन.';
    if (/^(hi|hello|hey|namaskar|नमस्कार|हाय|हॅलो|नमस्ते|नमस्कार बाप्पा)/.test(query)) {
      return 'नमस्कार! मी Bappa Seva आहे. तुमचे स्वागत आहे. आरती, कार्यक्रम, gallery, contact किंवा Ganpati बद्दल काहीही विचारा.';
    }
    if (/^(thank|thanks|thank you|धन्यवाद|आभार|थँक)/.test(query)) {
      return 'तुमचे स्वागत आहे! गणपती बाप्पा मोरया. आणखी काही माहिती हवी असल्यास नक्की विचारा.';
    }
    if (/^(no|no thanks|nahi|nahi bas|नाही|नको|बस|काही नाही|nothing|ठीक आहे|okay|ok|बरं)/.test(query)) {
      return 'ठीक आहे. गणपती बाप्पा मोरया! पुन्हा काही मदत हवी असल्यास मी इथेच आहे.';
    }
    if (/तुझं नाव|तुमचं नाव|तुझे नाव|your name|who are you|तू कोण/.test(query)) {
      return 'माझं नाव Bappa Seva आहे. Ganpati celebration बद्दल माहिती देण्यासाठी मी इथे आहे.';
    }
    if (/आजची तारीख|आज किती तारीख|what date|today date|date today/.test(query)) {
      return `आजची तारीख ${new Date().toLocaleDateString('mr-IN', { day: 'numeric', month: 'long', year: 'numeric' })} आहे.`;
    }
    if (/आत्ता किती वाजले|किती वाजले|current time|what time|time now/.test(query)) {
      return `सध्या ${new Date().toLocaleTimeString('mr-IN', { hour: 'numeric', minute: '2-digit' })} वाजले आहेत.`;
    }
    if (/आरती|aarti|arti|पूजा|pooja|काकड/.test(query)) {
      return 'सकाळची आरती रोज सकाळी 7:00 ते 8:00 वाजता आणि संध्याकाळची आरती व भजन संध्याकाळी असते. पूर्ण वेळापत्रकासाठी Events उघडा.';
    }
    if (/कार्यक्रम|event|उत्सव|schedule|कार्यक्रम कोणते/.test(query)) {
      return 'मुख्य कार्यक्रम: Ganpati Sthapana, Morning Aarti, Evening Aarti, Bhajan Sandhya, Cultural Programs आणि Visarjan. तारीख व वेळा पाहण्यासाठी Events page उघडा.';
    }
    if (/gallery|फोटो|photo|चित्र|video|व्हिडिओ/.test(query)) {
      return 'आपल्या celebration मधील photos आणि videos Gallery page वर पाहता येतील.';
    }
    if (/गणपती कोण|गणेश कोण|who is ganesh|who is ganpati|lord ganesh|lord ganpati/.test(query)) {
      return 'श्री गणेश हे बुद्धी, ज्ञान, समृद्धी आणि शुभारंभाचे देव मानले जातात. म्हणून प्रत्येक मंगल कार्यापूर्वी त्यांचे स्मरण केले जाते.';
    }
    if (/गणेश चतुर्थी|ganesh chaturthi|ganpati festival|उत्सव का|का साजरा/.test(query)) {
      return 'गणेश चतुर्थी हा श्री गणेशांच्या आगमनाचा आणि भक्तीचा उत्सव आहे. या काळात स्थापना, पूजा, आरती, सांस्कृतिक कार्यक्रम आणि विसर्जन केले जाते.';
    }
    if (/मोदक|modak|प्रसाद|naivedya|नैवेद्य/.test(query)) {
      return 'मोदक हा श्री गणेशांचा आवडता नैवेद्य मानला जातो. भक्तीने अर्पण केलेला प्रसाद प्रेमाने सर्वांनी घ्यावा.';
    }
    if (/विसर्जन|visarjan|निर्माल्य|पर्यावरण|eco|मूर्ती/.test(query)) {
      return 'विसर्जन श्रद्धेने आणि शक्य तितक्या पर्यावरणपूरक पद्धतीने करा. निर्माल्य वेगळे जमा करा आणि स्थानिक प्रशासनाच्या सूचनांचे पालन करा.';
    }
    if (/शुभेच्छा|गणपती बाप्पा|मोरया|festival wish|wish/.test(query)) {
      return 'गणपती बाप्पा मोरया! तुमच्या आयुष्यात सुख, समृद्धी, आरोग्य आणि यश लाभो.';
    }
    if (/contact|संपर्क|फोन|मोबाइल|email|ईमेल|location|पत्ता|कुठे|address/.test(query)) {
      return 'पत्ता: Vishal Ganpati Mandir, Old Maliwada Road, behind Old Bus Stand, Maliwada, Ahilyanagar, Maharashtra 414001. Phone: +91 70661 79197.';
    }
    if (/वेळ|timing|time|उघड|open|कधी/.test(query)) {
      return 'मंदिरातील celebration timing रोज सकाळी 6:00 ते रात्री 10:00 आहे. आरतीची वेळ हवी असल्यास “आरती” विचारा.';
    }
    if (/help|मदत|काय विचारू|what can/.test(query)) {
      return 'तुम्ही आरती, कार्यक्रम, gallery, contact, पत्ता, timing, गणेश चतुर्थी, मोदक किंवा विसर्जनाबद्दल प्रश्न विचारू शकता.';
    }
    return 'तुमचा प्रश्न समजला. या celebration बद्दल योग्य माहिती देण्यासाठी आरती, कार्यक्रम, gallery, contact, पत्ता, timing, पूजा, मोदक किंवा विसर्जन यापैकी संदर्भ सांगा. मी शक्य तितक्या चांगल्या प्रकारे मदत करतो.';
  };

  const getChatReply = async (question) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question })
      });
      const data = await response.json();
      if (response.ok && data.answer) return data.answer;
    } catch (error) {
      console.warn('Gemini chatbot unavailable, using local reply.', error);
    }
    return getLocalChatReply(question);
  };

  const openChatbot = () => {
    chatbotPanel.classList.add('is-open');
    chatbotPanel.setAttribute('aria-hidden', 'false');
    chatbotToggle.setAttribute('aria-expanded', 'true');
    chatbotInput.focus();
  };

  const closeChatbot = () => {
    chatbotPanel.classList.remove('is-open');
    chatbotPanel.setAttribute('aria-hidden', 'true');
    chatbotToggle.setAttribute('aria-expanded', 'false');
  };

  addChatMessage('नमस्कार! Bappa Seva मध्ये स्वागत आहे. तुम्हाला कशाची माहिती हवी?', 'bot');
  chatbotToggle.addEventListener('click', () => {
    if (chatbotPanel.classList.contains('is-open')) closeChatbot();
    else openChatbot();
  });
  chatbotClose.addEventListener('click', closeChatbot);
  chatbot.querySelectorAll('[data-chat-question]').forEach(button => {
    button.addEventListener('click', async () => {
      const question = button.dataset.chatQuestion;
      addChatMessage(question, 'user');
      addChatMessage('थोडं थांबा, मी पाहतो...', 'bot');
      const reply = await getChatReply(question);
      chatbotMessages.lastElementChild.textContent = reply;
    });
  });
  chatbotForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const question = chatbotInput.value.trim();
    if (!question) return;
    addChatMessage(question, 'user');
    addChatMessage('थोडं थांबा, मी पाहतो...', 'bot');
    chatbotInput.value = '';
    const reply = await getChatReply(question);
    chatbotMessages.lastElementChild.textContent = reply;
  });

  /* ===== CARD HOVER TILT EFFECT (subtle) ===== */
  document.querySelectorAll('.why-card, .symbol-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;
      card.style.transform = `perspective(800px) translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});
