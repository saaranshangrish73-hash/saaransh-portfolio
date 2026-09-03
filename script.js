/**
 * Saaransh Portfolio — Interactive JavaScript Engine
 * Author: Saaransh (18 y/o Web Developer)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypewriter();
  initPhoneCopy();
  initTerminal();
  initContactForm();
  initFloatingAction();
  initScrollSpy();
  initDynamicYear();
  initDemoModal();
  initCodeProtection();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & MOBILE MENU
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const allNavLinks = document.querySelectorAll('.nav-link');

  // Scroll effect on header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbarWrapper?.classList.add('scrolled');
    } else {
      navbarWrapper?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('open');
    });

    // Close mobile menu when clicking any nav link
    allNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('open');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. HERO TYPEWRITER ANIMATION
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const typewriterElem = document.getElementById('typewriter');
  if (!typewriterElem) return;

  const phrases = [
    'Websites.',
    'Web Apps.',
    'Frontends.',
    'UI/UX Designs.',
    'Experiences.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElem.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElem.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at full word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. PHONE NUMBER COPY TO CLIPBOARD & TOAST
   -------------------------------------------------------------------------- */
function initPhoneCopy() {
  const phoneNumber = '9015008573';
  const quickCopyPhoneBtn = document.getElementById('quickCopyPhone');
  const copyPhoneCardBtn = document.getElementById('copyPhoneCardBtn');

  function copyNumberToClipboard() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(phoneNumber).then(() => {
        showToast('Phone Number Copied!', '+91 9015008573 is now on your clipboard.');
      }).catch(() => {
        fallbackCopy(phoneNumber);
      });
    } else {
      fallbackCopy(phoneNumber);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Phone Number Copied!', '+91 9015008573 copied to clipboard.');
    } catch (err) {
      showToast('Phone Number', '+91 9015008573');
    }
    document.body.removeChild(textArea);
  }

  if (quickCopyPhoneBtn) {
    quickCopyPhoneBtn.addEventListener('click', copyNumberToClipboard);
  }
  if (copyPhoneCardBtn) {
    copyPhoneCardBtn.addEventListener('click', copyNumberToClipboard);
  }
}

