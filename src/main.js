/**
 * @author Adwait Sonawane
 */

import { IconButton, GlobalSearch, SideNav, SearchPopUp, ShowError, Card } from "./component.js";

customElements.define("menu-button", IconButton);
customElements.define("side-nav", SideNav);
customElements.define("search-bar", GlobalSearch);
customElements.define('search-pop-up', SearchPopUp);
customElements.define('show-error', ShowError);
customElements.define('topic-card', Card);

const main = document.getElementById("main");
const menuButton = document.getElementById("menu-button");
const sideNav = document.getElementById("side-nav");
const searchBar = document.getElementById('search-bar');
const searchPopUp = document.getElementById('search-pop-up');
const cardContainer = document.getElementById('card-container');

const sideNavWidth = "100";
let isSideNavOpen = false;

function onInit() {
  if (window.innerWidth < window.innerHeight) {
    menuButton.style.visibility = "visible";
    toggleSideNav(false);
  } else {
    menuButton.style.visibility = "hidden";
    toggleSideNav(true);
  }
  testCard();
}
onInit();

function testCard() {
  const card = document.createElement('topic-card');
  card.setAttribute('title', 'Test Title');
  card.setAttribute('image', '/images/interface.svg');
  card.setAttribute('tags', 'salesforce, web-dev');
  card.setAttribute('desc', 'Spring Boot is an open source, microservice-based Java web framework. Spring takes an opinionated approach for developing Spring application. This allows it to reducea lot of setup and get quick running application.');
  card.setAttribute('date', '10 JAN, 2023');
  card.setAttribute('link', '/articles.html');
  cardContainer.appendChild(card);
  const card2 = document.createElement('topic-card');
  card2.setAttribute('title', 'Test Title');
  card2.setAttribute('image', '/images/spring1.svg');
  card2.setAttribute('tags', 'salesforce, web-dev');
  card2.setAttribute('desc', 'Long Long Long Long Long Long long long long logn long long description');
  card2.setAttribute('date', '10 JAN, 2023');
  cardContainer.appendChild(card2);
  const card3 = document.createElement('topic-card');
  card3.setAttribute('title', 'Test Title');
  card3.setAttribute('image', '/images/spring1.svg');
  card3.setAttribute('tags', 'salesforce, web-dev');
  card3.setAttribute('date', '10 JAN, 2023');
  card3.setAttribute('desc', 'Long Long Long Long Long Long long long long logn long long description');
  cardContainer.appendChild(card3);
  const card4 = document.createElement('topic-card');
  card4.setAttribute('title', 'Test Title');
  card4.setAttribute('image', '/images/spring1.svg');
  card4.setAttribute('tags', 'salesforce, web-dev');
  card4.setAttribute('desc', 'Long Long Long Long Long Long long long long logn long long description');
  card4.setAttribute('date', '10 JAN, 2023');
  cardContainer.appendChild(card4);
  const card5 = document.createElement('topic-card');
  card5.setAttribute('title', 'Test Title');
  card5.setAttribute('tags', 'salesforce, web-dev');
  card5.setAttribute('image', '/images/spring1.svg');
  card5.setAttribute('date', '10 JAN, 2023');
  card5.setAttribute('desc', 'Long Long Long Long Long Long long long long logn long long description');
  cardContainer.appendChild(card5);
}

/** Events Start */
window.onresize = () => {
  if (window.innerWidth < window.innerHeight) {
    menuButton.style.visibility = "visible";
    toggleSideNav(false);
  } else {
    menuButton.style.visibility = "hidden";
    toggleSideNav(true);
  }
};

menuButton.onclick = () => {
  if (isSideNavOpen) toggleSideNav(false);
  else toggleSideNav(true);
};

main.onclick = () => {
  if (window.innerWidth < window.innerHeight) toggleSideNav(false);
}

searchBar.addEventListener('globalsearch', (e) => {
  searchPopUp.setAttribute('searchfor', e.detail);
  searchPopUp.setAttribute('open', true);
  e.stopPropagation();
});
/** Events End */

function toggleSideNav(open) {
  if(window.innerWidth > window.innerHeight && open === false) return;// always open for non mobile devices
  if (open) {
    isSideNavOpen = true;
    menuButton.style.left = sideNavWidth - 10 + "px";
    sideNav.style.setProperty("width", sideNavWidth + "px");
    sideNav.style.visibility = "visible";
  } else {
    isSideNavOpen = false;
    menuButton.style.left = "0px";
    sideNav.style.setProperty("width", "0px");
    sideNav.style.visibility = "hidden";
  }
}

export function addError(message, timer) {
  if(!message) return;
  document.querySelectorAll('show-error').forEach(ele => ele.remove());
  const showError = document.createElement('show-error');
  showError.setAttribute('message', message);
  main.appendChild(showError);
}

/**
 * Change theme of provided element
 * @param {HTMLElement} element Element to change theme for
 * @param {string} text
 * @param {string} background
 * @param {string} link
 */
export function changeTheme(element, text, background, link) {
  element.style.setProperty("--primary", link);
  element.style.setProperty("--secondary", link);
  element.style.setProperty("--foreground", text);
  element.style.setProperty("--background", background);
}
