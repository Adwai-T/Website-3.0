export class MenuButton extends HTMLElement {
  constructor() {
    super();
    this.open = false;
    const shadow = this.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    const img = document.createElement("img");

    button.setAttribute("id", "home-button");
    button.setAttribute("type", "button");
    img.setAttribute("id", "home-button-icon");
    img.setAttribute("src", "../images/menu.svg");

    const styleString = `
      #home-button{
        all: unset;
        padding: 10px;
        cursor: pointer;
        position: sticky;
        left: 0px;
        top: 0px;
      }
      #home-button-icon{
        width: 30px;
        height: 30px;
      }
    `;
    const style = document.createElement("style");
    style.innerHTML = styleString;

    button.appendChild(img);
    shadow.appendChild(button);
    button.appendChild(style);

    button.onclick = () => {
      console.log('Menu Open');
      if(this.open) {
        button.style.left = '0px';
        this.open = false;
      }
      else {
        button.style.left = '100px';
        this.open = true;
      }
    };
  }
}

export class SideNav extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});
    const nav = document.createElement('nav');

    const linkDivs = [];
    [
      { text: 'home', link: 'home.html', img: '../images/home.svg'},
      { text: 'home', link: 'project.html', img: '../images/home.svg'},
      { text: 'home', link: 'articles.html', img: '../images/home.svg'},
      { text: 'home', link: 'notes.html', img: '../images/home.svg'}
    ].forEach((link) => {
      const div = document.createElement('div');
      div.setAttribute('class', 'nav-link');
      const a = document.createElement('a');
      a.setAttribute('href', link.link);
      a.innerText = link.text;
      const img = document.createElement('img');
      img.setAttribute('src', link.img);
      div.appendChild(img);
      div.appendChild(a);
      linkDivs.push(div);
    });

  const style = document.createElement('style');
  const styleString = `
  
  `
    
    nav.append(...linkDivs);
    shadow.appendChild(nav);
  }
}
