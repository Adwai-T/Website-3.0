/**
 * @author Adwait Sonawane
 */

import { addError } from "./main.js";

export class IconButton extends HTMLElement {
  constructor() {
    super();
    this.open = false;
    const shadow = this.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    const img = document.createElement("img");
    const imgSrc = this.hasAttribute("src") ? this.getAttribute("src") : "";

    button.setAttribute("type", "button");
    img.setAttribute("id", "button-icon");
    img.setAttribute("src", imgSrc);

    const styleString = `
      *{
        box-sizing: border-box;
      }
      button{
        all: unset;
        padding: 10px;
        cursor: pointer;
      }
      #button-icon{
        width: 30px;
        height: 30px;
      }
    `;
    const style = document.createElement("style");
    style.innerHTML = styleString;

    button.appendChild(img);
    shadow.appendChild(button);
    button.appendChild(style);
  }
}

export class GlobalSearch extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    container.setAttribute("id", "search");
    shadow.appendChild(container);
    const searchText = document.createElement("input");
    searchText.setAttribute("type", "text");
    searchText.setAttribute("id", "search-text");
    container.appendChild(searchText);
    const searchButton = document.createElement("button");
    searchButton.setAttribute("type", "button");
    searchButton.setAttribute("id", "search-button");
    searchButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" xml:space="preserve"><switch><g><circle fill="#382B73" cx="500" cy="500" r="398"/><circle fill="#473080" cx="500" cy="500" r="344.3"/><path fill="#382B73" d="M719.3 672.4c-.9-1.4-2-2.7-3.2-3.9L594.4 546.8c-.6-.6-1.2-1.2-1.9-1.7-.3-.3-.7-.5-1-.8-2.4-1.7-5-3-7.7-3.8-.7-.2-1.4-.4-2.1-.5-.1 0-.3-.1-.4-.1l-2.1-.3h-.2c-3.2-.3-6.4 0-9.4.9-1.9.6-3.8 1.4-5.6 2.4-.1 0-.1.1-.2.1l-14.3-14.3c16.9-27 24.8-58 23.8-88.8 1.3-42.2-14.1-84.8-46.3-117-61.9-61.9-162.1-61.9-224 0-32.2 32.2-47.6 74.8-46.3 117-1.3 42.2 14.1 84.8 46.3 117 56.6 56.6 145.5 61.4 207.6 14.3l12.5 12.5c0 .1-.1.1-.1.2-.4.7-.8 1.4-1.1 2.2-.7 1.5-1.2 3-1.6 4.6-1 3.9-1 8 0 11.9.4 1.6.9 3.1 1.6 4.6.3.7.7 1.5 1.1 2.2 1 1.8 2.3 3.4 3.9 5L648.5 736c1.2 1.2 2.5 2.3 3.9 3.2 2.1 1.4 4.3 2.4 6.6 3.1l1.2.3c1.6.4 3.2.6 4.8.7h1.2c3.6 0 7.2-.8 10.5-2.3.7-.3 1.5-.7 2.2-1.1 1.8-1 3.4-2.3 5-3.9l18-18 .7-.7 3.3-3.3 3-3 7.3-7.3.9-.9c.6-.6 1.1-1.3 1.6-2 1-1.3 1.8-2.8 2.5-4.3 1.5-3.3 2.3-6.9 2.3-10.5-.1-4.6-1.5-9.4-4.2-13.6zm-10.6 38.7-6.2 6.2 6.2-6.2z"/><g><path fill="#FFF" d="m446.217 486.92 40.729-40.73 195.442 195.443-40.729 40.728z"/><path fill="#E6E7E8" d="m480.3 452.8 195.4 195.5 6.6-6.7-195.4-195.4-40.7 40.7z"/><path fill="#D1D3D4" d="M653.1 670.8 457.7 475.4l-11.5 11.5 195.4 195.4 40.7-40.7z"/><path fill="#1CAEE4" d="M716.1 683.8 683.9 716c-9.8 9.8-25.6 9.8-35.4 0L526.8 594.4c-9.8-9.8-9.8-25.6 0-35.4l32.2-32.2c9.8-9.8 25.6-9.8 35.4 0L716 648.4c9.8 9.8 9.8 25.7.1 35.4z"/><path fill="#27C1E6" d="M716.1 648.5 594.4 526.8c-9.8-9.8-25.6-9.8-35.4 0L526.8 559l24.9-24.9c9.8-9.8 25.6-9.8 35.4 0l121.6 121.6c9.8 9.8 9.8 25.6 0 35.4L683.8 716l32.2-32.2c9.8-9.7 9.8-25.6.1-35.3z"/><path fill="#009ADD" d="M667.1 697.4 545.5 575.8c-9.8-9.8-9.8-25.6 0-35.4l13.6-13.6-32.2 32.2c-9.8 9.8-9.8 25.6 0 35.4L648.5 716c9.8 9.8 25.6 9.8 35.4 0l32.2-32.2-13.6 13.6c-9.8 9.7-25.6 9.7-35.4 0z"/><circle fill="#D1D3D4" cx="415" cy="425" r="158.4"/><circle fill="#FFF" cx="415" cy="415" r="158.4"/><circle fill="#D1D3D4" cx="415" cy="415" r="126.7"/><circle fill="#1CAEE4" cx="415" cy="415" r="112"/><path fill="#27C1E6" d="M388.3 441.7c-34.5-34.5-41.8-86-21.8-127.7-11.1 5.3-21.5 12.6-30.7 21.8-43.7 43.7-43.7 114.7 0 158.4s114.7 43.7 158.4 0c9.2-9.2 16.4-19.6 21.8-30.7-41.7 20-93.2 12.8-127.7-21.8z"/><path fill="#009ADD" d="M494.2 335.8c-43.7-43.7-114.7-43.7-158.4 0-1.7 1.7-3.4 3.5-5 5.3 44-38.7 111-37 153.1 5 42 42 43.7 109.1 5 153.1 1.8-1.6 3.6-3.3 5.3-5 43.7-43.7 43.7-114.6 0-158.4z"/></g></g></switch></svg>';
    container.appendChild(searchButton);
    const style = document.createElement("style");
    const styleString = `
    *{
      box-sizing: border-box;
    }
    #search{
      display: flex;
      height: fit-content;
      position: absolute;
      right: 0px;
      top: 5px;
      z-index: 5;
    }
    #search-text{
      width: 40px;
      height: 40px;
      padding: 5px;
      border: none;
      border-radius: 5px;
      border-bottom: 2px solid var(--primary);
      transition: width 0.3s;
    }
    #search-button{
      position: relative;
      right: 20px;
      border: none;
      background-color: transparent;
      width: fit-content;
      height: fit-content;
    }
    #search-button svg {
      width: 40px;
      height: 40px;
    }
    #search-button svg:hover {
      cursor: pointer;
    }
    `;
    style.innerHTML = styleString;
    container.appendChild(style);

    searchButton.onclick = () => {
      const searchTextValue = searchText.value;
      searchText.style.width = "200px";

      if (searchTextValue && searchText.value.length > 3) {
        this.onSearch(searchText.value);
        searchText.style.width = "40px";
      } else {
        addError('Enter more than 3 characters for better search.', 5000);
      }
    };
    searchButton.onblur = () => {
      searchText.style.width = '40px';
    }
    searchText.onfocus = () => {
      searchText.style.width = "200px";
    };
    searchText.onblur = () => {
      searchText.style.width = "40px";
    };
    searchText.onkeydown = (e) => {
      if (
        e.code == "Enter" &&
        searchText.value &&
        searchText.value.length > 3
      ) {
        this.onSearch(searchText.value);
      } else if (e.code == "Enter") {
        console.log("Error, search string should be greater than 3 letters");
      }
    };
  }

  onSearch(searchString) {
    const searchEvent = new CustomEvent("globalsearch", {
      detail: searchString,
      cancelable: true,
    });
    this.dispatchEvent(searchEvent);
  }
}

