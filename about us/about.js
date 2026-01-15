// donate button popup


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


// toggle menu section

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








// who we are
// Scroll animation (modern & simple)
const animatedItems = document.querySelectorAll(".animate");

const showOnScroll = () => {
  animatedItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (itemTop < windowHeight - 100) {
      item.classList.add("show");
    }
  });
};

window.addEventListener("scroll", showOnScroll);
window.addEventListener("load", showOnScroll);


// below about section
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".focus-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach(card => observer.observe(card));
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
      const response = await fetch("https://your-api-url.com/donation", {
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

