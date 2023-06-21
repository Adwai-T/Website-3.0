/**
 * @author Adwait Sonawane
 */

import { MenuButton, SideNav } from "./component.js";

const main = document.getElementById('main');
customElements.define('menu-button', MenuButton);
customElements.define('side-nav', SideNav);

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