export class SideNav extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const nav = document.createElement("nav");
    const navTop = document.createElement("div");
    navTop.setAttribute("class", "nav-top");
    const navBottom = document.createElement("div");
    navBottom.setAttribute("class", "nav-bottom");
    const navCenter = document.createElement("div");
    navCenter.setAttribute("class", "nav-center");
    nav.append(navTop, navCenter, navBottom);

    const logLink = document.createElement('a');
    logLink.setAttribute('href','/about.html');
    const Aimg = document.createElement("img");
    Aimg.setAttribute("src", "/navicon.ico");
    const restSpan = document.createElement("a");
    restSpan.setAttribute('href','/about.html');
    restSpan.innerText = "dwait";
    logLink.append(Aimg);
    navTop.append(logLink, restSpan);

    const gitImg = document.createElement("img");
    gitImg.setAttribute("src", "/images/lang/git.svg");
    const gitLink = document.createElement("a");
    gitLink.appendChild(gitImg);
    gitLink.setAttribute("href", "https://github.com/Adwai-T");
    gitLink.setAttribute("target", "_blank");
    navBottom.appendChild(gitLink);

    const linkDivs = [];
    [
      {
        text: "Home",
        link: "/",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256,73.8247a182.18,182.18,0,0,0-182.18,182.18c0,100.6173,81.567,182.1708,182.18,182.1708a182.1753,182.1753,0,1,0,0-364.3506Zm76.6359,161.5788H320.5993v91.503a18.9082,18.9082,0,0,1-18.8964,18.9045h-26.78v-53.56a6.2987,6.2987,0,0,0-6.2973-6.2937H232.4011a6.3,6.3,0,0,0-6.3018,6.2937v53.56H199.3279a18.9107,18.9107,0,0,1-18.9054-18.9045v-91.503h-11.97a7.8786,7.8786,0,0,1-5.0715-13.905L245.4358,152.46a7.89,7.89,0,0,1,10.1421,0l81.4788,68.5467a7.88,7.88,0,0,1-4.4208,14.3964Z"/></svg>',
      },
      {
        text: "Notes",
        link: "/notes",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="180.3964" y="292.9932" width="113.4054" height="12.6036"/><rect x="180.3964" y="265.0436" width="113.4054" height="12.6036"/><rect x="180.3964" y="237.095" width="113.4054" height="12.6036"/><rect x="180.3964" y="322.5509" width="113.4054" height="12.6036"/><path fill="currentColor" d="M256,73.8206A182.1788,182.1788,0,0,0,73.82,256.0086c0,100.6083,81.5625,182.1708,182.18,182.1708s182.18-81.5625,182.18-182.1708A182.1787,182.1787,0,0,0,256,73.8206Zm62.7191,138.4452V373.0543a2.4589,2.4589,0,0,1-2.4589,2.4589H157.9388a2.4589,2.4589,0,0,1-2.4589-2.4589v-202.6a2.459,2.459,0,0,1,2.459-2.459H316.2611a2.4581,2.4581,0,0,1,2.4581,2.4581Zm28.3527-28.3536V325.0205a22.1377,22.1377,0,0,1-15.75,21.2V190.1259a34.7736,34.7736,0,0,0-34.7256-34.7347H184.7731a22.1376,22.1376,0,0,1,21.1905-15.75H324.95a22.1305,22.1305,0,0,1,22.122,22.131v22.14Z"/><rect x="180.3964" y="209.1455" width="113.4054" height="12.5946"/></svg>',
      },
      {
        text: "Articles",
        link: "/articles",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256,73.8247a182.18,182.18,0,0,0-182.18,182.18c0,100.6083,81.567,182.1708,182.18,182.1708,100.6083,0,182.18-81.5625,182.18-182.1708A182.1828,182.1828,0,0,0,256,73.8247Zm86.5989,131.0976-17.3016,17.3061-35.2224-35.2179-13.3632,13.36,35.2215,35.226-86.3874,86.3793-35.2224-35.2089-13.3632,13.36,35.2179,35.2179-8.6049,8.604-.1665-.1584a6.8218,6.8218,0,0,1-4.3506,3.1293L166.2106,354.24a6.54,6.54,0,0,1-1.485.1665,6.8234,6.8234,0,0,1-6.6618-8.3142l7.3206-32.8446a6.86,6.86,0,0,1,3.1293-4.3506l-.1674-.1674L307.381,169.6963a5.2109,5.2109,0,0,1,7.3827.009l27.84,27.8343A5.2085,5.2085,0,0,1,342.5989,204.9223Z"/></svg>',
      },
      {
        text: "Project",
        link: "/projects",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256,229.1229a34.2468,34.2468,0,1,1-34.2514,34.2512A34.2462,34.2462,0,0,1,256,229.1229Z"/><path fill="currentColor" d="M256,73.8206A182.1794,182.1794,0,1,0,438.18,256,182.1821,182.1821,0,0,0,256,73.8206Zm95.73,208.6525-25.875,1.67a72.5,72.5,0,0,1-5.7654,13.9391l17.1126,19.486-27.009,27.0171-19.4859-17.1207a71.9362,71.9362,0,0,1-13.9392,5.7654l-1.6695,25.875H236.8931l-1.6795-25.875a72.3245,72.3245,0,0,1-13.93-5.7654l-19.4769,17.1207-27.009-27.0262,17.1036-19.4769a71.9036,71.9036,0,0,1-5.7564-13.9391l-25.884-1.6785V244.2663l25.884-1.6695a72.4777,72.4777,0,0,1,5.7564-13.9393L174.7975,209.19l27.009-27.027,19.4769,17.1126a72.14,72.14,0,0,1,13.9392-5.7564l1.6705-25.884h38.2058l1.6695,25.884a71.9071,71.9071,0,0,1,13.9392,5.7564l19.4859-17.1126,27.009,27.027L320.09,228.6575a72.1475,72.1475,0,0,1,5.7654,13.9393l25.875,1.6695Z"/></svg>',
      },
      {
        text: "About",
        link: "/about",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256,73.8247a182.18,182.18,0,0,0-182.18,182.18c0,100.6173,81.567,182.1708,182.18,182.1708a182.1753,182.1753,0,1,0,0-364.3506Zm43.2513,279.3168q-14.0414,5.5364-22.4037,8.4375a58.9693,58.9693,0,0,1-19.4238,2.9007q-16.9938,0-26.424-8.28a26.8329,26.8329,0,0,1-9.4266-21.0582,73.7774,73.7774,0,0,1,.7029-10.134q.7128-5.1813,2.277-11.6982l11.6937-41.3964c1.0413-3.9726,1.9242-7.7166,2.6325-11.268a48.9362,48.9362,0,0,0,1.0629-9.7029q0-7.9366-3.27-11.0655c-2.1789-2.0736-6.3369-3.1284-12.5109-3.1284a33.0053,33.0053,0,0,0-9.3033,1.4238c-3.177.9405-5.8977,1.8459-8.1828,2.6892l3.1293-12.762q11.4966-4.6791,21.99-8.0064a65.7562,65.7562,0,0,1,19.89-3.34q16.8682,0,26.0244,8.1648,9.1557,8.1608,9.1494,21.1905c0,1.8018-.2016,4.9743-.6327,9.5013a63.9185,63.9185,0,0,1-2.3427,12.48l-11.65,41.23a112.86,112.86,0,0,0-2.5578,11.3634,58.9524,58.9524,0,0,0-1.1331,9.6246q0,8.2269,3.6648,11.2059,3.6977,2.9929,12.74,2.98a36.9426,36.9426,0,0,0,9.6372-1.4949,54.9418,54.9418,0,0,0,7.7958-2.61Zm-2.0745-167.4846a27.718,27.718,0,0,1-19.6128,7.5942,28.0312,28.0312,0,0,1-19.7181-7.5942,24.67,24.67,0,0,1,0-36.7821,27.9085,27.9085,0,0,1,19.7181-7.6464,27.6127,27.6127,0,0,1,19.6128,7.6464,24.83,24.83,0,0,1,0,36.7821Z"/></svg>',
      },
    ].forEach((link) => {
      // const div = document.createElement("div");
      const a = document.createElement("a");
      a.setAttribute("href", link.link);
      a.innerText = link.text;
      const svgContainer = document.createElement("span");
      svgContainer.setAttribute("class", "image-container");
      a.appendChild(svgContainer);
      svgContainer.innerHTML = link.svg;
      linkDivs.push(a);
    });

    const style = document.createElement("style");
    const styleString = `
      *{
        box-sizing: border-box;
      }
      nav {
        display:flex;
        flex-direction: column;
        height: 100vh;
        background: var(--background);
        justify-content: space-between;
        box-shadow: 2px 0px 15px var(--foreground);
        align-items: center;
      }
      a {
        display: flex;
        font-size: 17px;
        flex-direction: column-reverse;
        padding: 10px;
        width: fit-content;
        align-content: center;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: var(--primary);
      }
      svg {
        width: 40px;
        height: 40px;
        padding: -5px;
        color: var(--primary);
      }
      a:hover {
        color: var(--secondary);
      }
      svg:hover {
        color: var(--secondary);
      }
      .nav-top{
        display: flex;
        width: -moz-fit-content;
        width: fit-content;
        align-items: center;
        padding: 10px 5px;
        margin: 0 10px;
      }
      .nav-top a {
        padding: 0px !important;
      }
      .nav-center{
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items:center;
      }
      img {
        width: 40px;
        height: 40px;
      }
    `;
    style.innerHTML = styleString;
    nav.appendChild(style);
    navCenter.append(...linkDivs);
    shadow.appendChild(nav);
  }
}

