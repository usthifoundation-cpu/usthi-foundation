const isAdminLoggedIn =
  sessionStorage.getItem("usthi_admin_logged_in") === "true" ||
  localStorage.getItem("usthi_admin_logged_in") === "true";

if (!isAdminLoggedIn) {
  window.location.href = "login.html";
}
document.getElementById("adminPanel").style.display = "flex";

let currentType = "";
let popupTimer;

const adminPanel = document.getElementById("adminPanel");
const popupMsg = document.getElementById("popupMsg");

function showPopup(message, type = "error") {
  popupMsg.innerHTML =
    message +
    ' <span onclick="closePopup()" style="cursor:pointer;font-weight:bold;margin-left:10px;">✖</span>';

  popupMsg.className = "popup-msg " + type;
  popupMsg.classList.add("show");

  clearTimeout(popupTimer);
  popupTimer = setTimeout(closePopup, 2000);
}

function closePopup() {
  popupMsg.classList.remove("show");
}

function logout() {
  sessionStorage.removeItem("usthi_admin_logged_in");
  localStorage.removeItem("usthi_admin_logged_in");
  window.location.href = "login.html";
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
}

function closeUpload() {
  document.getElementById("uploadPopup").style.display = "none";
}

function addItem() {
  if (currentType === "image" && imgCount) imgCount.innerText++;
  if (currentType === "video" && videoCount) videoCount.innerText++;
  if (currentType === "news" && newsCount) newsCount.innerText++;
  if (currentType === "event" && eventCount) eventCount.innerText++;
  closeUpload();
}

function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", function (e) {
  if (!e.target.closest(".profile")) {
    document.getElementById("dropdown").style.display = "none";
  }
});

function openSection(type) {
  document.getElementById("sectionPopup").style.display = "flex";
  document.getElementById("sectionTitle").innerText = "Manage " + type;
}

function closeSection() {
  document.getElementById("sectionPopup").style.display = "none";
}

// new js code
/* ================================
   LOGIN (DEMO) BUTTON VISIBILITY
================================ */

/* safely find login demo button */
function getLoginDemoBtn() {
  return document.querySelector('#loginForm button[onclick="openDemo()"]');
}

/* hide login demo button */
function hideLoginDemoBtn() {
  const btn = getLoginDemoBtn();
  if (btn) btn.style.display = "none";
}

/* show login demo button */
function showLoginDemoBtn() {
  const btn = getLoginDemoBtn();
  if (btn) btn.style.display = "block";
}

// new codw
let uploadType = "";

function openUpload(type) {
  uploadType = type;

  const fileInput = document.getElementById("uploadInput");
  const eventDesc = document.getElementById("eventDesc");

  // RESET
  fileInput.value = "";
  fileInput.multiple = false;
  fileInput.accept = "";
  eventDesc.style.display = "none";

  const eventTitle = document.getElementById("eventTitle");
  eventTitle.style.display = "none";
  eventTitle.value = "";

  // PHOTO → MULTIPLE IMAGES
  if (type === "Photo") {
    fileInput.accept = "image/*";
    // fileInput.multiple = true;
  }

  // VIDEO → SINGLE VIDEO
  if (type === "Video") {
    fileInput.accept = "video/*";
  }

  // NEWS → ONE IMAGE
  if (type === "News") {
    fileInput.accept = "image/*";
    fileInput.multiple = true;
    eventDesc.style.display = "block";
  }

  if (type === "Program") {
    fileInput.accept = "image/*";
    fileInput.multiple = true;
    eventDesc.style.display = "block";
    eventTitle.style.display = "block";
  }

  document.getElementById("uploadTitle").innerText = "Add " + type;
  document.getElementById("uploadPopup").style.display = "flex";
}

// ===== UPLOAD SUBMIT FUNCTION (ADD THIS AT BOTTOM) =====
async function submitUpload() {
  const file = document.getElementById("uploadInput");

  // 🔴 PHOTO UPLOAD
  if (uploadType === "Photo") {
    if (!file.files.length) {
      alert("Please select image");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < file.files.length; i++) {
      formData.append("file", file.files[i]);
    }

    const res = await fetch(window.getBackendUrl() + "/onlyImage/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Photo upload failed");
      return;
    }

    alert("Photo uploaded successfully");
    closeUpload();
    loadGalleryImages();
    return;
  }

  // 🔴 PROGRAM UPLOAD
  if (uploadType === "Program") {
    const fileInput = document.getElementById("uploadInput");
    const heading = document.getElementById("eventTitle").value.trim();
    const description = document.getElementById("eventDesc").value.trim();

    if (!heading || !description || !fileInput.files.length) {
      alert("Please fill all program fields");
      return;
    }

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("description", description);

    for (let i = 0; i < fileInput.files.length; i++) {
      formData.append("file", fileInput.files[i]);
    }

    const res = await fetch(window.getBackendUrl() + "/images", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Program upload failed");
      return;
    }

    alert("Program added successfully");
    closeUpload();
    loadEvents();
    return;
  }

  alert("Upload type not supported yet");
}



