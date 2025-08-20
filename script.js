function showTab(tabId) {
  // Hide all tab contents by removing 'active' class
  var tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(function (content) {
    content.classList.remove('active');
  });

  // Deactivate all tab buttons
  var tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(function (btn) {
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

// 📱 Mobile navigation toggle
function toggleMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  const isActive = mobileNav.classList.toggle('active');
  document.body.classList.toggle('mobile-nav-open', isActive); // disable scroll when nav open
}

// ❄️ Animated Snowfall Effect
const snowflakes = [];
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let animationFrameId;

document.body.appendChild(canvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight; // cover viewport height
}

function createSnowflake() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1, // 1 to 3px
    speed: Math.random() * 1 + 0.5, // 0.5 to 1.5px/frame
    opacity: Math.random() * 0.5 + 0.5 // 0.5 to 1
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

    ctx.save(); // ✅ fix alpha bug
    ctx.globalAlpha = flake.opacity;
    ctx.fill();
    ctx.restore();

    // update position
    flake.y += flake.speed;
    if (flake.y > canvas.height) {
      flake.y = -flake.radius;
      flake.x = Math.random() * canvas.width;
    }
  });

  animationFrameId = requestAnimationFrame(drawSnowflakes);
}

// 🌫️ Scroll + Active Nav Handler (optimized)
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".frost-navbar .nav-links a");
const smoothAnchors = document.querySelectorAll('a[href^="#"]');
let ticking = false;

function handleScroll() {
  const scrollY = window.scrollY;

  // Blur background toggle
  document.body.classList.toggle("blurred", scrollY > 50);

  // Highlight active section
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
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Section enters
      entry.target.classList.add("in-view");
      entry.target.classList.remove("out-up", "out-down");
    } else {
      if (entry.boundingClientRect.top < 0) {
        // leaving upward
        entry.target.classList.add("out-up");
        entry.target.classList.remove("in-view");
      } else {
        // leaving downward
        entry.target.classList.add("out-down");
        entry.target.classList.remove("in-view");
      }
    }
  });
}, { threshold: 0.2 });



// apply to all sections
document.querySelectorAll("section").forEach(sec => {
  observer.observe(sec);
});


window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// 📏 Resize handler with debounce
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    resizeCanvas();
    initSnowflakes(100);
  }, 150);
});

// 🚀 DOM Ready
document.addEventListener('DOMContentLoaded', function () {
  showTab('bots'); // initial tab

  resizeCanvas();
  initSnowflakes(100);
  drawSnowflakes();

  smoothAnchors.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector(".frost-navbar").offsetHeight;

        // If it's a tab-content, trigger the tab first
        if (target.classList.contains("tab-content")) {
          showTab(target.id);

          // Use requestAnimationFrame twice → waits for layout update
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const elementPosition = target.getBoundingClientRect().top + window.scrollY;
              const offsetPosition = elementPosition - headerHeight;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              });
            });
          });
        } else {
          // Normal sections → scroll instantly
          const elementPosition = target.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });




  // Close mobile nav when link clicked
  // Close mobile nav + trigger tab if needed
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href').replace('#', '');
      const targetEl = document.getElementById(targetId);

      // If it's a tab-content section, show the default or requested tab
      if (targetEl && targetEl.classList.contains('tab-content')) {
        showTab(targetId);
      }

      // Close menu
      document.getElementById('mobileNav').classList.remove('active');
      document.body.classList.remove('mobile-nav-open');
    });
  });

});

// 🎥 Card Hover Video Preview
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
