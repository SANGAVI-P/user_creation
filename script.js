document.addEventListener('DOMContentLoaded', () => {
  // ==================== ELEMENTS CACHE ====================
  // List elements
  const tableBody = document.getElementById('users-table-body');
  const searchInput = document.getElementById('search-list-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const emptyStateWrapper = document.getElementById('empty-state-wrapper');
  const tableWrapper = document.getElementById('table-wrapper');
  const paginationWrapper = document.getElementById('pagination-wrapper');
  const filterRole = document.getElementById('filter-role');
  const filterGender = document.getElementById('filter-gender');
  const filterStatus = document.getElementById('filter-status');
  const rowsPerPageSelect = document.getElementById('rows-per-page');
  const btnPrevPage = document.getElementById('btn-prev-page');
  const btnNextPage = document.getElementById('btn-next-page');
  const paginationPagesList = document.getElementById('pagination-pages-list');
  const paginationStats = document.getElementById('pagination-stats');

  // Form elements
  const form = document.getElementById('user-creation-form');
  const photoInput = document.getElementById('profile-photo');
  const previewImage = document.getElementById('preview-image');
  const uploadTrigger = document.getElementById('profile-upload-trigger');
  const photoError = document.getElementById('profile-photo-error');
  const uploadControls = document.getElementById('upload-controls');
  const removePhotoBtn = document.getElementById('remove-photo-btn');
  const replacePhotoBtn = document.getElementById('replace-photo-btn');
  const submitBtn = document.getElementById('submit-btn');
  const completionPercentage = document.getElementById('completion-percentage');
  const completionFill = document.getElementById('completion-fill');
  const usernameInput = document.getElementById('username');
  const usernameStatus = document.getElementById('username-status');
  const roleSelect = document.getElementById('role');
  const groupSpecifyRole = document.getElementById('group-specify-role');
  const specifyRoleInput = document.getElementById('specify-role');
  const dobInput = document.getElementById('dob');
  const ageDisplayWrapper = document.getElementById('age-display-wrapper');
  const calculatedAgeSpan = document.getElementById('calculated-age');
  const cancelBtn = document.getElementById('cancel-btn');
  const resetButton = document.getElementById('reset-btn');

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

  // Modals & Overlays
  const viewDetailsModal = document.getElementById('view-details-modal');
  const closeDetailBtn = document.getElementById('close-detail-btn');
  const deleteConfirmModal = document.getElementById('delete-confirm-modal');
  const deleteCancelBtn = document.getElementById('delete-cancel-btn');
  const deleteConfirmBtn = document.getElementById('delete-confirm-btn');
  const loadingOverlay = document.getElementById('loading-overlay');
  const successModal = document.getElementById('success-modal');
  const successDoneBtn = document.getElementById('success-done-btn');
  const resetConfirmModal = document.getElementById('reset-confirm-modal');
  const resetCancelBtn = document.getElementById('reset-cancel-btn');
  const resetConfirmBtn = document.getElementById('reset-confirm-btn');

  // Header and View Switcher triggers
  const btnCreateUserHeader = document.getElementById('btn-create-user-header');
  const navBackUsers = document.getElementById('nav-back-users');
  const mainContainer = document.getElementById('main-container');
  const userListView = document.getElementById('user-list-view');
  const createUserView = document.getElementById('create-user-view');

  // ==================== SVG CACHE ====================
  const svgEye = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  const svgEdit = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
  const svgTrash = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;
  const svgEyeOpen = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  const svgEyeClosed = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
  const defaultProfilePhotoSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2364748b'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

  // ==================== STATE VARIABLES ====================
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
  let filteredUsers = [];
  let userToDelete = null;

  // Pagination & Filtering state
  let currentPage = 1;
  let rowsPerPage = 10;
  let activeDropdown = null; // Track open three-dot menu dropdown element

  // Form State
  let photoBase64 = null;
  let usernameCheckedState = 'empty'; // 'empty', 'checking', 'available', 'taken'
  let usernameDebounceTimer = null;
  let isDirty = false;
  let isEditing = false;
  let editingUserId = null;

  // ==================== INITIALIZATION ====================
  initMaxDobDate();
  loadUsers();
  
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
      if (!isEditing) {
        saveDraftToStorage();
      }
      updateProfileCompletion();
      
      if (group.classList.contains('error-state')) {
        validateField(input);
      }
    };

    input.addEventListener('input', triggerUpdate);
    input.addEventListener('change', triggerUpdate);

    setTimeout(updateLabelPosition, 100);
  });

  setupCharCounter(patHistoryTextarea, patHistoryCharCount);
  setupCharCounter(patAllergiesTextarea, patAllergiesCharCount);
  setupPasswordToggle(togglePasswordBtn, passwordInput);
  setupPasswordToggle(toggleConfirmPasswordBtn, confirmPasswordInput);

  // ==================== VIEW TRANSITIONS ====================
  function showListView() {
    // Transition Container widths smoothly
    mainContainer.classList.add('list-container');
    
    // Hide Form, Show Table List
    createUserView.style.display = 'none';
    createUserView.classList.remove('active');
    
    userListView.style.display = 'block';
    // Let browser render display change before adding active class to trigger CSS fade transition
    setTimeout(() => {
      userListView.classList.add('active');
    }, 10);

    // Refresh users table list
    loadUsers();
  }

  function showCreateUserView(editUser = null) {
    // Reset Form draft status or clean form first
    resetFormFields();

    // Transition Container widths smoothly
    mainContainer.classList.remove('list-container');

    // Hide List, Show Create User View
    userListView.style.display = 'none';
    userListView.classList.remove('active');

    createUserView.style.display = 'block';
    setTimeout(() => {
      createUserView.classList.add('active');
    }, 10);

    if (editUser) {
      isEditing = true;
      editingUserId = editUser.userid;

      // Adjust Titles
      document.getElementById('wizard-step-title').textContent = "Edit User Settings";
      document.getElementById('wizard-step-subtitle').textContent = `Updating profile details for user ${editUser.fullname} (${editUser.userid})`;
      
      // Submit Button adjustments
      submitBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
        </svg>
        Save Changes
      `;

      // Populate Inputs
      usernameInput.value = editUser.username || '';
      document.getElementById('fullname').value = editUser.fullname || '';
      dobInput.value = editUser.dob || '';
      document.getElementById('gender').value = editUser.gender || '';
      document.getElementById('email').value = editUser.email || '';
      document.getElementById('phone').value = editUser.phone || '';
      document.getElementById('country').value = editUser.country || '';
      document.getElementById('state').value = editUser.state || '';
      document.getElementById('city').value = editUser.city || '';
      document.getElementById('zip').value = editUser.zip || '';

      // Toggles for specialized role components
      const standardRoles = ['Doctor', 'Patient', 'Caregiver', 'Admin', 'Student'];
      if (standardRoles.includes(editUser.role)) {
        roleSelect.value = editUser.role;
        toggleRoleFields(editUser.role);
      } else if (editUser.role) {
        roleSelect.value = 'Other';
        toggleRoleFields('Other');
        if (specifyRoleInput) {
          specifyRoleInput.value = editUser.role;
          const group = specifyRoleInput.closest('.form-group');
          if (group) group.classList.add('has-value');
        }
      } else {
        roleSelect.value = '';
        toggleRoleFields('');
      }

      if (editUser.role === 'Doctor') {
        document.getElementById('doc-employee-id').value = editUser.employeeId || '';
        document.getElementById('doc-department').value = editUser.department || '';
        document.getElementById('doc-license').value = editUser.medicalLicense || '';
        document.getElementById('doc-specialization').value = editUser.specialization || '';
        document.getElementById('doc-experience').value = editUser.experience || '';
        document.getElementById('doc-joining').value = editUser.joiningDate || '';
      } else if (editUser.role === 'Patient') {
        document.getElementById('pat-id').value = editUser.patientId || '';
        document.getElementById('pat-blood').value = editUser.bloodGroup || '';
        document.getElementById('pat-insurance').value = editUser.insuranceNumber || '';
        document.getElementById('pat-history').value = editUser.medicalHistory || '';
        document.getElementById('pat-allergies').value = editUser.allergies || '';
        
        document.getElementById('emergency-name').value = editUser.emergencyName || '';
        document.getElementById('emergency-relation').value = editUser.emergencyRelation || '';
        document.getElementById('emergency-phone').value = editUser.emergencyPhone || '';
      } else if (editUser.role === 'Caregiver') {
        document.getElementById('car-employee-id').value = editUser.caregiverId || '';
        document.getElementById('car-relationship').value = editUser.caregiverRelationship || '';
        document.getElementById('car-assigned-patient').value = editUser.assignedPatient || '';
        document.getElementById('car-shift').value = editUser.shift || '';
        
        document.getElementById('emergency-name').value = editUser.emergencyName || '';
        document.getElementById('emergency-relation').value = editUser.emergencyRelation || '';
        document.getElementById('emergency-phone').value = editUser.emergencyPhone || '';
      }

      // Restore image upload preview
      photoBase64 = editUser.photo || null;
      if (photoBase64) {
        previewImage.src = photoBase64;
        uploadControls.style.display = 'flex';
        uploadTrigger.closest('.profile-upload-container').classList.add('success-state');
      } else {
        previewImage.src = defaultProfilePhotoSvg;
        uploadControls.style.display = 'none';
        uploadTrigger.closest('.profile-upload-container').classList.remove('success-state');
      }

      // Add float label status
      document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
        const group = input.closest('.form-group');
        if (group && input.value && input.value.trim() !== '') {
          group.classList.add('has-value');
        }
      });

      // Passwords
      passwordInput.value = editUser.password || 'Password@123';
      confirmPasswordInput.value = editUser.password || 'Password@123';

      calculateAge();
      updateProfileCompletion();
      usernameCheckedState = 'available';
    } else {
      // Creation Mode
      isEditing = false;
      editingUserId = null;

      // Adjust Titles back
      document.getElementById('wizard-step-title').textContent = "Create New User";
      document.getElementById('wizard-step-subtitle').textContent = "Register a new healthcare profile, credential set, and roles inside the portal.";
      
      // Reset submit button text
      submitBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <polyline points="17 11 19 13 23 9" />
        </svg>
        Create User
      `;

      // Load draft from storage if creating
      restoreDraftFromStorage();
    }
  }

  // ==================== LIST SCREEN LOGIC ====================
  function loadUsers() {
    const storedUsers = localStorage.getItem('smartmed_mock_users');
    if (storedUsers) {
      try {
        mockUsers = JSON.parse(storedUsers);
        // Ensure all stored users have basic defaults
        mockUsers = mockUsers.map(user => ({
          status: "Active",
          gender: user.gender || "Prefer not to say",
          createdDate: user.createdDate || "Jul 10, 2026",
          ...user
        }));
      } catch (e) {
        console.error("Failed to parse stored users: ", e);
        mockUsers = [...defaultMockUsers];
      }
    } else {
      mockUsers = [...defaultMockUsers];
      localStorage.setItem('smartmed_mock_users', JSON.stringify(mockUsers));
    }

    populateRoleFilter();
    applyFiltersAndPagination();
  }

  function populateRoleFilter() {
    const selectedVal = filterRole.value;
    const roles = Array.from(new Set(mockUsers.map(user => user.role).filter(Boolean)));
    roles.sort();
    
    filterRole.innerHTML = '<option value="">All Roles</option>';
    roles.forEach(role => {
      const option = document.createElement('option');
      option.value = role;
      option.textContent = role;
      filterRole.appendChild(option);
    });
    
    if (roles.includes(selectedVal)) {
      filterRole.value = selectedVal;
    } else {
      filterRole.value = "";
    }
  }

  function applyFiltersAndPagination() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedRole = filterRole.value;
    const selectedGender = filterGender.value;
    const selectedStatus = filterStatus.value;

    // Apply search and select filters
    filteredUsers = mockUsers.filter(user => {
      const matchesSearch = 
        user.fullname.toLowerCase().includes(searchTerm) || 
        user.username.toLowerCase().includes(searchTerm) ||
        user.userid.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm);

      const matchesRole = !selectedRole || user.role === selectedRole;
      const matchesGender = !selectedGender || user.gender === selectedGender;
      const matchesStatus = !selectedStatus || user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
    if (currentPage > totalPages) {
      currentPage = Math.max(1, totalPages);
    }

    renderTable(filteredUsers);
    renderPagination(filteredUsers.length, totalPages);
  }

  function renderTable(usersList) {
    closeActiveDropdown();
    tableBody.innerHTML = '';
    
    if (usersList.length === 0) {
      tableWrapper.style.display = 'none';
      paginationWrapper.style.display = 'none';
      emptyStateWrapper.style.display = 'flex';
      return;
    }

    tableWrapper.style.display = 'block';
    paginationWrapper.style.display = 'flex';
    emptyStateWrapper.style.display = 'none';

    // Pagination slice
    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    const pageItems = usersList.slice(startIdx, endIdx);

    pageItems.forEach(user => {
      const row = document.createElement('tr');
      row.id = `row-${user.userid}`;

      // User cell layout
      const userCell = document.createElement('td');
      userCell.className = 'user-cell';
      userCell.innerHTML = `
        <img src="${user.photo || defaultProfilePhotoSvg}" alt="Avatar" class="user-avatar-sm">
        <div class="user-info-stacked">
          <span class="user-name-txt">${user.fullname}</span>
          <span class="user-id-txt">ID: ${user.userid}</span>
        </div>
      `;

      // Username cell
      const usernameCell = document.createElement('td');
      usernameCell.innerHTML = `<span class="username-badge">@${user.username}</span>`;

      // Email cell
      const emailCell = document.createElement('td');
      emailCell.textContent = user.email || '-';

      // Role cell
      const roleCell = document.createElement('td');
      const roleBadgeClass = user.role ? user.role.toLowerCase() : 'others';
      roleCell.innerHTML = `<span class="badge-role ${roleBadgeClass}">${user.role || 'Others'}</span>`;

      // Actions cell (Three dot dropdown menu)
      const actionsCell = document.createElement('td');
      actionsCell.style.textAlign = 'right';
      actionsCell.className = 'actions-cell-dropdown';
      
      const dropdownContainer = document.createElement('div');
      dropdownContainer.className = 'actions-dropdown-container';

      const triggerBtn = document.createElement('button');
      triggerBtn.type = 'button';
      triggerBtn.className = 'btn-action-trigger';
      triggerBtn.setAttribute('aria-label', 'Open actions menu');
      triggerBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="12" cy="5" r="1.5"></circle>
          <circle cx="12" cy="19" r="1.5"></circle>
        </svg>
      `;

      const dropdownMenu = document.createElement('div');
      dropdownMenu.className = 'actions-dropdown-menu';

      // Dropdown Options
      const viewOption = document.createElement('button');
      viewOption.type = 'button';
      viewOption.className = 'dropdown-item';
      viewOption.innerHTML = `${svgEye} <span>View Details</span>`;
      viewOption.addEventListener('click', (e) => {
        e.stopPropagation();
        closeActiveDropdown();
        showUserDetails(user);
      });

      const editOption = document.createElement('button');
      editOption.type = 'button';
      editOption.className = 'dropdown-item';
      editOption.innerHTML = `${svgEdit} <span>Edit Settings</span>`;
      editOption.addEventListener('click', (e) => {
        e.stopPropagation();
        closeActiveDropdown();
        showCreateUserView(user);
      });

      const deleteOption = document.createElement('button');
      deleteOption.type = 'button';
      deleteOption.className = 'dropdown-item btn-delete-option';
      deleteOption.innerHTML = `${svgTrash} <span>Delete Profile</span>`;
      deleteOption.addEventListener('click', (e) => {
        e.stopPropagation();
        closeActiveDropdown();
        promptDeleteUser(user);
      });

      dropdownMenu.appendChild(viewOption);
      dropdownMenu.appendChild(editOption);
      dropdownMenu.appendChild(deleteOption);

      triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdownMenu.classList.contains('active');
        closeActiveDropdown();

        if (!isOpen) {
          dropdownMenu.classList.add('active');
          triggerBtn.classList.add('active');
          activeDropdown = dropdownMenu;
        }
      });

      dropdownContainer.appendChild(triggerBtn);
      dropdownContainer.appendChild(dropdownMenu);
      actionsCell.appendChild(dropdownContainer);

      row.appendChild(userCell);
      row.appendChild(usernameCell);
      row.appendChild(emailCell);
      row.appendChild(roleCell);
      row.appendChild(actionsCell);

      tableBody.appendChild(row);
    });
  }

  function closeActiveDropdown() {
    if (activeDropdown) {
      activeDropdown.classList.remove('active');
      const trigger = activeDropdown.previousElementSibling;
      if (trigger) trigger.classList.remove('active');
      activeDropdown = null;
    }
  }

  function renderPagination(totalItems, totalPages) {
    if (totalItems === 0) {
      paginationWrapper.style.display = 'none';
      return;
    }

    paginationWrapper.style.display = 'flex';

    // Stats
    const startNum = (currentPage - 1) * rowsPerPage + 1;
    const endNum = Math.min(currentPage * rowsPerPage, totalItems);
    paginationStats.textContent = `Showing ${startNum} to ${endNum} of ${totalItems} entries`;

    // Disable statuses
    btnPrevPage.disabled = currentPage === 1;
    btnNextPage.disabled = currentPage === totalPages || totalPages === 0;

    // Render numbers
    paginationPagesList.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.type = 'button';
      pageBtn.className = `btn-page-number ${i === currentPage ? 'active' : ''}`;
      pageBtn.textContent = i;
      
      pageBtn.addEventListener('click', () => {
        if (currentPage !== i) {
          currentPage = i;
          applyFiltersAndPagination();
        }
      });
      paginationPagesList.appendChild(pageBtn);
    }
  }

  // --- SEARCH BAR & FILTERS EVENT LISTENERS ---
  searchInput.addEventListener('input', () => {
    const val = searchInput.value.trim();
    if (val === '') {
      clearSearchBtn.style.display = 'none';
    } else {
      clearSearchBtn.style.display = 'block';
    }
    currentPage = 1;
    applyFiltersAndPagination();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    currentPage = 1;
    applyFiltersAndPagination();
  });

  filterRole.addEventListener('change', () => {
    currentPage = 1;
    applyFiltersAndPagination();
  });

  filterGender.addEventListener('change', () => {
    currentPage = 1;
    applyFiltersAndPagination();
  });

  filterStatus.addEventListener('change', () => {
    currentPage = 1;
    applyFiltersAndPagination();
  });

  rowsPerPageSelect.addEventListener('change', () => {
    rowsPerPage = parseInt(rowsPerPageSelect.value);
    currentPage = 1;
    applyFiltersAndPagination();
  });

  btnPrevPage.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      applyFiltersAndPagination();
    }
  });

  btnNextPage.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      applyFiltersAndPagination();
    }
  });

  // --- INSPECT DETAILS MODAL ---
  function showUserDetails(user) {
    document.getElementById('detail-avatar').src = user.photo || defaultProfilePhotoSvg;
    document.getElementById('detail-name').textContent = user.fullname || '-';
    document.getElementById('detail-userid').textContent = `User ID: ${user.userid}`;
    
    const roleBadge = document.getElementById('detail-role-badge');
    roleBadge.textContent = user.role || 'Others';
    roleBadge.className = `badge-role ${user.role ? user.role.toLowerCase() : 'others'}`;

    const statusBadge = document.getElementById('detail-status-badge');
    statusBadge.textContent = user.status || 'Active';
    statusBadge.className = `badge-status ${user.status ? user.status.toLowerCase() : 'active'}`;

    document.getElementById('detail-username').textContent = `@${user.username}` || '-';
    document.getElementById('detail-gender').textContent = user.gender || '-';
    document.getElementById('detail-dob').textContent = formatDOB(user.dob) || '-';
    document.getElementById('detail-email').textContent = user.email || '-';
    document.getElementById('detail-phone').textContent = formatPhoneNumber(user.phone) || '-';
    document.getElementById('detail-country').textContent = user.country || '-';
    document.getElementById('detail-location').textContent = `${user.city}, ${user.state}`;
    document.getElementById('detail-zip').textContent = user.zip || '-';
    document.getElementById('detail-address').textContent = user.address || 'No address registered';
    document.getElementById('detail-created').textContent = user.createdDate || '-';

    const roleWrapper = document.getElementById('detail-role-section-wrapper');
    roleWrapper.innerHTML = '';

    if (user.role === 'Doctor') {
      roleWrapper.innerHTML = `
        <h4 class="role-subsection-heading" style="margin-top: 0; font-size: 14px;">Clinical Credentials</h4>
        <div class="detail-grid-container" style="margin-bottom: 0;">
          <div class="detail-grid-item">
            <span class="detail-label-txt">Employee ID</span>
            <span class="detail-value-txt">${user.employeeId || '-'}</span>
          </div>
          <div class="detail-grid-item">
            <span class="detail-label-txt">Department</span>
            <span class="detail-value-txt">${user.department || '-'}</span>
          </div>
          <div class="detail-grid-item">
            <span class="detail-label-txt">Medical License</span>
            <span class="detail-value-txt">${user.medicalLicense || '-'}</span>
          </div>
          <div class="detail-grid-item">
            <span class="detail-label-txt">Specialization</span>
            <span class="detail-value-txt">${user.specialization || '-'}</span>
          </div>
          <div class="detail-grid-item">
            <span class="detail-label-txt">Experience</span>
            <span class="detail-value-txt">${user.experience ? user.experience + ' Years' : '-'}</span>
          </div>
          <div class="detail-grid-item">
            <span class="detail-label-txt">Joining Date</span>
            <span class="detail-value-txt">${user.joiningDate || '-'}</span>
          </div>
        </div>
      `;
    } else if (user.role === 'Patient') {
      roleWrapper.innerHTML = `
        <h4 class="role-subsection-heading" style="margin-top: 0; font-size: 14px;">Patient Medical File</h4>
        <div class="detail-grid-container" style="margin-bottom: 0;">
          <div class="detail-grid-item">
            <span class="detail-label-txt">Patient ID</span>
            <span class="detail-value-txt">${user.patientId || '-'}</span>
          </div>
          <div class="detail-grid-item">
            <span class="detail-label-txt">Blood Group</span>
            <span class="detail-value-txt">${user.bloodGroup || '-'}</span>
          </div>
          <div class="detail-grid-item">
            <span class="detail-label-txt">Insurance Number</span>
            <span class="detail-value-txt">${user.insuranceNumber || '-'}</span>
          </div>
          <div class="detail-grid-item span-2">
            <span class="detail-label-txt">Medical History</span>
            <span class="detail-value-txt">${user.medicalHistory || 'None recorded'}</span>
          </div>
          <div class="detail-grid-item span-2">
            <span class="detail-label-txt">Known Allergies</span>
            <span class="detail-value-txt">${user.allergies || 'None recorded'}</span>
          </div>
        </div>
 
        <h4 class="role-subsection-heading" style="margin-top: 16px; font-size: 14px;">Emergency Contact</h4>
        <div class="detail-grid-container" style="margin-bottom: 0;">
          <div class="detail-grid-item">
            <span class="detail-label-txt">Contact Name</span>
            <span class="detail-value-txt">${user.emergencyName || '-'}</span>
          </div>
          <div class="detail-grid-item">
            <span class="detail-label-txt">Relationship</span>
            <span class="detail-value-txt">${user.emergencyRelation || '-'}</span>
          </div>
          <div class="detail-grid-item span-2">
            <span class="detail-label-txt">Phone Number</span>
            <span class="detail-value-txt">${formatPhoneNumber(user.emergencyPhone) || '-'}</span>
          </div>
        </div>
      `;
    } else if (user.role === 'Caregiver') {
      roleWrapper.innerHTML = `
        <h4 class="role-subsection-heading" style="margin-top: 0; font-size: 14px;">Caregiver Assignment</h4>
        <div class="detail-grid-container" style="margin-bottom: 0;">
          <div class="detail-grid-item">
            <span class="detail-label-txt">Caregiver ID</span>
            <span class="detail-value-txt">${user.caregiverId || '-'}</span>
          </div>
          <div class="detail-grid-item">
            <span class="detail-label-txt">Relationship/Type</span>
            <span class="detail-value-txt">${user.caregiverRelationship || '-'}</span>
          </div>
          <div class="detail-grid-item">
            <span class="detail-label-txt">Assigned Patient</span>
            <span class="detail-value-txt">${user.assignedPatient || '-'}</span>
          </div>
          <div class="detail-grid-item">
            <span class="detail-label-txt">Shift Assignment</span>
            <span class="detail-value-txt">${user.shift || '-'}</span>
          </div>
        </div>
 
        <h4 class="role-subsection-heading" style="margin-top: 16px; font-size: 14px;">Emergency Contact</h4>
        <div class="detail-grid-container" style="margin-bottom: 0;">
          <div class="detail-grid-item">
            <span class="detail-label-txt">Contact Name</span>
            <span class="detail-value-txt">${user.emergencyName || '-'}</span>
          </div>
          <div class="detail-grid-item">
            <span class="detail-label-txt">Relationship</span>
            <span class="detail-value-txt">${user.emergencyRelation || '-'}</span>
          </div>
          <div class="detail-grid-item span-2">
            <span class="detail-label-txt">Phone Number</span>
            <span class="detail-value-txt">${formatPhoneNumber(user.emergencyPhone) || '-'}</span>
          </div>
        </div>
      `;
    } else {
      roleWrapper.innerHTML = `
        <h4 class="role-subsection-heading" style="margin-top: 0; font-size: 14px;">Additional Settings</h4>
        <p style="font-size: 13px; color: var(--text-muted);">No specialized role-based healthcare files are configured for this user profile type.</p>
      `;
    }

    viewDetailsModal.classList.add('active');
    viewDetailsModal.setAttribute('aria-hidden', 'false');
  }

  closeDetailBtn.addEventListener('click', () => {
    viewDetailsModal.classList.remove('active');
    viewDetailsModal.setAttribute('aria-hidden', 'true');
  });

  // --- DELETE PROFILE ---
  function promptDeleteUser(user) {
    userToDelete = user.userid;
    document.getElementById('delete-username-desc').textContent = `${user.fullname} (${user.userid})`;
    deleteConfirmModal.classList.add('active');
    deleteConfirmModal.setAttribute('aria-hidden', 'false');
  }

  deleteCancelBtn.addEventListener('click', () => {
    deleteConfirmModal.classList.remove('active');
    deleteConfirmModal.setAttribute('aria-hidden', 'true');
    userToDelete = null;
  });

  deleteConfirmBtn.addEventListener('click', () => {
    if (!userToDelete) return;

    mockUsers = mockUsers.filter(user => user.userid !== userToDelete);
    localStorage.setItem('smartmed_mock_users', JSON.stringify(mockUsers));

    const row = document.getElementById(`row-${userToDelete}`);
    if (row) {
      row.style.transition = 'all 0.4s ease';
      row.style.opacity = '0';
      row.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        deleteConfirmModal.classList.remove('active');
        deleteConfirmModal.setAttribute('aria-hidden', 'true');
        userToDelete = null;
        populateRoleFilter();
        applyFiltersAndPagination();
      }, 400);
    } else {
      deleteConfirmModal.classList.remove('active');
      deleteConfirmModal.setAttribute('aria-hidden', 'true');
      userToDelete = null;
      populateRoleFilter();
      applyFiltersAndPagination();
    }
  });


  // ==================== FORM SCREEN LOGIC ====================

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

  // --- PROFILE PHOTO DRAG & DROP / CLICK ---
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
    if (!isEditing) {
      saveDraftToStorage();
    }
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
      if (!isEditing) {
        saveDraftToStorage();
      }
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
      // Check database
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
      if (!isEditing) {
        saveDraftToStorage();
      }
      updateProfileCompletion();
    }, 800);
  });

  // --- DYNAMIC ROLE-BASED TOGGLES ---
  roleSelect.addEventListener('change', () => {
    toggleRoleFields(roleSelect.value);
    isDirty = true;
    if (!isEditing) {
      saveDraftToStorage();
    }
    updateProfileCompletion();
  });

  function toggleRoleFields(role) {
    if (roleFieldsDoctor) roleFieldsDoctor.style.display = 'none';
    if (roleFieldsPatient) roleFieldsPatient.style.display = 'none';
    if (roleFieldsCaregiver) roleFieldsCaregiver.style.display = 'none';
    if (roleFieldsAdmin) roleFieldsAdmin.style.display = 'none';
    if (emergencyContactGroup) emergencyContactGroup.style.display = 'none';

    if (groupSpecifyRole && specifyRoleInput) {
      if (role === 'Other') {
        groupSpecifyRole.style.display = 'block';
        specifyRoleInput.setAttribute('required', 'required');
      } else {
        groupSpecifyRole.style.display = 'none';
        specifyRoleInput.removeAttribute('required');
        specifyRoleInput.value = '';
        clearValidationState(specifyRoleInput);
        groupSpecifyRole.classList.remove('has-value');
      }
    }

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
      'emergency-name', 'emergency-relation', 'emergency-phone',
      'specify-role'
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

  // --- VALIDATION ENGINE ---
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

    // Custom validations
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

    if (id === 'specify-role') {
      if (value.length < 2) {
        showError(input, "Specify Role must be at least 2 characters.");
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
      roleSelect,
      passwordInput,
      confirmPasswordInput
    ];

    const role = roleSelect.value;
    if (role === 'Other') {
      fieldsToValidate.push(document.getElementById('specify-role'));
    } else if (role === 'Doctor') {
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
      else if (el.id === 'specify-role' && val.length < 2) isMet = false;
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
      specifyRole: specifyRoleInput ? specifyRoleInput.value : '',
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

      if (photoBase64) {
        previewImage.src = photoBase64;
        uploadControls.style.display = 'flex';
        uploadTrigger.closest('.profile-upload-container').classList.add('success-state');
      }

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

      document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
        const group = input.closest('.form-group');
        if (group && input.value && input.value.trim() !== '') {
          group.classList.add('has-value');
        }
      });

      toggleRoleFields(roleSelect.value);
      if (roleSelect.value === 'Other' && data.specifyRole) {
        if (specifyRoleInput) {
          specifyRoleInput.value = data.specifyRole;
          const group = specifyRoleInput.closest('.form-group');
          if (group) group.classList.add('has-value');
        }
      }
      updateProfileCompletion();

    } catch (e) {
      console.error("Failed to restore draft: ", e);
    }
  }

  // --- RESETCONFIRM MODAL LOGIC ---
  resetButton.addEventListener('click', () => {
    resetConfirmModal.classList.add('active');
    resetConfirmModal.setAttribute('aria-hidden', 'false');
  });

  resetCancelBtn.addEventListener('click', () => {
    resetConfirmModal.classList.remove('active');
    resetConfirmModal.setAttribute('aria-hidden', 'true');
  });

  resetConfirmBtn.addEventListener('click', () => {
    localStorage.removeItem('smartmed_draft_single');
    isDirty = false;
    resetFormFields();
    
    resetConfirmModal.classList.remove('active');
    resetConfirmModal.setAttribute('aria-hidden', 'true');
  });

  function resetFormFields() {
    form.reset();
    photoBase64 = null;
    previewImage.src = defaultProfilePhotoSvg;
    photoInput.value = '';
    uploadControls.style.display = 'none';
    photoError.textContent = '';
    photoError.style.opacity = 0;
    photoError.style.height = "0px";
    document.getElementById('photo-instructions').style.color = "var(--text-muted)";
    uploadTrigger.closest('.profile-upload-container').classList.remove('success-state', 'error-state');
    
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
    updateCriteriaItem(ruleLength, false);
    updateCriteriaItem(ruleUpperLower, false);
    updateCriteriaItem(ruleNumber, false);
    updateCriteriaItem(ruleSpecial, false);

    toggleRoleFields('');
    updateProfileCompletion();
  }

  // --- FORM SUBMIT HANDLING ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    submitBtn.disabled = true;
    loadingOverlay.classList.add('active');
    loadingOverlay.setAttribute('aria-hidden', 'false');

    const generatedUserId = isEditing ? editingUserId : generateNewUserId();

    setTimeout(() => {
      loadingOverlay.classList.remove('active');
      loadingOverlay.setAttribute('aria-hidden', 'true');

      document.getElementById('res-userid').textContent = generatedUserId;
      document.getElementById('res-fullname').textContent = document.getElementById('fullname').value;
      document.getElementById('res-username').textContent = usernameInput.value;
      document.getElementById('res-email').textContent = document.getElementById('email').value;
      document.getElementById('res-role').textContent = roleSelect.value === 'Other' && specifyRoleInput ? specifyRoleInput.value.trim() : roleSelect.value;
      
      const successPhoto = document.getElementById('res-photo');
      if (successPhoto) {
        successPhoto.src = photoBase64 || defaultProfilePhotoSvg;
      }

      const userDetails = {
        userid: generatedUserId,
        fullname: document.getElementById('fullname').value,
        username: usernameInput.value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dob: dobInput.value,
        gender: document.getElementById('gender').value,
        role: roleSelect.value === 'Other' && specifyRoleInput ? specifyRoleInput.value.trim() : roleSelect.value,
        country: document.getElementById('country').value,
        state: document.getElementById('state').value,
        city: document.getElementById('city').value,
        zip: document.getElementById('zip').value,
        address: isEditing ? (mockUsers.find(u => u.userid === editingUserId)?.address || '') : '',
        photo: photoBase64 || defaultProfilePhotoSvg,
        status: isEditing ? (mockUsers.find(u => u.userid === editingUserId)?.status || "Active") : "Active",
        createdDate: isEditing ? (mockUsers.find(u => u.userid === editingUserId)?.createdDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })) : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        password: passwordInput.value
      };

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

      const modalTitleEl = document.getElementById('modal-title');
      const modalDescEl = modalTitleEl.nextElementSibling;
      if (isEditing) {
        modalTitleEl.textContent = "User Updated Successfully!";
        modalDescEl.textContent = "The user profile details have been updated.";
      } else {
        modalTitleEl.textContent = "User Created Successfully!";
        modalDescEl.textContent = "The user profile and credentials have been initialized.";
      }

      // Update Database
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
      populateRoleFilter();

      // Show Success Modal
      successModal.classList.add('active');
      successModal.setAttribute('aria-hidden', 'false');

      if (!isEditing) {
        let count = parseInt(localStorage.getItem('smartmed_last_userid_index') || '10');
        count++;
        localStorage.setItem('smartmed_last_userid_index', count.toString());
      }

      localStorage.removeItem('smartmed_draft_single');
      isDirty = false;
      resetFormFields();
      submitBtn.disabled = false;
    }, 1600);
  });

  successDoneBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
    successModal.setAttribute('aria-hidden', 'true');
    showListView();
  });

  // --- ACTIONS WIRE UP ---
  btnCreateUserHeader.addEventListener('click', () => {
    showCreateUserView();
  });

  navBackUsers.addEventListener('click', (e) => {
    e.preventDefault();
    isDirty = false;
    showListView();
  });

  cancelBtn.addEventListener('click', () => {
    isDirty = false;
    showListView();
  });

  // Browser leave warning
  window.addEventListener('beforeunload', (e) => {
    if (isDirty) {
      e.preventDefault();
      e.returnValue = 'You have unsaved changes. Discard draft?';
      return 'You have unsaved changes. Discard draft?';
    }
  });

  // Modals overlay dismissals
  document.addEventListener('click', (e) => {
    if (activeDropdown && !e.target.closest('.actions-dropdown-container')) {
      closeActiveDropdown();
    }
    if (e.target === viewDetailsModal) {
      viewDetailsModal.classList.remove('active');
      viewDetailsModal.setAttribute('aria-hidden', 'true');
    }
    if (e.target === deleteConfirmModal) {
      deleteConfirmModal.classList.remove('active');
      deleteConfirmModal.setAttribute('aria-hidden', 'true');
      userToDelete = null;
    }
    if (e.target === resetConfirmModal) {
      resetConfirmModal.classList.remove('active');
      resetConfirmModal.setAttribute('aria-hidden', 'true');
    }
  });

  // ==================== HELPERS ====================
  function formatPhoneNumber(phoneStr) {
    if (!phoneStr) return '';
    const clean = phoneStr.replace(/\D/g, '');
    if (clean.length === 10) {
      return `(${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(6)}`;
    }
    return phoneStr;
  }

  function formatDOB(dobStr) {
    if (!dobStr) return '';
    try {
      const d = new Date(dobStr);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch(e) {
      return dobStr;
    }
  }

});
