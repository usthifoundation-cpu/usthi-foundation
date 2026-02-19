function setAdminAuth(value) {
  try {
    sessionStorage.setItem("usthi_admin_logged_in", value);
  } catch (_e) {}
  try {
    localStorage.setItem("usthi_admin_logged_in", value);
  } catch (_e) {}
}

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.innerText = "";

    // local fallback admin login
    if (username.toLowerCase() === "a@gmail.com" && password === "123456") {
      setAdminAuth("true");
      window.location.href = "dashboard.html";
      return;
    }

    try {
      const response = await fetch(window.getBackendUrl() + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        setAdminAuth("true");
        window.location.href = "dashboard.html";
      } else {
        const data = await response.json();
        errorMessage.innerText = data.detail || "Invalid username or password";
      }
    } catch (error) {
      errorMessage.innerText = "Server not reachable";
    }
  });
