import { MDCFormField } from "@material/form-field";
import { MDCRadio } from "@material/radio";

export default () => {
  const radio = new MDCRadio(document.querySelector(".mdc-radio"));
  const formField = new MDCFormField(document.querySelector(".mdc-form-field"));
  formField.input = radio;
};
