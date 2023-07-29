import { ARTICLES } from "../data/articles.js";


function init() {
  const container = document.getElementById('card-container');
  ARTICLES.forEach(article => {
    let ele = document.createElement('topic-card');
    Object.keys(article).forEach(key => {
      ele.setAttribute(key, article[key]);
    });
    container.appendChild(ele);
  });
}

init();