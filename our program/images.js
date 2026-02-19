// ================================
// PROGRAM SECTION API INTEGRATION   <img src="${API_BASE_URL}/${program.id}" alt="${program.heading}">
// ================================

const API_BASE_URL = `${window.getBackendUrl()}/images`;

document.addEventListener("DOMContentLoaded", () => {
  loadPrograms();
});

async function loadPrograms() {
  try {
    const response = await fetch(API_BASE_URL);
    const programs = await response.json();

    const container = document.getElementById("programsContainer");
    // container.innerHTML = `<h1 class="section-title">Our Programs</h1>`;

    programs.forEach((program, index) => {
      const card = document.createElement("div");

      // Alternate left-right layout
      card.className = `program-card ${index % 2 !== 0 ? "reverse" : ""}`;

      card.innerHTML = `
       <img src="${program.imagePath}" alt="${program.heading}">

        <div class="program-content">
          <h2>${program.heading}</h2>

          <p class="short-text">
            ${program.description.substring(0, 160)}...
          </p>

          <p class="more-text">
            ${program.description}
          </p>

          <button class="toggle-btn">Show More</button>
        </div>
      `;

      // container.appendChild(card);
      container.prepend(card);
      //     const firstCard = container.querySelector(".program-card");

      //   if (firstCard) {
      //     container.insertBefore(card, firstCard); // insert new card at top of existing cards
      //   } else {
      //     container.appendChild(card); // if no card exists, append
      //   }
    });

    enableToggleButtons();
  } catch (error) {
    console.error("❌ Failed to load programs:", error);
  }
}

// ================================
// SHOW MORE / SHOW LESS
// ================================
function enableToggleButtons() {
  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // const moreText = btn.previousElementSibling;
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
}

