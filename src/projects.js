import { PROJECTS } from "/data/projects.js";

function init() {
  const container = document.getElementById('card-container');
  PROJECTS.forEach(project => {
    let ele = document.createElement('topic-card');
    Object.keys(project).forEach(key => {
      ele.setAttribute(key, project[key]);
    });
    container.appendChild(ele);
  });
}

init();