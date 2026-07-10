document.addEventListener('DOMContentLoaded', () => {
  // Elements Cache
  const form = document.getElementById('user-creation-form');
  const photoInput = document.getElementById('profile-photo');
  const previewImage = document.getElementById('preview-image');
  const uploadTrigger = document.getElementById('profile-upload-trigger');
  const photoError = document.getElementById('profile-photo-error');
  const uploadControls = document.getElementById('upload-controls');
  const removePhotoBtn = document.getElementById('remove-photo-btn');
  const replacePhotoBtn = document.getElementById('replace-photo-btn');
  
  // Navigation elements
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  const stepsIndicator = document.getElementById('steps-indicator');
  const stepTitle = document.getElementById('wizard-step-title');
  const stepSubtitle = document.getElementById('wizard-step-subtitle');
  
  // Completion metrics
  const completionPercentage = document.getElementById('completion-percentage');
  const completionFill = document.getElementById('completion-fill');
  
  // Fields elements
  const userIdInput = document.getElementById('userid');
  const usernameInput = document.getElementById('username');
  const usernameStatus = document.getElementById('username-status');
  const roleSelect = document.getElementById('role');
  const dobInput = document.getElementById('dob');
  const ageDisplayWrapper = document.getElementById('age-display-wrapper');
  const calculatedAgeSpan = document.getElementById('calculated-age');
  
  // Dynamic Role Groups
  const roleFieldsDoctor = document.getElementById('role-fields-doctor');
  const roleFieldsPatient = document.getElementById('role-fields-patient');
  const roleFieldsCaregiver = document.getElementById('role-fields-caregiver');
  const roleFieldsAdmin = document.getElementById('role-fields-admin');
  const emergencyContactGroup = document.getElementById('emergency-contact-group');
  
  // Textareas
  const addressTextarea = document.getElementById('address');
  const addressCharCount = document.getElementById('address-char-count');
  const patHistoryTextarea = document.getElementById('pat-history');
  const patHistoryCharCount = document.getElementById('pat-history-char-count');
  const patAllergiesTextarea = document.getElementById('pat-allergies');
  const patAllergiesCharCount = document.getElementById('pat-allergies-char-count');
  
  // Password elements
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const toggleConfirmPasswordBtn = document.getElementById('toggle-confirm-password');
  const strengthBox = document.getElementById('strength-box');
  const strengthLabel = document.getElementById('strength-label');
  const bar1 = document.getElementById('bar-1');
  const bar2 = document.getElementById('bar-2');
  const bar3 = document.getElementById('bar-3');
  const ruleLength = document.getElementById('rule-length');
  const ruleUpperLower = document.getElementById('rule-upper-lower');
  const ruleNumber = document.getElementById('rule-number');
  const ruleSpecial = document.getElementById('rule-special');
  
  // Modals
  const loadingOverlay = document.getElementById('loading-overlay');
  const successModal = document.getElementById('success-modal');
  const successDoneBtn = document.getElementById('success-done-btn');
  const resetConfirmModal = document.getElementById('reset-confirm-modal');
  const resetCancelBtn = document.getElementById('reset-cancel-btn');
  const resetConfirmBtn = document.getElementById('reset-confirm-btn');
  const resetButton = document.getElementById('reset-btn');
  
  // Review page variables
  const reviewDisplayName = document.getElementById('review-display-name');
  const reviewDisplayRole = document.getElementById('review-display-role');
  const reviewDisplayUserid = document.getElementById('review-display-userid');
  const reviewProfileImg = document.getElementById('review-profile-img');
  const reviewUsernameVal = document.getElementById('review-username-val');
  const reviewEmailVal = document.getElementById('review-email-val');
  const reviewPhoneVal = document.getElementById('review-phone-val');
  const reviewDobVal = document.getElementById('review-dob-val');
  const reviewGenderVal = document.getElementById('review-gender-val');
  const reviewAddressVal = document.getElementById('review-address-val');
  const reviewRoleSpecificInfo = document.getElementById('review-role-specific-info');
  
  // Search Simulation Cache
  const searchUsernameInput = document.getElementById('search-username-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const searchResultsDropdown = document.getElementById('search-results-dropdown');

  // SVG Cache
  const svgEyeOpen = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  const svgEyeClosed = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
  const defaultProfilePhotoSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2364748b'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

  // Mock Database of Existing Users
  const mockUsers = [
    {
      userid: "SM0102",
      fullname: "Dr. Sarah Jenkins",
      username: "sarahj",
      email: "sarah.j@smartmed.com",
      phone: "9876543210",
      dob: "1980-05-15",
      gender: "Female",
      role: "Doctor",
      country: "United States",
      state: "Oregon",
      city: "Springfield",
      zip: "97477",
      address: "742 Evergreen Terrace, Medical District",
      photo: defaultProfilePhotoSvg,
      docEmployeeId: "DOC-2023-09",
      docDepartment: "Cardiology",
      docLicense: "LIC-77491-A",
      docSpecialization: "Interventional Cardiology",
      docExperience: "15",
      docJoining: "2023-01-10"
    },
    {
      userid: "SM0205",
      fullname: "Michael Robert Caine",
      username: "michaelc",
      email: "michael.caine@gmail.com",
      phone: "8885551234",
      dob: "1995-11-22",
      gender: "Male",
      role: "Patient",
      country: "Australia",
      state: "New South Wales",
      city: "Sydney",
      zip: "2000",
      address: "42 Wallaby Way, Sydney Cove",
      photo: defaultProfilePhotoSvg,
      patId: "PT-0492",
      patBlood: "O+",
      patInsurance: "INS-992-CA",
      patHistory: "No major chronic illnesses. Appendix removed in 2018.",
      patAllergies: "Allergic to Penicillin and Shellfish.",
      emergencyName: "Jane Caine",
      emergencyRelation: "Spouse",
      emergencyPhone: "8885559876"
    },
    {
      userid: "SM0309",
      fullname: "Elena Rostova",
      username: "elenar",
      email: "elena.r@smartmed.com",
      phone: "7776665555",
      dob: "1988-08-08",
      gender: "Female",
      role: "Caregiver",
      country: "United Kingdom",
      state: "London",
      city: "London",
      zip: "SW1A 2AA",
      address: "10 Downing St, Westminster",
      photo: defaultProfilePhotoSvg,
      carEmployeeId: "CAR-993-N",
      carRelationship: "Registered Nurse",
      carAssignedPatient: "Michael Robert Caine (SM0205)",
      carShift: "Morning",
      emergencyName: "Dmitry Rostov",
      emergencyRelation: "Brother",
      emergencyPhone: "7773332222"
    }
  ];

  // Wizard state variables
  let currentStep = 1;
  let photoBase64 = null;
  let isUsernameChecking = false;
  let usernameCheckedState = 'empty'; // 'empty', 'checking', 'available', 'taken'
  let usernameDebounceTimer = null;
  let isDirty = false;

  // Set initial dates and IDs
  initMaxDobDate();
  generateUserId();

  // Load Saved Draft on Init
  restoreDraftFromStorage();

  // Set floating labels positioning state
  const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
  
  formInputs.forEach(input => {
    const group = input.closest('.form-group');
    if (!group) return;

    const updateLabelPosition = () => {
      if (input.value && input.value.trim() !== '') {
        group.classList.add('has-value');
      } else {
        group.classList.remove('has-value');
      }
    };

    input.addEventListener('focus', () => {
      group.classList.add('has-value');
    });

    input.addEventListener('blur', () => {
      updateLabelPosition();
      validateField(input);
    });

    input.addEventListener('input', () => {
      updateLabelPosition();
      isDirty = true;
      saveDraftToStorage();
      updateProfileCompletion();
      
      if (group.classList.contains('error-state')) {
        validateField(input);
      }
    });

    // Run initial positioning
    setTimeout(updateLabelPosition, 100);
  });

  // --- AGE CALCULATION ---
  dobInput.addEventListener('input', () => {
    calculateAge();
  });

  function calculateAge() {
    const dobValue = dobInput.value;
    if (!dobValue) {
      ageDisplayWrapper.style.display = 'none';
      return;
    }
    const birthDate = new Date(dobValue);
    const today = new Date();
    
    if (birthDate > today) {
      ageDisplayWrapper.style.display = 'none';
      return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age >= 0) {
      calculatedAgeSpan.textContent = `Age: ${age} Years`;
      ageDisplayWrapper.style.display = 'flex';
    } else {
      ageDisplayWrapper.style.display = 'none';
    }
  }

  function initMaxDobDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    dobInput.max = `${yyyy}-${mm}-${dd}`;
  }

  // --- USER ID & PATIENT ID GENERATION ---
  function generateUserId() {
    if (userIdInput.value !== '') return;
    
    let nextNum = parseInt(localStorage.getItem('smartmed_last_userid_index') || '10');
    nextNum++;
    
    const formattedId = `SM${String(nextNum).padStart(4, '0')}`;
    userIdInput.value = formattedId;
    userIdInput.closest('.form-group').classList.add('has-value');
  }

  function generatePatientId() {
    const patIdInput = document.getElementById('pat-id');
    if (!patIdInput || patIdInput.value !== '') return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    patIdInput.value = `PT-${randomNum}`;
    patIdInput.closest('.form-group').classList.add('has-value');
  }

  // --- CHARACTER COUNTERS ---
  function setupCharCounter(textarea, counterEl) {
    if (!textarea || !counterEl) return;
    const updateCount = () => {
      const length = textarea.value.length;
      const max = textarea.getAttribute('maxlength') || 500;
      counterEl.textContent = `${length} / ${max} characters`;
    };
    textarea.addEventListener('input', updateCount);
    updateCount();
  }

  setupCharCounter(addressTextarea, addressCharCount);
  setupCharCounter(patHistoryTextarea, patHistoryCharCount);
  setupCharCounter(patAllergiesTextarea, patAllergiesCharCount);

  // --- DRAG AND DROP PROFILE PHOTO ---
  uploadTrigger.addEventListener('click', () => {
    photoInput.click();
  });

  replacePhotoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    photoInput.click();
  });

  removePhotoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    previewImage.src = defaultProfilePhotoSvg;
    photoInput.value = '';
    photoBase64 = null;
    uploadControls.style.display = 'none';
    uploadTrigger.closest('.profile-upload-container').classList.remove('success-state');
    isDirty = true;
    saveDraftToStorage();
    updateProfileCompletion();
  });

  uploadTrigger.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadTrigger.style.transform = 'scale(1.05)';
    uploadTrigger.style.boxShadow = 'var(--shadow-lg), 0 0 0 3px var(--primary-blue)';
  });

  uploadTrigger.addEventListener('dragleave', () => {
    uploadTrigger.style.transform = 'none';
    uploadTrigger.style.boxShadow = 'var(--shadow-md), 0 0 0 2px var(--primary-blue)';
  });

  uploadTrigger.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadTrigger.style.transform = 'none';
    uploadTrigger.style.boxShadow = 'var(--shadow-md), 0 0 0 2px var(--primary-blue)';
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhotoFile(e.dataTransfer.files[0]);
    }
  });

  photoInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handlePhotoFile(e.target.files[0]);
    }
  });

  function handlePhotoFile(file) {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 2 * 1024 * 1024; // 2MB
    
    photoError.textContent = "";
    document.getElementById('photo-instructions').style.color = "var(--text-muted)";

    if (!validTypes.includes(file.type)) {
      setPhotoError("Only JPG, JPEG, and PNG formats are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setPhotoError("Image size must be smaller than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      photoBase64 = e.target.result;
      uploadControls.style.display = 'flex';
      uploadTrigger.closest('.profile-upload-container').classList.add('success-state');
      isDirty = true;
      saveDraftToStorage();
      updateProfileCompletion();
    };
    reader.readAsDataURL(file);
  }

  function setPhotoError(message) {
    photoInput.value = '';
    previewImage.src = defaultProfilePhotoSvg;
    photoBase64 = null;
    uploadControls.style.display = 'none';
    photoError.textContent = message;
    photoError.style.opacity = 1;
    photoError.style.height = "auto";
    photoError.style.overflow = "visible";
    document.getElementById('photo-instructions').style.color = "var(--text-error)";
  }

  // --- USERNAME AVAILABILITY CHECK ---
  usernameInput.addEventListener('input', () => {
    const username = usernameInput.value.trim();
    clearTimeout(usernameDebounceTimer);
    
    if (username.length < 4) {
      usernameStatus.style.display = 'none';
      usernameCheckedState = 'empty';
      return;
    }

    usernameStatus.textContent = "Checking...";
    usernameStatus.className = "username-status-badge checking";
    usernameStatus.style.display = 'inline-block';
    usernameCheckedState = 'checking';

    usernameDebounceTimer = setTimeout(() => {
      // Check in mock DB
      const exists = mockUsers.some(user => user.username.toLowerCase() === username.toLowerCase());
      
      if (exists) {
        usernameStatus.textContent = "Already Exists";
        usernameStatus.className = "username-status-badge taken";
        usernameCheckedState = 'taken';
        showError(usernameInput, "Username already exists in system database.");
      } else {
        usernameStatus.textContent = "Available";
        usernameStatus.className = "username-status-badge available";
        usernameCheckedState = 'available';
        showSuccess(usernameInput);
      }
      isDirty = true;
      saveDraftToStorage();
      updateProfileCompletion();
    }, 800);
  });

  // --- DYNAMIC ROLE-BASED TOGGLES ---
  roleSelect.addEventListener('change', () => {
    toggleRoleFields(roleSelect.value);
    isDirty = true;
    saveDraftToStorage();
    updateProfileCompletion();
  });

  function toggleRoleFields(role) {
    // Hide all first
    roleFieldsDoctor.style.display = 'none';
    roleFieldsPatient.style.display = 'none';
    roleFieldsCaregiver.style.display = 'none';
    roleFieldsAdmin.style.display = 'none';
    emergencyContactGroup.style.display = 'none';

    // Remove required elements from fields to avoid blocking step navigation
    clearRequiredAttributes();

    if (role === 'Doctor') {
      roleFieldsDoctor.style.display = 'block';
      setRequiredFields(['doc-employee-id', 'doc-department', 'doc-license', 'doc-specialization', 'doc-experience', 'doc-joining']);
    } else if (role === 'Patient') {
      roleFieldsPatient.style.display = 'block';
      emergencyContactGroup.style.display = 'block';
      generatePatientId();
      setRequiredFields(['pat-blood', 'pat-insurance', 'emergency-name', 'emergency-relation', 'emergency-phone']);
    } else if (role === 'Caregiver') {
      roleFieldsCaregiver.style.display = 'block';
      emergencyContactGroup.style.display = 'block';
      setRequiredFields(['car-employee-id', 'car-relationship', 'car-assigned-patient', 'car-shift', 'emergency-name', 'emergency-relation', 'emergency-phone']);
    } else if (role === 'Admin') {
      roleFieldsAdmin.style.display = 'block';
    }
  }

  function setRequiredFields(ids) {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('required', 'required');
    });
  }

  function clearRequiredAttributes() {
    const allDynamicIds = [
      'doc-employee-id', 'doc-department', 'doc-license', 'doc-specialization', 'doc-experience', 'doc-joining',
      'pat-blood', 'pat-insurance', 'pat-history', 'pat-allergies',
      'car-employee-id', 'car-relationship', 'car-assigned-patient', 'car-shift',
      'emergency-name', 'emergency-relation', 'emergency-phone'
    ];
    allDynamicIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.removeAttribute('required');
    });
  }

  // --- PASSWORD TOGGLE VISIBILITY ---
  function setupPasswordToggle(btn, inputEl) {
    if (!btn || !inputEl) return;
    btn.addEventListener('click', () => {
      const type = inputEl.getAttribute('type') === 'password' ? 'text' : 'password';
      inputEl.setAttribute('type', type);
      
      if (type === 'text') {
        btn.innerHTML = svgEyeOpen;
        btn.setAttribute('aria-label', 'Hide password');
      } else {
        btn.innerHTML = svgEyeClosed;
        btn.setAttribute('aria-label', 'Show password');
      }
    });
  }

  setupPasswordToggle(togglePasswordBtn, passwordInput);
  setupPasswordToggle(toggleConfirmPasswordBtn, confirmPasswordInput);

  // --- PASSWORD STRENGTH ENGINE ---
  passwordInput.addEventListener('focus', () => {
    strengthBox.classList.add('active');
  });

  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    if (val === '') {
      strengthBox.classList.remove('active');
      return;
    } else {
      strengthBox.classList.add('active');
    }

    const hasLength = val.length >= 8;
    const hasUpperLower = /[A-Z]/.test(val) && /[a-z]/.test(val);
    const hasDigit = /[0-9]/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);

    updateCriteriaItem(ruleLength, hasLength);
    updateCriteriaItem(ruleUpperLower, hasUpperLower);
    updateCriteriaItem(ruleNumber, hasDigit);
    updateCriteriaItem(ruleSpecial, hasSpecial);

    const score = [hasLength, hasUpperLower, hasDigit, hasSpecial].filter(Boolean).length;
    
    resetStrengthBars();
    
    if (score <= 1) {
      strengthLabel.textContent = "Very Weak";
      strengthLabel.style.color = "var(--text-error)";
      bar1.classList.add('weak');
    } else if (score === 2) {
      strengthLabel.textContent = "Medium";
      strengthLabel.style.color = "#f59e0b";
      bar1.classList.add('medium');
      bar2.classList.add('medium');
    } else if (score === 3) {
      strengthLabel.textContent = "Good";
      strengthLabel.style.color = "var(--primary-blue)";
      bar1.classList.add('medium');
      bar2.classList.add('medium');
      bar3.classList.add('medium');
    } else {
      strengthLabel.textContent = "Strong";
      strengthLabel.style.color = "var(--text-success)";
      bar1.classList.add('strong');
      bar2.classList.add('strong');
      bar3.classList.add('strong');
    }
  });

  passwordInput.addEventListener('blur', () => {
    if (passwordInput.value === '') {
      strengthBox.classList.remove('active');
    }
  });

  function updateCriteriaItem(el, isMet) {
    if (!el) return;
    if (isMet) {
      el.classList.add('met');
      el.querySelector('svg').innerHTML = `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      el.classList.remove('met');
      el.querySelector('svg').innerHTML = `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
  }

  function resetStrengthBars() {
    const bars = [bar1, bar2, bar3];
    bars.forEach(bar => {
      if (bar) bar.className = 'strength-bar';
    });
  }

  // --- VALIDATION CORE ENGINE ---
  function showError(input, message) {
    if (!input) return;
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.remove('success-state');
    group.classList.add('error-state');
    
    const errEl = group.querySelector('.error-message');
    if (errEl) {
      errEl.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        ${message}
      `;
    }
  }

  function showSuccess(input) {
    if (!input) return;
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.remove('error-state');
    group.classList.add('success-state');
    
    const errEl = group.querySelector('.error-message');
    if (errEl) {
      errEl.textContent = '';
    }
  }

  function clearValidationState(input) {
    if (!input) return;
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.remove('error-state', 'success-state');
    const errEl = group.querySelector('.error-message');
    if (errEl) {
      errEl.textContent = '';
    }
  }

  function validateField(input) {
    if (!input) return true;
    const id = input.id;
    const value = input.value.trim();
    const isRequired = input.hasAttribute('required');

    if (value === '') {
      if (isRequired) {
        let nameLabel = input.nextElementSibling ? input.nextElementSibling.textContent.replace('*', '').trim() : 'Field';
        if (id === 'dob') nameLabel = "Date of Birth";
        showError(input, `${nameLabel} is required.`);
        return false;
      }
      clearValidationState(input);
      return true;
    }

    // Specific rules matching
    if (id === 'fullname') {
      const nameRegex = /^[A-Za-z]+([\s'.-][A-Za-z]+)*$/;
      if (value.length < 2) {
        showError(input, "Full name must be at least 2 characters.");
        return false;
      }
      if (!nameRegex.test(value)) {
        showError(input, "Please enter a valid name (letters, spaces, hyphens, periods only).");
        return false;
      }
    }

    if (id === 'username') {
      const usernameRegex = /^[a-zA-Z0-9._]+$/;
      if (value.length < 4) {
        showError(input, "Username must be at least 4 characters.");
        return false;
      }
      if (!usernameRegex.test(value)) {
        showError(input, "Username can only contain letters, digits, dots, or underscores.");
        return false;
      }
      if (usernameCheckedState === 'taken') {
        showError(input, "Username already exists in system database.");
        return false;
      }
    }

    if (id === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showError(input, "Please enter a valid email address.");
        return false;
      }
    }

    if (id === 'phone' || id === 'emergency-phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length !== 10) {
        showError(input, "Phone number must contain exactly 10 digits.");
        return false;
      }
      input.value = digitsOnly;
    }

    if (id === 'dob') {
      const dobDate = new Date(value);
      const today = new Date();
      if (dobDate > today) {
        showError(input, "Date of Birth cannot be in the future.");
        return false;
      }
      const maxAgeDate = new Date();
      maxAgeDate.setFullYear(today.getFullYear() - 120);
      if (dobDate < maxAgeDate) {
        showError(input, "Please select a realistic Date of Birth.");
        return false;
      }
    }

    if (id === 'address') {
      if (value.length < 10) {
        showError(input, "Please write a comprehensive street address (min 10 characters).");
        return false;
      }
    }

    if (id === 'password') {
      const hasLength = value.length >= 8;
      const hasUpperLower = /[A-Z]/.test(value) && /[a-z]/.test(value);
      const hasDigit = /[0-9]/.test(value);
      const hasSpecial = /[^A-Za-z0-9]/.test(value);

      if (!hasLength || !hasUpperLower || !hasDigit || !hasSpecial) {
        showError(input, "Password does not meet all guidelines below.");
        return false;
      }

      if (confirmPasswordInput.value.trim() !== '') {
        validateField(confirmPasswordInput);
      }
    }

    if (id === 'confirm-password') {
      if (value !== passwordInput.value) {
        showError(input, "Passwords do not match. Please verify.");
        return false;
      }
    }

    // Number verification for Experience
    if (id === 'doc-experience') {
      const num = parseInt(value);
      if (isNaN(num) || num < 0 || num > 80) {
        showError(input, "Please enter a valid experience period (0 to 80 years).");
        return false;
      }
    }

    showSuccess(input);
    return true;
  }

  // --- MULTI-STEP NAVIGATION LOGIC ---
  function getStepFields(stepNum) {
    if (stepNum === 1) {
      return ['username', 'role'];
    }
    if (stepNum === 2) {
      return ['fullname', 'dob', 'gender', 'email', 'phone', 'country', 'state', 'city', 'zip', 'address'];
    }
    if (stepNum === 3) {
      const role = roleSelect.value;
      if (role === 'Doctor') {
        return ['doc-employee-id', 'doc-department', 'doc-license', 'doc-specialization', 'doc-experience', 'doc-joining'];
      }
      if (role === 'Patient') {
        return ['pat-blood', 'pat-insurance', 'emergency-name', 'emergency-relation', 'emergency-phone'];
      }
      if (role === 'Caregiver') {
        return ['car-employee-id', 'car-relationship', 'car-assigned-patient', 'car-shift', 'emergency-name', 'emergency-relation', 'emergency-phone'];
      }
      return []; // Admin needs no fields
    }
    if (stepNum === 4) {
      return ['password', 'confirm-password'];
    }
    return [];
  }

  function validateStep(stepNum) {
    let isValid = true;
    
    // Custom check for profile picture in Step 1
    if (stepNum === 1 && !photoBase64) {
      setPhotoError("Profile photo upload is required to register a profile.");
      isValid = false;
    }

    // Validate step fields
    const fieldIds = getStepFields(stepNum);
    fieldIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const fieldValid = validateField(el);
        if (!fieldValid) isValid = false;
      }
    });

    if (stepNum === 1 && usernameCheckedState === 'taken') {
      isValid = false;
    }

    return isValid;
  }

  function updateWizardUI() {
    // 1. Show/hide fieldsets
    for (let i = 1; i <= 5; i++) {
      const fieldset = document.getElementById(`step-${i}-fieldset`);
      if (fieldset) {
        if (i === currentStep) {
          fieldset.classList.add('active');
        } else {
          fieldset.classList.remove('active');
        }
      }
    }

    // 2. Update step titles
    updateTitles();

    // 3. Update step indicator nodes
    const nodes = stepsIndicator.querySelectorAll('.step-indicator-node');
    nodes.forEach(node => {
      const stepIdx = parseInt(node.getAttribute('data-step'));
      node.className = 'step-indicator-node';
      
      if (stepIdx === currentStep) {
        node.classList.add('active');
      } else if (stepIdx < currentStep) {
        node.classList.add('completed');
        // Set completed nodes to checkmark
        node.querySelector('.node-circle').innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width: 14px; height: 14px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      } else {
        node.querySelector('.node-circle').textContent = stepIdx;
      }
    });

    const lines = stepsIndicator.querySelectorAll('.step-indicator-line');
    lines.forEach((line, idx) => {
      if (idx < currentStep - 1) {
        line.classList.add('completed');
      } else {
        line.classList.remove('completed');
      }
    });

    // 4. Update Navigation Buttons
    if (currentStep === 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'inline-flex';
      submitBtn.style.display = 'none';
    } else if (currentStep === 5) {
      prevBtn.style.display = 'inline-flex';
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'inline-flex';
      populateReviewData();
    } else {
      prevBtn.style.display = 'inline-flex';
      nextBtn.style.display = 'inline-flex';
      submitBtn.style.display = 'none';
    }

    // Scroll card to top view
    document.querySelector('.card').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateTitles() {
    const titles = {
      1: { title: "Profile Information", sub: "Initialize clinical credentials, identity number, and account role." },
      2: { title: "Personal Details", sub: "Input general identification parameters, contact details, and location." },
      3: { title: "Healthcare Information", sub: "Provide medical record metrics or practitioner credentials details." },
      4: { title: "Security Details", sub: "Establish high-security authentication parameters and credentials." },
      5: { title: "Review & Submit", sub: "Audit input metrics, verify role permissions, and submit form." }
    };

    stepTitle.textContent = titles[currentStep].title;
    stepSubtitle.textContent = titles[currentStep].sub;
  }

  // Next / Prev button events
  nextBtn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      currentStep++;
      saveDraftToStorage();
      updateWizardUI();
    } else {
      // Shake step container or highlight first error
      const activeFieldset = document.querySelector('.form-step-fieldset.active');
      const firstErr = activeFieldset.querySelector('.error-state input, .error-state select, .error-state textarea');
      if (firstErr) {
        firstErr.focus();
        firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      saveDraftToStorage();
      updateWizardUI();
    }
  });

  // Step Node clicks (Allow going back)
  stepsIndicator.querySelectorAll('.step-indicator-node').forEach(node => {
    node.addEventListener('click', () => {
      const targetStep = parseInt(node.getAttribute('data-step'));
      if (targetStep < currentStep) {
        currentStep = targetStep;
        saveDraftToStorage();
        updateWizardUI();
      } else if (targetStep > currentStep) {
        // Can only skip forward if intermediate steps are fully valid
        let pathValid = true;
        for (let i = currentStep; i < targetStep; i++) {
          if (!validateStep(i)) {
            pathValid = false;
            break;
          }
        }
        if (pathValid) {
          currentStep = targetStep;
          saveDraftToStorage();
          updateWizardUI();
        }
      }
    });
  });

  // Edit Step buttons on Review step
  document.querySelectorAll('.btn-edit-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.getAttribute('data-target-step'));
      currentStep = step;
      saveDraftToStorage();
      updateWizardUI();
    });
  });

  // --- DYNAMIC PROFILE COMPLETION CALCULATOR ---
  function updateProfileCompletion() {
    // Collect all required elements
    const requiredInputs = [
      { el: photoBase64, weight: 1 },
      { el: usernameInput.value, weight: 1, minLen: 4 },
      { el: roleSelect.value, weight: 1 },
      { el: document.getElementById('fullname').value, weight: 1, minLen: 2 },
      { el: dobInput.value, weight: 1 },
      { el: document.getElementById('gender').value, weight: 1 },
      { el: document.getElementById('email').value, weight: 1 },
      { el: document.getElementById('phone').value, weight: 1, minLen: 10 },
      { el: document.getElementById('country').value, weight: 1 },
      { el: document.getElementById('state').value, weight: 1 },
      { el: document.getElementById('city').value, weight: 1 },
      { el: document.getElementById('zip').value, weight: 1 },
      { el: addressTextarea.value, weight: 1, minLen: 10 }
    ];

    // Add role specific fields to required metrics count
    const role = roleSelect.value;
    if (role === 'Doctor') {
      requiredInputs.push(
        { el: document.getElementById('doc-employee-id').value, weight: 1 },
        { el: document.getElementById('doc-department').value, weight: 1 },
        { el: document.getElementById('doc-license').value, weight: 1 },
        { el: document.getElementById('doc-specialization').value, weight: 1 },
        { el: document.getElementById('doc-experience').value, weight: 1 },
        { el: document.getElementById('doc-joining').value, weight: 1 }
      );
    } else if (role === 'Patient') {
      requiredInputs.push(
        { el: document.getElementById('pat-blood').value, weight: 1 },
        { el: document.getElementById('pat-insurance').value, weight: 1 },
        { el: document.getElementById('emergency-name').value, weight: 1 },
        { el: document.getElementById('emergency-relation').value, weight: 1 },
        { el: document.getElementById('emergency-phone').value, weight: 1 }
      );
    } else if (role === 'Caregiver') {
      requiredInputs.push(
        { el: document.getElementById('car-employee-id').value, weight: 1 },
        { el: document.getElementById('car-relationship').value, weight: 1 },
        { el: document.getElementById('car-assigned-patient').value, weight: 1 },
        { el: document.getElementById('car-shift').value, weight: 1 },
        { el: document.getElementById('emergency-name').value, weight: 1 },
        { el: document.getElementById('emergency-relation').value, weight: 1 },
        { el: document.getElementById('emergency-phone').value, weight: 1 }
      );
    }

    // Add security fields
    requiredInputs.push(
      { el: passwordInput.value, weight: 1, minLen: 8 },
      { el: confirmPasswordInput.value, weight: 1, matches: passwordInput.value }
    );

    let completedWeight = 0;
    let totalWeight = 0;

    requiredInputs.forEach(item => {
      totalWeight += item.weight;
      let isMet = false;
      if (item.el !== null && item.el !== undefined && item.el !== '') {
        isMet = true;
        if (item.minLen && item.el.toString().trim().length < item.minLen) {
          isMet = false;
        }
        if (item.matches && item.el !== item.matches) {
          isMet = false;
        }
      }
      if (isMet) {
        completedWeight += item.weight;
      }
    });

    const percent = Math.round((completedWeight / totalWeight) * 100);
    completionPercentage.textContent = `${percent}%`;
    completionFill.style.width = `${percent}%`;
  }

  // --- REVIEW STEP POPULATION ---
  function populateReviewData() {
    reviewDisplayName.textContent = document.getElementById('fullname').value || 'User Details';
    reviewDisplayRole.textContent = roleSelect.value || 'None';
    reviewDisplayUserid.textContent = userIdInput.value || 'SM0000';
    reviewProfileImg.src = photoBase64 || defaultProfilePhotoSvg;
    
    reviewUsernameVal.textContent = usernameInput.value || '-';
    reviewEmailVal.textContent = document.getElementById('email').value || '-';
    reviewPhoneVal.textContent = document.getElementById('phone').value || '-';
    reviewDobVal.textContent = dobInput.value || '-';
    reviewGenderVal.textContent = document.getElementById('gender').value || '-';
    
    const street = addressTextarea.value || '';
    const city = document.getElementById('city').value || '';
    const state = document.getElementById('state').value || '';
    const country = document.getElementById('country').value || '';
    const zip = document.getElementById('zip').value || '';
    reviewAddressVal.textContent = street ? `${street}, ${city}, ${state}, ${country} - ${zip}` : '-';

    // Populate role-specific content
    const role = roleSelect.value;
    let html = '';

    if (role === 'Doctor') {
      html = `
        <div class="review-item"><strong>Employee ID:</strong> <span>${document.getElementById('doc-employee-id').value}</span></div>
        <div class="review-item"><strong>Department:</strong> <span>${document.getElementById('doc-department').value}</span></div>
        <div class="review-item"><strong>Medical License:</strong> <span>${document.getElementById('doc-license').value}</span></div>
        <div class="review-item"><strong>Specialization:</strong> <span>${document.getElementById('doc-specialization').value}</span></div>
        <div class="review-item"><strong>Experience:</strong> <span>${document.getElementById('doc-experience').value} Years</span></div>
        <div class="review-item"><strong>Joining Date:</strong> <span>${document.getElementById('doc-joining').value}</span></div>
      `;
    } else if (role === 'Patient') {
      html = `
        <div class="review-item"><strong>Patient ID:</strong> <span>${document.getElementById('pat-id').value}</span></div>
        <div class="review-item"><strong>Blood Group:</strong> <span>${document.getElementById('pat-blood').value}</span></div>
        <div class="review-item"><strong>Insurance Number:</strong> <span>${document.getElementById('pat-insurance').value}</span></div>
        <div class="review-item span-full"><strong>Medical History:</strong> <span>${patHistoryTextarea.value || 'None declared'}</span></div>
        <div class="review-item span-full"><strong>Known Allergies:</strong> <span>${patAllergiesTextarea.value || 'None declared'}</span></div>
        <div class="review-item"><strong>Emergency Contact Name:</strong> <span>${document.getElementById('emergency-name').value}</span></div>
        <div class="review-item"><strong>Relationship:</strong> <span>${document.getElementById('emergency-relation').value}</span></div>
        <div class="review-item"><strong>Emergency Phone:</strong> <span>${document.getElementById('emergency-phone').value}</span></div>
      `;
    } else if (role === 'Caregiver') {
      html = `
        <div class="review-item"><strong>Caregiver ID:</strong> <span>${document.getElementById('car-employee-id').value}</span></div>
        <div class="review-item"><strong>Relationship/Type:</strong> <span>${document.getElementById('car-relationship').value}</span></div>
        <div class="review-item"><strong>Assigned Patient:</strong> <span>${document.getElementById('car-assigned-patient').value}</span></div>
        <div class="review-item"><strong>Shift Assignment:</strong> <span>${document.getElementById('car-shift').value}</span></div>
        <div class="review-item"><strong>Emergency Contact Name:</strong> <span>${document.getElementById('emergency-name').value}</span></div>
        <div class="review-item"><strong>Relationship:</strong> <span>${document.getElementById('emergency-relation').value}</span></div>
        <div class="review-item"><strong>Emergency Phone:</strong> <span>${document.getElementById('emergency-phone').value}</span></div>
      `;
    } else {
      html = `<div class="review-item span-full">No clinical details required. Settings will configure post-creation.</div>`;
    }

    reviewRoleSpecificInfo.innerHTML = html;
  }

  // --- LOCALSTORAGE AUTOSAVE & RESTORE ---
  function saveDraftToStorage() {
    const draft = {
      currentStep,
      photoBase64,
      userid: userIdInput.value,
      username: usernameInput.value,
      role: roleSelect.value,
      fullname: document.getElementById('fullname').value,
      dob: dobInput.value,
      gender: document.getElementById('gender').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      country: document.getElementById('country').value,
      state: document.getElementById('state').value,
      city: document.getElementById('city').value,
      zip: document.getElementById('zip').value,
      address: addressTextarea.value,
      
      // Doc details
      docEmployeeId: document.getElementById('doc-employee-id').value,
      docDepartment: document.getElementById('doc-department').value,
      docLicense: document.getElementById('doc-license').value,
      docSpecialization: document.getElementById('doc-specialization').value,
      docExperience: document.getElementById('doc-experience').value,
      docJoining: document.getElementById('doc-joining').value,
      
      // Patient details
      patId: document.getElementById('pat-id').value,
      patBlood: document.getElementById('pat-blood').value,
      patInsurance: document.getElementById('pat-insurance').value,
      patHistory: patHistoryTextarea.value,
      patAllergies: patAllergiesTextarea.value,
      
      // Caregiver details
      carEmployeeId: document.getElementById('car-employee-id').value,
      carRelationship: document.getElementById('car-relationship').value,
      carAssignedPatient: document.getElementById('car-assigned-patient').value,
      carShift: document.getElementById('car-shift').value,
      
      // Emergency details
      emergencyName: document.getElementById('emergency-name').value,
      emergencyRelation: document.getElementById('emergency-relation').value,
      emergencyPhone: document.getElementById('emergency-phone').value,
      
      isDirty
    };

    localStorage.setItem('smartmed_draft', JSON.stringify(draft));
  }

  function restoreDraftFromStorage() {
    const dataStr = localStorage.getItem('smartmed_draft');
    if (!dataStr) {
      updateProfileCompletion();
      return;
    }

    try {
      const data = JSON.parse(dataStr);
      currentStep = data.currentStep || 1;
      photoBase64 = data.photoBase64 || null;
      isDirty = data.isDirty || false;

      // Populate basic
      userIdInput.value = data.userid || '';
      usernameInput.value = data.username || '';
      roleSelect.value = data.role || '';
      document.getElementById('fullname').value = data.fullname || '';
      dobInput.value = data.dob || '';
      document.getElementById('gender').value = data.gender || '';
      document.getElementById('email').value = data.email || '';
      document.getElementById('phone').value = data.phone || '';
      document.getElementById('country').value = data.country || '';
      document.getElementById('state').value = data.state || '';
      document.getElementById('city').value = data.city || '';
      document.getElementById('zip').value = data.zip || '';
      addressTextarea.value = data.address || '';

      // Populate Doctor
      document.getElementById('doc-employee-id').value = data.docEmployeeId || '';
      document.getElementById('doc-department').value = data.docDepartment || '';
      document.getElementById('doc-license').value = data.docLicense || '';
      document.getElementById('doc-specialization').value = data.docSpecialization || '';
      document.getElementById('doc-experience').value = data.docExperience || '';
      document.getElementById('doc-joining').value = data.docJoining || '';

      // Populate Patient
      document.getElementById('pat-id').value = data.patId || '';
      document.getElementById('pat-blood').value = data.patBlood || '';
      document.getElementById('pat-insurance').value = data.patInsurance || '';
      patHistoryTextarea.value = data.patHistory || '';
      patAllergiesTextarea.value = data.patAllergies || '';

      // Populate Caregiver
      document.getElementById('car-employee-id').value = data.carEmployeeId || '';
      document.getElementById('car-relationship').value = data.carRelationship || '';
      document.getElementById('car-assigned-patient').value = data.carAssignedPatient || '';
      document.getElementById('car-shift').value = data.carShift || '';

      // Populate Emergency
      document.getElementById('emergency-name').value = data.emergencyName || '';
      document.getElementById('emergency-relation').value = data.emergencyRelation || '';
      document.getElementById('emergency-phone').value = data.emergencyPhone || '';

      // Set photo UI
      if (photoBase64) {
        previewImage.src = photoBase64;
        uploadControls.style.display = 'flex';
        uploadTrigger.closest('.profile-upload-container').classList.add('success-state');
      }

      // Restore username status if username was checked
      if (usernameInput.value.length >= 4) {
        const exists = mockUsers.some(user => user.username.toLowerCase() === usernameInput.value.toLowerCase());
        if (exists) {
          usernameStatus.textContent = "Already Exists";
          usernameStatus.className = "username-status-badge taken";
          usernameCheckedState = 'taken';
        } else {
          usernameStatus.textContent = "Available";
          usernameStatus.className = "username-status-badge available";
          usernameCheckedState = 'available';
        }
        usernameStatus.style.display = 'inline-block';
      }

      // Re-trigger layout calculations
      if (roleSelect.value) {
        toggleRoleFields(roleSelect.value);
      }
      if (dobInput.value) {
        calculateAge();
      }

      // Apply float label indicators
      document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
        const group = input.closest('.form-group');
        if (group && input.value && input.value.trim() !== '') {
          group.classList.add('has-value');
        }
      });

      // Update indicators & completion UI
      updateWizardUI();
      updateProfileCompletion();

    } catch (e) {
      console.error("Failed to restore draft: ", e);
    }
  }

  // Warn user before leaving page if form is dirty
  window.addEventListener('beforeunload', (e) => {
    if (isDirty) {
      e.preventDefault();
      e.returnValue = 'You have unsaved changes. Discard draft?';
      return 'You have unsaved changes. Discard draft?';
    }
  });

  // --- RESET CONFIRMATION MODAL ---
  resetButton.addEventListener('click', () => {
    resetConfirmModal.classList.add('active');
    resetConfirmModal.setAttribute('aria-hidden', 'false');
  });

  resetCancelBtn.addEventListener('click', () => {
    resetConfirmModal.classList.remove('active');
    resetConfirmModal.setAttribute('aria-hidden', 'true');
  });

  resetConfirmBtn.addEventListener('click', () => {
    // Clear draft from localStorage
    localStorage.removeItem('smartmed_draft');
    isDirty = false;

    // Reset Form
    form.reset();

    // Reset step variables & UI elements
    currentStep = 1;
    photoBase64 = null;
    previewImage.src = defaultProfilePhotoSvg;
    photoInput.value = '';
    uploadControls.style.display = 'none';
    photoError.textContent = '';
    photoError.style.opacity = 0;
    photoError.style.height = "0px";
    document.getElementById('photo-instructions').style.color = "var(--text-muted)";
    uploadTrigger.closest('.profile-upload-container').classList.remove('success-state', 'error-state');
    
    // Clear validation styling & statuses
    formInputs.forEach(input => {
      clearValidationState(input);
      const group = input.closest('.form-group');
      if (group) group.classList.remove('has-value');
    });

    usernameStatus.style.display = 'none';
    usernameCheckedState = 'empty';
    ageDisplayWrapper.style.display = 'none';
    
    // Reset Pass strength UI
    strengthBox.classList.remove('active');
    resetStrengthBars();
    updateCriteriaItem(ruleLength, false);
    updateCriteriaItem(ruleUpperLower, false);
    updateCriteriaItem(ruleNumber, false);
    updateCriteriaItem(ruleSpecial, false);

    // Hide Modal & Update Wizard
    resetConfirmModal.classList.remove('active');
    resetConfirmModal.setAttribute('aria-hidden', 'true');
    
    userIdInput.value = '';
    generateUserId();
    
    toggleRoleFields('');
    updateWizardUI();
    updateProfileCompletion();
  });

  // --- FORM FINAL SUBMISSION HANDLING ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) return;

    // 1. Lock screen overlay
    const finalSubmitBtn = document.getElementById('submit-btn');
    finalSubmitBtn.disabled = true;
    loadingOverlay.classList.add('active');
    loadingOverlay.setAttribute('aria-hidden', 'false');

    // 2. Latency Simulation
    setTimeout(() => {
      // Hide loading spinner
      loadingOverlay.classList.remove('active');
      loadingOverlay.setAttribute('aria-hidden', 'true');

      // Set user details in Success Modal
      document.getElementById('res-userid').textContent = userIdInput.value;
      document.getElementById('res-fullname').textContent = document.getElementById('fullname').value;
      document.getElementById('res-username').textContent = usernameInput.value;
      document.getElementById('res-email').textContent = document.getElementById('email').value;
      document.getElementById('res-role').textContent = roleSelect.value;

      // Open Success Modal
      successModal.classList.add('active');
      successModal.setAttribute('aria-hidden', 'false');

      // Incrementation of database count of userid
      let count = parseInt(localStorage.getItem('smartmed_last_userid_index') || '10');
      count++;
      localStorage.setItem('smartmed_last_userid_index', count.toString());

      // Erase local draft
      localStorage.removeItem('smartmed_draft');
      isDirty = false;

      // Hard reset form values
      form.reset();
      photoBase64 = null;
      previewImage.src = defaultProfilePhotoSvg;
      photoInput.value = '';
      uploadControls.style.display = 'none';
      formInputs.forEach(input => {
        clearValidationState(input);
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-value');
      });
      usernameStatus.style.display = 'none';
      usernameCheckedState = 'empty';
      ageDisplayWrapper.style.display = 'none';
      strengthBox.classList.remove('active');
      resetStrengthBars();
      finalSubmitBtn.disabled = false;
    }, 1600);
  });

  successDoneBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
    successModal.setAttribute('aria-hidden', 'true');
    currentStep = 1;
    userIdInput.value = '';
    generateUserId();
    toggleRoleFields('');
    updateWizardUI();
    updateProfileCompletion();
  });


  // --- SEARCH BAR OVERLAY & SIMULATION ---
  searchUsernameInput.addEventListener('input', () => {
    const val = searchUsernameInput.value.trim().toLowerCase();
    
    if (val === '') {
      clearSearchBtn.style.display = 'none';
      searchResultsDropdown.classList.remove('active');
      return;
    }

    clearSearchBtn.style.display = 'block';

    // Search matches from Mock DB
    const matches = mockUsers.filter(user => 
      user.username.toLowerCase().includes(val) || 
      user.fullname.toLowerCase().includes(val) ||
      user.userid.toLowerCase().includes(val)
    );

    populateSearchResults(matches);
  });

  clearSearchBtn.addEventListener('click', () => {
    searchUsernameInput.value = '';
    clearSearchBtn.style.display = 'none';
    searchResultsDropdown.classList.remove('active');
  });

  function populateSearchResults(matches) {
    searchResultsDropdown.innerHTML = '';
    
    if (matches.length === 0) {
      const item = document.createElement('div');
      item.className = 'search-result-item no-results';
      item.textContent = 'No matching system users found';
      searchResultsDropdown.appendChild(item);
    } else {
      matches.forEach(user => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `
          <div class="search-result-info">
            <span class="search-result-name">${user.fullname}</span>
            <span class="search-result-meta">Username: @${user.username} | ID: ${user.userid}</span>
          </div>
          <span class="search-result-role">${user.role}</span>
        `;
        
        item.addEventListener('click', () => {
          loadMockUser(user);
          searchResultsDropdown.classList.remove('active');
          searchUsernameInput.value = '';
          clearSearchBtn.style.display = 'none';
        });

        searchResultsDropdown.appendChild(item);
      });
    }

    searchResultsDropdown.classList.add('active');
  }

  function loadMockUser(user) {
    // Populate form elements
    userIdInput.value = user.userid;
    usernameInput.value = user.username;
    roleSelect.value = user.role;
    document.getElementById('fullname').value = user.fullname;
    dobInput.value = user.dob;
    document.getElementById('gender').value = user.gender;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
    document.getElementById('country').value = user.country;
    document.getElementById('state').value = user.state;
    document.getElementById('city').value = user.city;
    document.getElementById('zip').value = user.zip;
    addressTextarea.value = user.address;

    // Doctor fields
    if (user.role === 'Doctor') {
      document.getElementById('doc-employee-id').value = user.docEmployeeId || '';
      document.getElementById('doc-department').value = user.docDepartment || '';
      document.getElementById('doc-license').value = user.docLicense || '';
      document.getElementById('doc-specialization').value = user.docSpecialization || '';
      document.getElementById('doc-experience').value = user.docExperience || '';
      document.getElementById('doc-joining').value = user.docJoining || '';
    }

    // Patient fields
    if (user.role === 'Patient') {
      document.getElementById('pat-id').value = user.patId || '';
      document.getElementById('pat-blood').value = user.patBlood || '';
      document.getElementById('pat-insurance').value = user.patInsurance || '';
      patHistoryTextarea.value = user.patHistory || '';
      patAllergiesTextarea.value = user.patAllergies || '';
    }

    // Caregiver fields
    if (user.role === 'Caregiver') {
      document.getElementById('car-employee-id').value = user.carEmployeeId || '';
      document.getElementById('car-relationship').value = user.carRelationship || '';
      document.getElementById('car-assigned-patient').value = user.carAssignedPatient || '';
      document.getElementById('car-shift').value = user.carShift || '';
    }

    // Emergency Contact
    if (user.role === 'Patient' || user.role === 'Caregiver') {
      document.getElementById('emergency-name').value = user.emergencyName || '';
      document.getElementById('emergency-relation').value = user.emergencyRelation || '';
      document.getElementById('emergency-phone').value = user.emergencyPhone || '';
    }

    // Photo preview
    photoBase64 = user.photo;
    previewImage.src = user.photo;
    uploadControls.style.display = 'flex';
    uploadTrigger.closest('.profile-upload-container').classList.add('success-state');

    // Trigger role toggles & age displays
    toggleRoleFields(user.role);
    calculateAge();

    // Trigger floating label positions
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
      const group = input.closest('.form-group');
      if (group && input.value && input.value.trim() !== '') {
        group.classList.add('has-value');
        // Validate all populated inputs
        validateField(input);
      }
    });

    usernameCheckedState = 'available'; // Simulated loaded users are available
    usernameStatus.textContent = "Available";
    usernameStatus.className = "username-status-badge available";
    usernameStatus.style.display = 'inline-block';

    currentStep = 1;
    isDirty = true;

    saveDraftToStorage();
    updateWizardUI();
    updateProfileCompletion();

    // Notification toast or title alert that mock user loaded
    stepSubtitle.textContent = `Credentials loaded for Practitioner/Staff member: ${user.fullname}.`;
    setTimeout(() => {
      updateTitles();
    }, 4000);
  }

  // Close dropdown if user clicks outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-panel-container')) {
      searchResultsDropdown.classList.remove('active');
    }
  });

});
