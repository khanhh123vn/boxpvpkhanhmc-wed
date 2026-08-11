// =========================================================
// BOXPVP - SCRIPT TRANG CHỦ
// =========================================================

// ===================== API =====================

const API_URL = "https://boxpvp-backend.vercel.app";
const SERVER_IP = "boxpvpkhanhmc.levyathan.ch";

// ===================== ELEMENTS =====================

const toast = document.getElementById("toast");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");

// ===================== TOAST =====================

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// ===================== MENU =====================

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (nav) {
      nav.classList.remove("open");
    }
  });
});

// ===================== SERVER STATUS =====================

async function loadServerStatus() {

  const serverIp = document.getElementById("serverIp");
  const onlineElement = document.querySelector(".online-text");
  const playerElement = document.getElementById("serverPlayers");
  const footerStatus = document.getElementById("footerServerStatus");

  // LUÔN HIỂN THỊ IP NÀY
  if (serverIp) {
    serverIp.textContent = SERVER_IP;
  }

  try {

    const response = await fetch(`${API_URL}/api/server`);

    if (!response.ok) {
      throw new Error("API server lỗi");
    }

    const data = await response.json();

    // ONLINE / OFFLINE
    if (onlineElement) {
      onlineElement.textContent = data.online
        ? "🟢 ONLINE"
        : "🔴 OFFLINE";
    }

    // NGƯỜI CHƠI
    if (playerElement) {
      playerElement.innerHTML =
        `${data.players ?? 0} <small>/ ${data.maxPlayers ?? 100}</small>`;
    }

    // FOOTER
    if (footerStatus) {
      footerStatus.textContent = data.online
        ? `🟢 Trực tuyến • ${data.players ?? 0}/${data.maxPlayers ?? 100}`
        : "🔴 Ngoại tuyến";
    }

  } catch (error) {

    console.error("API BOXPVP:", error);

    if (onlineElement) {
      onlineElement.textContent = "🔴 NGOẠI TUYẾN";
    }

    if (playerElement) {
      playerElement.innerHTML = "0 <small>/ 100</small>";
    }

    if (footerStatus) {
      footerStatus.textContent = "🔴 Ngoại tuyến";
    }
  }
}

// ===================== COPY IP =====================

async function copyServerIP() {

  const ip = SERVER_IP;

  try {

    await navigator.clipboard.writeText(ip);

    showToast(`📋 Đã sao chép IP: ${ip}`);

  } catch {

    showToast(`🎮 IP server: ${ip}`);
  }
}

const copyIp = document.getElementById("copyIp");

if (copyIp) {
  copyIp.addEventListener("click", copyServerIP);
}

// ===================== PLAY BUTTON =====================

const playButton = document.getElementById("playButton");

if (playButton) {

  playButton.addEventListener("click", async () => {

    const ip = SERVER_IP;

    try {

      await navigator.clipboard.writeText(ip);

      showToast(
        `🎮 Đã sao chép IP ${ip}. Mở Minecraft để tham gia!`
      );

    } catch {

      showToast(`🎮 IP server: ${ip}`);
    }

  });
}

// ===================== USERNAME =====================

const saveUsername = document.getElementById("saveUsername");

if (saveUsername) {

  saveUsername.addEventListener("click", () => {

    const input = document.getElementById("usernameInput");
    const username = input?.value.trim();

    if (!username) {

      showToast("⚠️ Hãy nhập tên người dùng Minecraft.");
      return;
    }

    const avatar = document.getElementById("profileAvatar");
    const profileUsername =
      document.getElementById("profileUsername");
    const skinUsername =
      document.getElementById("skinUsername");

    if (avatar) {
      avatar.textContent =
        username.charAt(0).toUpperCase();
    }

    if (profileUsername) {
      profileUsername.textContent = username;
    }

    if (skinUsername) {
      skinUsername.textContent = username;
    }

    localStorage.setItem(
      "boxpvp_username",
      username
    );

    showToast(`✅ Đã lưu username: ${username}`);
  });
}

// ===================== LOAD USERNAME =====================

function loadUsername() {

  const username =
    localStorage.getItem("boxpvp_username");

  if (!username) return;

  const input =
    document.getElementById("usernameInput");

  const avatar =
    document.getElementById("profileAvatar");

  const profileUsername =
    document.getElementById("profileUsername");

  const skinUsername =
    document.getElementById("skinUsername");

  if (input) {
    input.value = username;
  }

  if (avatar) {
    avatar.textContent =
      username.charAt(0).toUpperCase();
  }

  if (profileUsername) {
    profileUsername.textContent = username;
  }

  if (skinUsername) {
    skinUsername.textContent = username;
  }
}

// ===================== RESET ACCOUNT =====================

const resetAccount =
  document.getElementById("resetAccount");

if (resetAccount) {

  resetAccount.addEventListener("click", () => {

    localStorage.removeItem("boxpvp_username");

    const input =
      document.getElementById("usernameInput");

    const avatar =
      document.getElementById("profileAvatar");

    const username =
      document.getElementById("profileUsername");

    const skinUsername =
      document.getElementById("skinUsername");

    if (input) {
      input.value = "";
    }

    if (avatar) {
      avatar.textContent = "?";
    }

    if (username) {
      username.textContent = "Username";
    }

    if (skinUsername) {
      skinUsername.textContent = "Username";
    }

    showToast("🔄 Đã xóa tài khoản test.");
  });
}

// ===================== DAILY CODE =====================

const claimCode =
  document.getElementById("claimCode");

if (claimCode) {

  claimCode.addEventListener("click", () => {

    showToast(
      "🎁 Mã hôm nay: BXP-7K2M-91QX"
    );

  });
}

// ===================== SKIN =====================

const updateSkin =
  document.getElementById("updateSkin");

if (updateSkin) {

  updateSkin.addEventListener("click", () => {

    const input =
      document.getElementById("skinName");

    const hint =
      document.getElementById("skinHint");

    const skinUsername =
      document.getElementById("skinUsername");

    const name =
      input?.value.trim();

    if (!name) {

      if (hint) {
        hint.textContent =
          "⚠️ Vui lòng nhập tên người dùng Minecraft.";
      }

      return;
    }

    if (skinUsername) {
      skinUsername.textContent = name;
    }

    if (hint) {
      hint.textContent =
        `✅ Đã cập nhật skin cho ${name}.`;
    }

    showToast(
      `👕 Đã cập nhật skin: ${name}`
    );
  });
}

// ===================== DEMO BUTTONS =====================

document
  .querySelectorAll("[data-demo]")
  .forEach((button) => {

    button.addEventListener("click", () => {

      showToast(
        button.dataset.demo
      );

    });

  });

// ===================== DISCORD =====================

const discordButton =
  document.getElementById("discordButton");

if (discordButton) {

  discordButton.addEventListener("click", (event) => {

    event.preventDefault();

    showToast(
      "💬 Discord chưa được cấu hình."
    );

  });
}

// ===================== START =====================

loadUsername();
loadServerStatus();

// ===================== AUTO UPDATE =====================

setInterval(
  loadServerStatus,
  30000
);
