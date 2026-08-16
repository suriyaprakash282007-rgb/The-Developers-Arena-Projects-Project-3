/**
 * Aria Vance Portfolio - Interactive Features
 * Script File
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==========================================================================
  // 1. Scroll Progress Indicator
  // ==========================================================================
  const scrollBar = document.getElementById('scrollBar');
  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (windowScroll / height) * 100 : 0;
    if (scrollBar) {
      scrollBar.style.width = scrolled + '%';
    }
  });

  // ==========================================================================
  // 2. Mobile Menu Navigation Toggle
  // ==========================================================================
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ==========================================================================
  // 3. Dark/Light Mode Theme Toggle
  // ==========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  
  // Set theme from localStorage or system preferences
  const currentTheme = localStorage.getItem('darkMode');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (currentTheme === 'true' || (currentTheme === null && systemPrefersDark)) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
    });
  }

  // ==========================================================================
  // 4. Typing Animation (Hero Section)
  // ==========================================================================
  const typingText = document.getElementById('typingText');
  const phrases = [
    'immersive web interfaces.',
    'creative digital designs.',
    'robust frontend solutions.',
    'delightful micro-interactions.'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingText) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Remove character
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deleting is faster
    } else {
      // Add character
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Normal typing speed
    }

    // Switch states
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at full phrase
      isDeleting = true;
      typingSpeed = 2000; // Delay before starting to delete
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Brief pause before typing next
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Start typing loop
  if (typingText) {
    typeEffect();
  }

  // ==========================================================================
  // 5. About Me Tabs (Show/Hide Dynamic Content)
  // ==========================================================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      // Deactivate all buttons & panes
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
      });
      
      // Activate clicked button & corresponding pane
      btn.classList.add('active');
      const activePane = document.getElementById(`${targetTab}-tab`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 6. Interactive Image Slider (Featured Projects Showcase)
  // ==========================================================================
  const slides = document.querySelectorAll('.project-slide');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const dotsContainer = document.getElementById('sliderDots');
  let currentSlideIndex = 0;
  let slideInterval;

  function showSlide(index) {
    if (slides.length === 0) return;
    
    // Bounds check
    if (index >= slides.length) {
      currentSlideIndex = 0;
    } else if (index < 0) {
      currentSlideIndex = slides.length - 1;
    } else {
      currentSlideIndex = index;
    }

    // Update active slide state
    slides.forEach((slide, idx) => {
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update dot indicators
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    showSlide(currentSlideIndex + 1);
  }

  function prevSlide() {
    showSlide(currentSlideIndex - 1);
  }

  // Set up event listeners for arrows
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
    
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  // Set up event listeners for dot indicators
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    // Build dots dynamically to ensure count matching
    slides.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('data-slide', idx);
      dot.addEventListener('click', () => {
        showSlide(idx);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Autoplay function
  function startAutoplay() {
    slideInterval = setInterval(nextSlide, 6000);
  }

  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }

  // Initialize Slider autoplay
  if (slides.length > 0) {
    startAutoplay();
  }

  // ==========================================================================
  // 7. Interactive Collaboration Planner (To-Do List Widget)
  // ==========================================================================
  const todoForm = document.getElementById('todoForm');
  const todoInput = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');
  const todoCounter = document.getElementById('todoCounter');
  
  // Load tasks from Local Storage or set seed data
  let plannerTasks = [];
  const storedTasks = localStorage.getItem('portfolioPlannerTasks');
  
  if (storedTasks) {
    plannerTasks = JSON.parse(storedTasks);
  } else {
    // Seed initial milestones
    plannerTasks = [
      { id: 1, text: 'Brainstorm creative concepts', completed: true },
      { id: 2, text: 'Review visual prototypes in Figma', completed: false },
      { id: 3, text: 'Develop responsive code foundations', completed: false },
      { id: 4, text: 'Perform interactive tests & launch', completed: false }
    ];
    savePlannerTasks();
  }

  function savePlannerTasks() {
    localStorage.setItem('portfolioPlannerTasks', JSON.stringify(plannerTasks));
  }

  function updateTaskCounter() {
    if (!todoCounter) return;
    const remainingTasks = plannerTasks.filter(task => !task.completed).length;
    todoCounter.textContent = `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} left`;
  }

  function renderPlannerTasks() {
    if (!todoList) return;
    todoList.innerHTML = '';

    plannerTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `todo-item ${task.completed ? 'completed' : ''}`;
      li.setAttribute('data-id', task.id);

      // Task item content layout
      li.innerHTML = `
        <div class="todo-item-content">
          <div class="todo-checkbox">
            <i data-lucide="check"></i>
          </div>
          <span class="todo-item-text">${escapeHtml(task.text)}</span>
        </div>
        <button class="btn-todo-delete" aria-label="Delete milestone">
          <i data-lucide="trash-2"></i>
        </button>
      `;

      // Checkbox click event (Toggle completed)
      const contentWrap = li.querySelector('.todo-item-content');
      contentWrap.addEventListener('click', () => {
        task.completed = !task.completed;
        savePlannerTasks();
        renderPlannerTasks();
        updateTaskCounter();
      });

      // Delete button click event
      const deleteBtn = li.querySelector('.btn-todo-delete');
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Avoid triggering check toggle
        plannerTasks = plannerTasks.filter(t => t.id !== task.id);
        savePlannerTasks();
        renderPlannerTasks();
        updateTaskCounter();
      });

      todoList.appendChild(li);
    });

    // Re-trigger Lucide icon creation for dynamic list elements
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Handle planner form submission
  if (todoForm && todoInput) {
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskText = todoInput.value.trim();
      if (!taskText) return;

      const newTask = {
        id: Date.now(), // Unique ID
        text: taskText,
        completed: false
      };

      plannerTasks.push(newTask);
      savePlannerTasks();
      todoInput.value = '';
      renderPlannerTasks();
      updateTaskCounter();
    });
  }

  // Helper function to prevent XSS in client-added tasks
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // Initialize Planner rendering
  renderPlannerTasks();
  updateTaskCounter();

  // ==========================================================================
  // 8. Contact Form Validation with Real-time & Submit Feedback
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const successBanner = document.getElementById('successBanner');
  const resetFormBtn = document.getElementById('resetContactFormBtn');

  // Input elements
  const fields = {
    name: {
      input: document.getElementById('contactName'),
      error: document.getElementById('nameError'),
      validate: (val) => val.trim().length >= 3
    },
    email: {
      input: document.getElementById('contactEmail'),
      error: document.getElementById('emailError'),
      validate: (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(val.trim());
      }
    },
    subject: {
      input: document.getElementById('contactSubject'),
      error: document.getElementById('subjectError'),
      validate: (val) => val.trim().length >= 4
    },
    message: {
      input: document.getElementById('contactMessage'),
      error: document.getElementById('messageError'),
      validate: (val) => val.trim().length >= 10
    }
  };

  // Run validation on individual field and toggle class
  function validateField(fieldKey) {
    const field = fields[fieldKey];
    if (!field.input) return true;

    const isValid = field.validate(field.input.value);
    const parent = field.input.closest('.input-group');

    if (isValid) {
      if (parent) parent.classList.remove('has-error');
    } else {
      if (parent) parent.classList.add('has-error');
    }

    return isValid;
  }

  // Set up real-time listener events (input, blur) for each field
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (field.input) {
      // Real-time input checking
      field.input.addEventListener('input', () => {
        // Only show validation styling if user has already exited (blur) or if they had an error
        const parent = field.input.closest('.input-group');
        if (parent && parent.classList.contains('has-error')) {
          validateField(key);
        }
      });

      // Blur check (runs when exiting input field)
      field.input.addEventListener('blur', () => {
        validateField(key);
      });
    }
  });

  // Handle Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let formIsValid = true;

      // Validate all fields
      Object.keys(fields).forEach(key => {
        const isThisFieldValid = validateField(key);
        if (!isThisFieldValid) {
          formIsValid = false;
        }
      });

      // If valid, show success state, store details optionally
      if (formIsValid) {
        contactForm.style.opacity = '0';
        setTimeout(() => {
          contactForm.style.display = 'none';
          if (successBanner) {
            successBanner.style.display = 'flex';
            setTimeout(() => {
              successBanner.classList.add('active');
            }, 50);
          }
        }, 300);
      }
    });
  }

  // Handle reset to allow sending new messages
  if (resetFormBtn && contactForm && successBanner) {
    resetFormBtn.addEventListener('click', () => {
      // Reset field inputs
      Object.keys(fields).forEach(key => {
        const field = fields[key];
        if (field.input) {
          field.input.value = '';
          const parent = field.input.closest('.input-group');
          if (parent) parent.classList.remove('has-error');
        }
      });

      successBanner.classList.remove('active');
      setTimeout(() => {
        successBanner.style.display = 'none';
        contactForm.style.display = 'flex';
        setTimeout(() => {
          contactForm.style.opacity = '1';
        }, 50);
      }, 300);
    });
  }
});