/**
 * open: when set to true, opens the popup search options
 */
export class SearchPopUp extends HTMLElement {
  static get observedAttributes() { return ['open']; }
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    shadow.appendChild(container);
    container.setAttribute("class", "popup");
    const closeButton = document.createElement("button");
    container.appendChild(closeButton);
    closeButton.innerText = "Close";
    closeButton.setAttribute('class', 'close-button');
    const overlay = document.createElement('div');
    overlay.setAttribute('class', 'overlay');
    shadow.appendChild(overlay);
    const style = document.createElement("style");
    const styleString = `
      .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); /* bring box to center */
        min-width: 300px;
        min-height: 200px;
        background-color: var(--background);
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 20px;
        display: none; /* Hide the pop-up initially */
        z-index: 2;
      }
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: none; /* Hide the overlay initially */
      }
      .search-result {
      }
      .close-button {
        all: unset;
        position: absolute;
        top: 90%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--secondary);
        color: var(--background);
        padding: 5px 10px;
        border-radius: 5px;
      }
    `;
    style.innerHTML = styleString;
    container.appendChild(style);

    closeButton.onclick = () => {
      this.setAttribute('open', 'false');
    };
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if(name === 'open' && newVal == 'true') {
      if(this.hasAttribute('searchfor')) {
        this.showSearchResult(this.getAttribute('searchfor'));
        this.shadowRoot.childNodes[0].style.display = 'block';
        this.shadowRoot.childNodes[1].style.display = 'block';
      }
    }
    else {
      this.shadowRoot.childNodes[0].style.display = 'none';
      this.shadowRoot.childNodes[1].style.display = 'none';
    }
  }

  showSearchResult(searchfor) {
    this.shadowRoot.querySelectorAll('.search-result').forEach(ele => {
      ele.remove();
    });
    const res1 = document.createElement('div');
    res1.setAttribute('class', 'search-result');
    res1.innerText = 'Could Not connect to server.';
    this.shadowRoot.childNodes[0].appendChild(res1);
  }
}

