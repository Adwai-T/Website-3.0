/**
 * Main canvas class, helps create canvas context and draw on it.
 * @param {number} width - Width
 * @param {number} height - Height
 * @param {string} elementId - Id of element in Dom to which canvas element create is to be appended.
 * @param {string} id - id to be set of the created element.
 * @param {boolean} willBeReadFrequently - If the image data from canvas will be read frequently
 * @class
 */
export class Canvas {
  constructor(width, height, elementId, id, willBeReadFrequently) {
    Canvas.numberOfCanvas++;
    this.width = width;
    this.height = height;

    //Create canvas element
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.tabIndex = 1;
    document.getElementById(elementId).appendChild(this.canvas);

    if (typeof id === "string") {
      this.canvas.id = id;
      this.id = id;
    }

    // -- willReadFrequently is used when data is read and written to canvas frequently
    if(willBeReadFrequently)
      this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
    else
      this.ctx = this.canvas.getContext("2d");
  }

  /**
   * Get canvas element created.
   * @param {string} id - sets id of the created canvas element.
   */
  setID(id) {
    this.id = id;
    this.canvas.id = id;
  }

  /**
   * Get canvas element created.
   * @returns {HTMLCanvasElement}
   */
  getCanvasElement() {
    return this.canvas;
  }

  /**
   * Get 2d Context of the Canvas Element
   * @returns {HTMLCanvasElement.context}
   */
  getContext() {
    return this.ctx;
  }

  /**
   * Set style of the canvas. eg : "border:1px solid #000000; cursor: none" which is set by default.
   * @param {string} style
   */
  setStyle(style) {
    this.canvas.style = style;
  }

  _setCanvasOriginAtCenter(primitive) {
    this.ctx.save();
    this.ctx.translate(this.width/2, this.height/2);
    primitive.draw(this.ctx);
    this.ctx.restore();
  }

  /**
   * Clear the context of the Canvas Element
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  clearCanvasWithColor(color) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}

/**
 * Get a Random Color in Hex
 */
export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// ------------ Primitives ----------------//

//--- Vector
/**
 * Create a Vector of two integer
 * All things vector are calculated to the origin.
 * @class
 * @param {number} x
 * @param {number} y
 */
export class Vector2i {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns a Point representing the Vector
   * @returns {Point}
   */
  toPoint() {
    return new Point(this.x, this.y);
  }

  draw(ctx, color, thickness) {
    new Line(new Point(0,0), this.toPoint()).draw(ctx, color, thickness);
  }

  drawFromVector(vector, ctx, color, thickness) {
    new Line(new Point(vector.x, vector.y), this.toPoint()).draw(ctx, color, thickness);
  }

  /**
   * Check Equality of this vector with the given vector
   * @param {Vector2i} vector
   * @returns {boolean}
   */
  isEqual(vector) {
    if (this.x === vector.x && this.y === vector.y) {
      return true;
    } else return false;
  }

  /**
   * @returns {number}
   */
  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * @returns {number}
   */
  getMagnitudeSquare() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Turn a non-zero vector into a vector of unit length
   */
  normalize() {
    let length = this.getMagnitude();

    if (length > 0) {
      this.x = this.x / length;
      this.y = this.y / length;
    }
  }

  /**
   * Returns a new Noramlized vector of this vector
   * @returns {Vector2i}
   */
  getNormalized() {
    let length = this.getMagnitude();

    if (length > 0) {
      return new Vector2i(this.x / length, this.y / length);
    } else return new Vector2i(0, 0);
  }

  /**
   * @returns {number}
   */
  getSlope() {
    return this.y / this.x;
  }

  /**
   * Return direction of this vector.
   * @param {boolean} inDegrees - If true returns in degree else return in radian
   * @returns {number}
   */
  getDirection(inDegrees) {
    if (inDegrees) {
      return (Math.atan(this.y / this.x) * 180) / Math.PI;
    }
    return Math.atan(this.y / this.x);
  }

  /**
   * Inverts this vector.
   */
  invert() {
    this.x = -this.x;
    this.y = -this.y;
  }

  /**
   * Multiply a scalar value with this vector.
   * The parameter to pass is a scalar value not a vector.
   * @param {number} value - Scalar value to be multiplied.
   */
  scale(value) {
    this.x *= value;
    this.y *= value;
  }

  scaleX(value) {
    this.x *= value;
  }

  scaleY(value) {
    this.x *= value;
  }

  getScaledVector(value) {
    return new Vector2i(this.x * value, this.y * value);
  }

