function showTab(tabId) {
  // Hide all tab contents
  var tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(function(content) {
    content.classList.remove('active');
  });

  // Deactivate all tab buttons
  var tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(function(btn) {
    btn.classList.remove('active');
  });

  // Show the selected tab content
  document.getElementById(tabId).classList.add('active');

  // Activate the clicked button
  // Find the button that corresponds to the tabId and add 'active' class
  document.querySelector(`.tab-btn[onclick="showTab('${tabId}')"]`).classList.add('active');
}

// Set initial active tab on page load
document.addEventListener('DOMContentLoaded', function() {
  showTab('bots'); // 'bots' is the ID of your first tab
});


function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    // Calculate the offset considering the fixed navbar height
    const navbarHeight = document.querySelector('.frost-navbar').offsetHeight;
    const offsetPosition = element.offsetTop - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}

// Mobile navigation toggle
function toggleMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.toggle('active');
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
window.addEventListener('resize', () => {
  resizeCanvas();
  initSnowflakes(100); // Re-initialize snowflakes on resize
});

document.addEventListener('DOMContentLoaded', () => {
  resizeCanvas();
  initSnowflakes(100); // Start with 100 snowflakes
  drawSnowflakes(); // Start the animation
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