function showTab(tabId) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => content.classList.remove('active'));

  // Deactivate all tab buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));

  // Activate selected tab content
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  // Activate the clicked button
  const button = document.querySelector(`.tab-btn[onclick="showTab('${tabId}')"]`);
  if (button) {
    button.classList.add('active');
  }
}

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    const navbarHeight = document.querySelector('.frost-navbar').offsetHeight;
    const offsetPosition = element.offsetTop - navbarHeight;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}

function toggleMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  const isActive = mobileNav.classList.toggle('active');
  document.body.classList.toggle('mobile-nav-open', isActive);
}

// ❄️ Snowfall Effect
const snowflakes = [];
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let animationFrameId;

document.body.appendChild(canvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createSnowflake() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    speed: Math.random() * 1 + 0.5,
    opacity: Math.random() * 0.5 + 0.5
  };
}

function initSnowflakes(count) {
  snowflakes.length = 0;
  for (let i = 0; i < count; i++) {
    snowflakes.push(createSnowflake());
  }
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

  snowflakes.forEach(flake => {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.globalAlpha = flake.opacity;
    ctx.fill();

    flake.y += flake.speed;
    if (flake.y > canvas.height) {
      flake.y = -flake.radius;
      flake.x = Math.random() * canvas.width;
    }
  });

  animationFrameId = requestAnimationFrame(drawSnowflakes);
}

// ✅ All-in-One DOM Ready Block
document.addEventListener("DOMContentLoaded", () => {
  // Set correct tab based on URL hash
  const hash = window.location.hash;
  const sectionId = hash ? hash.substring(1) : null;
  const validTabs = ['bots', 'edits', 'films'];

  if (validTabs.includes(sectionId)) {
    showTab(sectionId);
  } else {
    showTab('bots');
  }

  if (sectionId) {
    setTimeout(() => scrollToSection(sectionId), 100);
  }

  // Init snow
  resizeCanvas();
  initSnowflakes(100);
  drawSnowflakes();

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobileNav').classList.remove('active');
      document.body.classList.remove('mobile-nav-open');
    });
  });

  // Video hover previews
  document.querySelectorAll(".card").forEach(card => {
    const video = card.querySelector(".preview-video");
    if (video) {
      card.addEventListener("mouseenter", () => video.play());
      card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });
});

// Recalculate snowflakes on window resize
window.addEventListener('resize', () => {
  resizeCanvas();
  initSnowflakes(100);
});
