const categories = {
    "Fresher of the Year (F)": [
        "Bamgbese Deborah (Girl boss)",
        "Ololade Lateefah (Kirah)",
        "Cassia",
        "Tunmise"
    ],
    "Fresher of the Year (M)": [
        "Adekoya Abdulmalik",
        "Binuyo Lekan Waliu",
        "Hameed",
        "Idown joshua (josh)",
        "Osemeka Emmanuel",
        "Joseph Blessing (Yung J)",
        "Salau quayum (Kaali)",
        "Immaculate",
        "Salami Daniel"
    ],
    "Most Expensive": [
        "Money Flow",
        "Paparoma",
        "Friday",
        "TMK",
        "Fhad",
        "Akinnawo Ayomide",
        "Gafar Ademola",
        "Yung J",
        "Favis DC",
        "Adetoun",
        "Demola",
        "Oluwatofunmi",
        "GBOLAHAN",
        "Aiyepe Emmanuel",
        "Oreolwa",
        "Adekoya Abdulmalik"
    ],
    "Most Popular": [
        "Abdulmalik",
        "Lost boy",
        "Com.micolo",
        "Mariana",
        "Biggie",
        "Orezy",
        "Adebamowo Kehinde",
        "Bamgbose Deborah",
        "JOSH",
        "kaali",
        "Rhoda",
        "Madanwo",
        "Lollipop",
        "Dikanna",
        "Raheem",
        "Statista",
        "Tife"
    ],
    // Add other categories here
};

function generateVotingForms() {
    const votingSection = document.getElementById('voting-section');
    votingSection.innerHTML = '';

    for (const [category, nominees] of Object.entries(categories)) {
        const formHtml = `
            <div class="card mb-4">
                <div class="card-header">
                    <h2>${category}</h2>
                </div>
                <div class="card-body">
                    <form id="${category.replace(/\s+/g, '-').toLowerCase()}">
                        ${nominees.map((nominee, index) => `
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="${category.replace(/\s+/g, '-').toLowerCase()}" value="${nominee}" id="${category.replace(/\s+/g, '-').toLowerCase()}-${index}">
                                <label class="form-check-label" for="${category.replace(/\s+/g, '-').toLowerCase()}-${index}">${nominee}</label>
                            </div>
                        `).join('')}
                    </form>
                </div>
            </div>
        `;
        votingSection.innerHTML += formHtml;
    }
}

function checkIfVoted() {
    const hasVoted = localStorage.getItem('hasVoted');
    if (hasVoted) {
        alert('You have already voted. Thank you!');
        document.getElementById('voting-section').classList.add('d-none');
        document.getElementById('already-voted').classList.remove('d-none');
    } else {
        generateVotingForms();
        document.getElementById('voting-section').classList.remove('d-none');
        document.getElementById('already-voted').classList.add('d-none');
    }
}

function submitVote() {
    const votes = {};
    Object.keys(categories).forEach(category => {
        const form = document.getElementById(category.replace(/\s+/g, '-').toLowerCase());
        const selectedOption = form.querySelector('input[name="' + category.replace(/\s+/g, '-').toLowerCase() + '"]:checked');
        if (selectedOption) {
            votes[category] = selectedOption.value;
        }
    });

    if (Object.keys(votes).length === Object.keys(categories).length) {
        localStorage.setItem('votes', JSON.stringify(votes));
        localStorage.setItem('hasVoted', 'true');
        checkIfVoted();
        alert('Your votes have been submitted!');
    } else {
        alert('Please select a candidate for each category.');
    }
}

window.onload = checkIfVoted;
