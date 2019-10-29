import HttpRequest from "./HttpRequest";

/**
 * Create canvas matrix and scale it up
 * @class
 */
export default class Canvas {
  constructor(canvasSelector, canvasSize = 512) {
    this.selector = canvasSelector;
    this.canvasSize = canvasSize;
  }

  /**
   * Make context of canvas and set size
   * @throws {Error}
   */
  init() {
    this.canvas = document.querySelector(`${this.selector}`);

    if (!this.canvas)
      throw Error(`canvas not found by selector ${this.selector}`);

    if (!this.canvas.getContext) {
      console.error("You browser don't support context for canvas");
      return;
    }

    //NOTE: WHy we must set canvas size in JS ?
    // in css we set size of window)) but what mean size of window ???
    // in js size of canvas
    this.canvas.width = this.canvasSize;
    this.canvas.height = this.canvasSize;

    this.ctx = this.canvas.getContext("2d");
  }

  /**
   * Clear canvas
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
  }

  /**
   * Convert hex color to RGBA
   * @param {String} hex
   * @param {Number} opacity
   */
  _convertHexToRgba(hex, opacity = 255) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b, opacity / 255];
  }

  /**
   * Draw matrix and scale it up
   * @param {Number} matrixSize
   * @param {String} colorType
   */
  _drawMatrixBySize(matrixSize, colorType = "hex") {
    this.clearCanvas();

    const data = this.data[matrixSize];
    const needConvertToRgba = colorType === "hex";

    const fillStep = Math.floor(this.canvasSize / matrixSize);

    for (let i = 0; i < data.length; i += 1) {
      for (let j = 0; j < data[i].length; j += 1) {
        const colors = data[i];
        const color = colors[j];
        const [r, g, b, a] = needConvertToRgba
          ? this._convertHexToRgba(color)
          : color;

        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        this.ctx.fillRect(i * fillStep, j * fillStep, fillStep, fillStep);
      }
    }
  }

  /**
   * Get data add call @function _drawMatrixBySize
   * @param {Number} size
   */
  drawMatrix(size = 4) {
    if (this.data && this.data[size]) {
      const colorType = size === 4 ? "hex" : "rgba";
      this.drawMatrixBySize(size, colorType);
    }

    this._getData(size)
      .then(res => {
        if (this.data) {
          this.data = { ...this.data, [size]: JSON.parse(res) };
        } else {
          this.data = {
            [size]: JSON.parse(res)
          };
        }

        console.log(this.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * get colors data for canvas
   * @param {Number} matrixSize
   */
  _getData(matrixSize = 4) {
    const request = new HttpRequest();

    const dispatchRequest = {
      4: request.request(),
      32: request.request("GET", "32x32")
    };

    return dispatchRequest[matrixSize];
  }
}
