// material design components
import material from "./material/material";

//classes
import ToggleCanvasMatrix from "./ToggleCanvasMatrix";

export default () => {
  material();

  const canvasMatrix = new ToggleCanvasMatrix(".mdc-form-wrap", "#canvas");
  canvasMatrix.init();
};
