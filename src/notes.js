import { NOTES } from "/data/notes.js";


function init() {
  const container = document.getElementById('card-container');
  NOTES.forEach(note => {
    let ele = document.createElement('topic-card');
    Object.keys(note).forEach(key => {
      ele.setAttribute(key, note[key]);
    });
    container.appendChild(ele);
  });
}

init();