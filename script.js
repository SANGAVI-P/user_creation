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
  
  // Navigation elements (Simplified for Single-page Form)
  const submitBtn = document.getElementById('submit-btn');
  
  // Completion metrics
  const completionPercentage = document.getElementById('completion-percentage');
  const completionFill = document.getElementById('completion-fill');
  
  // Fields elements
  const usernameInput = document.getElementById('username');
  const usernameStatus = document.getElementById('username-status');
  const roleSelect = document.getElementById('role');
  const dobInput = document.getElementById('dob');
  const ageDisplayWrapper = document.getElementById('age-display-wrapper');
  const calculatedAgeSpan = document.getElementById('calculated-age');
  
  // Cancel button
  const cancelBtn = document.getElementById('cancel-btn');
  
  // Dynamic Role Groups
  const roleFieldsDoctor = document.getElementById('role-fields-doctor');
  const roleFieldsPatient = document.getElementById('role-fields-patient');
  const roleFieldsCaregiver = document.getElementById('role-fields-caregiver');
  const roleFieldsAdmin = document.getElementById('role-fields-admin');
  const emergencyContactGroup = document.getElementById('emergency-contact-group');
  
  // Textareas
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
  


  // SVG Cache
  const svgEyeOpen = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  const svgEyeClosed = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
  const defaultProfilePhotoSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2364748b'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

  // Mock Database of Existing Users
  const defaultMockUsers = [
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
      status: "Active",
      createdDate: "Jul 10, 2026",
      password: "Password@123",
      employeeId: "EMP-8801",
      department: "Cardiology",
      medicalLicense: "LIC-99210",
      specialization: "Cardiovascular Surgery",
      experience: "12",
      joiningDate: "2014-06-01"
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
      status: "Active",
      createdDate: "Jul 10, 2026",
      password: "Password@123",
      patientId: "PT-4521",
      bloodGroup: "O+",
      insuranceNumber: "INS-77612",
      medicalHistory: "Hypertension under control with lisinopril.",
      allergies: "Penicillin",
      emergencyName: "Shakira Caine",
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
      status: "Active",
      createdDate: "Jul 10, 2026",
      password: "Password@123",
      caregiverId: "CG-9904",
      caregiverRelationship: "In-Home Nurse",
      assignedPatient: "Michael Robert Caine",
      shift: "Morning",
      emergencyName: "Sergei Rostov",
      emergencyRelation: "Brother",
      emergencyPhone: "7776664444"
    }
  ];

  let mockUsers = [];
  const storedUsers = localStorage.getItem('smartmed_mock_users');
  if (storedUsers) {
    try {
      mockUsers = JSON.parse(storedUsers);
      // Ensure all stored users have basic defaults if they were created earlier without them
      mockUsers = mockUsers.map(user => ({
        status: "Active",
        createdDate: "Jul 10, 2026",
        password: "Password@123",
        ...user
      }));
    } catch (e) {
      console.error("Failed to parse stored mock users: ", e);
      mockUsers = [...defaultMockUsers];
    }
  } else {
    mockUsers = [...defaultMockUsers];
    localStorage.setItem('smartmed_mock_users', JSON.stringify(mockUsers));
  }

  // Form state variables
  let photoBase64 = null;
  let usernameCheckedState = 'empty'; // 'empty', 'checking', 'available', 'taken'
  let usernameDebounceTimer = null;
  let isDirty = false;
  let isEditing = false;
  let editingUserId = null;

  // Set initial dates
  initMaxDobDate();

  // Load Saved Draft on Init
  restoreDraftFromStorage();

  // Check URL edit parameter
  checkUrlEditMode();

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

    const triggerUpdate = () => {
      updateLabelPosition();
      isDirty = true;
      saveDraftToStorage();
      updateProfileCompletion();
      
      if (group.classList.contains('error-state')) {
        validateField(input);
      }
    };

    input.addEventListener('input', triggerUpdate);
    input.addEventListener('change', triggerUpdate);

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

  // --- USER ID GENERATION (BACKEND SIMULATION) ---
  function generateNewUserId() {
    let nextNum = parseInt(localStorage.getItem('smartmed_last_userid_index') || '10');
    nextNum++;
    return `SM${String(nextNum).padStart(4, '0')}`;
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


  setupCharCounter(patHistoryTextarea, patHistoryCharCount);
  setupCharCounter(patAllergiesTextarea, patAllergiesCharCount);

  // --- DRAG AND DROP PROFILE PHOTO (OPTIONAL) ---

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
    photoError.textContent = "";
    document.getElementById('photo-instructions').style.color = "var(--text-muted)";
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

  uploadTrigger.addEventListener('click', (e) => {
    // Only call click if user clicked wrapper elements other than the file input itself to avoid recursion
    if (e.target !== photoInput) {
      photoInput.click();
    }
  });

  photoInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handlePhotoFile(e.target.files[0]);
    }
  });

  function handlePhotoFile(file) {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const validExtensions = ['png', 'jpg', 'jpeg'];
    const maxSize = 2 * 1024 * 1024; // 2MB
    
    photoError.textContent = "";
    document.getElementById('photo-instructions').style.color = "var(--text-muted)";

    // Validate MIME type OR file extension for robustness across systems
    if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
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
      const exists = mockUsers.some(user => 
        user.username.toLowerCase() === username.toLowerCase() && 
        (!isEditing || user.userid !== editingUserId)
      );
      
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

    // Remove required attributes from fields to avoid blocking submit validation
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

  function generatePatientId() {
    const patIdInput = document.getElementById('pat-id');
    if (!patIdInput || patIdInput.value !== '') return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    patIdInput.value = `PT-${randomNum}`;
    patIdInput.closest('.form-group').classList.add('has-value');
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

  // Success indicator helper
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
    
    if (input.hasAttribute('readonly')) {
      clearValidationState(input);
      return true;
    }

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



    if (id === 'doc-experience') {
      const num = parseInt(value);
      if (isNaN(num) || num < 0 || num > 80) {
        showError(input, "Please enter a valid experience period (0 to 80 years).");
        return false;
      }
    }

    if (id === 'doc-joining') {
      const joiningDate = new Date(value);
      const today = new Date();
      if (joiningDate > today) {
        showError(input, "Joining Date cannot be in the future.");
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

    showSuccess(input);
    return true;
  }

  // --- SINGLE FORM VALIDATION ON SUBMIT ---
  function validateForm() {
    let isValid = true;
    let firstInvalidElement = null;

    const fieldsToValidate = [
      usernameInput,
      document.getElementById('fullname'),
      dobInput,
      document.getElementById('gender'),
      document.getElementById('email'),
      document.getElementById('phone'),
      document.getElementById('country'),
      document.getElementById('state'),
      document.getElementById('city'),
      document.getElementById('zip'),
      passwordInput,
      confirmPasswordInput
    ];

    // Collect Dynamic Role-Specific Fields
    const role = roleSelect.value;
    if (role === 'Doctor') {
      fieldsToValidate.push(
        document.getElementById('doc-employee-id'),
        document.getElementById('doc-department'),
        document.getElementById('doc-license'),
        document.getElementById('doc-specialization'),
        document.getElementById('doc-experience'),
        document.getElementById('doc-joining')
      );
    } else if (role === 'Patient') {
      fieldsToValidate.push(
        document.getElementById('pat-blood'),
        document.getElementById('pat-insurance'),
        document.getElementById('emergency-name'),
        document.getElementById('emergency-relation'),
        document.getElementById('emergency-phone')
      );
    } else if (role === 'Caregiver') {
      fieldsToValidate.push(
        document.getElementById('car-employee-id'),
        document.getElementById('car-relationship'),
        document.getElementById('car-assigned-patient'),
        document.getElementById('car-shift'),
        document.getElementById('emergency-name'),
        document.getElementById('emergency-relation'),
        document.getElementById('emergency-phone')
      );
    }

    // Execute validation on all fields
    fieldsToValidate.forEach(input => {
      if (input) {
        const fieldOk = validateField(input);
        if (!fieldOk) {
          isValid = false;
          if (!firstInvalidElement) firstInvalidElement = input;
        }
      }
    });

    if (usernameCheckedState === 'taken') {
      isValid = false;
      showError(usernameInput, "Username already exists in system database.");
      if (!firstInvalidElement) firstInvalidElement = usernameInput;
    }

    if (firstInvalidElement) {
      firstInvalidElement.focus();
      firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return isValid;
  }

  // --- DYNAMIC PROFILE COMPLETION CALCULATOR ---
  function updateProfileCompletion() {
    const requiredElements = Array.from(form.querySelectorAll('input[required], select[required], textarea[required]'));
    
    if (requiredElements.length === 0) {
      completionPercentage.textContent = '0%';
      completionFill.style.width = '0%';
      return;
    }

    let completedCount = 0;
    requiredElements.forEach(el => {
      const val = el.value ? el.value.trim() : '';
      if (val === '') return;

      let isMet = true;
      if (el.id === 'username' && val.length < 4) isMet = false;
      else if (el.id === 'fullname' && val.length < 2) isMet = false;
      else if (el.id === 'phone' && val.replace(/\D/g, '').length < 10) isMet = false;
      else if (el.id === 'emergency-phone' && val.replace(/\D/g, '').length < 10) isMet = false;

      else if (el.id === 'password' && val.length < 8) isMet = false;
      else if (el.id === 'confirm-password' && val !== passwordInput.value) isMet = false;

      if (isMet) {
        completedCount++;
      }
    });

    const percent = Math.round((completedCount / requiredElements.length) * 100);
    completionPercentage.textContent = `${percent}%`;
    completionFill.style.width = `${percent}%`;
  }

  // --- LOCALSTORAGE AUTOSAVE & RESTORE ---
  function saveDraftToStorage() {
    const draft = {
      photoBase64,
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
      isDirty
    };

    localStorage.setItem('smartmed_draft_single', JSON.stringify(draft));
  }

  function restoreDraftFromStorage() {
    const dataStr = localStorage.getItem('smartmed_draft_single');
    if (!dataStr) {
      updateProfileCompletion();
      return;
    }

    try {
      const data = JSON.parse(dataStr);
      photoBase64 = data.photoBase64 || null;
      isDirty = data.isDirty || false;

      // Populate basic fields
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

      // Update toggles & completion UI
      toggleRoleFields(roleSelect.value);
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
    localStorage.removeItem('smartmed_draft_single');
    isDirty = false;

    // Reset Form
    form.reset();

    // Reset UI elements
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

    // Hide Modal & Dynamic panels
    resetConfirmModal.classList.remove('active');
    resetConfirmModal.setAttribute('aria-hidden', 'true');
    
    toggleRoleFields('');
    updateProfileCompletion();
  });

  // --- FORM SUBMISSION HANDLING ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // 1. Lock screen overlay
    submitBtn.disabled = true;
    loadingOverlay.classList.add('active');
    loadingOverlay.setAttribute('aria-hidden', 'false');

    // Generate User ID dynamically (Backend simulation) if not editing
    const generatedUserId = isEditing ? editingUserId : generateNewUserId();

    // 2. Latency Simulation
    setTimeout(() => {
      // Hide loading spinner
      loadingOverlay.classList.remove('active');
      loadingOverlay.setAttribute('aria-hidden', 'true');

      // Set user details in Success Modal
      document.getElementById('res-userid').textContent = generatedUserId;
      document.getElementById('res-fullname').textContent = document.getElementById('fullname').value;
      document.getElementById('res-username').textContent = usernameInput.value;
      document.getElementById('res-email').textContent = document.getElementById('email').value;
      document.getElementById('res-role').textContent = roleSelect.value;
      
      // Set photo in Success Modal
      const successPhoto = document.getElementById('res-photo');
      if (successPhoto) {
        successPhoto.src = photoBase64 || defaultProfilePhotoSvg;
      }

      // Build User Details object with all dynamic fields
      const userDetails = {
        userid: generatedUserId,
        fullname: document.getElementById('fullname').value,
        username: usernameInput.value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dob: dobInput.value,
        gender: document.getElementById('gender').value,
        role: roleSelect.value,
        country: document.getElementById('country').value,
        state: document.getElementById('state').value,
        city: document.getElementById('city').value,
        zip: document.getElementById('zip').value,
        address: '',
        photo: photoBase64 || defaultProfilePhotoSvg,
        status: isEditing ? (mockUsers.find(u => u.userid === editingUserId)?.status || "Active") : "Active",
        createdDate: isEditing ? (mockUsers.find(u => u.userid === editingUserId)?.createdDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })) : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        password: passwordInput.value
      };

      // Add role-specific details
      if (roleSelect.value === 'Doctor') {
        userDetails.employeeId = document.getElementById('doc-employee-id').value;
        userDetails.department = document.getElementById('doc-department').value;
        userDetails.medicalLicense = document.getElementById('doc-license').value;
        userDetails.specialization = document.getElementById('doc-specialization').value;
        userDetails.experience = document.getElementById('doc-experience').value;
        userDetails.joiningDate = document.getElementById('doc-joining').value;
      } else if (roleSelect.value === 'Patient') {
        userDetails.patientId = document.getElementById('pat-id').value;
        userDetails.bloodGroup = document.getElementById('pat-blood').value;
        userDetails.insuranceNumber = document.getElementById('pat-insurance').value;
        userDetails.medicalHistory = document.getElementById('pat-history').value;
        userDetails.allergies = document.getElementById('pat-allergies').value;
        
        userDetails.emergencyName = document.getElementById('emergency-name').value;
        userDetails.emergencyRelation = document.getElementById('emergency-relation').value;
        userDetails.emergencyPhone = document.getElementById('emergency-phone').value;
      } else if (roleSelect.value === 'Caregiver') {
        userDetails.caregiverId = document.getElementById('car-employee-id').value;
        userDetails.caregiverRelationship = document.getElementById('car-relationship').value;
        userDetails.assignedPatient = document.getElementById('car-assigned-patient').value;
        userDetails.shift = document.getElementById('car-shift').value;
        
        userDetails.emergencyName = document.getElementById('emergency-name').value;
        userDetails.emergencyRelation = document.getElementById('emergency-relation').value;
        userDetails.emergencyPhone = document.getElementById('emergency-phone').value;
      }

      // Update success modal titles
      const modalTitleEl = document.getElementById('modal-title');
      const modalDescEl = modalTitleEl.nextElementSibling;
      if (isEditing) {
        modalTitleEl.textContent = "User Updated Successfully!";
        modalDescEl.textContent = "The user profile details have been updated.";
      } else {
        modalTitleEl.textContent = "User Created Successfully!";
        modalDescEl.textContent = "The user profile and credentials have been initialized.";
      }

      // Save user details to mock DB in localStorage
      if (isEditing) {
        const index = mockUsers.findIndex(u => u.userid === editingUserId);
        if (index !== -1) {
          mockUsers[index] = userDetails;
        } else {
          mockUsers.push(userDetails);
        }
      } else {
        mockUsers.push(userDetails);
      }
      localStorage.setItem('smartmed_mock_users', JSON.stringify(mockUsers));

      // Open Success Modal
      successModal.classList.add('active');
      successModal.setAttribute('aria-hidden', 'false');

      // Incrementation of database count of userid (if not editing)
      if (!isEditing) {
        let count = parseInt(localStorage.getItem('smartmed_last_userid_index') || '10');
        count++;
        localStorage.setItem('smartmed_last_userid_index', count.toString());
      }

      // Erase local draft
      localStorage.removeItem('smartmed_draft_single');
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
      submitBtn.disabled = false;

      toggleRoleFields('');
    }, 1600);
  });

  successDoneBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
    successModal.setAttribute('aria-hidden', 'true');
    window.location.href = 'index.html';
  });

  // --- FORM CANCELLATION ---
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      isDirty = false;
      window.location.href = 'index.html';
    });
  }

  function checkUrlEditMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const editUserId = urlParams.get('edit');
    if (!editUserId) return;

    const user = mockUsers.find(u => u.userid === editUserId);
    if (!user) return;

    isEditing = true;
    editingUserId = editUserId;

    // Change Titles
    document.getElementById('wizard-step-title').textContent = "Edit User Settings";
    document.getElementById('wizard-step-subtitle').textContent = `Updating profile details for user ${user.fullname} (${user.userid})`;
    
    // Change submit button text & icon
    submitBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
        <polyline points="17 21 17 13 7 13 7 21"/>
        <polyline points="7 3 7 8 15 8"/>
      </svg>
      Save Changes
    `;

    // Populate all details
    usernameInput.value = user.username || '';
    roleSelect.value = user.role || '';
    document.getElementById('fullname').value = user.fullname || '';
    dobInput.value = user.dob || '';
    document.getElementById('gender').value = user.gender || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('country').value = user.country || '';
    document.getElementById('state').value = user.state || '';
    document.getElementById('city').value = user.city || '';
    document.getElementById('zip').value = user.zip || '';
    
    // Populate role fields
    toggleRoleFields(user.role);

    if (user.role === 'Doctor') {
      document.getElementById('doc-employee-id').value = user.employeeId || '';
      document.getElementById('doc-department').value = user.department || '';
      document.getElementById('doc-license').value = user.medicalLicense || '';
      document.getElementById('doc-specialization').value = user.specialization || '';
      document.getElementById('doc-experience').value = user.experience || '';
      document.getElementById('doc-joining').value = user.joiningDate || '';
    } else if (user.role === 'Patient') {
      document.getElementById('pat-id').value = user.patientId || '';
      document.getElementById('pat-blood').value = user.bloodGroup || '';
      document.getElementById('pat-insurance').value = user.insuranceNumber || '';
      document.getElementById('pat-history').value = user.medicalHistory || '';
      document.getElementById('pat-allergies').value = user.allergies || '';
      
      document.getElementById('emergency-name').value = user.emergencyName || '';
      document.getElementById('emergency-relation').value = user.emergencyRelation || '';
      document.getElementById('emergency-phone').value = user.emergencyPhone || '';
    } else if (user.role === 'Caregiver') {
      document.getElementById('car-employee-id').value = user.caregiverId || '';
      document.getElementById('car-relationship').value = user.caregiverRelationship || '';
      document.getElementById('car-assigned-patient').value = user.assignedPatient || '';
      document.getElementById('car-shift').value = user.shift || '';
      
      document.getElementById('emergency-name').value = user.emergencyName || '';
      document.getElementById('emergency-relation').value = user.emergencyRelation || '';
      document.getElementById('emergency-phone').value = user.emergencyPhone || '';
    }

    // Set photo
    photoBase64 = user.photo || null;
    if (photoBase64) {
      previewImage.src = photoBase64;
      uploadControls.style.display = 'flex';
      uploadTrigger.closest('.profile-upload-container').classList.add('success-state');
    } else {
      previewImage.src = defaultProfilePhotoSvg;
      uploadControls.style.display = 'none';
      uploadTrigger.closest('.profile-upload-container').classList.remove('success-state');
    }

    // Floating label states and validation
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
      const group = input.closest('.form-group');
      if (group && input.value && input.value.trim() !== '') {
        group.classList.add('has-value');
      }
    });

    // Populate password (simulated or actual)
    passwordInput.value = user.password || 'Password@123';
    confirmPasswordInput.value = user.password || 'Password@123';

    // Trigger age calculation
    calculateAge();

    // Trigger completion recalculation
    updateProfileCompletion();

    // Since we're editing, set username state as available so it doesn't complain
    usernameCheckedState = 'available';
  }



});
