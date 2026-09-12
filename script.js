// ========================================
// LOAD DATABASE
// ========================================

async function loadPortfolio() {
  try {
    const response = await fetch("database.json");

    if (!response.ok) {
      throw new Error("Could not load database.json");
    }

    const data = await response.json();

    renderPersonal(data.personal);
    renderSocials(data.socials);
    renderEducation(data.education);
    renderSkills(data.skills);
    renderInterests(data.interests);
    renderProjects(data.projects);
    renderExperience(data.experience);
    renderCertifications(data.certifications);
    renderAchievements(data.achievements);

  } catch (error) {
    console.error("Portfolio loading error:", error);
  }
}


// ========================================
// PERSONAL INFORMATION
// ========================================

function renderPersonal(personal) {

  document.title = `${personal.name} | Portfolio`;

  document.getElementById("navName").textContent = personal.name;

  document.getElementById("heroName").textContent = personal.name;

  document.getElementById("heroTitle").textContent = personal.title;

  document.getElementById("heroAbout").textContent = personal.about;

  document.getElementById("aboutText").textContent = personal.about;

  const profileImage = document.getElementById("profileImage");

  profileImage.src = personal.profileImage;
  profileImage.alt = `${personal.name} profile photo`;

  const emailLink = document.getElementById("emailLink");

  emailLink.textContent = personal.email;
  emailLink.href = `mailto:${personal.email}`;

  const phoneLink = document.getElementById("phoneLink");

  phoneLink.textContent = personal.phone;
  phoneLink.href = `tel:${personal.phone.replace(/\s/g, "")}`;

  document.getElementById("locationText").textContent =
    personal.location;

  document.getElementById("footerName").textContent =
    personal.name;

  document.getElementById("currentYear").textContent =
    new Date().getFullYear();
}


// ========================================
// SOCIAL LINKS
// ========================================

function renderSocials(socials) {

  const container = document.getElementById("socialLinks");

  container.innerHTML = "";

  Object.entries(socials).forEach(([platform, url]) => {

    if (!url || url === "#") return;

    const link = document.createElement("a");

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent =
      platform.charAt(0).toUpperCase() + platform.slice(1);

    container.appendChild(link);
  });
}


// ========================================
// EDUCATION
// ========================================

function renderEducation(education) {

  const container =
    document.getElementById("educationContainer");

  container.innerHTML = "";

  education.forEach(item => {

    const element = document.createElement("div");

    element.className = "timeline-item";

    element.innerHTML = `
      <h3>${item.degree}</h3>

      <div class="institution">
        ${item.institution}
      </div>

      <div class="duration">
        ${item.duration} · ${item.location}
      </div>

      <p>${item.description}</p>
    `;

    container.appendChild(element);
  });
}


// ========================================
// SKILLS
// ========================================

function renderSkills(skills) {

  renderSkillList(
    skills,
    document.getElementById("skillsContainer")
  );
}


function renderInterests(interests) {

  renderSkillList(
    interests,
    document.getElementById("interestsContainer")
  );
}


function renderSkillList(items, container) {

  container.innerHTML = "";

  items.forEach(item => {

    const skill = document.createElement("span");

    skill.className = "skill";
    skill.textContent = item;

    container.appendChild(skill);
  });
}


// ========================================
// PROJECTS
// ========================================

function renderProjects(projects) {

  const container =
    document.getElementById("projectsContainer");

  container.innerHTML = "";

  projects.forEach(project => {

    const card = document.createElement("article");

    card.className = "card";

    const tags = project.technologies
      .map(technology =>
        `<span class="tag">${technology}</span>`
      )
      .join("");

    card.innerHTML = `
      <h3>${project.title}</h3>

      <p>${project.description}</p>

      <div class="card-tags">
        ${tags}
      </div>

      ${
        project.link && project.link !== "#"
        ? `<a class="card-link"
             href="${project.link}"
             target="_blank"
             rel="noopener noreferrer">
             View Project →
           </a>`
        : ""
      }
    `;

    container.appendChild(card);
  });
}


// ========================================
// EXPERIENCE
// ========================================

function renderExperience(experience) {

  const container =
    document.getElementById("experienceContainer");

  container.innerHTML = "";

  experience.forEach(item => {

    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `
      <div class="card-meta">
        ${item.duration}
      </div>

      <h3>${item.position}</h3>

      <div class="card-meta">
        ${item.organization}
      </div>

      <p>${item.description}</p>
    `;

    container.appendChild(card);
  });
}


// ========================================
// CERTIFICATIONS
// ========================================

function renderCertifications(certifications) {

  const container =
    document.getElementById("certificationsContainer");

  container.innerHTML = "";

  certifications.forEach(item => {

    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `
      <div class="card-meta">
        ${item.year}
      </div>

      <h3>${item.name}</h3>

      <p>${item.issuer}</p>

      ${
        item.link && item.link !== "#"
        ? `<a class="card-link"
             href="${item.link}"
             target="_blank"
             rel="noopener noreferrer">
             View Certificate →
           </a>`
        : ""
      }
    `;

    container.appendChild(card);
  });
}


// ========================================
// ACHIEVEMENTS
// ========================================

function renderAchievements(achievements) {

  const container =
    document.getElementById("achievementsContainer");

  container.innerHTML = "";

  achievements.forEach(item => {

    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `
      <div class="card-meta">
        ${item.year}
      </div>

      <h3>${item.title}</h3>

      <p>${item.description}</p>
    `;

    container.appendChild(card);
  });
}


// ========================================
// MOBILE MENU
// ========================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});


// Close mobile menu after clicking a link

document.querySelectorAll("nav a").forEach(link => {

  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });

});


// ========================================
// START
// ========================================

loadPortfolio();
