import{a as q,S as k,i as u}from"./assets/vendor-c493984e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))v(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&v(m)}).observe(document,{childList:!0,subtree:!0});function a(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function v(i){if(i.ep)return;i.ep=!0;const r=a(i);fetch(i.href,r)}})();async function b(e,t){return(await q.get(`https://pixabay.com/api/?${new URLSearchParams({key:"44228657-622a5a522e8285bbc9d7fdb17",q:`${e}`,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t})}`)).data}function w(e){const t=[];return e.forEach(a=>{t.push(`
            <li class="main-item">
                <a class="main-link" href="${a.largeImageURL}" onclick="return false;">
                  <img class="main-image" src="${a.webformatURL}" alt="${a.tags}" height="200" width="200" />
                  <div class="main-characteristics">
                    <div class="main-characteristics-element">
                      <p class="main-characteristics-type">Likes</p>
                      <p class="main-characteristics-value">${a.likes}</p>
                    </div>
                    <div class="main-characteristics-element">
                      <p class="main-characteristics-type">Views</p>
                      <p class="main-characteristics-value">${a.views}</p>
                    </div>
                    <div class="main-characteristics-element">
                      <p class="main-characteristics-type">Comments</p>
                      <p class="main-characteristics-value">${a.comments}</p>
                    </div>
                    <div class="main-characteristics-element">
                      <p class="main-characteristics-type">Downloads</p>
                      <p class="main-characteristics-value">${a.downloads}</p>
                    </div>
                </div>
              </a>
            </li>
            `)}),t}const E=document.querySelector(".open-search"),d=document.querySelector(".main-form"),p=document.querySelector(".main-form-input"),n=document.querySelector(".main-list"),l=document.querySelector(".next-page-btn"),h=document.querySelector(".main-loader"),L=document.querySelector(".next-page-loader");let f,s,g;function y(){d.classList.toggle("isOpen"),d.reset()}function o(e){e?l.classList.add("visually-hidden"):l.classList.contains("visually-hidden")&&l.classList.remove("visually-hidden")}function c(e){e.classList.toggle("loader")}E.addEventListener("click",()=>{y(),p.focus()});document.addEventListener("keyup",e=>{d.classList.contains("isOpen")&&e.key==="Escape"&&y()});var S=new k(".main-list a",{captionsData:"alt"});d.addEventListener("submit",e=>{if(e.preventDefault(),!p.value){u.warning({message:"The input field cannot be empty!",position:"topRight",theme:"dark",backgroundColor:"#ef4040"});return}f=p.value,y(),c(h),s=1,b(f,s).then(t=>{if(t.hits.length==0)throw u.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",theme:"dark",backgroundColor:"#ef4040"}),c(h),new Error("Cannot found");c(h),n.querySelectorAll("li")&&n.querySelectorAll("li").forEach(a=>{a.remove()}),n.insertAdjacentHTML("beforeend",w(t.hits).join("")),S.refresh(),s+=1,g=Math.ceil(t.totalHits/15),s>g?o(!0):o(!1)}).catch(t=>console.log(t))});l.addEventListener("click",()=>{o(!0),c(L),b(f,s).then(e=>{if(e.hits.length==0)throw u.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",theme:"dark",backgroundColor:"#ef4040"}),new Error("Cannot found");if(c(L),n.insertAdjacentHTML("beforeend",w(e.hits).join("")),o(!1),S.refresh(),s>g)return o(!0),u.warning({backgroundColor:"#8187f5e8",theme:"dark",position:"topRight",message:"We're sorry, but you've reached the end of search results."});let t=n.querySelector("li").getBoundingClientRect();window.scrollBy({left:0,top:t.height*2+15,behavior:"smooth"})}).catch(e=>console.log(e)),s+=1});
//# sourceMappingURL=commonHelpers.js.map
