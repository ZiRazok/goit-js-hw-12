import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import pixabayApiFunction from "/js/pixabay-api";
import renderElements from "/js/render-functions";

const openSearchBtn = document.querySelector('.open-search');
const mainForm = document.querySelector('.main-form');
const mainInput = document.querySelector('.main-form-input');
const mainList = document.querySelector('.main-list');
const nextPageBtn = document.querySelector('.next-page-btn');
const mainLoader = document.querySelector('.main-loader');
const nextPageLoader = document.querySelector('.next-page-loader');

let inputValue;
let page;
let totalPages;

function toggleIsOpen() { mainForm.classList.toggle('isOpen'); mainForm.reset(); };
function toggleIsVisuallyHidden(set) {
    if (set) nextPageBtn.classList.add('visually-hidden')
    else if (nextPageBtn.classList.contains('visually-hidden')) nextPageBtn.classList.remove('visually-hidden');
};
function toggleIsLoader(object) { object.classList.toggle('loader'); };

openSearchBtn.addEventListener("click", () => { toggleIsOpen(); mainInput.focus(); });

document.addEventListener('keyup', (event) => {
    if (mainForm.classList.contains('isOpen')) if (event.key === 'Escape') toggleIsOpen();
});

var lightbox = new SimpleLightbox('.main-list a', { captionsData: 'alt' });

mainForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!mainInput.value) {
        iziToast.warning({
            message: 'The input field cannot be empty!',
            position: "topRight",
            theme: 'dark',
            backgroundColor: '#ef4040'
        });
        return;
    };
    inputValue = mainInput.value;
    toggleIsOpen();
    toggleIsLoader(mainLoader);
    page = 1;
    pixabayApiFunction(inputValue, page)
        .then((response) => {
            if (response.hits.length == 0) {
                iziToast.warning({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: "topRight",
                    theme: 'dark',
                    backgroundColor: '#ef4040'
                });
                toggleIsLoader(mainLoader);
                throw new Error('Cannot found');
            };
            toggleIsLoader(mainLoader);
            if (mainList.querySelectorAll('li'))
                mainList.querySelectorAll('li').forEach(item => { item.remove(); });
            mainList.insertAdjacentHTML("beforeend", renderElements(response.hits).join(""));
            lightbox.refresh();
            page += 1;
            totalPages = Math.ceil(response.totalHits / 15);
            if (page > totalPages) toggleIsVisuallyHidden(true)
            else toggleIsVisuallyHidden(false);
        })
        .catch(error => console.log(error));
});

nextPageBtn.addEventListener('click', () => {
    toggleIsVisuallyHidden(true);
    toggleIsLoader(nextPageLoader);
    pixabayApiFunction(inputValue, page)
        .then((response) => {
            if (response.hits.length == 0) {
                iziToast.warning({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: "topRight",
                    theme: 'dark',
                    backgroundColor: '#ef4040'
                });
                throw new Error('Cannot found');
            };
            toggleIsLoader(nextPageLoader);
            mainList.insertAdjacentHTML("beforeend", renderElements(response.hits).join(""));
            toggleIsVisuallyHidden(false);
            lightbox.refresh();
            if (page > totalPages) {
                toggleIsVisuallyHidden(true);
                return iziToast.warning({
                    backgroundColor: '#8187f5e8',
                    theme: 'dark',
                    position: "topRight",
                    message: "We're sorry, but you've reached the end of search results."
                });
            };
            let rect = mainList.querySelector('li').getBoundingClientRect();
            window.scrollBy({
                left: 0,
                top: (rect.height * 2) + 15,
                behavior: "smooth",
            });
        })
        .catch(error => console.log(error));
    page += 1;
})