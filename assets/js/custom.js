/**
* Template Name: Style
* Template URL: https://bootstrapmade.com/style-bootstrap-portfolio-template/
* Updated: Jul 02 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  // Visi formos laukai
  const vardasInput = document.querySelector('#vardas');
  const pavardeInput = document.querySelector('#pavarde');
  const emailInput = document.querySelector('#email');
  const telefonasInput = document.querySelector('#telefonas');
  const adresasInput = document.querySelector('#adresas');
  const submitBtn = document.querySelector('#submit-btn');

  // Funkcijos klaidų rodymui/slėpimui
  const showError = (input, message) => {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    const errorDiv = formGroup.querySelector('.error-message');
    errorDiv.innerText = message;
  };

  const showSuccess = (input) => {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    const errorDiv = formGroup.querySelector('.error-message');
    errorDiv.innerText = '';
  };

  // Validacijos funkcijos
  const checkName = (input) => {
    if (input.value.trim() === '') {
      showError(input, 'Šis laukas yra privalomas.');
      return false;
    }
    const re = /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/;
    if (!re.test(input.value.trim())) {
      showError(input, 'Gali būti tik raidės.');
      return false;
    }
    showSuccess(input);
    return true;
  };

  const checkEmail = (input) => {
    if (input.value.trim() === '') {
      showError(input, 'Šis laukas yra privalomas.');
      return false;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(input.value).toLowerCase())) {
      showError(input, 'Neteisingas el. pašto formatas.');
      return false;
    }
    showSuccess(input);
    return true;
  };

  const checkRequired = (input) => {
    if (input.value.trim() === '') {
      showError(input, 'Šis laukas yra privalomas.');
      return false;
    }
    showSuccess(input);
    return true;
  };

  const checkAndFormatPhone = (input) => {
    let value = input.value.replace(/\D/g, ''); // Paliekame tik skaičius
    if (value.length > 11) value = value.slice(0, 11); // Apribojame ilgį
    
    let formatted = '';
    if(value.length > 0) formatted += '+' + value.substring(0,3);
    if(value.length > 3) formatted += ' ' + value.substring(3,6);
    if(value.length > 6) formatted += ' ' + value.substring(6,11);
    input.value = formatted;
    
    const re = /^\+370\s6\d{2}\s\d{5}$/;
    if (re.test(formatted)) {
      showSuccess(input);
      return true;
    } else {
      showError(input, 'Formatas turi būti +370 6xx xxxxx');
      return false;
    }
  };

  // Bendra funkcija, tikrinanti visą formą
  const validateForm = () => {
    const isVardasValid = checkName(vardasInput);
    const isPavardeValid = checkName(pavardeInput);
    const isEmailValid = checkEmail(emailInput);
    const isAdresasValid = checkRequired(adresasInput);
    const isTelefonasValid = checkAndFormatPhone(telefonasInput);

    // Papildoma užduotis 3: Mygtuko aktyvavimas
    if (isVardasValid && isPavardeValid && isEmailValid && isAdresasValid && isTelefonasValid) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  };

  // Pridedame klausytojus validacijai realiu laiku
  form.addEventListener('input', validateForm);

  // Formos pateikimo (submit) apdorojimas
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(submitBtn.disabled) return; // Jei mygtukas išjungtas, nieko nedarom

    // Čia keliauja kodas iš 4, 5 ir 6 užduočių (duomenų surinkimas, vidurkis, pop-up)
    const formData = {
      vardas: vardasInput.value.trim(),
      pavarde: pavardeInput.value.trim(),
      elPastas: emailInput.value.trim(),
      telefonas: telefonasInput.value.trim(),
      adresas: adresasInput.value.trim()
    };
    console.log('Surinkti formos duomenys:', formData);

    const formResultsDiv = document.querySelector('#form-results');
    formResultsDiv.innerHTML = `<h3>Pateikti duomenys:</h3><p><strong>Vardas:</strong> ${formData.vardas}</p><p><strong>Pavardė:</strong> ${formData.pavarde}</p><p><strong>El. paštas:</strong> ${formData.elPastas}</p><p><strong>Tel. Numeris:</strong> ${formData.telefonas}</p><p><strong>Adresas:</strong> ${formData.adresas}</p>`;

    const q1 = parseInt(document.querySelector('#q1').value, 10);
    const q2 = parseInt(document.querySelector('#q2').value, 10);
    const q3 = parseInt(document.querySelector('#q3').value, 10);
    const average = ((q1 + q2 + q3) / 3).toFixed(1);
    const averageResult = document.createElement('p');
    averageResult.innerHTML = `<strong>${formData.vardas} ${formData.pavarde} vertinimų vidurkis:</strong> ${average}`;
    formResultsDiv.appendChild(averageResult);

    document.querySelector('#success-popup').style.display = 'block';
  });

  // Pop-up uždarymas
  const closePopupBtn = document.querySelector('#close-popup');
  if (closePopupBtn) {
    closePopupBtn.addEventListener('click', function() {
      document.querySelector('#success-popup').style.display = 'none';
    });
  }
});
/**
 * ===================================================================
 * MANO ŽAIDIMAS (MEMORY GAME) LOGIKA - ATNAUJINTA
 * ===================================================================
 */
