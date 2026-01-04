/* ================= FADE-IN ================= */
const sections = document.querySelectorAll("section, header");

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(20px)";
  section.style.transition = "all 0.6s ease";
  fadeObserver.observe(section);
});


/* ================= ACTIVE NAV ================= */
const navLinks = document.querySelectorAll(".nav-link");

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        if (!id) return;

        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    rootMargin: "-50% 0px -50% 0px"
  }
);

sections.forEach(section => {
  if (section.getAttribute("id")) {
    navObserver.observe(section);
  }
});
document.getElementById("copy-email").addEventListener("click", e => {
  e.preventDefault();
  navigator.clipboard.writeText("sharathnpayyadi@gmail.com");
  alert("Email copied to clipboard");
});