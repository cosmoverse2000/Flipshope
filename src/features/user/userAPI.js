// A mock function to mimic making an async request for data

// get user data to display user profile
export function fetchUserProfile() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/user/");
    const data = await response.json();
    // console.log(data, "user profile data");
    resolve(data);
  });
}

//On Update user API, like adding address, edit or remove user datas(addres, name ,email)
export function updateUserProfile(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/user/" + userData.id, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    resolve(data);
  });
}
