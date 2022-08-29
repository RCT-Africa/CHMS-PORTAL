import Keys from "../helper/Keys";
import HttpService from "./shared/HttpClient";
import { getToken } from "./shared/LocalStorage";

export async function getMasterDataList() {
    const response = await HttpService.getService(
        Keys.masterDataRelativeUrl,
        `${getToken()}`, ""
    ).catch((e) => { });

    return response.data;
}

export async function loginUser(loginRequest) {
    const response = await HttpService.postService(
        loginRequest,
        Keys.loginRelativeUrl,
        "", ""
    ).catch((e) => { });

    return response.data;
}

export async function getAllAdmins() {
    const response = await HttpService.getService(
        Keys.getAllAdminsRelativeUrl,
        `${getToken()}`, ""
    ).catch((e) => { });

    return response.data;
}


export async function createSuperAdmin(createSuperAdmin){
    console.log(createSuperAdmin)
    const response = await HttpService.postService(
        createSuperAdmin,
      Keys.createSuperAdminRelativeUrl,
      `${getToken()}`,""
    ).catch((e) => {});
  
    return response.data;
  }

  export async function getCheckInUserList() {
    const response = await HttpService.getService(
        Keys.chekInUserList,
        `${getToken()}`, ""
    ).catch((e) => { });

    return response.data;
}

export async function getCheckOutUserList() {
    const response = await HttpService.getService(
        Keys.chekOutUserList,
        `${getToken()}`, ""
    ).catch((e) => { });

    return response.data;
}
