export default class Keys {
    static baseUrl = "https://chms-api.herokuapp.com";

    static loginRelativeUrl = "/api/user/login";

    static hotelRegistrationRelativeUrl = "/api/hotel/register";

    static hotelListRelativeUrl = "/api/hotel/listAll";

    static hotelDetailRelativeUrl = "/api/hotel/getInfo";

    static hotelChangeStatusRelativeUrl = "/api/hotel/changeStatus";
    
    static createHotelAdminRelativeUrl = "/api/user/createAdmin";

    static changeHotelAdminStatusRelativeUrl = "/api/user/changeAdminStatus";

    static masterDataRelativeUrl = "/api/user/getMasterData";

    static getAllAdminsRelativeUrl = "/api/user/listSuperAdmins";

    static createSuperAdminRelativeUrl = "/api/user/createSuperAdmin";

    static chekInUserList = "/api/checkIn/listAll";

    static chekOutUserList = "/api/checkOut/listAll";

}
