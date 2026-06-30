// ===== Data =====
    let courses = [
      { id: 'CS101', name: 'Introduction to Computer Science', duration: '6 months', fee: '$499.00' },
      { id: 'MATH01', name: 'Advanced Mathematics', duration: '12 months', fee: '$799.00' }
    ];

    let students = [
      { id: 'S001', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', course: 'CS101' },
      { id: 'S002', name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321', course: 'MATH01' }
    ];

    let resultData = [
      { sid: 'S001', name: 'John Doe', course: 'CS101', score: '85', grade: 'A', remarks: 'Excellent performance' },
      { sid: 'S002', name: 'Jane Smith', course: 'MATH01', score: '92', grade: 'A+', remarks: 'Outstanding work' }
    ];

    // ===== Navigation =====
    function navigateTo(page) {
      if (page === 'closed') {
        document.getElementById('page-closed').classList.remove('hidden');
        return;
      }
      document.getElementById('page-closed').classList.add('hidden');

      document.querySelectorAll('.nav-item').forEach(el => {
        if (el.dataset.page === page) el.classList.add('active');
        else el.classList.remove('active');
      });

      document.querySelectorAll('.page-section').forEach(el => el.classList.add('hidden'));
      const target = document.getElementById('page-' + page);
      if (target) target.classList.remove('hidden');

      const map = {
        dashboard: { text: 'Dashboard', icon: 'fa-table-columns' },
        course: { text: 'Course Management', icon: 'fa-book' },
        student: { text: 'Student Management', icon: 'fa-user-graduate' },
        result: { text: 'Result Management', icon: 'fa-file-pen' },
        'view-results': { text: 'View Results', icon: 'fa-list-check' },
        logout: { text: 'Logout', icon: 'fa-right-from-bracket' },
        exit: { text: 'Exit', icon: 'fa-power-off' }
      };
      const t = map[page] || map.dashboard;
      document.getElementById('header-title').innerHTML = `<i class="fa-solid ${t.icon} mr-2 text-gray-500"></i>${t.text}`;
    }

    function performLogout() {
      alert('You have been logged out successfully.');
      navigateTo('dashboard');
    }

    function performExit() {
      navigateTo('closed');
    }

    // ===== Renderers =====
    function renderCourses() {
      const tbody = document.getElementById('course-tbody');
      tbody.innerHTML = '';
      courses.forEach((c, idx) => {
        tbody.innerHTML += `
          <tr class="border-b border-gray-100 hover:bg-gray-50">
            <td class="py-3 px-4">${c.id}</td>
            <td class="py-3 px-4">${c.name}</td>
            <td class="py-3 px-4">${c.duration}</td>
            <td class="py-3 px-4">${c.fee}</td>
            <td class="py-3 px-4">
              <button onclick="editCourse(${idx})" class="px-2 py-1 rounded border border-blue-500 text-blue-600 text-xs hover:bg-blue-50">Edit</button>
              <button onclick="deleteCourse(${idx})" class="px-2 py-1 rounded border border-red-500 text-red-600 text-xs hover:bg-red-50 ml-1">Delete</button>
            </td>
          </tr>`;
      });
    }

    function renderStudents() {
      const tbody = document.getElementById('student-tbody');
      const sel = document.getElementById('s-course');
      let html = '<option value="">Select Course</option>';
      courses.forEach(c => {
        html += `<option value="${c.id}">${c.name}</option>`;
      });
      sel.innerHTML = html;
      sel.value = ''; // reset

      tbody.innerHTML = '';
      students.forEach((s, idx) => {
        const cName = courses.find(c => c.id === s.course)?.name || s.course;
        tbody.innerHTML += `
          <tr class="border-b border-gray-100 hover:bg-gray-50">
            <td class="py-3 px-4">${s.id}</td>
            <td class="py-3 px-4">${s.name}</td>
            <td class="py-3 px-4">${s.email}</td>
            <td class="py-3 px-4">${s.phone}</td>
            <td class="py-3 px-4">${cName}</td>
            <td class="py-3 px-4">
              <button onclick="editStudent(${idx})" class="px-2 py-1 rounded border border-blue-500 text-blue-600 text-xs hover:bg-blue-50">Edit</button>
              <button onclick="deleteStudent(${idx})" class="px-2 py-1 rounded border border-red-500 text-red-600 text-xs hover:bg-red-50 ml-1">Delete</button>
            </td>
          </tr>`;
      });
    }

    function populateResultStudentSelect() {
      const sel = document.getElementById('res-student');
      let html = '<option value="">Select Student</option>';
      students.forEach(s => {
        html += `<option value="${s.id}">${s.id} - ${s.name} (${s.course})</option>`;
      });
      sel.innerHTML = html;
    }

    function renderResults() {
      const term = document.getElementById('vr-search').value.toLowerCase();
      const tbody = document.getElementById('vr-tbody');
      tbody.innerHTML = '';
      resultData.forEach(r => {
        if (term && !r.sid.toLowerCase().includes(term) && !r.name.toLowerCase().includes(term)) return;
        tbody.innerHTML += `
          <tr class="border-b border-gray-100 hover:bg-gray-50">
            <td class="py-3 px-4">${r.sid}</td>
            <td class="py-3 px-4">${r.name}</td>
            <td class="py-3 px-4">${r.course}</td>
            <td class="py-3 px-4">${r.score}</td>
            <td class="py-3 px-4 font-semibold">${r.grade}</td>
            <td class="py-3 px-4">${r.remarks}</td>
          </tr>`;
      });
    }

    // ===== Global Actions =====
    window.deleteCourse = idx => { if(confirm('Delete this course?')) { courses.splice(idx,1); renderCourses(); } };
    window.editCourse = idx => {
      const c = courses[idx];
      document.getElementById('c-id').value = c.id;
      document.getElementById('c-name').value = c.name;
      document.getElementById('c-duration').value = c.duration;
      document.getElementById('c-fee').value = c.fee.replace('$','');
      courses.splice(idx,1);
      renderCourses();
    };

    window.deleteStudent = idx => { if(confirm('Delete this student?')) { students.splice(idx,1); renderStudents(); populateResultStudentSelect(); } };
    window.editStudent = idx => {
      const s = students[idx];
      document.getElementById('s-id').value = s.id;
      document.getElementById('s-name').value = s.name;
      document.getElementById('s-email').value = s.email;
      document.getElementById('s-phone').value = s.phone;
      document.getElementById('s-course').value = s.course;
      students.splice(idx,1);
      renderStudents();
      populateResultStudentSelect();
    };

    // ===== Event Listeners =====
    document.addEventListener('DOMContentLoaded', () => {
      renderCourses();
      renderStudents();
      populateResultStudentSelect();
      renderResults();
      navigateTo('dashboard');

      // Course form
      document.getElementById('course-form').addEventListener('submit', e => {
        e.preventDefault();
        const id = document.getElementById('c-id').value.trim();
        const name = document.getElementById('c-name').value.trim();
        const dur = document.getElementById('c-duration').value.trim();
        const feeVal = document.getElementById('c-fee').value;
        const fee = feeVal ? '$' + parseFloat(feeVal).toFixed(2) : '$0.00';
        if (!id || !name) return alert('Course ID and Name are required');
        courses.push({ id, name, duration: dur, fee });
        renderCourses();
        e.target.reset();
      });

      // Student form
      document.getElementById('student-form').addEventListener('submit', e => {
        e.preventDefault();
        const id = document.getElementById('s-id').value.trim();
        const name = document.getElementById('s-name').value.trim();
        const email = document.getElementById('s-email').value.trim();
        const phone = document.getElementById('s-phone').value.trim();
        const course = document.getElementById('s-course').value;
        if (!id || !name || !email) return alert('Please fill required fields');
        students.push({ id, name, email, phone, course });
        renderStudents();
        populateResultStudentSelect();
        e.target.reset();
      });

      // Result select change
      document.getElementById('res-student').addEventListener('change', function() {
        const stu = students.find(s => s.id === this.value);
        const c = stu ? courses.find(x => x.id === stu.course) : null;
        document.getElementById('res-course').value = c ? `${c.id} - ${c.name}` : (stu ? stu.course : '');
      });

      // Result form
      document.getElementById('result-form').addEventListener('submit', e => {
        e.preventDefault();
        const sid = document.getElementById('res-student').value;
        const stu = students.find(s => s.id === sid);
        if (!stu) return alert('Please select a student');
        const score = document.getElementById('res-score').value;
        const grade = document.getElementById('res-grade').value;
        const remarks = document.getElementById('res-remarks').value;
        resultData.push({ sid, name: stu.name, course: stu.course, score, grade, remarks });
        renderResults();
        e.target.reset();
        document.getElementById('res-course').value = '';
        alert('Result submitted successfully!');
      });

      // Search
      document.getElementById('vr-search-btn').addEventListener('click', renderResults);
      document.getElementById('vr-search').addEventListener('keyup', e => { if(e.key==='Enter') renderResults(); });
    });