/**
 * message: Error Message to be shown
 * timer: timer in sec, after which error is removed automatically
 */
export class ShowError extends HTMLElement {
  static get observedAttributes() { return ['message']; }
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const container = document.createElement('div');
    shadow.appendChild(container);
    container.setAttribute('class', 'show-error');
    const messageSpan = document.createElement('span');
    messageSpan.setAttribute('class', 'message-span');
    messageSpan.innerText = this.getAttribute('message');
    container.appendChild(messageSpan);
    const closeButton = document.createElement('button');
    closeButton.innerHTML = 
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256,73.82A182.18,182.18,0,1,0,438.18,256,182.18,182.18,0,0,0,256,73.82Zm90.6147,272.7243a24.5542,24.5542,0,0,1-34.7121,0l-54.6633-54.6678-57.1419,57.1464a24.5439,24.5439,0,0,1-34.704-34.7166l57.1374-57.1284-53.2-53.2089a24.5471,24.5471,0,0,1,34.7121-34.7175l53.1963,53.2089,50.7168-50.7213a24.5471,24.5471,0,0,1,34.713,34.7166l-50.7132,50.7222,54.6588,54.65A24.56,24.56,0,0,1,346.6147,346.5445Z"/></svg>';
    container.appendChild(closeButton);
    const style = document.createElement('style');
    const styleString = `
      .show-error {
        display: flex;
        position: fixed;
        bottom: 20px;
        right: 10px;
        text-wrap: wrap;
        min-height: 40px;
        min-width: 100px;
        max-width: 400px;
        background-color: var(--error);
        color: var(--background);
        padding: 3px 10px;
        align-items: center;
        border-radius: 5px;
      }
      button {
        all: unset;
        color: var(--background);
      }
      button svg {
        color: var(--background);
        width: 25px;
        height: 25px;
      }
    `;
    style.innerHTML = styleString;
    container.appendChild(style);

