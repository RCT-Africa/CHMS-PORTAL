const setToken = (token) => localStorage.setItem("chms-access-token", token);
const getToken = () => localStorage.getItem("chms-access-token");
const setFirstName = (firstName) => localStorage.setItem("chms-firstName", firstName);
const getFirstName = () => localStorage.getItem("chms-firstName");
const setLastName= (lastName) => localStorage.setItem("chms-lastName", lastName);
const getLastName= () => localStorage.getItem("chms-lastName");
const setEmail= (email) => localStorage.setItem("chms-email", email);
const getEmail= () => localStorage.getItem("chms-email");
const setMasterData = (masterData) => localStorage.setItem("chms-masterData", JSON.stringify(masterData));
const getMasterData = () => JSON.parse(localStorage.getItem("chms-masterData"));

export {
  setToken,
  getToken,
  setMasterData,
  getMasterData,
  getLastName,
  setLastName,
  getFirstName,
  setFirstName, 
  setEmail, 
  getEmail
};
