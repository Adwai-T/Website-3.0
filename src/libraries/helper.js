export function getImage(imageLocation, width, height) {
  console.log('Image Link -> ', imageLocation);
  return new Promise((resolve, reject) => {
    try {
      let image = new Image(width, height);
      image.src = imageLocation;
      resolve(image);
    }catch (error) {
      reject('Image could not be loaded -> '+ error);
    } 
  });
}

export function showImage(component, image) {
  if(!image) return;
  let div = document.createElement('div');
  div.appendChild(image);
  component.appendChild(div);
}