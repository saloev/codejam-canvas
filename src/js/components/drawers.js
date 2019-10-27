import { MDCList } from "@material/list";

export default () => {
  const list = MDCList.attachTo(document.querySelector(".mdc-list"));
  list.wrapFocus = true;
};
