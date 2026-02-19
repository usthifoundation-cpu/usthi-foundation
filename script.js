 
//  donate button section
 
 // end

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

// our testimonial page
const testimonials = [
    {
        image: "image/testimonial boy img.jpeg",
        text: "Your NGO has changed lives and brought hope to many families.",
        name: "Samuel Schick"
    },
    {
        image: "image/testi monial girl img.jpeg",
        text: "Amazing work for education and children welfare.",
        name: "Anita Roy"
    },
    {
        image: "image/testimonial boy img.jpeg",
        text: "I am proud to support this organization.",
        name: "Rahul Das"
    },
    {
        image: "image/testi monial girl img.jpeg",
        text: "Your efforts truly make a difference in society.",
        name: "Pooja Mishra"
    },
    {
        image: "image/testimonial boy img.jpeg",
        text: "Transparent, honest and impactful NGO.",
        name: "Amit Kumar"
    },
    {
        image: "image/testi monial girl img.jpeg",
        text: "Thank you for helping needy communities.",
        name: "Sneha Patel"
    }
];

let currentIndex = 0;

const img = document.getElementById("userImage");
const text = document.getElementById("testimonialText");
const name = document.getElementById("testimonialName");
const dotsContainer = document.getElementById("dots");

function loadTestimonial(index) {
    img.src = testimonials[index].image;
    text.innerText = `"${testimonials[index].text}"`;
    name.innerText = testimonials[index].name;

    document.querySelectorAll(".dot").forEach(dot => dot.classList.remove("active"));
    dotsContainer.children[index].classList.add("active");
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    loadTestimonial(currentIndex);
}

function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    loadTestimonial(currentIndex);
}

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.onclick = () => {
        currentIndex = index;
        loadTestimonial(index);
    };
    dotsContainer.appendChild(dot);
});

// Initial load
loadTestimonial(currentIndex);




// get in touch api
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-content form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = form.querySelector('input[placeholder="Full Name"]').value.trim();
    const email = form.querySelector('input[placeholder="Email Address"]').value.trim();
    const mobile = form.querySelector('input[placeholder="Mobile no"]').value.trim();
    const message = form.querySelector('textarea[placeholder="Your Message"]').value.trim();

    if (!fullName || !email || !mobile || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const data = {
      fullName,
      email,
      mobile,
      message,
    };

    try {
      const response = await fetch(window.getBackendUrl() + "/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Thank you! Your message has been sent.");
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Server error. Please try later.");
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
      const response = await fetch(window.getBackendUrl() + "/donation", {
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