  /**
   * Add another vector to this vector
   */
  addVector(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  getAdditionVector(vector) {
    return new Vector2i(this.x + vector.x, this.y + vector.y);
  }

  /**Subtract given vector from this vector */
  subtractVector(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  getSubtractionVector(vector) {
    return new Vector2i(this.x - vector.x, this.y - vector.y);
  }

  /**Add scaled vector to this vector */
  addScaledVector(vector, scale) {
    this.x += vector.x * scale;
    this.y += vector.y * scale;
  }

  /**Component Product : Similar to adding and subtracting. Has no direct geometric significance. */
  componentProduct(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
  }

  getComponentProductVector(vector) {
    return new Vector2i(this.x * vector.x, this.y * vector.y);
  }

  /**Scalar Product of given vector with this vector. */
  getScalarProduct(vector) {
    return this.x * vector.x + this.y * vector.y;
  }
  getDotProduct(vector) {
    return this.x * vector.x + this.y * vector.y;
  }
  getInnerProduct(vector) {
    return this.x * vector.x + this.y * vector.y;
  }
  
  //The scalar value returned =>
  //a.b = |a||b|cos(theta) =>
  //theta represents the angle between the two given vectors
  getAngleBetweenVector(vector, inDegrees) {
    let angle = Math.acos(
      this.getDotProduct(vector) / (this.getMagnitude * vector.getMagnitude)
    );

    if (!inDegrees) return angle;
    else return (new Angle(angle, true).getDegree());
  }

  getProjectionVector(vector) {
    let dotProdcut = this.getDotProduct(vector) / vector.getMagnitudeSquare();
    return vector.getScaledVector(dotProdcut);
  }

  getReflectionVector(normal) {
    let projectVector = this.getProjectionVector(normal);
    console.log(projectVector);
    projectVector.scale(2);
    console.log(projectVector);
    // return this.getSubtractionVector(projectVector);
    return projectVector.getSubtractionVector(this);
  }

  getNormal(antiClockwise) {
    if (antiClockwise) {
      return new Vector2i(-1 * this.y, this.x);
    }
    return new Vector2i(this.y, -1 * this.x);
  }

  translate(vec) {
    this.addVector(vec);
  }

  getTranslated(vec) {
    return this.getAdditionVector(vec);
  }

  reflectX() {
    this.y = -this.y;
  }

  getReflectX() {
    return new Vector2i(this.x, -this.y);
  }

  reflectY() {
    this.x = -this.x;
  }

  getReflectY() {
    return new Vector2i(-this.x, this.y);
  }

  reflectOrigin() {
    this.x = -this.x;
    this.y = -this.y;
  }

  getReflectOrigin() {
    return new Vector2i(-this.x, -this.y);
  }

  getNewVector() {
    return new Vector2i(this.x, this.y);
  }

  /**
   * Rotate this vector by an angle around the vector
   * @param {Angle} angle 
   * @param {Vector2i} aroundVector 
   */
  rotateVector(angle, aroundVector) {
    let rotatedVector = this.getRotatedVector(angle, aroundVector);
    this.x = rotatedVector.x;
    this.y = rotatedVector.y;
  }

  /**
   * Rotate vector by an angle around the vector and get new vector
   * @param {Angle} angle 
   * @param {Vector2i} aroundVector 
   */
  getRotatedVector(angle, aroundVector) {
    let rotationMatrix = [
      Math.cos(angle.getRadian()), -Math.sin(angle.getRadian()),
      Math.sin(angle.getRadian()), Math.cos(angle.getRadian())
    ];

    let translatedMatrix = new Vector2i(0, 0);
    if(aroundVector) {
      translatedMatrix = [
        this.x - aroundVector.x, 
        this.y - aroundVector.y
      ];
    }

    let multiplicationMatrix = [
      rotationMatrix[0] * translatedMatrix[0] + rotationMatrix[1] * translatedMatrix[1],
      rotationMatrix[2] * translatedMatrix[0] + rotationMatrix[3] * translatedMatrix[1]
    ]

    let translateMatrixBack = [
      multiplicationMatrix[0] + translatedMatrix[0],
      multiplicationMatrix[1] + translatedMatrix[1]
    ];

    return new Vector2i(translateMatrixBack[0], translateMatrixBack[1]);
  }
}

Vector2i.vectorFromTwoPoints = function (point1, point2) {
  return new Vector2i(point1.x - point2.x, point1.y - point2.y);
};

export class Angle {
  _angle;
  _isRadian;
  constructor(angle, isRadian) {
    this._angle = angle;
    this._isRadian = isRadian;
  }
  getRadian() {
    if(this._isRadian) {
      return this._angle;
    }else return this._angle * 0.0174533;
  }
  getDegree() {
    if(this._isRadian) {
      return this._angle * 57.295754;
    }else return this._angle;
  }
}

//--- Points

/**
 * Create A point of two integer positions x and y.
 * Has a draw function
 * @class
 * @param {number} x
 * @param {number} y
 * @param {number} size - diameter of the circle represeting the point when drawn to canvas
 * @param {string} color - color of the point when drawn to canvas
 */
export class Point {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = 1;
    if (size) {
      this.size = size;
    }
    this.color = "black";
    if (color) {
      this.color = color;
    }
  }

  /**
   * Draw point as circle to the Canvas
   * @param {HTMLCanvasElement.context} context
   * @param {string} color
   * @param {number} size - Radius of representing circle.
   */
  draw(context, color, size) {
    if (!color) {
      color = this.color;
    }

    if (!size) {
      size = this.size;
    }

    context.fillStyle = color;
    if (size > 1) {
      context.beginPath();
      context.arc(this.x, this.y, size, 0, 2 * Math.PI);
      context.fill();
    } else {
      context.fillRect(this.x, this.y, 1, 1);
    }
  }

  /**
   * Returns the point as a Vector2i
   * @returns {Vector2i}
   */
  toVector() {
    return new Vector2i(this.x, this.y);
  }

  /**
   * Checks if this point is inside the given circle.
   * @param {Circle} circle
   * @returns {boolean}
   */
  isInsideCircle(circle) {
    let dist =
      Math.pow(this.x - circle.center.x, 2) +
      Math.pow(this.y - circle.center.y, 2);
    if (dist <= circle.radius * circle.radius) {
      return true;
    } else return false;
  }
}

export class Points {}

/**
 * Join points in an array, sequenced according to index of the points.
 * @param {context} context
 * @param {Array} points
 * @param {string} color
 * @param {Number} thickness
 */
Points.joinPointArray = function (context, points, color, thickness) {
  if (typeof color === "string") {
    context.strokeStyle = color;
  }

  if (typeof thickness === "number" && thickness > 1) {
    context.lineWidth = thickness;
  }

  if (Array.isArray(points)) {
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      context.lineTo(points[i].x, points[i].y);
    }

    context.stroke();
  }
};

//--- Lines
/**
 * @class
 * @param {Point} point1
 * @param {Point} point2
 */
export class Line {
  constructor(point1, point2) {
    this.point1 = point1;
    this.point2 = point2;
  }

