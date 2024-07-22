// ------------ Images ---------------------//
/**
 * Load image and return promoise
 * @param {string} imageLocation Image Location
 * @param {number} width Image width. eg. 200px
 * @param {number} height Image height. eg. 200px
 * @returns promise of image being loaded asychronously
 */
export function loadImage(imageLocation, width, height) {
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

/**
 * Load Files from server.
 * @param {string} relative path to file resource
 * @returns { Promise }
 */
export function loadFile(src) {
  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", src);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === XMLHttpRequest.DONE) {
        return resolve(xhttp.response);
      } else return reject("Could not load file");
    };
  });
}

/**
 * Convert to GrayScale Image
 */
export function convertToGrayScaleImage(imageData) {
  const data = imageData.data;
  // Convert image to grayscale using luminosity method
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Calculate grayscale value
    const grayscale = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Set RGB channels to grayscale value
    data[i] = grayscale; // Red
    data[i + 1] = grayscale; // Green
    data[i + 2] = grayscale; // Blue
  }

  return imageData;
}

export function convertToSingleColorImage(
  imageData,
  color,
  keepIntensityLevels
) {
  const data = imageData.data;
  // Convert image to grayscale using luminosity method
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Set RGB channels to grayscale value
    if (color == "red") {
      if (keepIntensityLevels) data[i] = data[i]; //Red -- do nothing
      else data[i] = (r + g + b) / 3; // Red
      data[i + 1] = 0; // Green
      data[i + 2] = 0; // Blue
    } else if (color == "green") {
      data[i] = 0; // Red
      if (keepIntensityLevels) data[i + 1] = data[i + 1]; //Green -- do nothing
      else data[i + 1] = (r + g + b) / 3; // Green
      data[i + 2] = 0; // Blue
    } else if (color == "blue") {
      data[i] = 0; // Red
      data[i + 1] = 0; // Green
      if (keepIntensityLevels) data[i + 2] = data[i + 2]; //Red -- do nothing
      else data[i + 2] = (r + g + b) / 3; // Blue
    }
  }

  return imageData;
}

export function resizeImageElement(image, width, height) {
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
  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", id);
  parent.appendChild(canvas);
  return canvas;
}

// -- Related to OpenCV library
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
      } catch (e) {
        console.error("Mat could not be deleted - ", mat);
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
