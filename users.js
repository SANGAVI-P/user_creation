document.addEventListener('DOMContentLoaded', () => {
  // Elements Cache
  const tableBody = document.getElementById('users-table-body');
  const searchInput = document.getElementById('search-list-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const emptyStateWrapper = document.getElementById('empty-state-wrapper');
  const tableWrapper = document.getElementById('table-wrapper');
  const paginationWrapper = document.getElementById('pagination-wrapper');

  // Filter elements
  const filterRole = document.getElementById('filter-role');
  const filterGender = document.getElementById('filter-gender');
  const filterStatus = document.getElementById('filter-status');

  // Pagination elements
  const rowsPerPageSelect = document.getElementById('rows-per-page');
  const btnPrevPage = document.getElementById('btn-prev-page');
  const btnNextPage = document.getElementById('btn-next-page');
  const paginationPagesList = document.getElementById('pagination-pages-list');
  const paginationStats = document.getElementById('pagination-stats');

  // Modals
  const viewDetailsModal = document.getElementById('view-details-modal');
  const closeDetailBtn = document.getElementById('close-detail-btn');
  const deleteConfirmModal = document.getElementById('delete-confirm-modal');
  const deleteCancelBtn = document.getElementById('delete-cancel-btn');
  const deleteConfirmBtn = document.getElementById('delete-confirm-btn');

  // SVG Cache
  const svgEye = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  const svgEdit = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
  const svgTrash = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;
  const defaultProfilePhotoSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2364748b'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

  // State Variables
  let mockUsers = [];
  let filteredUsers = [];
  let userToDelete = null;

  // Pagination & Filtering state
  let currentPage = 1;
  let rowsPerPage = 10;
  let activeDropdown = null; // Track open three-dot menu dropdown element

  // Initial Load
  loadUsers();

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
        mockUsers = [];
      }
    } else {
      mockUsers = [];
    }

    applyFiltersAndPagination();
  }

  // --- FILTER & PAGINATION LOGIC ---
  function applyFiltersAndPagination() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedRole = filterRole.value;
    const selectedGender = filterGender.value;
    const selectedStatus = filterStatus.value;

    // Apply filters
    filteredUsers = mockUsers.filter(user => {
      // Search matches
      const matchesSearch = 
        user.fullname.toLowerCase().includes(searchTerm) || 
        user.username.toLowerCase().includes(searchTerm) ||
        user.userid.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm);

      // Role filter
      const matchesRole = !selectedRole || user.role === selectedRole;

      // Gender filter
      const matchesGender = !selectedGender || user.gender === selectedGender;

      // Status filter
      const matchesStatus = !selectedStatus || user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });

    // Reset pagination to first page if current page exceeds bounds
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
    if (currentPage > totalPages) {
      currentPage = Math.max(1, totalPages);
    }

    renderTable(filteredUsers);
    renderPagination(filteredUsers.length, totalPages);
  }

  function renderTable(usersList) {
    // Close any open dropdowns
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

    // Slice records for the current page
    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    const pageItems = usersList.slice(startIdx, endIdx);

    pageItems.forEach(user => {
      const row = document.createElement('tr');
      row.id = `row-${user.userid}`;

      // User Full Name Cell (Avatar + Name + ID)
      const userCell = document.createElement('td');
      userCell.className = 'user-cell';
      userCell.innerHTML = `
        <img src="${user.photo || defaultProfilePhotoSvg}" alt="Avatar" class="user-avatar-sm">
        <div class="user-info-stacked">
          <span class="user-name-txt">${user.fullname}</span>
          <span class="user-id-txt">ID: ${user.userid}</span>
        </div>
      `;

      // Username Cell
      const usernameCell = document.createElement('td');
      usernameCell.innerHTML = `<span class="username-badge">@${user.username}</span>`;

      // Email Cell
      const emailCell = document.createElement('td');
      emailCell.textContent = user.email || '-';

      // Role Cell
      const roleCell = document.createElement('td');
      const roleBadgeClass = user.role ? user.role.toLowerCase() : 'others';
      roleCell.innerHTML = `<span class="badge-role ${roleBadgeClass}">${user.role || 'Others'}</span>`;

      // Actions Cell (Three-dot dropdown menu)
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

      // View item
      const viewOption = document.createElement('button');
      viewOption.type = 'button';
      viewOption.className = 'dropdown-item';
      viewOption.innerHTML = `${svgEye} <span>View Details</span>`;
      viewOption.addEventListener('click', (e) => {
        e.stopPropagation();
        closeActiveDropdown();
        showUserDetails(user);
      });

      // Edit item
      const editOption = document.createElement('button');
      editOption.type = 'button';
      editOption.className = 'dropdown-item';
      editOption.innerHTML = `${svgEdit} <span>Edit Settings</span>`;
      editOption.addEventListener('click', (e) => {
        e.stopPropagation();
        closeActiveDropdown();
        window.location.href = `create-user.html?edit=${user.userid}`;
      });

      // Delete item
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

      // Trigger listener
      triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdownMenu.classList.contains('active');
        
        // Close other dropdowns first
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

      // Append all cells
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

  // --- RENDERING PAGINATION CONTROLS ---
  function renderPagination(totalItems, totalPages) {
    if (totalItems === 0) {
      paginationWrapper.style.display = 'none';
      return;
    }

    paginationWrapper.style.display = 'flex';

    // Update Stats text
    const startNum = (currentPage - 1) * rowsPerPage + 1;
    const endNum = Math.min(currentPage * rowsPerPage, totalItems);
    paginationStats.textContent = `Showing ${startNum} to ${endNum} of ${totalItems} entries`;

    // Disable state for navigation buttons
    btnPrevPage.disabled = currentPage === 1;
    btnNextPage.disabled = currentPage === totalPages || totalPages === 0;

    // Render page numbers
    paginationPagesList.innerHTML = '';
    
    // Draw simple page buttons
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

  // --- PHONE NUMBER FORMATTER ---
  function formatPhoneNumber(phoneStr) {
    if (!phoneStr) return '';
    const clean = phoneStr.replace(/\D/g, '');
    if (clean.length === 10) {
      return `(${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(6)}`;
    }
    return phoneStr;
  }

  // --- SEARCH BAR & FILTERS EVENT LISTENERS ---
  searchInput.addEventListener('input', () => {
    const val = searchInput.value.trim();
    if (val === '') {
      clearSearchBtn.style.display = 'none';
    } else {
      clearSearchBtn.style.display = 'block';
    }
    currentPage = 1; // reset page index
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

  // --- INSPECT DETAILS MODAL WORKFLOW ---
  function showUserDetails(user) {
    // Populate simple details
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
    
    // Address field is display-only. If user doesn't have it, display placeholder
    document.getElementById('detail-address').textContent = user.address || 'No address registered';
    document.getElementById('detail-created').textContent = user.createdDate || '-';

    // Populate role-specific dynamic content
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

  // --- DATE OF BIRTH FORMATTER ---
  function formatDOB(dobStr) {
    if (!dobStr) return '';
    try {
      const d = new Date(dobStr);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch(e) {
      return dobStr;
    }
  }

  closeDetailBtn.addEventListener('click', () => {
    viewDetailsModal.classList.remove('active');
    viewDetailsModal.setAttribute('aria-hidden', 'true');
  });

  // --- DELETE PROFILE WORKFLOW ---
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

    // Filter out user
    mockUsers = mockUsers.filter(user => user.userid !== userToDelete);
    localStorage.setItem('smartmed_mock_users', JSON.stringify(mockUsers));

    // Animate row deletion
    const row = document.getElementById(`row-${userToDelete}`);
    if (row) {
      row.style.transition = 'all 0.4s ease';
      row.style.opacity = '0';
      row.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        deleteConfirmModal.classList.remove('active');
        deleteConfirmModal.setAttribute('aria-hidden', 'true');
        userToDelete = null;
        applyFiltersAndPagination();
      }, 400);
    } else {
      deleteConfirmModal.classList.remove('active');
      deleteConfirmModal.setAttribute('aria-hidden', 'true');
      userToDelete = null;
      applyFiltersAndPagination();
    }
  });

  // Close modals or dropdown clicking outside
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
  });

});