  /**
   *
   * @param {HTMLCanvasElement.context} context
   * @param {string} color
   * @param {number} thickness
   */
  draw(context, color, thickness) {
    if (typeof color === "string") {
      context.strokeStyle = color;
    }

    if (typeof thickness === "number") {
      context.lineWidth = thickness;
    }

    context.beginPath();
    context.moveTo(this.point1.x, this.point1.y);
    context.lineTo(this.point2.x, this.point2.y);
    context.stroke();
  }

  /**
   * Returns slope of this line
   * @returns {number}
   */
  getSlope() {
    return (this.point1.y - this.point2.y) / (this.point1.x - this.point2.x);
  }

  /**
   * Returns the Length of the line.
   * @returns {number}
   */
  getLength() {
    return Math.sqrt(
      Math.pow(this.point1.x - this.point2.x, 2) +
        Math.pow(this.point1.y - this.point2.y, 2)
    );
  }

  /**
   * Angle line makes with horizontal axis
   * @param {boolean} inDegrees - If true will return value in degrees else in radian
   * @returns {number}
   */
  getAngleWithXAxis(inDegrees) {
    if (inDegrees) {
      return (Math.atan(this.getSlope()) * 180) / Math.PI;
    } else {
      return Math.atan(this.getSlope());
    }
  }
}

export class Lines {}

/**
 * Get the point of intersection between two lines.
 * @param {Line} line1
 * @param {Line} line2
 * @returns {Point|boolean}
 */
Lines.getIntersectionPoint = function (line1, line2) {
  const x1 = line1.point1.x;
  const y1 = line1.point1.y;
  const x2 = line1.point2.x;
  const y2 = line1.point2.y;
  const x3 = line2.point1.x;
  const y3 = line2.point1.y;
  const x4 = line2.point2.x;
  const y4 = line2.point2.y;

  //Line line intersection on wiki : https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
  let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  let intersectionPoint = new Point(0, 0);

  //Cant divide by zero, denominator can be negative value;
  if (denominator !== 0) {
    intersectionPoint.x =
      ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
      denominator;
    intersectionPoint.y =
      ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
      denominator;
    return intersectionPoint;
  } else return false;
};

/**
 * Get the angle between two given lines.
 * @param {Line} line1
 * @param {Line} line2
 * @param {boolean} inDegrees
 * @returns {number}
 */
Lines.getAngleBetweenLines = function (line1, line2, inDegrees) {
  let m1 = line1.getSlope();
  let m2 = line2.getSlope();

  if (inDegrees) {
    return (Math.atan((m1 - m2) / (1 + m1 * m2)) * 180) / Math.PI;
  }
  return Math.atan((m1 - m2) / (1 + m1 * m2));
};

//--- Rectangle
/**
 * @class
 * @param {Vector2i} vec1 - Vector of top-left corner of Rectange
 * @param {Vector2i} vec2 - Vector of width and height of Rectange
 */
export class Rectangle {
  constructor(vec1, vec2) {
    this.vec = vec1;
    this.width = vec2.x;
    this.height = vec2.y;
    this.vec_center = new Vector2i(
      (vec1.x + vec2.x + vec1.x) / 2,
      (vec1.y + vec2.y + vec1.y) / 2
    );
    this.color = "black";
    this.isSolid = true;
    this.thickness = 1;
  }

  /**
   * Toggle if
   * @param {boolean} - If true changes the rectange to be drawn as filled, else to stroked.
   * @returns {Rectangle}
   */
  toggleFilled(filled) {
    if (filled) this.isSolid = true;
    else this.isSolid = false;
    return this;
  }

  /**
   * Draw this Rectange to the Canvas.
   * @param {HTMLCanvasElement.context} context
   * @param {string} color
   */
  draw(context, color) {
    if (typeof color === "string") {
      context.fillStyle = color;
      context.strokeStyle = color;
    } else {
      context.fillStyle = this.color;
      context.strokeStyle = color;
    }
    if (this.isSolid)
      context.fillRect(this.vec.x, this.vec.y, this.width, this.height);
    else {
      context.lineWidth = this.thickness ? this.thickness : 1;
      context.strokeRect(this.vec.x, this.vec.y, this.width, this.height);
    }
  }

