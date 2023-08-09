// A mock function to mimic making an async request for data

//On Register API
export function signupUserAccount(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
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
  const email = loginData.email;
  const password = loginData.password;
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/users?email=" + email);
    //TODO:don't send back password data and also it should be encrypted
    //TODO: this checking is to be done on backend
    const data = await response.json();
    if (data.length) {
      if (data[0].password === password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Incorrect Credentials !" });
      }
    } else {
      reject({ message: "User not Found !" });
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
