import { server } from "../../env.js";

/**
 * Make HTTP request
 * @see https://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr
 * */
export default class HttpRequest {
  constructor() {}
  /**
   *
   * @param {String} method
   * @param {String} jsonFileName
   * @param {String} url
   *
   * @returns Promise
   */
  request(
    method = "GET",
    jsonFileName = "4x4",
    url = `${server}/data/${jsonFileName}.json`
  ) {
    return new Promise((resolve, rejected) => {
      const httpRequest = new XMLHttpRequest();

      httpRequest.open(method, url);
      httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");

      httpRequest.onload = function() {
        if (this.status >= 200 && this.status <= 300) {
          resolve(httpRequest.response);
        } else {
          rejected({
            status: this.status,
            statusText: httpRequest.statusText
          });
        }
      };

      httpRequest.onerror = function() {
        rejected({
          status: this.status,
          statusText: httpRequest.statusText
        });
      };

      httpRequest.send();
    });
  }
}
