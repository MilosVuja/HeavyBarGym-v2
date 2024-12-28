export const login = async (email, pinCode) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/members/login",
      data: {
        email,
        pinCode,
      },
    });

    if (res && res.data && res.data.status === "Success!") {
      alert("Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      alert("An error occurred during login. Please try again.");
    }
  }
};

document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const pinCode = document.getElementById("pinCode").value;

  await login(email, pinCode);
});