async function loadEvents() {
  const container = document.getElementById("galleryGrid");
  if (!container) return;

  container.innerHTML = "";

  const res = await fetch(window.getBackendUrl() + "/images");
  const events = await res.json();

  events.forEach((e) => {
    const card = document.createElement("div");
    card.className = "gallery-card";

    card.innerHTML = `
      <h3>${e.heading || "Program"}</h3>
      <p>${e.description || ""}</p>
      <div class="event-images">
        <img src="${window.getBackendUrl()}${e.image_url}" />
      </div>

      <button onclick="deleteEvent('${e.id}')">Delete</button>
    `;

    container.appendChild(card);
  });
}

async function deleteEvent(id) {
  if (!confirm("Delete this event?")) return;

  await fetch(`${window.getBackendUrl()}/images/${id}`, {
    method: "DELETE",
  });

  loadEvents();
}

//  CONTACT FORM JAVASCRIPT start here
/* =================================================================================================================================================================
  CONTACT FORM → ADMIN PANEL STORAGE
==================================================================================================================================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const inputs = contactForm.querySelectorAll("input, textarea");

    const contactData = {
      name: inputs[0].value.trim(),
      email: inputs[1].value.trim(),
      phone: inputs[2].value.trim(),
      subject: inputs[3].value.trim(),
      message: inputs[4].value.trim(),
    };
    await fetch(window.getBackendUrl() + "/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });

    alert("Message sent successfully");
    contactForm.reset();
  });
}

function openContactPage() {
  document.getElementById("contactAdmin").style.display = "block";
  loadContactMessages();
}

function closeContactPage() {
  document.getElementById("contactAdmin").style.display = "none";
}

async function loadContactMessages() {
  const grid = document.getElementById("contactGrid");
  grid.innerHTML = "";

  const res = await fetch(window.getBackendUrl() + "/contacts");
  const messages = await res.json();

  messages.forEach((msg) => {
    const card = document.createElement("div");
    card.className = "contact-card";
    card.onclick = () => openMessagePopup(msg);

    card.innerHTML = `
      <strong>${msg.name}</strong>
      ${msg.read ? "" : "<span class='new-badge'>NEW</span>"}<br>
      📧 ${msg.email}<br>
      📞 ${msg.phone}<br>
      📝 ${msg.subject}<br><br>
      ${msg.message}<br><br>
      <small>${msg.time}</small>

      <div class="card-actions">
        <button onclick="markAsRead('${msg.id}', event)">Mark Read</button>
       <button class="delete-btn" onclick="deleteMessage('${
         msg.id
       }', event, this)">Delete</button>

      </div>
    `;
    grid.appendChild(card);
  });
  updateStatsCounts();
  updateMessageCounter();
}
async function markAsRead(id, e) {
  e.stopPropagation();
  await fetch(`${window.getBackendUrl()}/contacts/${id}/read`, {
    method: "PUT",
  });
  loadContactMessages();
}

async function deleteMessage(id, e, btn) {
  e.stopPropagation();

  if (!confirm("Delete this message?")) return;

  try {
    const res = await fetch(`${window.getBackendUrl()}/contacts/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    // ✅ REMOVE CARD IMMEDIATELY (LIKE DONATION)
    const card = btn.closest(".contact-card");
    if (card) card.remove();

    updateMessageCounter();
    updateStatsCounts();
  } catch (err) {
    console.error(err);
    alert("Error deleting message");
  }
}

// async function deleteMessage(id, e) {
//   e.stopPropagation();
//   await fetch(`${window.getBackendUrl()}/contacts/${id}`, {
//     method: "DELETE",
//   });
//   loadContactMessages();
// }

async function updateMessageCounter() {
  try {
    const res = await fetch(window.getBackendUrl() + "/contacts/unread-count");
    if (!res.ok) return;
    const data = await res.json();

    const el = document.getElementById("msgCount");
    el.innerText = data.count;
    el.style.display = data.count > 0 ? "inline-block" : "none";
  } catch (err) {
    console.error("Error updating contact counter:", err);
  }
}
async function openMessagePopup(msg) {
  if (!msg.read) {
    await fetch(`${window.getBackendUrl()}/contacts/${msg.id}/read`, {
      method: "PUT",
    });
  }

  document.getElementById("popupDetails").innerHTML = `
    <h3>${msg.name}</h3>
    <p><b>Email:</b> ${msg.email}</p>
    <p><b>Phone:</b> ${msg.phone}</p>
    <p><b>Subject:</b> ${msg.subject}</p>
    <p><b>Message:</b><br>${msg.message}</p>
  `;

  document.getElementById("messagePopup").style.display = "flex";
  loadContactMessages();
}

function closeMessagePopup() {
  document.getElementById("messagePopup").style.display = "none";
}
// make clicking outside popup close
document.getElementById("messagePopup").addEventListener("click", function (e) {
  if (e.target === this) {
    closeMessagePopup();
  }
});

// DONATION JAVASCRIPT
/* =================================================================================================================================================================
   DONATION STORAGE & ADMIN PANEL
==================================================================================================================================================================== */

