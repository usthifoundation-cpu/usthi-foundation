// donate button section
// document.addEventListener("DOMContentLoaded", function () {
//   const donateBtn = document.getElementById("ngoDonateBtn");
//   const popup = document.getElementById("ngoDonatePopup");
//   const overlay = document.getElementById("ngoOverlay");
//   const closeBtn = document.getElementById("ngoCloseBtn");
//   const form = document.getElementById("ngoDonationForm");

//   donateBtn.addEventListener("click", function () {
//     popup.style.display = "block";
//     overlay.style.display = "block";
//   });

//   function closePopup() {
//     popup.style.display = "none";
//     overlay.style.display = "none";
//   }

//   closeBtn.addEventListener("click", closePopup);
//   overlay.addEventListener("click", closePopup);

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     alert("Thank you! Your donation details have been submitted.");
//     closePopup();
//   });
// });

// gallery api call
// document.addEventListener("DOMContentLoaded", () => {
//   loadGallery();
// });

// async function loadGallery() {
//   try {
//     const response = await fetch("https://your-api-url.com/gallery");
//     const images = await response.json();

//     const galleryGrid = document.getElementById("galleryGrid");
//     galleryGrid.innerHTML = "";

//     images.forEach((item) => {
//       const div = document.createElement("div");
//       div.className = `gallery-item ${item.big ? "big" : ""}`;

//       div.innerHTML = `
//         <img src="${item.image}" alt="Gallery Image">
//       `;

//       galleryGrid.appendChild(div);
//     });
//   } catch (error) {
//     console.error("Gallery load failed", error);
//   }
// }

// end

// toggle button section
const toggleBtn = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Active link switch
const links = document.querySelectorAll(".nav-links a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // Close menu on mobile after click
    navLinks.classList.remove("show");
  });
});

// donate button api call

document.addEventListener("DOMContentLoaded", () => {
  const donateBtn = document.getElementById("ngoDonateBtn");
  const popup = document.getElementById("ngoDonatePopup");
  const overlay = document.getElementById("ngoOverlay");
  const closeBtn = document.getElementById("ngoCloseBtn");
  const form = document.getElementById("ngoDonationForm");

  // ===== OPEN POPUP =====
  donateBtn.addEventListener("click", () => {
    popup.style.display = "block";
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  // ===== CLOSE POPUP =====
  function closePopup() {
    popup.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);

  // ===== FORM SUBMIT =====
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form
      .querySelector('input[placeholder="Full Name*"]')
      .value.trim();
    const phone = form
      .querySelector('input[placeholder="Phone Number*"]')
      .value.trim();
    const utr = form
      .querySelector('input[placeholder="UTR / Transaction ID*"]')
      .value.trim();
    const pan = form.querySelector('input[placeholder="Pan"]').value.trim();
    const message = form
      .querySelector('textarea[placeholder="Type Your Message"]')
      .value.trim();
    const screenshot = form.querySelector(".ngo-file-input").files[0];

    if (!name || !phone || !utr || !message || !screenshot) {
      alert("Please fill all required fields.");
      return;
    }

    // Optional PAN format validation
    if (pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(pan)) {
      alert("Please enter a valid PAN number.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("utr", utr);
    formData.append("pan", pan);
    formData.append("message", message);
    formData.append("screenshot", screenshot);

    try {
      const response = await fetch("https://app.usthifoundationindia.com/donation", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert(
          "Thank you! Your donation details have been submitted successfully."
        );
        form.reset();
        closePopup();
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  loadAdminImages();
});

const API_BASE_URL = "https://app.usthifoundationindia.com/onlyImage";

async function loadAdminImages() {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("API not responding");
    }

    const images = await response.json();
    const adminGrid = document.getElementById("adminGalleryGrid");

    if (!adminGrid) {
      console.error("❌ adminGalleryGrid not found in DOM");
      return;
    }

    adminGrid.innerHTML = "";

    images.forEach(img => {
      const div = document.createElement("div");
      div.className = "gallery-item";

      const imageEl = document.createElement("img");
      imageEl.src = `https://app.usthifoundationindia.com${img.image_url}`;
      imageEl.alt = img.filename;
      imageEl.loading = "lazy";

      div.appendChild(imageEl);
      adminGrid.appendChild(div);
    });

  } catch (error) {
    console.error("❌ Error loading admin images:", error);
  }
}
  
