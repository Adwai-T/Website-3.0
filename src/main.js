/**
 * @author Adwait Sonawane
 */

import {
  IconButton,
  GlobalSearch,
  SideNav,
  SearchPopUp,
  ShowError,
  Card,
} from "./component.js";

//  ---  Init custom element from component.js
customElements.define("menu-button", IconButton);
customElements.define("side-nav", SideNav);
customElements.define("search-bar", GlobalSearch);
customElements.define("search-pop-up", SearchPopUp);
customElements.define("show-error", ShowError);
customElements.define("topic-card", Card);
//  ---

const main = document.getElementById("main");
const menuButton = document.getElementById("menu-button");
const sideNav = document.getElementById("side-nav");
const searchBar = document.getElementById("search-bar");
const searchPopUp = document.getElementById("search-pop-up");

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
}
onInit();

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
};


searchBar.addEventListener("globalsearch", (e) => {
  searchPopUp.setAttribute("searchfor", e.detail);
  searchPopUp.setAttribute("open", true);
  e.stopPropagation();
});
/** Events End */

function toggleSideNav(open) {
  if (window.innerWidth > window.innerHeight && open === false) return; // always open for non mobile devices
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
  if (!message) return;
  document.querySelectorAll("show-error").forEach((ele) => ele.remove());
  const showError = document.createElement("show-error");
  showError.setAttribute("message", message);
  if(timer) showError.setAttribute("timer", timer);
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
