 // donate button section
document.addEventListener("DOMContentLoaded", function () {

  const donateBtn = document.getElementById("ngoDonateBtn");
  const popup = document.getElementById("ngoDonatePopup");
  const overlay = document.getElementById("ngoOverlay");
  const closeBtn = document.getElementById("ngoCloseBtn");
  const form = document.getElementById("ngoDonationForm");

  donateBtn.addEventListener("click", function () {
    popup.style.display = "block";
    overlay.style.display = "block";
  });

  function closePopup() {
    popup.style.display = "none";
    overlay.style.display = "none";
  }

  closeBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you! Your donation details have been submitted.");
    closePopup();
  });

});








// end


// toggle button section


const toggleBtn = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Toggle menu
toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Active link switch
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Close menu on mobile after click
    navLinks.classList.remove("show");
  });
});

// our program
// our program

document.querySelectorAll(".toggle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.parentElement;
    const moreText = content.querySelector(".more-text");

    if (moreText.style.display === "block") {
      moreText.style.display = "none";
      btn.innerText = "Show More";
    } else {
      moreText.style.display = "block";
      btn.innerText = "Show Less";
    }
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

    const name = form.querySelector('input[placeholder="Full Name*"]').value.trim();
    const phone = form.querySelector('input[placeholder="Phone Number*"]').value.trim();
    const utr = form.querySelector('input[placeholder="UTR / Transaction ID*"]').value.trim();
    const pan = form.querySelector('input[placeholder="Pan"]').value.trim();
    const message = form.querySelector('textarea[placeholder="Type Your Message"]').value.trim();
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
      const response = await fetch("https://app.usthifoundationindia.com/images", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Thank you! Your donation details have been submitted successfully.");
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


// our program api call
const API_BASE_URL = "https://app.usthifoundationindia.com/images";

document.addEventListener("DOMContentLoaded", () => {
  fetchPrograms();
});

async function fetchPrograms() {
  try {
    const response = await fetch(API_BASE_URL);
    const programs = await response.json();

    const container = document.getElementById("programsContainer");
    container.innerHTML = "";

    programs.forEach((program, index) => {
      const card = document.createElement("div");

      // optional reverse layout
      card.className = `program-card ${index % 2 !== 0 ? "reverse" : ""}`;

      card.innerHTML = `
        <img 
          src="${API_BASE_URL}/${program.id}" 
          alt="${program.filename}"
        >

        <div class="program-content">
          <h2>${program.heading}</h2>
          <p>${program.description}</p>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("❌ Failed to load programs", error);
  }
}

 
 
 
 // // donate button section
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

// end

// // toggle button section

// const toggleBtn = document.getElementById("menuToggle");
// const navLinks = document.getElementById("navLinks");

// // Toggle menu
// toggleBtn.addEventListener("click", () => {
//   navLinks.classList.toggle("show");
// });

// // Active link switch
// const links = document.querySelectorAll(".nav-links a");

// links.forEach((link) => {
//   link.addEventListener("click", () => {
//     links.forEach((l) => l.classList.remove("active"));
//     link.classList.add("active");

//     // Close menu on mobile after click
//     navLinks.classList.remove("show");
//   });
// });

// // our program
// // our program

// // document.querySelectorAll(".toggle-btn").forEach((btn) => {
// //   btn.addEventListener("click", () => {
// //     const content = btn.parentElement;
// //     const moreText = content.querySelector(".more-text");

// //     if (moreText.style.display === "block") {
// //       moreText.style.display = "none";
// //       btn.innerText = "Show More";
// //     } else {
// //       moreText.style.display = "block";
// //       btn.innerText = "Show Less";
// //     }
// //   });
// // });

// // donate button api call

// document.addEventListener("DOMContentLoaded", () => {
//   const donateBtn = document.getElementById("ngoDonateBtn");
//   const popup = document.getElementById("ngoDonatePopup");
//   const overlay = document.getElementById("ngoOverlay");
//   const closeBtn = document.getElementById("ngoCloseBtn");
//   const form = document.getElementById("ngoDonationForm");

//   // ===== OPEN POPUP =====
//   donateBtn.addEventListener("click", () => {
//     popup.style.display = "block";
//     overlay.style.display = "block";
//     document.body.style.overflow = "hidden";
//   });

//   // ===== CLOSE POPUP =====
//   function closePopup() {
//     popup.style.display = "none";
//     overlay.style.display = "none";
//     document.body.style.overflow = "auto";
//   }

//   closeBtn.addEventListener("click", closePopup);
//   overlay.addEventListener("click", closePopup);

//   // ===== FORM SUBMIT =====
//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const name = form
//       .querySelector('input[placeholder="Full Name*"]')
//       .value.trim();
//     const phone = form
//       .querySelector('input[placeholder="Phone Number*"]')
//       .value.trim();
//     const utr = form
//       .querySelector('input[placeholder="UTR / Transaction ID*"]')
//       .value.trim();
//     const pan = form.querySelector('input[placeholder="Pan"]').value.trim();
//     const message = form
//       .querySelector('textarea[placeholder="Type Your Message"]')
//       .value.trim();
//     const screenshot = form.querySelector(".ngo-file-input").files[0];

//     if (!name || !phone || !utr || !message || !screenshot) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     // Optional PAN format validation
//     if (pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(pan)) {
//       alert("Please enter a valid PAN number.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("phone", phone);
//     formData.append("utr", utr);
//     formData.append("pan", pan);
//     formData.append("message", message);
//     formData.append("screenshot", screenshot);

//     try {
//       const response = await fetch("https://app.usthifoundationindia.com/images", {
//         method: "GET",
//         body: formData,
//       });

//       if (response.ok) {
//         alert(
//           "Thank you! Your donation details have been submitted successfully."
//         );
//         form.reset();
//         closePopup();
//       } else {
//         alert("Submission failed. Please try again.");
//       }
//     } catch (error) {
//       alert("Server error. Please try again later.");
//     }
//   });
// });

// ✅ STEP 2: ADD THIS DUMMY DATA CODE (COPY FULL)
// ✅ STEP 2: ADD THIS DUMMY DATA CODE (COPY FULL)
// ✅ STEP 2: ADD THIS DUMMY DATA CODE (COPY FULL)
// document.addEventListener("DOMContentLoaded", () => {
//   const dummyPrograms = [
//     {
//       id: 1,
//       heading: "Usthi School – Puri   Asish behera",
//       description:
//         "This project supports children of fishing communities in Penthakata village, Odisha. The foundation provides education from kindergarten to class ten, ensuring safety, nutrition, and long-term development for underprivileged children."
//     },
//     {
//       id: 2,
//       heading: "Ananda Education Centre – Kolkata",
//       description:
//         "Ananda Education Centre provides quality education, midday meals, and emotional support to underprivileged children living on the outskirts of Kolkata, helping them complete their schooling with dignity."
//     },
//     {
//       id: 3,
//       heading: "Waste Management Program",
//       description:
//         "This initiative focuses on waste segregation, recycling awareness, and community cleanliness drives, empowering local communities to maintain a cleaner and healthier environment."
//     },
//        {
//       id: 4,
//       heading: "Biswajit das asisg – Puri   Asish behera",
//       description:
//         "This project supports children of fishing communities in Penthakata village, Odisha. The foundation provides education from kindergarten to class ten, ensuring safety, nutrition, and long-term development for underprivileged children."
//     },
//      {
//       id: 4,
//       heading: "Biswajit das asisg – Puri   Asish behera",
//       description:
//         "This project supports children of fishing communities in Penthakata village, Odisha. The foundation provides education from kindergarten to class ten, ensuring safety, nutrition, and long-term development for underprivileged children."
//     },

//   ];

//   const container = document.getElementById("programsContainer");

//   container.innerHTML = `<h1 class="section-title">Our Programs</h1>`;

//   dummyPrograms.forEach((program, index) => {
//     const card = document.createElement("div");

//     card.className = `program-card ${index % 2 !== 0 ? "reverse" : ""}`;

//     card.innerHTML = `
//       <img src="https://via.placeholder.com/450x300?text=Program+Image">
//       <div class="program-content">
//         <h2>${program.heading}</h2>

//         <p class="short-text">
//           ${program.description.substring(0, 120)}...
//         </p>

//         <p class="more-text">
//           ${program.description}
//         </p>

//         <button class="toggle-btn">Show More</button>
//       </div>
//     `;

//     container.appendChild(card);
//   });

//   document.querySelectorAll(".toggle-btn").forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const moreText = btn.previousElementSibling;

//       if (moreText.style.display === "block") {
//         moreText.style.display = "none";
//         btn.innerText = "Show More";
//       } else {
//         moreText.style.display = "block";
//         btn.innerText = "Show Less";
//       }
//     });
//   });
// });