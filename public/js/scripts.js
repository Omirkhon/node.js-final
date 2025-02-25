// Fetch tasks for the dashboard
async function fetchTasks() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You are not logged in. Redirecting to login page...');
        window.location.href = '/login';
        return;
    }

    const response = await fetch('/tasks', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();
    if (response.ok) {
        console.log('Tasks:', result.tasks);
        // Render tasks in the dashboard
    } else {
        alert(result.error || 'Failed to fetch tasks');
    }
}

// Fetch users for the dashboard (admin only)
async function fetchUsers() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You are not logged in. Redirecting to login page...');
        window.location.href = '/login';
        return;
    }

    const response = await fetch('/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();
    if (response.ok) {
        console.log('Users:', result.users);
        // Render users in the dashboard
    } else {
        alert(result.error || 'Failed to fetch users');
    }
}

// Register Form Submission
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (response.ok) {
        alert('Registration successful!');
        window.location.href = '/login';
    } else {
        alert(result.error || 'Registration failed');
    }
});

// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (response.ok) {
        localStorage.setItem('token', result.token); // Save the token
        window.location.href = '/dashboard'; // Redirect to dashboard
    } else {
        alert(result.error || 'Login failed');
    }
});

// Add Task Form Submission
document.getElementById('addTaskForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (response.ok) {
        alert('Task added successfully!');
        window.location.reload();
    } else {
        alert(result.error || 'Failed to add task');
    }
});