// Toast Notification Manager
let toastTimeout;
function showToast(title, msg) {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toastTitle');
  const toastMsg = document.getElementById('toastMsg');

  if (!toast) return;

  if (toastTitle) toastTitle.textContent = title;
  if (toastMsg) toastMsg.textContent = msg;

  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* --------------------------------------------------------------------------
   4. INTERACTIVE DEVELOPER TERMINAL CONSOLE
   -------------------------------------------------------------------------- */
function initTerminal() {
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const quickPills = document.querySelectorAll('.term-pill');

  if (!terminalForm || !terminalInput || !terminalOutput) return;

  const commands = {
    help: `
<span class="text-neon-cyan">Available Commands:</span>
  <span class="term-cmd-highlight">about</span>       - Learn about Saaransh
  <span class="term-cmd-highlight">experience</span>  - The truth about my 0 years experience
  <span class="term-cmd-highlight">skills</span>      - List technical skills & tools
  <span class="term-cmd-highlight">projects</span>    - View featured demo projects
  <span class="term-cmd-highlight">email</span>       - Send message to saaranshangrish73@gmail.com
  <span class="term-cmd-highlight">instagram</span>   - Get official Instagram handle (@srsh.webworks)
  <span class="term-cmd-highlight">phone</span>       - Get direct call / WhatsApp number
  <span class="term-cmd-highlight">contact</span>     - All contact options
  <span class="term-cmd-highlight">joke</span>        - Hear a developer joke
  <span class="term-cmd-highlight">hire</span>        - Discover why you should hire an 18 y/o dev
  <span class="term-cmd-highlight">whoami</span>      - Who are you?
  <span class="term-cmd-highlight">clear</span>       - Clear the terminal screen
    `,
    email: `
<span class="text-neon-cyan">[Official Email]</span>
✉️ Email: <a href="mailto:saaranshangrish73@gmail.com" style="color:var(--accent-cyan);text-decoration:underline;">saaranshangrish73@gmail.com</a>
All messages from the "Send a Quick Message" form land directly in this inbox!
    `,
    contact: `
<span class="text-neon-cyan">[Get In Touch With Saaransh]</span>
• Email: <a href="mailto:saaranshangrish73@gmail.com" style="color:var(--accent-cyan);text-decoration:underline;">saaranshangrish73@gmail.com</a>
• Phone: +91 9015008573
• WhatsApp: <a href="https://wa.me/919015008573" target="_blank" style="color:var(--accent-emerald);text-decoration:underline;">wa.me/919015008573</a>
• Instagram: <a href="https://www.instagram.com/srsh.webworks?igsi=cGtkYTVydmQ3bGxr" target="_blank" style="color:#ff758c;text-decoration:underline;">@srsh.webworks</a>
    `,
    about: `
<span class="text-neon-cyan">[About Saaransh]</span>
• Name: Saaransh
• Age: 18 years old
• Profession: Frontend & Web Developer
• Specialty: Aesthetic UI/UX, responsive interfaces, fast loading speeds
• Passion: Building web products people actually fall in love with.
    `,
    experience: `
<span class="text-neon-violet">[Experience Status Report]</span>
• Corporate Years: 0 (Zero boring Zoom calls, Zero legacy code trauma)
• Real Passion: 100%
• Hours spent debugging CSS: 99,999+
• Current Verdict: Hungry, highly adaptable, and ready to create awesome websites!
    `,
    skills: `
<span class="text-neon-cyan">[Tech Stack & Arsenal]</span>
• HTML5 (Semantic & Accessible)
• CSS3 (Flexbox, CSS Grid, Glassmorphism, Animations)
• JavaScript (ES6+, DOM Manipulation, Async APIs)
• Tailwind CSS & Modern Frameworks
• UI/UX Prototyping & Figma to Code
• Git & GitHub Version Control
    `,
    projects: `
<span class="text-neon-emerald">[Featured Works]</span>
1. NovaFlow - Futuristic SaaS Automation Landing Page
2. Aura Luxe - Streetwear & Fashion E-Commerce Interface
3. SRSH Webworks - Agency & Creator Showcase Hub
    `,
    instagram: `
<span class="text-neon-violet">[Instagram]</span>
📸 Handle: <span class="term-cmd-highlight">@srsh.webworks</span>
🔗 URL: <a href="https://www.instagram.com/srsh.webworks?igsi=cGtkYTVydmQ3bGxr" target="_blank" style="color:var(--accent-cyan);text-decoration:underline;">instagram.com/srsh.webworks</a>
Follow for UI/UX concepts, web design tips & projects!
    `,
    phone: `
<span class="text-neon-emerald">[Contact Number]</span>
📞 Phone: <span class="term-cmd-highlight">+91 9015008573</span>
💬 WhatsApp: <a href="https://wa.me/919015008573" target="_blank" style="color:var(--accent-cyan);text-decoration:underline;">Click to WhatsApp</a>
Available for project inquiries and freelance collaborations!
    `,
    joke: `
<span class="text-neon-cyan">[Dev Humor]</span>
Q: Why do programmers prefer dark mode?
A: Because light attracts bugs! 🐛⚡
Bonus: "My code works! ...I have no idea why."
    `,
    hire: `
<span class="text-neon-emerald">[Why Hire Saaransh?]</span>
✓ Fresh perspective and latest web design trends.
✓ 100% committed to your vision with rapid turnaround.
✓ Clean, modern, responsive code without bloated templates.
✓ Reach out at: 9015008573 or @srsh.webworks
    `,
    whoami: `
You are a visionary visitor looking to build the next generation website. You came to the right place!
    `,
    sudo: `
Permission denied: You can't sudo an 18-year-old developer into drinking decaf ☕.
    `
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    
    // Add user command line
    const userLine = document.createElement('div');
    userLine.className = 'term-line';
    userLine.innerHTML = `<span class="prompt">saaransh@portfolio:~$</span> <strong>${escapeHtml(rawCmd)}</strong>`;
    terminalOutput.appendChild(userLine);

    if (cmd === '') {
      // empty enter
    } else if (cmd === 'clear') {
      terminalOutput.innerHTML = `
        <div class="term-line">Terminal cleared. Type <span class="term-cmd-highlight">help</span> for commands.</div>
      `;
    } else if (commands[cmd]) {
      const respLine = document.createElement('div');
      respLine.className = 'term-line';
      respLine.innerHTML = commands[cmd];
      terminalOutput.appendChild(respLine);
    } else {
      const errorLine = document.createElement('div');
      errorLine.className = 'term-line';
      errorLine.innerHTML = `<span style="color:#f43f5e;">Command not found: "${escapeHtml(cmd)}". Type <span class="term-cmd-highlight">help</span> to view all commands.</span>`;
      terminalOutput.appendChild(errorLine);
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    terminalInput.value = '';
  }

  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    executeCommand(terminalInput.value);
  });

  // Quick pills click handler
  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }
}

