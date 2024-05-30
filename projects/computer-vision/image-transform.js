import { CV_PROJECTS } from "/data/computer-vision.js";

function init() {
  const container = document.getElementById('card-container');
  CV_PROJECTS.forEach(project => {
    let ele = document.createElement('topic-card');
    Object.keys(project).forEach(key => {
      ele.setAttribute(key, project[key]);
    });
    container.appendChild(ele);
  });
}

init();