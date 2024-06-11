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
const root = document.documentElement;
const contentContainer = document.getElementById('content-container');
const main = document.getElementById("main");
const menuButton = document.getElementById("menu-button");
const sideNav = document.getElementById("side-nav");
const searchBar = document.getElementById("search-bar");
const searchPopUp = document.getElementById("search-pop-up");

const sideNavWidth = "100";
let isSideNavOpen = false;

function onInit() {
  declareFunctionFromModuleToUseInGlobalScope();
  checkWindowSizeAndUpdateMenu();
}
onInit();

function declareFunctionFromModuleToUseInGlobalScope() {
  window.addError = addError;
}

/** Events Start */
window.onresize = () => {
  checkWindowSizeAndUpdateMenu();
};

menuButton.onclick = () => {
  if (isSideNavOpen) toggleSideNav(false);
  else toggleSideNav(true);
};

contentContainer.onclick = () => {
  if (window.innerWidth < window.innerHeight) toggleSideNav(false);
};


searchBar.addEventListener("globalsearch", (e) => {
  searchPopUp.setAttribute("searchfor", e.detail);
  searchPopUp.setAttribute("open", true);
  e.stopPropagation();
});
/** Events End */


function checkWindowSizeAndUpdateMenu() {
  if (window.innerWidth < window.innerHeight) {
    menuButton.style.visibility = "visible";
    toggleSideNav(false);
  } else {
    menuButton.style.visibility = "hidden";
    toggleSideNav(true);
  }
}

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
  contentContainer.appendChild(showError);
}

/**
 * Change theme of provided element
 */
function changeTheme(element, primary, secondary, text, 
  background, backBackground, border) {
  element.style.setProperty("--primary", primary); // -- button text, icons,card text title
  element.style.setProperty("--secondary", secondary); // -- card description text
  element.style.setProperty("--foreground", text); // -- All other text
  element.style.setProperty("--background", background); // -- buttons on hover, sidebar, cards
  element.style.setProperty("--back-background", backBackground); // --background of buttons
  element.style.setProperty("--border", border); // -- Border color for cards and buttons
}

function toLightMode (element) {
  changeTheme(element, '#AC3B61', '#123C69', '#123C69', '#EEE2DC', '#BAB2VB5', '#EDC787');
}
function toDarkMode (element) {
  changeTheme(element, '#0065a9', '#0098ff', '#1f3864', '#e6e6e6', '#aaaaaa', '#5ab3d5');
}
// -- For debug
function toDebugMode (element) {
  changeTheme(element, 'green', 'blue', 'red', 'pink', 'brown', 'black');
}