  /**
   * Draw the given rectange as a sprite image. The Sprite Size will be equal to the size of the rectange.
   * @param {HTMLCanvasElement.context} context
   * @param {any} image
   * @param {Vector2i} vec_startLocation - Start location of sprite in the SpriteSheet/Image
   * @param {number} img_width - width of sprite in image
   * @param {number} img_height - height of sprite in image
   */
  drawSprite(context, image, vec_startLocation, img_width, img_height) {
    if (image) {
      context.drawImage(
        image,
        vec_startLocation.x,
        vec_startLocation.y,
        img_width,
        img_height, //src coords
        this.vec.x,
        this.vec.y,
        this.width,
        this.height //dst coords
      );
    }
  }

  /**
   * Draw the rectange as a sprite and rotate at given angle
   * @param {HTMLCanvasElement.context} context
   * @param {any} image
   * @param {number} angle
   * @param {Vector2i} vec_startLocation -Top left corner of the sprite in the SpriteSheet/Image
   * @param {number} img_width - width of sprite in the Sprite Sheet
   * @param {height} img_height - height of sprite in the Sprite-Sheet
   */
  rotateSpriteAndDraw(
    context,
    image,
    angle,
    vec_startLocation,
    imgDimensions
  ) {
    if (image) {
      context.save();
      context.translate(
        this.vec.x + this.width / 2,
        this.vec.y + this.height / 2
      );
      context.rotate(angle); //* Math.PI / 180);
      //We dont need to have the x and y  position of the image as we have already
      //translated to that location and draw the image directly.
      context.drawImage(
        image,
        vec_startLocation.x,
        vec_startLocation.y,
        imgDimensions.x,
        imgDimensions.y,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
      context.restore();
    }
  }
}

//--- Circle
//context.arc(x,y,r,sAngle,eAngle,counterclockwise);
/**
 * @class
 * @param {Vector2i} center - Center of circle
 * @param {number} radius - Radius of circle
 * @param {boolean} isSolid - whether the circle is to be drawn solid
 * @param {number} thickness - If cicle is not solid then stroke thickness
 */
export class Circle {
  constructor(center, radius, color, isSolid, thickness) {
    this.center = center;
    this.radius = radius;
    this.isSolid = typeof isSolid === "boolean" ? isSolid : false;
    this.thickness = typeof thickness === "number" ? isSolid : 1;
    this.color = typeof color === "string" ? color : "black";
  }

  /**
   * Draw this circle.
   * @param {HTMLCanvasElement.context} ctx
   * @param {number} thickness
   * @param {string} color
   */
  draw(ctx, thickness, color) {
    color = typeof color === "string" ? color : this.color;
    thickness = typeof color === "number" ? thickness : this.thickness;

    if (this.isSolid) {
      ctx.fillStyle = color;
    } else {
      ctx.strokeStyle = color;
    }
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
    this.isSolid ? ctx.fill() : ctx.stroke();
  }
}

/**
 * @class
 */
export class Circles {}

/**
 * Check if there is collision between two circles
 * @param {Circle} c1
 * @param {Circle} c2
 */
Circles.checkCollision = function (c1, c2) {
  let minDist = c1.radius + c2.radius;
  let dist =
    Math.pow(c1.center.x - c2.center.x, 2) +
    Math.pow(c1.center.y - c2.center.y, 2);
  minDist = minDist * minDist;
  if (minDist > dist) {
    return true;
  } else {
    return false;
  }
};

/**
 * When Collision is resolved, both circles are moved.
 * @param {Circle} c1 - Circle 1
 * @param {Circle} c2 -Circle 2
 * @returns {boolean} - returns true of collision is resolved
 */
Circles.resolveCollision = function (c1, c2) {
  let minDist = c1.radius + c2.radius;
  let dist =
    Math.pow(c1.center.x - c2.center.x, 2) +
    Math.pow(c1.center.y - c2.center.y, 2);
  dist = Math.sqrt(dist);
  if (minDist > dist) {
    let offset = (minDist - dist) / 2;
    let axis = Vector2i.vectorFromTwoPoints(c1.center, c2.center);
    axis.normalize();
    axis.scale(offset);
    c1.center.addVector(axis);
    c2.center.subtractVector(axis);
    return true;
  } else {
    return false;
  }
};

// CIRCLE/RECTANGLE
/**
 * Check collision between non rotated Rectangle and Circle
 * @param {Circle} circle
 * @param {Rectangle} rect
 * @returns {Vector2i|boolean} - returns the separation vector if there is collision or false if there is no collision.
 */
Circles.circleRectCollision = function (circle, rect) {
  let testX = circle.center.x;
  let testY = circle.center.y;

  // which edge is closest?
  if (circle.center.x < rect.vec.x) testX = rect.vec.x; // test left edge
  else if (circle.center.x > rect.vec.x + rect.width)
    testX = rect.vec.x + rect.width; // right edge
  if (circle.center.y < rect.vec.y) testY = rect.vec.y; // top edge
  else if (circle.center.y > rect.vec.y + rect.height)
    testY = rect.vec.y + rect.height; // bottom edge

  // get distance from closest edges
  let distX = circle.center.x - testX;
  let distY = circle.center.y - testY;

  // new Point(testX, testY).draw(ctx, 'red', 3); //nearest Point on the rectangle
  let distance = Math.sqrt(distX * distX + distY * distY);

  // if the distance is less than the radius, collision!
  if (distance <= circle.radius) {
    let separationVec = Vector2i.vectorFromTwoPoints(
      circle.center,
      new Vector2i(testX, testY)
    );
    separationVec.normalize();
    separationVec.scale(circle.radius - distance);

    return separationVec;
  }

  return false;
};

/**
 * Resolves Collision between circle and rectange. Circle is moved.
 * @param {Circle} circle -Circle
 * @param {Rectangle} rect -Non Rotated Rectangle
 * @returns {boolean} - If resolved returns true
 */
Circles.circleRectCollisionResolve = function (circle, rect) {
  let spvec = Circles.circleRectCollision(circle, rect);
  if (spvec) {
    circle.center.x += spvec.x;
    circle.center.y += spvec.y;
    return true;
  } else {
    return false;
  }
};

//--- Polygon
/**
 * @class
 */
export class Polygon {
  constructor() {
    this.vertices = [];
    /**
     * Only works if the polygon is created with createPolygonWithNumberOfSides.
     * Center Value should only be used if necessary.
     * Use the recalcuateCenter function to update the value of center as it is not update automatically once it is created.
     */
    this.center = new Vector2i(0, 0);
    this.radius = 0;
    //In radians
    this.angle = 0;
    this.color = "black";
  }

