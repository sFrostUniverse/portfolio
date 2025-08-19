function showTab(tabId) {
  // Hide all tab contents by removing 'active' class
  var tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(function(content) {
    content.classList.remove('active');
  });

  // Deactivate all tab buttons
  var tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(function(btn) {
    btn.classList.remove('active');
  });

  // Show the selected tab content by adding 'active' class
  var selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  // Activate the clicked button
  var button = document.querySelector(`.tab-btn[onclick="showTab('${tabId}')"]`);
  if (button) {
    button.classList.add('active');
  }
}




// Mobile navigation toggle
function toggleMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  const isActive = mobileNav.classList.toggle('active');

  // Optional: disable scroll when nav is open
  document.body.classList.toggle('mobile-nav-open', isActive);
}



// ❄️ Animated Snowfall Effect
const snowflakes = [];
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let animationFrameId;

document.body.appendChild(canvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  // FIX: Change canvas height to window.innerHeight (viewport height)
  canvas.height = window.innerHeight; // Use window.innerHeight to cover only the visible screen
}

function createSnowflake() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1, // 1 to 3 pixels
    speed: Math.random() * 1 + 0.5, // 0.5 to 1.5 pixels per frame
    opacity: Math.random() * 0.5 + 0.5 // 0.5 to 1.0
  };
}

function initSnowflakes(count) {
  snowflakes.length = 0; // Clear existing snowflakes
  for (let i = 0; i < count; i++) {
    snowflakes.push(createSnowflake());
  }
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // White snowflakes

  snowflakes.forEach(flake => {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.globalAlpha = flake.opacity;
    ctx.fill();

    // Update snowflake position
    flake.y += flake.speed;
    if (flake.y > canvas.height) {
      // Reset snowflake to top if it goes off-screen
      flake.y = -flake.radius;
      flake.x = Math.random() * canvas.width;
    }
  });

  animationFrameId = requestAnimationFrame(drawSnowflakes);
}

// Initialize and start snowfall
// ❄️ Snowfall resize handler (keep this!)
window.addEventListener('resize', () => {
  resizeCanvas();
  initSnowflakes(100); // Re-initialize snowflakes on resize
});

// 🌫️ Scroll handler (new one!)
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Blur background after some scroll
  if (scrollY > 50) {
    document.body.classList.add("blurred");
  } else {
    document.body.classList.remove("blurred");
  }

  // Highlight active section in navbar
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".frost-navbar .nav-links a");

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) {
      navLinks.forEach(link => link.classList.remove("active"));
      const activeLink = document.querySelector(
        `.frost-navbar .nav-links a[href="#${section.id}"]`
      );
      if (activeLink) activeLink.classList.add("active");
    }
  });
});


document.addEventListener('DOMContentLoaded', function () {
  // Set initial active tab
  showTab('bots');

  // Initialize snow animation
  resizeCanvas();
  initSnowflakes(100);
  drawSnowflakes();
  
  const smoothAnchors = document.querySelectorAll('a[href^="#"]');
  smoothAnchors.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();

        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Close mobile nav when a link is clicked
  const navLinks = document.querySelectorAll('.mobile-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobileNav').classList.remove('active');
      document.body.classList.remove('mobile-nav-open');
    });
  });
});


document.querySelectorAll(".card").forEach(card => {
  const video = card.querySelector(".preview-video");
  if (video) {
    card.addEventListener("mouseenter", () => {
      video.play();
    });
    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0; // Rewind to start
    });
  }
});


