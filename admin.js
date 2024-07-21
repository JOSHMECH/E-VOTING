const correctPassword = 'admin123'; // Change this to your desired password

function login() {
    const passwordInput = document.getElementById('password').value;
    if (passwordInput === correctPassword) {
        document.getElementById('login-form').classList.add('d-none');
        document.getElementById('results').classList.remove('d-none');
        document.getElementById('clear-votes').classList.remove('d-none');
        showResults();
    } else {
        alert('Incorrect password');
    }
}

function showResults() {
    const votes = JSON.parse(localStorage.getItem('votes')) || {};
    const resultsDiv = document.getElementById('results');
    const results = {};

    for (const [category, vote] of Object.entries(votes)) {
        if (!results[category]) {
            results[category] = {};
        }
        results[category][vote] = (results[category][vote] || 0) + 1;
    }

    resultsDiv.innerHTML = '';
    for (const [category, candidates] of Object.entries(results)) {
        resultsDiv.innerHTML += `<h3>${category}</h3>`;
        for (const [candidate, count] of Object.entries(candidates)) {
            resultsDiv.innerHTML += `<p>${candidate}: ${count} votes</p>`;
        }
    }
}

function clearVotes() {
    if (confirm('Are you sure you want to clear all votes?')) {
        localStorage.removeItem('votes');
        localStorage.removeItem('hasVoted');
        showResults();
        alert('All votes have been cleared.');
    }
}
