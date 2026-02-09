document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.innerText = "";

    // if (username === "a@gmail.com" && password === "123456") {
    //   showPopup("Login successful", "success");
    //   document.getElementById("authModal").style.display = "none";
    //   adminPanel.style.display = "flex";
    //   return;
    // }
    // ✅ DUMMY LOGIN (ADDED)
    if (username === "a@gmail.com" && password === "123456") {
      window.location.href = "dashboard.html";
      return;
    }

    try {
      const response = await fetch("https://app.usthifoundationindia.com/login", {
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
        // ✅ Login success → redirect
        window.location.href = "dashboard.html";
      } else {
        // ❌ Login failed → show popup message
        const data = await response.json();
        errorMessage.innerText = data.detail || "Invalid username or password";
      }
    } catch (error) {
      errorMessage.innerText = "Server not reachable";
    }
  });
