import axios from "axios";
import Keys from "../../helper/Keys";

export default class HttpService {
  static postService = async (
    requestBody ,
    relativePath ,
    token,
    queryString
  ) => {

    const headersList = this.buildHeader(token);
    const url = `${Keys.baseUrl}${relativePath}${queryString}`;
    console.log(url)
    const result = await axios
      .post(url.trim(), requestBody, {
        headers: headersList,
      })
      .catch(async (e) => {
        console.log(e)
      });
    return result;
  };

  static getService = async (relativePath, token , queryString) => {
    const headersList = this.buildHeader(token);
    const url = Keys.baseUrl + relativePath + queryString;
    const result = await axios
      .get(url.trim(), {
        headers: headersList,
      })
      .catch(async (e) => {
        console.log(e)
      });

    return result;
  };

  static getTokenServive = () => {};

  static buildHeader = (token) => {
    const headers = {
      ContentType: "application/json",
      Accept: "application/json",
      "Accept-Language": "en",
      "ngrok-skip-browser-warning":"true",
      "Authorization": `Bearer ${token}`,
    };

    return headers;
  };
}
