// A mock function to mimic making an async request for data

//On create user
export function signupUserAccount(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //TODO:don't send back password data and also it should be encrypted
    const data = await response.json();
    resolve(data);
  });
}

//On LOGIN API
export function loginUserAccount(loginData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login/", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data, "daa");
        resolve(data);
      } else {
        const error = await response.json();
        // console.log(error, "error");
        reject(error);
      }
    } catch (error) {
      // console.log(error, "loginUserAccount");
      reject(error);
    }
  });
}

//On Reload page cheking if session exists in backend reload w/ same user profie
// 'jwt' tokn would be auto verified from stored cookie on each route to bak
// so if token exists and session is not expired in backend user will be loaded using this
export function checkUserTokenExists() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check");
      if (response.ok) {
        const token = await response.json();
        resolve(token);
      } else {
        const error = await response.json();
        reject(error);
        //TODO: redirect to login
      }
    } catch (error) {
      reject(error);
    }
  });
}

// on LOGOUT API
export function logoutUserAccount() {
  return new Promise(async (resolve) => {
    //TODO:will aware backend from here to Logout that user or del user from session in bak
    //TODO: delete token from cookie

    resolve({ status: "logout successs" });
  });
}

//On Request Forgot PASSword REquest
export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password-request", {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data, "daa");
        resolve(data);
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
//On  Reset PASSword
export function resetPassword(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data, "daa");
        resolve(data);
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