  /**
   * Adds Point to the polygon. Points are considered in the sequence as they are added.
   * @param {Vector2i} vec - Add a vector to the polygon
   */
  addPoint(vec) {
    this.vertices.push(vec);
  }

  /**
   * Removes Last vertex.
   */
  removeLastPoint() {
    this.vertices.pop();
  }

  /**
   * Returns array of all the vertices of the Polygon
   * @returns {Vector2i[]} - Vertice Array
   */
  getVertices() {
    return this.vertices;
  }

  /**
   * Moves the polygon to the specified point
   * @param {Vector2i} origin
   */
  moveToPoint(origin) {
    this.vertices.forEach((vec) => {
      vec.reflectX();
      vec.translate(origin);
    });
  }

  /**
   * Creates a polygon with the number of sides where all sides are of equal length.
   * @param {number} centreX
   * @param {number} centreY
   * @param {number} radius
   * @param {number} numPoints
   */
  createPolygonWithNumberOfSides(centreX, centreY, radius, numPoints) {
    this.center = new Vector2i(centreX, centreY);
    this.radius = radius;

    let angle = (2 * Math.PI) / numPoints;

    for (let i = 0; i < numPoints; i++) {
      let x = centreX + radius * Math.sin(i * angle);
      let y = centreY + radius * Math.cos(i * angle);

      this.vertices.push(new Vector2i(x, y));
    }
  }

  /**
   * Recalculates all the vertices according to the changes.
   */
  recalculateVertices() {
    let angle = (2 * Math.PI) / this.vertices.length;
    let newVertices = [];

    for (let i = 0; i < this.vertices.length; i++) {
      let x = this.center.x + this.radius * Math.sin(i * angle);
      let y = this.center.y + this.radius * Math.cos(i * angle);

      newVertices.push(new Vector2i(x, y));
    }

    this.vertices = newVertices;
  }

  /**
   * Only works if the polygon is created with createPolygonWithNumberOfSides.
   * Also polygon can be translated but not rotated for it to work.
   */
  recalculateCenter() {
    let vertex = this.vertices[this.vertices.length - 1];
    this.center.x = vertex.x;
    this.center.y = vertex.y - this.radius;
  }

  /**
   *
   * @returns {Vector2i[]} - returns array of axes of polygon.
   */
  getAxes() {
    let axes = [];

    for (let i = 0; i < this.vertices.length; i++) {
      let j = (i + 1) % this.vertices.length;

      axes.push(
        new Vector2i(
          this.vertices[j].x - this.vertices[i].x,
          this.vertices[j].y - this.vertices[i].y
        )
      );
    }

    return axes;
  }

  /**
   * Returns Array of normals to each side of the Polygon
   * @returns {Vector2i[]}
   */
  getNormals() {
    let normals = [];

    for (let i = 0; i < this.vertices.length; i++) {
      let j = (i + 1) % this.vertices.length;

      normals.push(
        new Vector2i(
          -1 * (this.vertices[j].y - this.vertices[i].y),
          this.vertices[j].x - this.vertices[i].x
        ).getNormalized()
      );
    }

    return normals;
  }

