const btn = document.querySelector('#searchBtn');
const input = document.querySelector('#search');
const display = document.querySelector('.display');
const loadBtn = document.querySelector('.btn');

// dataRequest function
function dataRequest(query) {
    const url = `https://api.pexels.com/v1/search?query=${query}`;

    fetch(url, {
        headers: {
          Authorization: config.API_KEY
        }})
        .then(response => response.json())
        .then(result => {
            console.log(result.next_page);
            result.photos.forEach(photo => {
                const item = document.createElement('div');
                item.classList.add('photo');
                item.innerHTML = `<img src=${photo.src.medium}/>`;
                display.appendChild(item);
            });           
        })
        .catch(err => console.log(err));
};

// when the app loads
window.addEventListener('load', () => {
    dataRequest('nature');
});


// search query
btn.addEventListener('click', (e) => {
    e.preventDefault();

    let searchInput = input.value;
    localStorage.setItem('inputValue', searchInput);
    input.value=' ';

    display.innerHTML = ' ';
    dataRequest(searchInput);
    loadBtn.classList.add('display');
});

// loadMore function
let i = 2;
function loadMore(query) {
    const url = `https://api.pexels.com/v1/search?query=${query}&page=${i}`;

    fetch(url, {
        headers: {
          Authorization: config.API_KEY
        }})
        .then(response => response.json())
        .then(result => {
            result.photos.forEach(photo => {
                const item = document.createElement('div');
                item.classList.add('photo');
                item.innerHTML = `<img src=${photo.src.medium}/>`;
                display.appendChild(item);
            });           
        })
        .catch(err => console.log(err));

        i++;
}

// when load more btn is clicked 
loadBtn.addEventListener('click', (e) => {
    e.preventDefault();  
    let input = localStorage.getItem('inputValue');
    loadMore(input);
});
