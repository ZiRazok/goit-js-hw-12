export default function renderElements(elements) {
    const strHTML = [];
    elements.forEach(element => {
        strHTML.push(`
            <li class="main-item">
                <a class="main-link" href="${element.largeImageURL}" onclick="return false;">
                  <img class="main-image" src="${element.webformatURL}" alt="${element.tags}" height="200" width="200" />
                  <div class="main-characteristics">
                    <div class="main-characteristics-element">
                      <p class="main-characteristics-type">Likes</p>
                      <p class="main-characteristics-value">${element.likes}</p>
                    </div>
                    <div class="main-characteristics-element">
                      <p class="main-characteristics-type">Views</p>
                      <p class="main-characteristics-value">${element.views}</p>
                    </div>
                    <div class="main-characteristics-element">
                      <p class="main-characteristics-type">Comments</p>
                      <p class="main-characteristics-value">${element.comments}</p>
                    </div>
                    <div class="main-characteristics-element">
                      <p class="main-characteristics-type">Downloads</p>
                      <p class="main-characteristics-value">${element.downloads}</p>
                    </div>
                </div>
              </a>
            </li>
            `);
    });
    return strHTML;
}