  /**
   * Polygons are drawn based on the vertices array,
   * and does not take into consideration the center value.
   * @param {HTMLCanvasElement.context} ctx
   * @param {number} thickness
   * @param {string} color
   */
  draw(ctx, thickness, color) {
    if (!color || color == undefined) {
      color = this.color;
    }

    if (!thickness || thickness == undefined) {
      thickness = 1;
    }

    for (let i = 0; i < this.vertices.length - 1; i++) {
      new Line(this.vertices[i], this.vertices[i + 1]).draw(
        ctx,
        color,
        thickness
      );
    }
    new Line(this.vertices[0], this.vertices[this.vertices.length - 1]).draw(
      ctx,
      color,
      thickness
    );
  }
}

export class Polygons {}

/**
 * Checks if there is collision between the two given polygon using Separating Axis Theorem(SAT)
 * @param {Polygon} poly1
 * @param {Polygon} poly2
 * @returns {boolean}
 */
Polygons.SatCollision = function (poly1, poly2) {
  let v1 = poly1.vertices;
  let v2 = poly2.vertices;

  //Check for Normals of poly1 axes
  for (let i = 0; i < v1.length; i++) {
    let j = (i + 1) % v1.length;
    let normal = new Vector2i(
      -1 * (v1[j].y - v1[i].y),
      v1[j].x - v1[i].x
    ).getNormalized();

    let max1 = -Infinity;
    let min1 = Infinity;
    v1.forEach((v) => {
      let dot = normal.getDotProduct(v);
      max1 = Math.max(max1, dot);
      min1 = Math.min(min1, dot);
    });

    let max2 = -Infinity;
    let min2 = Infinity;
    v2.forEach((v) => {
      let dot = normal.getDotProduct(v);
      max2 = Math.max(max2, dot);
      min2 = Math.min(min2, dot);
    });

    if (!((min1 < max2 && min1 > min2) || (min2 < max1 && min2 > min1))) {
      return false;
    }
  }

  //Check for Normals of poly2 axes
  for (let i = 0; i < v2.length; i++) {
    let j = (i + 1) % v2.length;
    let normal = new Vector2i(
      -1 * (v2[j].y - v2[i].y),
      v2[j].x - v2[i].x
    ).getNormalized();

    let max1 = -Infinity;
    let min1 = Infinity;
    v1.forEach((v) => {
      let dot = normal.getDotProduct(v);
      max1 = Math.max(max1, dot);
      min1 = Math.min(min1, dot);
    });

    let max2 = -Infinity;
    let min2 = Infinity;
    v2.forEach((v) => {
      let dot = normal.getDotProduct(v);
      max2 = Math.max(max2, dot);
      min2 = Math.min(min2, dot);
    });

    if (!((min1 < max2 && min1 > min2) || (min2 < max1 && min2 > min1))) {
      return false;
    }
  }
  return true;
};

/**
 * Resolves collision between two polygons using Separated Axis Theorem
 * @param {Polygon} poly1
 * @param {Polygon} poly2
 * @returns {boolean}
 */
Polygons.SatStaticResolution = function (poly1, poly2) {
  let v1 = poly1.vertices;
  let v2 = poly2.vertices;

  let overlap1 = Infinity;
  let overlap2 = Infinity;
  let overlap = Infinity;

  //Check for Normals of poly1 axes
  for (let i = 0; i < v1.length; i++) {
    let j = (i + 1) % v1.length;
    let normal = new Vector2i(
      -1 * (v1[j].y - v1[i].y),
      v1[j].x - v1[i].x
    ).getNormalized();

    let max1 = -Infinity;
    let min1 = Infinity;
    v1.forEach((v) => {
      let dot = normal.getDotProduct(v);
      max1 = Math.max(max1, dot);
      min1 = Math.min(min1, dot);
    });

    let max2 = -Infinity;
    let min2 = Infinity;
    v2.forEach((v) => {
      let dot = normal.getDotProduct(v);
      max2 = Math.max(max2, dot);
      min2 = Math.min(min2, dot);
    });

    if (!((min1 < max2 && min1 > min2) || (min2 < max1 && min2 > min1))) {
      return false;
    }
    overlap1 = Math.min(Math.min(max1, max2) - Math.max(min1, min2), overlap1);
  }

  //Check for Normals of poly2 axes
  for (let i = 0; i < v2.length; i++) {
    let j = (i + 1) % v2.length;
    let normal = new Vector2i(
      -1 * (v2[j].y - v2[i].y),
      v2[j].x - v2[i].x
    ).getNormalized();

    let max1 = -Infinity;
    let min1 = Infinity;
    v1.forEach((v) => {
      let dot = normal.getDotProduct(v);
      max1 = Math.max(max1, dot);
      min1 = Math.min(min1, dot);
    });

    let max2 = -Infinity;
    let min2 = Infinity;
    v2.forEach((v) => {
      let dot = normal.getDotProduct(v);
      max2 = Math.max(max2, dot);
      min2 = Math.min(min2, dot);
    });

    if (!((min1 < max2 && min1 > min2) || (min2 < max1 && min2 > min1))) {
      return false;
    }

    overlap2 = Math.min(Math.min(max1, max2) - Math.min(min1, min2), overlap2);
  }

  /*
   * Commented section of code can be used to resolve collision by using side,
   * but it wont work for rotated shapes.
   */
  overlap = Math.min(overlap1, overlap2);
  // poly1.recalculateCenter();
  // poly2.recalculateCenter();
  // console.log(poly2.center, poly2.vertices[poly2.vertices.length - 1]);

  let transVec = new Vector2i(
    poly2.center.x - poly1.center.x,
    poly2.center.y - poly1.center.y
  );
  transVec.normalize();
  let directionVector = transVec;
  transVec.scale(overlap);

  poly1.center.x = poly1.center.x - transVec.x;
  poly1.center.y = poly1.center.y - transVec.y;

  poly1.recalculateVertices();

  // poly1.vertices.forEach((vertex, i) => {
  //   poly1.vertices[i].subtractVector(transVec);
  // });
  return directionVector;
};

//-------------- Text ----------------------//
export function drawText(ctx, text, x, y, color, font, align) {
  if (color) ctx.fillStyle = color;
  if (font) ctx.font = font;
  if (align) ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

// -------------- Particles ---------------// 
export let Particles = {
  all: [],
};

//add physics data
Particles.makeParticle = function (...shapes) {
  // this.all.push(...shapes);

  shapes.forEach((shape) => {
    shape.mass = 1;
    shape.velocity = new Vector2i(0, 0);
    shape.acceleration = new Vector2i(0, 0);
    shape.force = new Vector2i(0, 0);
  });
};

Particles.calculate = function (deltatime) {
  this.all.forEach((particle, i) => {
    let accn = new Vector2i(
      particle.force.x / particle.mass,
      particle.force.y / particle.mass
    );
    particle.velocity.x += accn.x * deltatime;
    particle.velocity.y += accn.y * deltatime;
    particle.center.x += particle.velocity.x * deltatime;
    particle.center.y += particle.velocity.y * deltatime;
  });
};

//--- Bullets
/**
 * @class
 * @param {Vector2i} origin - Point of origin/start of bullet
 * @param {Vector2i} direction - Noramlized vector represeting the direction of travel of the bullet
 */
export class Bullets {
  constructor(origin, direction) {
    this.size = 2;
    this.o = origin;
    this.d = direction;
    this.circle = new Circle(this.o, this.size, true);
    this.scale;
  }

  /**
   * Calculates and moves this bullet to its next position.
   * @param {number} s - Distance to tbe traveled by bullet per tic
   */
  next(s) {
    let dir = new Vector2i(this.d.x, this.d.y);
    dir.scaleVector(s);
    this.o.subtractVector(dir);
    this.circle = new Circle(this.o, this.size, true);
  }
}

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
      }
      else return reject('Could not load file');
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
    data[i] = grayscale;     // Red
    data[i + 1] = grayscale; // Green
    data[i + 2] = grayscale; // Blue
  }

