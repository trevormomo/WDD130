const url = 'https://trevormomo.github.io/wdd130/blob/main/PSite/data/pictures.json'; // Ensure this URL is correct

const cards = document.querySelector('#games-list');

async function getPicData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayPics(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const displayPics = (pictures) => {
    pictures.forEach((picture) => {
        let card = document.createElement('div');
        card.classList.add('game');

        let portrait = document.createElement('img');
        portrait.setAttribute('src', picture.url);
        portrait.setAttribute('alt', `Picture of ${picture.title}`);

        let title = document.createElement('div');
        title.classList.add('game-name');
        title.textContent = picture.title;

        card.appendChild(portrait);
        card.appendChild(title);

        cards.appendChild(card);
    });
};

getPicData();
