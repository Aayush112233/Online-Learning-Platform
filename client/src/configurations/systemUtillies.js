import Cookies from "js-cookie";
//TO SET COOKIE

export const storageUtil = (key, value) => {
  if (window !== undefined) {
    Cookies.set(key, value, {
      expires: 1,
    });
  }
};
export const getCookie = (key) => {
  if (window !== "undefined") {
    return Cookies.get(key);
  }
};

export const setCookies = (key, value) => {
  if (window !== "undefined") {
    Cookies.set(key, value, {
      expires: 1,
    });
  }
};
//Remove
export const removeCookies = (key) => {
  if (window !== "undefined") {
    Cookies.remove(key, {
      expires: 1,
    });
  }
};

//Authentication
export const VerifyAdmin = (token) => {
  setCookies("token", token);
};

export const AuthenticationCheck = () => {
  if (window !== "undefined") {
    const CookiesChecked = getCookie("token");
    if (CookiesChecked) {
      return true;
    } else {
      return false;
    }
  }
};