  return imageData;
}

export function convertToSingleColorImage(imageData, color, keepIntensityLevels) {
    const data = imageData.data;
  // Convert image to grayscale using luminosity method
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Set RGB channels to grayscale value
    if(color == 'red') {
      
      if(keepIntensityLevels) data[i] = data[i];//Red -- do nothing
      else data[i] = (r+g+b) / 3; // Red
      data[i + 1] = 0; // Green
      data[i + 2] = 0; // Blue
    }
    else if(color == 'green') {
      data[i] = 0; // Red
      if(keepIntensityLevels) data[i+1] = data[i+1];//Green -- do nothing
      else data[i + 1] = (r+g+b) / 3; // Green
      data[i + 2] = 0; // Blue
    }
    else if(color == 'blue') {
      data[i] = 0; // Red
      data[i + 1] = 0; // Green
      if(keepIntensityLevels) data[i+2] = data[i+2];//Red -- do nothing
      else data[i + 2] = (r+g+b) / 3; // Blue
    }
  }
  
  return imageData;
}

/**
 * Draw Image at position
 * @param {Context} context Canvas Context 2D
 * @param {Image} image Loaded Image reference
 * @param {Vector2i} position Origin Position, Upper right corner
 */
export function drawImage(context, image, position) {
  if (image && context) {
    context.drawImage(image, position.x, position.y);
  }
}

export function drawImageAndBoundRect(context, image, position, color='red') {
  new Rectangle(position, new Vector2i(image.width, image.height)).draw(
    context,
    color
  );
  drawImage(context, image, position);
}

/**
 * Draw a rotated image to canvas.
 * @param {Context} context Canvas Context
 * @param {Image} image Loaded Image reference
 * @param {Vector2i} position Position of upper right corner of image
 * @param {Angle} angle Angle in Radian
 * @param {String} color Color of center of rotation
 */
export function rotateAndDrawImage(context, image, position, angle, color='red') {
  if (image && context) {
    context.save();
    let imageCenter = new Vector2i(
      position.x + image.width / 2,
      position.y + image.height / 2
    );
    context.translate(imageCenter.x, imageCenter.y);

    let center = new Point(0, 0, 5, color);
    center.draw(context);
    context.rotate(angle);
    drawImage(
      context,
      image,
      new Vector2i(-image.width / 2, -image.height / 2)
    );
    context.restore();
  }
}

/**
 * Draw Sprite
 * @param { HTMLCanvasElement.context } context -
 * @param { ImageData } image - Sprite Sheet Full Image
 * @param { Rectangle } rect_ImageSource - Rectange representing required sprite image
 * @param { Rectangle } rect_drawImage - Rectange representing where in context the sprite is to be drawn.
 */
export function drawSprite(context, image, rect_ImageSource, rect_drawImage) {
  if (image) {
    context.drawImage(
      image,
      rect_ImageSource.vec.x,
      rect_ImageSource.vec.y,
      rect_ImageSource.width,
      rect_ImageSource.height, //src coords
      rect_drawImage.vec.x,
      rect_drawImage.vec.y,
      rect_drawImage.width,
      rect_drawImage.height //dst coords
    );
  }
}

//--- Tile Map Utility functions ---/

//--- Tiles
/**
 * Tiles and Tile Map Utilities
 * @class
 */
