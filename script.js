function submitVote() {
    const categories = ['fresher-f', 'fresher-m' /* add other category ids here */];
    let votes = {};

    categories.forEach(category => {
        const form = document.getElementById(category);
        const selectedOption = form.querySelector('input[name="' + category + '"]:checked');
        if (selectedOption) {
            votes[category] = selectedOption.value;
        }
    });

    localStorage.setItem('votes', JSON.stringify(votes));
    alert('Your votes have been submitted!');
}