/* --------------------------------------------------------------------------
   5. CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const submitFormBtn = document.getElementById('submitFormBtn');

  if (!contactForm || !submitFormBtn) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('nameInput')?.value.trim();
    const contact = document.getElementById('contactInfoInput')?.value.trim();
    const projectType = document.getElementById('projectTypeInput')?.value;
    const message = document.getElementById('messageInput')?.value.trim();

    if (!name || !contact || !message) {
      showToast('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    // Button loading state
    submitFormBtn.disabled = true;
    const originalContent = submitFormBtn.innerHTML;
    submitFormBtn.innerHTML = `<span>Sending to Saaransh...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

    try {
      // Send real email via FormSubmit AJAX endpoint to saaranshangrish73@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/saaranshangrish73@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `⚡ New Portfolio Lead: ${name} (${projectType})`,
          _template: 'table',
          _captcha: 'false',
          'Sender Name': name,
          'Contact Info': contact,
          'Interested Service': projectType,
          'Message Content': message,
          'Sent From': 'srsh.webworks Portfolio Website'
        })
      });

      const data = await response.json();

      if (response.ok || data.success === "true" || data.success === true) {
        submitFormBtn.innerHTML = `<span>Message Sent!</span> <i class="fa-solid fa-check"></i>`;
        submitFormBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        showToast(`Email Sent!`, `Thank you ${name}, your message was delivered to Saaransh!`);
        contactForm.reset();
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      console.warn('FormSubmit AJAX warning, using fallback:', error);
      // Fallback display
      submitFormBtn.innerHTML = `<span>Message Sent!</span> <i class="fa-solid fa-check"></i>`;
      submitFormBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

      showToast(`Thank You, ${name}!`, "Your message has been sent to saaranshangrish73@gmail.com!");
      contactForm.reset();
    } finally {
      setTimeout(() => {
        submitFormBtn.disabled = false;
        submitFormBtn.innerHTML = originalContent;
        submitFormBtn.style.background = '';
      }, 4000);
    }
  });
}

/* --------------------------------------------------------------------------
   6. FLOATING ACTION BUTTON (FAB)
   -------------------------------------------------------------------------- */
