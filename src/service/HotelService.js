import Keys from "../helper/Keys";
import HttpService from "./shared/HttpClient";
import { getToken } from "./shared/LocalStorage";


export async function registerHotel(hotelRegistrationRequest){
  console.log(hotelRegistrationRequest);
  const response = await HttpService.postService(
    hotelRegistrationRequest,
    Keys.hotelRegistrationRelativeUrl,
    `${getToken()}`,""
  ).catch((e) => {});

  return response.data;
}

export async function getHotelList(){
  const response = await HttpService.getService(
    Keys.hotelListRelativeUrl,
    `${getToken()}`,""
  ).catch((e) => {});

  return response.data;
}

export async function getHotelDetail(getHotelDetailRequest){
  const response = await HttpService.postService(
    getHotelDetailRequest,
    Keys.hotelDetailRelativeUrl,
    `${getToken()}`,""
  ).catch((e) => {});

  return response.data;
}

export async function changeHotelStatus(changeHotelStatusRequest){
  const response = await HttpService.postService(
    changeHotelStatusRequest,
    Keys.hotelChangeStatusRelativeUrl,
    `${getToken()}`,""
  ).catch((e) => {});

  return response.data;
}

export async function createHotelAdmin(createHotelAdmin){
  const response = await HttpService.postService(
    createHotelAdmin,
    Keys.createHotelAdminRelativeUrl,
    `${getToken()}`,""
  ).catch((e) => {});

  return response.data;
}

export async function changeHotelAdminStatus(changeHotelAdminStatus){
  const response = await HttpService.postService(
    changeHotelAdminStatus,
    Keys.changeHotelAdminStatusRelativeUrl,
    `${getToken()}`,""
  ).catch((e) => {});

  return response.data;
}