const API_BASE_URL = window.getBackendUrl();
// const DONATE_API = `${API_BASE_URL}/donate`;

// OPEN / CLOSE PAGE
function openDonationPage() {
  document.getElementById("donationAdmin").style.display = "block";
  loadDonations();
}

function closeDonationPage() {
  document.getElementById("donationAdmin").style.display = "none";
}

// load DONATION (FROM NGO PAYMENT PAGE)

async function loadDonations() {
  const grid = document.getElementById("donationGrid");
  if (!grid) return;

  grid.innerHTML =
    "<p style='text-align:center;color:#888'>Loading donations...</p>";

  // const res = await fetch(window.getBackendUrl() + "/api/donation");
  try {
    const res = await fetch(`${API_BASE_URL}/donate/`);

    if (!res.ok) {
      throw new Error("Donation API failed");
    }

    const donations = await res.json();

    grid.innerHTML = ""; // ✅ CLEAR OLD CARDS HERE

    // ✅ Show message if no donations
    if (donations.length === 0) {
      grid.innerHTML =
        "<p style='text-align:center;color:#888'>No donations yet</p>";
      updateDonationCounter(); // update counter to 0
      updateStatsCounts(); // update stats
      return;
    }

    // <button
    //   class="delete-btn"
    //   onclick="deleteDonation('${
    //       d.id
    //     }', event)"
    // >
    //   Delete
    // </button>;
    //  <img src="${d.image}">
    donations.forEach((d) => {
      const card = document.createElement("div");
      card.className = "donation-card";

      card.innerHTML = `
     <img src="${API_BASE_URL}${
        d.image_url
      }" style="width:100%;margin-top:10px;border-radius:8px">



      <strong>${d.name}</strong>
      ${d.read ? "" : "<span class='new-badge'>NEW</span>"}<br>
      📞 ${d.mobile}<br>
     
      💳 ${d.utr}<br>
     🪪 PAN: ${d.pan || "N/A"}<br>

      <small>${d.time}</small>

      <div class="card-actions">
        <button onclick="markDonationRead('${d.id}', event)">Read</button>
       <button class="delete-btn" onclick="deleteDonation('${
         d.id
       }', event)">Delete</button>

      </div>
      
    `;

      card.onclick = () => openDonationPopup(d);
      grid.appendChild(card);
    });

    updateStatsCounts();
    updateDonationCounter();
  } catch (err) {
    console.error("Error loading donations:", err);
    grid.innerHTML =
      "<p style='text-align:center;color:red'>Failed to load donations</p>";
  }
}

/* ============================
   MARK DONATION AS READ
============================ */
async function markDonationRead(id, e) {
  e.stopPropagation();
  try {
    const res = await fetch(`${API_BASE_URL}/donate/${id}/read`, {
      method: "PUT",
    });
    if (!res.ok) throw new Error("Mark read failed");
    loadDonations();
  } catch (err) {
    alert(err.message);
  }
}

