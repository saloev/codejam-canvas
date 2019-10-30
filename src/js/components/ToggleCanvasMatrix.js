import Canvas from "./Canvas";

class ToggleCanvasMatrix extends Canvas {
  constructor(toggleSelector, canvasSelector) {
    //NOTE: why first we must call constructor of parent ???
    super(canvasSelector);
    this.selector = toggleSelector;
  }

  init() {
    super.start();

    const toggleWrapper = document.querySelector(`${this.selector}`);
    const selectedValue = +toggleWrapper.querySelector("input:checked").value;

    super.drawMatrix(selectedValue);

    document
      .querySelector(`${this.selector}`)
      .addEventListener("change", this.toggleMatrix);
  }

  toggleMatrix = e => {
    const value = +e.target.value;
    super.drawMatrix(value);
  };
}

export default ToggleCanvasMatrix;
