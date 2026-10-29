/**
 * Orange City Naturals - Main JavaScript (script.js)
 * Course Assignment: UI/UX Web Design
 *
 * Beginner-friendly vanilla JavaScript:
 * 1. Mobile navigation menu toggle with accessible ARIA attributes
 * 2. Contact form submission handler (with transparent demo feedback)
 * 3. Dynamic current year helper
 */

// Run our script once the HTML DOM is fully parsed and loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initContactForm();
  updateCopyrightYear();
});

/**
 * 1. Accessible Mobile Navigation Toggle
 * Expands/collapses the navigation drawer on mobile viewports.
 * Updates aria-expanded for screen readers.
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('is-open');

    // Update toggle button text/icon state
    const iconSpan = toggleBtn.querySelector('.toggle-icon');
    if (iconSpan) {
      iconSpan.textContent = !isExpanded ? '✕' : '☰';
    }
  });

  // Close navigation menu if user presses Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
      mainNav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      const iconSpan = toggleBtn.querySelector('.toggle-icon');
      if (iconSpan) iconSpan.textContent = '☰';
      toggleBtn.focus();
    }
  });
}

/**
 * 2. Contact Form Demonstration Handler
 * Fulfills Requirement 6: "Make the contact form's functionality clear.
 * Do not pretend that it sends messages unless a backend is configured."
 */
function initContactForm() {
  const contactForm = document.getElementById('enquiryForm');
  const resultBox = document.getElementById('formResultBox');

  if (!contactForm || !resultBox) return;

  contactForm.addEventListener('submit', (event) => {
    // Prevent the default browser page reload / post to unconfigured URL
    event.preventDefault();

    // Read form input values
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const topicSelect = document.getElementById('enquiryTopic');
    const messageInput = document.getElementById('userMessage');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const topic = topicSelect ? topicSelect.value : 'General Enquiry';
    const message = messageInput ? messageInput.value.trim() : '';

    // Basic client-side validation
    if (!name || !email || !message) {
      alert('Please fill in all required fields before submitting.');
      return;
    }

    // Populate the assignment preview summary
    const previewSummary = document.getElementById('submittedSummary');
    if (previewSummary) {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      previewSummary.innerHTML = `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Enquiry Type:</strong> ${escapeHtml(topic)}</p>
        <p><strong>Message:</strong> ${escapeHtml(message)}</p>
        <p><small style="color:#5e5248;">Captured at ${now} (Browser Local Memory Preview)</small></p>
      `;
    }

    // Display the demonstration result box with smooth focus
    resultBox.classList.add('active');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    resultBox.setAttribute('tabindex', '-1');
    resultBox.focus();

    // Disable submit button temporarily to demonstrate completion
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '✓ Submitted to Demo';
    }
  });

  // Setup reset button to test another submission
  const resetBtn = document.getElementById('resetDemoBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      contactForm.reset();
      resultBox.classList.remove('active');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Enquiry';
      }
      const nameInput = document.getElementById('userName');
      if (nameInput) nameInput.focus();
    });
  }
}

/**
 * 3. Copyright year helper
 * Keeps the footer year up to date automatically.
 */
function updateCopyrightYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Helper to escape HTML characters in user-entered preview strings
 * to prevent XSS in DOM rendering.
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