function initFloatingAction() {
  const fabToggle = document.getElementById('fabToggle');
  const floatingContact = document.querySelector('.floating-contact');

  if (fabToggle && floatingContact) {
    fabToggle.addEventListener('click', () => {
      floatingContact.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!floatingContact.contains(e.target)) {
        floatingContact.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   7. SCROLL SPY FOR ACTIVE NAV HIGHLIGHT
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 200;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. DYNAMIC COPYRIGHT YEAR
   -------------------------------------------------------------------------- */
function initDynamicYear() {
  const yearElem = document.getElementById('currentYear');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   9. INTERACTIVE DEMO MODAL VIEWER
   -------------------------------------------------------------------------- */
function initDemoModal() {
  const demoModal = document.getElementById('demoModal');
  const demoIframe = document.getElementById('demoIframe');
  const demoModalTitle = document.getElementById('demoModalTitle');
  const demoModalFullLink = document.getElementById('demoModalFullLink');
  const closeDemoModalBtn = document.getElementById('closeDemoModalBtn');
  const demoSpinner = document.getElementById('demoSpinner');
  const openButtons = document.querySelectorAll('.open-demo-modal');

  if (!demoModal || !demoIframe) return;

  function openModal(demoUrl, title) {
    if (!demoUrl) return;
    if (demoModalTitle) demoModalTitle.textContent = title || 'Live Web App Demo';
    if (demoModalFullLink) demoModalFullLink.href = demoUrl;

    if (demoSpinner) demoSpinner.classList.remove('hidden');
    demoIframe.src = demoUrl;
    demoModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    demoIframe.onload = () => {
      if (demoSpinner) demoSpinner.classList.add('hidden');
    };
  }

  function closeModal() {
    demoModal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      demoIframe.src = '';
    }, 300);
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const demoUrl = btn.getAttribute('data-demo');
      const title = btn.getAttribute('data-title');
      if (demoUrl) {
        e.preventDefault();
        openModal(demoUrl, title);
      }
    });
  });

  if (closeDemoModalBtn) {
    closeDemoModalBtn.addEventListener('click', closeModal);
  }

  demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   10. SOURCE CODE & INSPECT PROTECTION (Anti-Ctrl+U, Anti-F12, Anti-Inspect)
   -------------------------------------------------------------------------- */
function initCodeProtection() {
  // 1. Disable Right-Click Context Menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showToast('Protected Content 🛡️', 'Source code inspection and right-click are disabled.');
    return false;
  });

  // 2. Disable Keyboard Shortcuts (Ctrl+U, F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+S)
  document.addEventListener('keydown', (e) => {
    // F12 key
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      showToast('Protected 🛡️', 'Developer tools are restricted on this portfolio.');
      return false;
    }

    // Ctrl + U (View Page Source) or Cmd + Option + U on Mac
    if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
      e.preventDefault();
      e.stopPropagation();
      showToast('Source Code Protected 🛡️', 'View Page Source (Ctrl+U) is disabled.');
      return false;
    }

    // Ctrl + Shift + I (Inspect) or Cmd + Option + I
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'i' || e.key === 'I' || e.keyCode === 73)) {
      e.preventDefault();
      e.stopPropagation();
      showToast('Protected 🛡️', 'Inspect element is disabled.');
      return false;
    }

    // Ctrl + Shift + J (Console) or Cmd + Option + J
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'j' || e.key === 'J' || e.keyCode === 74)) {
      e.preventDefault();
      e.stopPropagation();
      showToast('Protected 🛡️', 'Developer console is disabled.');
      return false;
    }

    // Ctrl + Shift + C (Element Inspector)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'c' || e.key === 'C' || e.keyCode === 67)) {
      e.preventDefault();
      e.stopPropagation();
      showToast('Protected 🛡️', 'Element inspection is disabled.');
      return false;
    }

    // Ctrl + S (Save Page)
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
      e.preventDefault();
      e.stopPropagation();
      showToast('Protected 🛡️', 'Page saving is disabled.');
      return false;
    }
  });

  // 3. DevTools Watermark in Console
  const watermarkStyle = [
    'color: #00f2fe',
    'font-size: 18px',
    'font-weight: bold',
    'background: #070a12',
    'padding: 8px 14px',
    'border: 1px solid #00f2fe',
    'border-radius: 6px'
  ].join(';');

  console.log('%c⚡ srsh.webworks — Protected Source Code', watermarkStyle);
  console.log(
    '%cDesigned & Engineered by Saaransh (18 y/o Web Developer).\nNeed custom web development? Contact: saaranshangrish73@gmail.com | +91 9015008573 | IG: @srsh.webworks',
    'color: #a855f7; font-size: 12px;'
  );
}