    closeButton.onclick = () => { this.remove(); }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if(name === 'message') {
      this.shadowRoot.querySelector('.message-span').innerText = this.getAttribute('message');
      setTimeout((element) => {
        if(element) element.remove();
      }, this.getAttribute('timer') ? this.getAttribute('timer') : 5000, this);
    }
  }
}

export class Card extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    const card = document.createElement('div');
    
    shadow.appendChild(card);
    card.setAttribute('class', 'card');

    // -- header
    const header = document.createElement('div');
    header.setAttribute('class', 'card-header')
    const image = document.createElement('img');
    image.setAttribute('class', 'card-avatar');
    const titleContainer = document.createElement('div');
    const title = document.createElement('div');
    title.setAttribute('class', 'title');
    const date = document.createElement('div');
    date.setAttribute('class', 'date');
    titleContainer.append(title, date);
    header.append(image, titleContainer);

    // -- body
    const description = document.createElement('p');
    description.setAttribute('class', 'description');

    // -- footer
    const footer = document.createElement('div');
    footer.setAttribute('class', 'card-footer');
    const tags = document.createElement('div');
    tags.setAttribute('class', 'tags');
    footer.append(tags);
    const a = document.createElement('a');
    a.setAttribute('class', 'link');
    const arrow = document.createElement('img');
    arrow.setAttribute('class', 'arrow');
    arrow.setAttribute('src', '/images/utils/arrow-right.svg');
    a.appendChild(arrow);
    footer.append(a);

    const style = document.createElement('style');
    const styleString = `
      .card {
        display: flex;
        flex-direction: column;
        background-color: var(--background);
        color: var(--foreground);
        max-width: 90vw;
        margin: 2px;
        border-radius: 4px;
        transition: 0.3s;
        justify-content: space-between;
        padding: 7px;
        border: 1px solid var(--border);
      }
      .card:hover {
        
      }
      .card-header{
        display:flex;
      }
      .card-footer{
        display:flex;
        justify-content: space-between;
      }
      img {
        padding: 5px;
        width: 40px;
        height: auto;
        align-self: flex-start;
      }
      .arrow {
        padding: 0 !important;
        margin: 2px !important;
      }
      .tags {
        font-size: 12px;
        font-weight: 900;
        margin: auto 0px 5px 0px;
        color: var(--primary)
      }
      .title {
        font-size: 20px;
        padding: 10px;
        color: var(--primary);
      }
      .description {
        font-size: 14px;
        text-align: justify;
        line-height: 1.1;
        margin: 10px 0px;
        padding: 10px;
        max-height: 80px;
        overflow-y:hidden;
        color: var(--secondary);
      }
      .date {
        font-weight: 900;
        font-size: 12px;
      }
      a {
        text-decoration: none;
      }
    `;
    style.innerHTML = styleString;
    card.append(header, description, footer, style);
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    const height = this.getAttribute('height');
    const width = this.getAttribute('width');
    const title = this.getAttribute('title');
    const desc = this.getAttribute('desc');
    const image = this.getAttribute('image');
    const date = this.getAttribute('date');
    const tags = this.getAttribute('tags') ? this.getAttribute('tags') : '';
    const link = this.getAttribute('link') ? this.getAttribute('link') : '/404.html';
    const target = this.getAttribute('target') ? this.getAttribute('target') : false;

    if(width) shadow.querySelector('.card').style.width = width;
    else shadow.querySelector('.card').style.width = '255px';
    if(height) shadow.querySelector('.card').style.height = height;
    else shadow.querySelector('.card').style.height = '200px';
    
    shadow.querySelector('.title').innerText = title;
    if(desc)
      shadow.querySelector('.description').innerText = desc;
    if(tags)
      shadow.querySelector('.tags').innerText = tags;
    if(date)
      shadow.querySelector('.date').innerText = date;
    if(image)
      shadow.querySelector('.card-avatar').setAttribute('src', image);
    else shadow.querySelector('.card-avatar').remove();
    shadow.querySelector('.link').setAttribute('href', link);
    if(target)
      shadow.querySelector('.link').setAttribute('target', target);
  }
}

export async function fetchAndShowComponentFromFile(mainElement, componentLink) {
  try {
    const response = await fetch(componentLink);
    const html = await response.text();

    class ProjectComponent extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const template = document.createElement('div');
        template.innerHTML = html;
        shadow.append(template);
      }
    }

    customElements.define("project-component", ProjectComponent);
    
    const projectElement = document.createElement('project-component');
    mainElement.append(projectElement);
    
  } catch (e) {
    console.log(e);
  }
}