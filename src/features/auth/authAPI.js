// A mock function to mimic making an async request for data

//On create user
export function signupUserAccount(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
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
      const response = await fetch("http://localhost:8080/auth/login/", {
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

// on LOGOUT API
export function logoutUserAccount(userId) {
  return new Promise(async (resolve) => {
    //TODO:will aware backend from here to Logout that user

    resolve({ status: "logout successs" });
  });
}
