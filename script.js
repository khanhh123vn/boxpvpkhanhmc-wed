const toast = document.getElementById("toast");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.getElementById("copyIp").addEventListener("click", async () => {
  const ip = document.getElementById("serverIp").textContent.trim();

  try {
    await navigator.clipboard.writeText(ip);
    showToast(`📋 Đã sao chép IP: ${ip}`);
  } catch {
    showToast(`IP server: ${ip}`);
  }
});

document.getElementById("playButton").addEventListener("click", async () => {
  const ip = document.getElementById("serverIp").textContent.trim();

  try {
    await navigator.clipboard.writeText(ip);
    showToast(`🎮 Đã sao chép IP ${ip}. Mở Minecraft để tham gia!`);
  } catch {
    showToast(`🎮 IP server: ${ip}`);
  }
});

document.getElementById("claimCode").addEventListener("click", () => {
  showToast("🎁 Bản demo: hệ thống nhận code sẽ được nối backend ở bước tiếp theo.");
});

document.getElementById("updateSkin").addEventListener("click", () => {
  const name = document.getElementById("skinName").value.trim();
  const hint = document.getElementById("skinHint");

  if (!name) {
    hint.textContent = "⚠️ Hãy nhập tên Minecraft trước.";
    return;
  }

  hint.textContent = `👕 Đã chọn skin của ${name}. API Minecraft sẽ được kết nối ở bước backend.`;
  showToast(`👕 Đã chọn skin: ${name}`);
});

document.querySelectorAll("[data-demo]").forEach(button => {
  button.addEventListener("click", () => showToast(button.dataset.demo));
});

document.getElementById("discordButton").addEventListener("click", event => {
  event.preventDefault();
  showToast("💬 Thay link Discord thật vào file index.html sau.");
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(entries => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${visible.target.id}`
    );
  });
}, {
  rootMargin: "-25% 0px -60% 0px",
  threshold: [0.01, 0.1, 0.25]
});

sections.forEach(section => observer.observe(section));