/* ----------------------
   DELETE DONATION
------------------------ */
/* ----------------------
   DELETE DONATION
------------------------ */
async function deleteDonation(id, e, btn) {
  if (e) e.stopPropagation();

  if (!confirm("Are you sure you want to delete this donation?")) return;

  try {
    const res = await fetch(`${API_BASE_URL}/donate/delete/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Delete donation failed");
      return;
    }

    // Refresh from API so latest data shows immediately without manual page refresh
    await loadDonations();
  } catch (err) {
    console.error(err);
    alert("Error deleting donation");
  }
}

// async function deleteDonation(id, e) {
//   e.stopPropagation();

//   const res = await fetch(`${API_BASE_URL}/donate/${id}`, {
//     method: "DELETE",
//   });

//   if (!res.ok) throw new Error("Delete donation failed");

//   loadDonations();
// }

/* ----------------------
   UPDATE DONATION COUNTER
------------------------ */
async function updateDonationCounter() {
  // const res = await fetch(window.getBackendUrl() + "/api/donation/unread-count");
  try {
    // const res = await fetch(`${DONATE_API}/unread-count`);
    const res = await fetch(`${API_BASE_URL}/donate/unread-count`);

    if (!res.ok) throw new Error("Unread count failed");
    const data = await res.json();

    const el = document.getElementById("donationCount");
    if (el) {
      el.innerText = data.count;
      el.style.display = data.count > 0 ? "inline-block" : "none";
    }
  } catch (err) {
    console.error("Error updating donation counter:", err);
  }
}

/* ----------------------
   DONATION  API BASED POPUP
------------------------ */
async function openDonationPopup(d) {
  if (!d.read) {
    const res = await fetch(`${API_BASE_URL}/donate/delete/${d.id}/read`, {
      method: "PUT",
    });

    if (!res.ok) throw new Error("Popup read failed");
  }

  // <img src="${d.image}" style="width:100%;margin-top:10px;border-radius:8px">
  document.getElementById("donationPopupDetails").innerHTML = `
    <h3>${d.name}</h3>
    <p><b>Mobile:</b> ${d.mobile}</p>
  
    <p><b>UTR:</b> ${d.utr}</p>
<p><b>PAN:</b> ${d.pan || "N/A"}</p>

  <img src="${API_BASE_URL}${
    d.image_url
  }" style="width:100%;margin-top:10px;border-radius:8px">


   

  `;

  document.getElementById("donationPopup").style.display = "flex";
  // loadDonations();
}

function closeDonationPopup() {
  document.getElementById("donationPopup").style.display = "none";
}

/* =====================================
   STATS COUNT LOGIC (TOTAL CARDS)
===================================== */

async function updateStatsCounts() {
  try {
    // CONTACT COUNT
    // const contactRes = await fetch(window.getBackendUrl() + "/contacts");
    // const contactRes = await fetch(`${API_BASE_URL}/contacts`);
    const contactRes = await fetch(`${API_BASE_URL}/contacts`);

    const contacts = await contactRes.json();
    const contactEl = document.getElementById("contactCount");
    if (contactEl) contactEl.innerText = contacts.length;

    // DONATION COUNT
    // const donationRes = await fetch(window.getBackendUrl() + "/api/donation");
    const donationRes = await fetch(`${API_BASE_URL}/donate/`);
    const donations = await donationRes.json();

    const donationEl = document.getElementById("donationStatCount");
    if (donationEl) donationEl.innerText = donations.length;
  } catch (err) {
    console.error("Stats count error:", err);
  }
}

// image button api call system

async function loadGalleryImages() {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = "Loading...";

  const res = await fetch(window.getBackendUrl() + "/onlyImage");
  const images = await res.json();

  grid.innerHTML = "";

  images.forEach((img) => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    const imageSrc = img.image_url
      ? `${window.getBackendUrl()}${img.image_url}`
      : (img.url || "");

    card.innerHTML = `
      <img src="${imageSrc}">
      <button onclick="deleteImage('${img.id}', this)">Delete</button>
    `;

    grid.appendChild(card);
  });
}
async function deleteImage(id, btn) {
  if (!confirm("Delete this image?")) return;

  const res = await fetch(`${window.getBackendUrl()}/onlyImage/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    alert("Delete failed");
    return;
  }

  // ✅ remove instantly from UI
  btn.closest(".gallery-card").remove();
}
function openGallery() {
  document.getElementById("galleryAdmin").style.display = "block";
  loadGalleryImages(); // ✅ API CALLED HERE
}
function closeGallery() {
  document.getElementById("galleryAdmin").style.display = "none";
}

function showGallery() {
  document.getElementById("galleryAdmin").style.display = "block";
  loadEvents();
}

document.addEventListener("DOMContentLoaded", () => {
  updateMessageCounter();
  updateDonationCounter();
  updateStatsCounts();
  setInterval(() => {
    updateMessageCounter();
    updateDonationCounter();
  }, 10000);
});



