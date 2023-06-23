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

export class SideNav extends HTMLElement {
  constructor() {
    super();

    const width = this.hasAttribute('width') ? this.getAttribute('width') : '200px';
    const shadow = this.attachShadow({ mode: 'open' });
    const nav = document.createElement('nav');
    const navTop = document.createElement('div');
    navTop.setAttribute('class', 'nav-top');
    const navBottom = document.createElement('div');
    navBottom.setAttribute('class', 'nav-bottom');
    const navCenter = document.createElement('div');
    navCenter.setAttribute('class', 'nav-center');
    nav.append(...[navTop, navCenter, navBottom]);

    const Aimg = document.createElement('img');
    Aimg.setAttribute('src', '/navicon.ico');
    const restSpan = document.createElement('h5');
    restSpan.innerText = 'dwait';
    navTop.append(Aimg, restSpan);
    
    const gitImg = document.createElement('img');
    gitImg.setAttribute('src', '/images/git.svg');
    const gitLink = document.createElement('a');
    gitLink.appendChild(gitImg);
    gitLink.setAttribute('href', 'https://github.com/Adwai-T');
    gitLink.setAttribute('target', '_blank');
    navBottom.appendChild(gitLink);

    const linkDivs = [];
    [
      {
        text: "Home",
        link: "index.html",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256,73.8247a182.18,182.18,0,0,0-182.18,182.18c0,100.6173,81.567,182.1708,182.18,182.1708a182.1753,182.1753,0,1,0,0-364.3506Zm76.6359,161.5788H320.5993v91.503a18.9082,18.9082,0,0,1-18.8964,18.9045h-26.78v-53.56a6.2987,6.2987,0,0,0-6.2973-6.2937H232.4011a6.3,6.3,0,0,0-6.3018,6.2937v53.56H199.3279a18.9107,18.9107,0,0,1-18.9054-18.9045v-91.503h-11.97a7.8786,7.8786,0,0,1-5.0715-13.905L245.4358,152.46a7.89,7.89,0,0,1,10.1421,0l81.4788,68.5467a7.88,7.88,0,0,1-4.4208,14.3964Z"/></svg>',
      },
      {
        text: "Notes",
        link: "notes.html",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="180.3964" y="292.9932" width="113.4054" height="12.6036"/><rect x="180.3964" y="265.0436" width="113.4054" height="12.6036"/><rect x="180.3964" y="237.095" width="113.4054" height="12.6036"/><rect x="180.3964" y="322.5509" width="113.4054" height="12.6036"/><path fill="currentColor" d="M256,73.8206A182.1788,182.1788,0,0,0,73.82,256.0086c0,100.6083,81.5625,182.1708,182.18,182.1708s182.18-81.5625,182.18-182.1708A182.1787,182.1787,0,0,0,256,73.8206Zm62.7191,138.4452V373.0543a2.4589,2.4589,0,0,1-2.4589,2.4589H157.9388a2.4589,2.4589,0,0,1-2.4589-2.4589v-202.6a2.459,2.459,0,0,1,2.459-2.459H316.2611a2.4581,2.4581,0,0,1,2.4581,2.4581Zm28.3527-28.3536V325.0205a22.1377,22.1377,0,0,1-15.75,21.2V190.1259a34.7736,34.7736,0,0,0-34.7256-34.7347H184.7731a22.1376,22.1376,0,0,1,21.1905-15.75H324.95a22.1305,22.1305,0,0,1,22.122,22.131v22.14Z"/><rect x="180.3964" y="209.1455" width="113.4054" height="12.5946"/></svg>',
      },
      {
        text: "Articles",
        link: "articles.html",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256,73.8247a182.18,182.18,0,0,0-182.18,182.18c0,100.6083,81.567,182.1708,182.18,182.1708,100.6083,0,182.18-81.5625,182.18-182.1708A182.1828,182.1828,0,0,0,256,73.8247Zm86.5989,131.0976-17.3016,17.3061-35.2224-35.2179-13.3632,13.36,35.2215,35.226-86.3874,86.3793-35.2224-35.2089-13.3632,13.36,35.2179,35.2179-8.6049,8.604-.1665-.1584a6.8218,6.8218,0,0,1-4.3506,3.1293L166.2106,354.24a6.54,6.54,0,0,1-1.485.1665,6.8234,6.8234,0,0,1-6.6618-8.3142l7.3206-32.8446a6.86,6.86,0,0,1,3.1293-4.3506l-.1674-.1674L307.381,169.6963a5.2109,5.2109,0,0,1,7.3827.009l27.84,27.8343A5.2085,5.2085,0,0,1,342.5989,204.9223Z"/></svg>',
      },
      {
        text: "Project",
        link: "projects.html",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256,229.1229a34.2468,34.2468,0,1,1-34.2514,34.2512A34.2462,34.2462,0,0,1,256,229.1229Z"/><path fill="currentColor" d="M256,73.8206A182.1794,182.1794,0,1,0,438.18,256,182.1821,182.1821,0,0,0,256,73.8206Zm95.73,208.6525-25.875,1.67a72.5,72.5,0,0,1-5.7654,13.9391l17.1126,19.486-27.009,27.0171-19.4859-17.1207a71.9362,71.9362,0,0,1-13.9392,5.7654l-1.6695,25.875H236.8931l-1.6795-25.875a72.3245,72.3245,0,0,1-13.93-5.7654l-19.4769,17.1207-27.009-27.0262,17.1036-19.4769a71.9036,71.9036,0,0,1-5.7564-13.9391l-25.884-1.6785V244.2663l25.884-1.6695a72.4777,72.4777,0,0,1,5.7564-13.9393L174.7975,209.19l27.009-27.027,19.4769,17.1126a72.14,72.14,0,0,1,13.9392-5.7564l1.6705-25.884h38.2058l1.6695,25.884a71.9071,71.9071,0,0,1,13.9392,5.7564l19.4859-17.1126,27.009,27.027L320.09,228.6575a72.1475,72.1475,0,0,1,5.7654,13.9393l25.875,1.6695Z"/></svg>',
      },
      {
        text: "About",
        link: "about.html",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256,73.8247a182.18,182.18,0,0,0-182.18,182.18c0,100.6173,81.567,182.1708,182.18,182.1708a182.1753,182.1753,0,1,0,0-364.3506Zm43.2513,279.3168q-14.0414,5.5364-22.4037,8.4375a58.9693,58.9693,0,0,1-19.4238,2.9007q-16.9938,0-26.424-8.28a26.8329,26.8329,0,0,1-9.4266-21.0582,73.7774,73.7774,0,0,1,.7029-10.134q.7128-5.1813,2.277-11.6982l11.6937-41.3964c1.0413-3.9726,1.9242-7.7166,2.6325-11.268a48.9362,48.9362,0,0,0,1.0629-9.7029q0-7.9366-3.27-11.0655c-2.1789-2.0736-6.3369-3.1284-12.5109-3.1284a33.0053,33.0053,0,0,0-9.3033,1.4238c-3.177.9405-5.8977,1.8459-8.1828,2.6892l3.1293-12.762q11.4966-4.6791,21.99-8.0064a65.7562,65.7562,0,0,1,19.89-3.34q16.8682,0,26.0244,8.1648,9.1557,8.1608,9.1494,21.1905c0,1.8018-.2016,4.9743-.6327,9.5013a63.9185,63.9185,0,0,1-2.3427,12.48l-11.65,41.23a112.86,112.86,0,0,0-2.5578,11.3634,58.9524,58.9524,0,0,0-1.1331,9.6246q0,8.2269,3.6648,11.2059,3.6977,2.9929,12.74,2.98a36.9426,36.9426,0,0,0,9.6372-1.4949,54.9418,54.9418,0,0,0,7.7958-2.61Zm-2.0745-167.4846a27.718,27.718,0,0,1-19.6128,7.5942,28.0312,28.0312,0,0,1-19.7181-7.5942,24.67,24.67,0,0,1,0-36.7821,27.9085,27.9085,0,0,1,19.7181-7.6464,27.6127,27.6127,0,0,1,19.6128,7.6464,24.83,24.83,0,0,1,0,36.7821Z"/></svg>',
      }
    ].forEach((link) => {
      // const div = document.createElement("div");
      const a = document.createElement("a");
      a.setAttribute("href", link.link);
      a.innerText = link.text;
      const svgContainer = document.createElement("span");
      svgContainer.setAttribute('class', 'image-container')
      a.appendChild(svgContainer);
      svgContainer.innerHTML = link.svg;
      linkDivs.push(a);
    });

    const style = document.createElement("style");
    const styleString = `
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
        width: 60px;
        height: 60px;
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
      img {
        width: 60px;
        height: 60px;
      }
    `;
    style.innerHTML = styleString;
    nav.appendChild(style);
    navCenter.append(...linkDivs);
    shadow.appendChild(nav);
  }
}
