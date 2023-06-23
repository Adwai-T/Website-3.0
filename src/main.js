/**
 * @author Adwait Sonawane
 */

import { IconButton, SideNav } from "./component.js";

customElements.define('menu-button', IconButton);
customElements.define('side-nav', SideNav);

const main = document.getElementById('main');
const menuButton = document.getElementById('menu-button');
const sideNav = document.getElementById('side-nav');

const sideNavWidth = '100';
let isSideNavOpen = false;

function onInit() {
  if(window.innerWidth < window.innerHeight) {
    menuButton.style.visibility = 'visible';
    toggleSideNav(false);
  }
  else {
    menuButton.style.visibility = 'hidden';
    toggleSideNav(true);
  }
}
onInit();

window.onresize = () => {
  if(window.innerWidth < window.innerHeight) {
    menuButton.style.visibility = 'visible';
    toggleSideNav(false);
  }
  else {
    menuButton.style.visibility = 'hidden';
    toggleSideNav(true);
  }
}

menuButton.onclick = () => {
  if(isSideNavOpen) toggleSideNav(false);
  else toggleSideNav(true);
};

function toggleSideNav(open) {
  if(open) {
    isSideNavOpen = true;
    menuButton.style.left = sideNavWidth - 10 + 'px';
    sideNav.style.setProperty('width', sideNavWidth + 'px');
    sideNav.style.visibility = 'visible';
  }
  else {
    isSideNavOpen = false;
    menuButton.style.left = '0px';
    sideNav.style.setProperty('width', '0px');
    sideNav.style.visibility = 'hidden';
  }
}

/**
 * Change theme of provided element
 * @param {HTMLElement} element Element to change theme for
 * @param {string} text 
 * @param {string} background 
 * @param {string} link 
 */
function changeTheme(element, text, background, link) {
  element.style.setProperty('--link', link);
  element.style.setProperty('--text', text);
  element.style.setProperty('--background', background);
}