document.addEventListener('DOMContentLoaded', () => {

  const gameBoard = document.getElementById('game-board');
  if (!gameBoard) return;

  const movesCountSpan = document.getElementById('moves-count');
  const pairsMatchedSpan = document.getElementById('pairs-matched');
  const timerSpan = document.getElementById('timer');
  const startGameBtn = document.getElementById('start-game-btn');
  const resetGameBtn = document.getElementById('reset-game-btn');
  const winMessageDiv = document.getElementById('win-message');
  const bestScoreEasySpan = document.getElementById('best-score-easy');
  const bestScoreHardSpan = document.getElementById('best-score-hard');
  const gameStartMessage = document.getElementById('game-start-message');

  const cardIcons = [
    'bi-airplane', 'bi-apple', 'bi-balloon', 'bi-bicycle', 'bi-book', 'bi-camera',
    'bi-cloud', 'bi-diamond', 'bi-envelope', 'bi-flag', 'bi-flower1', 'bi-heart'
  ];

  let firstCard = null;
  let secondCard = null;
  let hasFlippedCard = false;
  let lockBoard = false;
  let moves = 0;
  let matchedPairs = 0;
  let totalPairs = 0;
  let timerInterval = null;
  let seconds = 0;
  let gameStarted = false; // Naujas kintamasis žaidimo būsenai

  function loadBestScores() {
    const scores = JSON.parse(localStorage.getItem('memoryGameScores')) || {};
    bestScoreEasySpan.textContent = scores.easy ? `${scores.easy} ėjimų` : 'N/A';
    bestScoreHardSpan.textContent = scores.hard ? `${scores.hard} ėjimų` : 'N/A';
  }

  function saveBestScore() {
    if (!gameStarted) return;
    const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    const scores = JSON.parse(localStorage.getItem('memoryGameScores')) || {};
    const currentBest = scores[difficulty];

    if (!currentBest || moves < currentBest) {
      scores[difficulty] = moves;
      localStorage.setItem('memoryGameScores', JSON.stringify(scores));
      loadBestScores();
    }
  }
  
  function startTimer() {
    stopTimer(); 
    seconds = 0;
    timerSpan.textContent = `${seconds}s`;
    timerInterval = setInterval(() => {
      seconds++;
      timerSpan.textContent = `${seconds}s`;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function createBoard() {
    const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    const gridSize = difficulty === 'easy' ? 12 : 24;
    totalPairs = gridSize / 2;

    gameBoard.innerHTML = ''; 
    gameBoard.className = 'game-board';
    gameBoard.classList.add(difficulty);

    const iconsToUse = cardIcons.slice(0, totalPairs);
    const cardsArray = [...iconsToUse, ...iconsToUse];
    
    for (let i = cardsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }

    cardsArray.forEach(iconClass => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.icon = iconClass;

      card.innerHTML = `
        <div class="card-face card-face-front"><i class="bi bi-question-lg"></i></div>
        <div class="card-face card-face-back"><i class="bi ${iconClass}"></i></div>
      `;
      card.addEventListener('click', flipCard);
      gameBoard.appendChild(card);
    });
  }

  function flipCard() {
    if (!gameStarted || lockBoard || this.classList.contains('matched')) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    moves++;
    movesCountSpan.textContent = moves;

    checkForMatch();
  }

  function checkForMatch() {
    const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    matchedPairs++;
    pairsMatchedSpan.textContent = matchedPairs;
    
    if (matchedPairs === totalPairs) {
      stopTimer();
      winMessageDiv.style.display = 'block';
      gameStarted = false;
      saveBestScore();
    }

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    gameBoard.classList.add('locked'); // Pridedame klasę lentos užrakinimui

    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    gameBoard.classList.remove('locked'); // Atrakiname lentą
  }

  function startGame() {
    gameStarted = true;
    if (gameStartMessage) gameStartMessage.style.display = 'none'; // Paslepiame pradinį pranešimą
    winMessageDiv.style.display = 'none';
    moves = 0;
    matchedPairs = 0;
    movesCountSpan.textContent = moves;
    pairsMatchedSpan.textContent = matchedPairs;
    resetBoard();
    createBoard();
    startTimer();
  }
  
  // Pradinės būklės nustatymas
  function initializeGame() {
    stopTimer();
    gameStarted = false;
    gameBoard.innerHTML = ''; // Išvalome lentą
    if (gameStartMessage) gameStartMessage.style.display = 'block'; // Rodome pradinį pranešimą
    timerSpan.textContent = `0s`;
    movesCountSpan.textContent = '0';
    pairsMatchedSpan.textContent = '0';
    winMessageDiv.style.display = 'none';
    loadBestScores();
  }

  startGameBtn.addEventListener('click', startGame);
  resetGameBtn.addEventListener('click', initializeGame); // Atnaujinti dabar grąžina į pradinę būseną

  // Paleidžiame pradinę būseną
  initializeGame();
});

