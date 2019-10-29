//functions
import topAppBar from "./topAppBar";
import toolList from "./list";

//classes
import Canvas from "./Canvas";

export default () => {
  // init components

  topAppBar();

  toolList();

  const canvas = new Canvas("#canvas");
  canvas.init();
};
