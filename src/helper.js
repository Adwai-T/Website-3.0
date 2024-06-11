/**
 * Load image and return promoise
 * @param {string} imageLocation Image Location
 * @param {string} width Image width. eg. 200px
 * @param {string} height Image height. eg. 200px
 * @returns promise of image being loaded asychronously
 */
export function getImage(imageLocation, width, height) {
  return new Promise((resolve, reject) => {
    try {
      let image = new Image(width, height);
      image.src = imageLocation;
      image.onload = () => {
        resolve(image);
      };
      image.onerror = (error) =>
        reject("Image could not be loaded -> " + error);
    } catch (error) {
      reject("Image could not be loaded -> " + error);
    }
  });
}

export function resizeImage(image, width, height) {
  const ratio = image.width / image.height;
  if (width && !height) {
    image.height = width / ratio;
  } else if (height && !width) {
    image.width = ratio * height;
  } else {
    image.height = height;
    image.width = width;
  }
}

/**
 * Create a div and append to given component, the append image to div
 * @param {HTMLElement} component Show the image in the given component
 * @param {Image} image Image to be show
 * @returns void
 */
export function showImage(component, image) {
  if (!image) return;
  let div = document.createElement("div");
  div.appendChild(image);
  component.appendChild(div);
}

export function createAndAppendCanvas(parent, id) {
  let canvas = document.createElement('canvas');
  canvas.setAttribute('id', id);
  parent.appendChild(canvas);
  return canvas;
}

/**
 * Used to manage matrices created by opencv library, as they need
 * be deleted after use.
 */
export class CVHelper {
  constructor(cv) {
    this.mats = [];
    this.cv = cv;
  }

  // --- Mat Related
  add(mat) {
    this.mats.push(mat);
  }

  createMat() {
    let mat = new cv.Mat();
    this.mats.push(mat);
    return mat;
  }

  delete(mat) {
    if (this.mats.indexOf(mat) > -1) {
      this.mats.slice(index, 1);
    } else {
      mat.delete();
    }
  }

  cleanup() {
    this.mats.forEach((mat) => {
      try {
        mat.delete();
      }
      catch(e) {
        console.error('Mat could not be deleted - ', mat);
      }
    });
  }

  // ---- Image Related

  /**
   * Use so that the matrix created can be managed and cleanedup after use
   * @param {Image} image Image to be converted in to a cv matrix
   * @returns return cv Matrix of image
   */
  imread(image) {
    let mat = this.cv.imread(image);
    this.mats.push(mat);
    return mat;
  }
}
