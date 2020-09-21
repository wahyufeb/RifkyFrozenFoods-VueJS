import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const SECRET_KEY = "qwertyuiopasdfghjklzxcvbnm123456789RIfkyFrozenFoods";

const setEncryptCookie = (cookieName, data) => {
  console.log(typeof data)
  if (typeof data == undefined || String) {
    alert("RELOAD HALAMAN PLS")
    document.location.reload()
  }
  if (typeof data === "object") {
    let encryptdata = CryptoJS.AES.encrypt(
      JSON.stringify(data).toString(),
      SECRET_KEY
    ).toString();
    return Cookies.set(cookieName, encryptdata);
  } else {
    return Cookies.set(
      cookieName,
      CryptoJS.AES.encrypt(data.toString(), SECRET_KEY).toString()
    );
  }
};

const setDecryptCookie = (cookieName, type) => {
  let checkData = Cookies.get(cookieName) || false;

  let result = "";

  if (checkData !== false) {
    checkData = Cookies.get(cookieName);
    if (type === "object") {
      let decryptData = CryptoJS.AES.decrypt(checkData, SECRET_KEY);
      result = JSON.parse(decryptData.toString(CryptoJS.enc.Utf8));
    } else {
      let decryptData = CryptoJS.AES.decrypt(checkData, SECRET_KEY);
      result = decryptData.toString(CryptoJS.enc.Utf8);
    }
  } else {
    result = [];
  }
  return result;

};

export {
  setEncryptCookie,
  setDecryptCookie,
};