export class Tiles {}

/**
 * Precalculate the origin coordinate for each tile in a tile map and store in an array.
 * @param {number} rows
 * @param {number} columns
 * @param {number} tileSize
 */
Tiles.generateTileArray = function (rows, columns, tileSize) {
  let tileArray = [];

  for (let row = 0; rows > row; row++) {
    for (let col = 0; columns > col; col++) {
      tileArray.push(new Vector2i(col * tileSize, row * tileSize));
    }
  }

  return tileArray;
};

/**
 * This gives the cell number calculated going from left to right and returning to leftmost column for next row.
 * Row and Column are not origin points of the rectangle representing the tile but actual row and column number.
 * @param {number} row
 * @param {number} column
 * @param {number} totalColumns
 */
Tiles.getCellNumber = function (row, column, totalColumns) {
  return row * column + column - totalColumns;
};

/**
 * Gives Row Number count starting from 1
 * @param {number} cellNumber
 * @param {number} totalColumns
 */
Tiles.getRow = function (cellNumber, totalColumns) {
  let row = cellNumber / totalColumns;
  let deltarow = row - Math.floor(row);
  if (deltarow !== 0) {
    row++;
  }
  return Math.floor(row);
};

/**
 * Gives Column Number count starting from 1
 * @param {number} cellNumber
 * @param {number} totalColumns
 */
Tiles.getColumn = function (cellNumber, totalColumns) {
  let colNumber = cellNumber % totalColumns;

  if (colNumber === 0) {
    return totalColumns;
  } else return colNumber;
};

/**
 * Draw a single tile at given position from the Tile image to the screen.
 * @param {Canvas.context} context
 * @param {image} tilesImage
 * @param {Vector2i} imageOrigin UpperRight corner of selected tile
 * @param {number} tileSizeOfImage Original Tile size in image
 * @param {Vector2i} drawOrigin Upper Right corner the Tile to be drawn
 * @param {number} drawTileSize Size of tile to be drawn
 */
Tiles.drawTile = function (
  context,
  tilesImage,
  imageOrigin,
  tileSizeOfImage,
  drawOrigin,
  drawTileSize
) {
  context.drawImage(
    tilesImage,
    imageOrigin.x,
    imageOrigin.y,
    tileSizeOfImage,
    tileSizeOfImage,
    drawOrigin.x,
    drawOrigin.y,
    drawTileSize,
    drawTileSize
  );
};

// ------------ Animations -----------------//
export class Animation {
  // Sprite Image
  spriteSheet;
  // Sprites
  numberOfSprites;
  //vector Array of origins
  _spritePositions = [];
  _states = {
    currentState: "",
    currentFrame: 0,
  };
  spriteSize;

  time;
  _timePerFrame;
  _totalDeltaTime = 0;

  calculateSpritePostions(spriteSize) {
    this.spriteSize = spriteSize;
    this._spritePositions = [];
    let currentPosition = new Vector2i(0, 0);
    this._spritePositions.push(currentPosition.getNewVector());

    for (let i = 1; i < this.numberOfSprites; i++) {
      currentPosition.x += spriteSize.x;
      this._spritePositions.push(currentPosition.getNewVector());
    }
  }

  setSpriteOriginPositions(positions) {
    this._spritePositions = positions;
  }

  setTime(time) {
    this.time = time;
    this._timePerFrame = this.time / this.numberOfSprites;
    this._totalDeltaTime = 0;
  }

  addState(name, framesArray, animationTime) {
    let tpf= animationTime/framesArray.length;
    this._states[name] = {
      frames: framesArray,
      time: animationTime,
      timePerFrame: tpf,
    };
  }

  setState(name) {
    this._states.currentState = name;
    this._states.currentFrame = 0;
    this._totalDeltaTime = 0;
  }

  removeState(name) {
    delete this._states[name];
  }

  _getCurrentFramePosition(deltaTime) {
    this._totalDeltaTime += deltaTime;
    if (this._totalDeltaTime > this.time) {
      this._totalDeltaTime = 0;
      return this._spritePositions[0];
    } else {
      return this._spritePositions[
        Math.floor(this._totalDeltaTime / this._timePerFrame)
      ];
    }
  }

  _getCurrentStateFramePosition(deltaTime) {
    this._totalDeltaTime += deltaTime;
    if (this._totalDeltaTime >= this._states[this._states.currentState].time) {
      this._totalDeltaTime = 0;
      return this._spritePositions[this._states[this._states.currentState].frames[0]];
    } else {
      return this._spritePositions[this._states[this._states.currentState].frames[
        Math.floor(this._totalDeltaTime / this._states[this._states.currentState].timePerFrame)
      ]];
    }
  }

  draw(context, position, deltaTime, withState) {
    //--- Without a state, animate all frames in the sheet
    if(!withState) {
      drawSprite(
        context,
        this.spriteSheet,
        new Rectangle(this._getCurrentFramePosition(deltaTime), this.spriteSize),
        new Rectangle(position, this.spriteSize)
      );
    }
    else {
      let currentFramePosition = this._getCurrentStateFramePosition(deltaTime);
      drawSprite(
        context,
        this.spriteSheet,
        new Rectangle(currentFramePosition, this.spriteSize),
        new Rectangle(position, this.spriteSize)
      );
    }

  }
}