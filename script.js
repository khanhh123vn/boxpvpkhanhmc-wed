// =====================================================
// CẤU HÌNH
// =====================================================

const API_URL = "https://boxpvp-backend.vercel.app";
const WEBSITE_URL = "https://khanhmc-wed.vercel.app";


// =====================================================
// ELEMENT
// =====================================================

const toast = document.getElementById("toast");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");


// =====================================================
// THÔNG BÁO
// =====================================================

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}


// =====================================================
// MENU MOBILE
// =====================================================

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


// =====================================================
// 6 Ô TÍNH NĂNG
// BẤM VÀO → CHUYỂN SANG TRANG KHÁC
// =====================================================

const featureRoutes = {
  "/boxpvp": `${WEBSITE_URL}/`,
  "/topup": `${WEBSITE_URL}/topup`,
  "/code": `${WEBSITE_URL}/code`,
  "/account": `${WEBSITE_URL}/account`,
  "/shop": `${WEBSITE_URL}/shop`,
  "/ranking": `${WEBSITE_URL}/ranking`
};


document.querySelectorAll(".feature-click").forEach((card) => {

  function openFeature() {

    const target = card.dataset.target;

    if (!target) {
      showToast("❌ Không tìm thấy liên kết.");
      return;
    }

    const url = featureRoutes[target];

    if (!url) {
      showToast("❌ Không tìm thấy trang.");
      return;
    }

    window.location.href = url;
  }


  card.addEventListener("click", openFeature);


  card.addEventListener("keydown", (event) => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      openFeature();
    }

  });

});


// =====================================================
// API SERVER
// =====================================================

async function loadServerStatus() {

  try {

    const response = await fetch(
      `${API_URL}/api/server`,
      {
        method: "GET",
        cache: "no-store"
      }
    );


    if (!response.ok) {
      throw new Error("API server lỗi");
    }


    const data = await response.json();


    // -----------------------------
    // IP SERVER
    // -----------------------------

    const serverIp =
      document.getElementById("serverIp");

    if (serverIp) {

      serverIp.textContent =
        data.ip || "boxpvpkhanhmc.levyathan.ch";

    }


    // -----------------------------
    // ONLINE / OFFLINE
    // -----------------------------

    const onlineElement =
      document.querySelector(".online-text");

    if (onlineElement) {

      onlineElement.textContent =
        data.online
          ? "🟢 ONLINE"
          : "🔴 OFFLINE";

    }


    // -----------------------------
    // PLAYER
    // -----------------------------

    const playerElement =
      document.getElementById("serverPlayers");

    if (playerElement) {

      playerElement.innerHTML =
        `${data.players ?? 0} <small>/ ${data.maxPlayers ?? 100}</small>`;

    }


    // -----------------------------
    // FOOTER
    // -----------------------------

    const footerStatus =
      document.getElementById(
        "footerServerStatus"
      );


    if (footerStatus) {

      footerStatus.textContent =
        data.online
          ? `🟢 Trực tuyến • ${data.players ?? 0}/${data.maxPlayers ?? 100}`
          : "🔴 Ngoại tuyến";

    }


  } catch (error) {

    console.error(
      "API BOXPVP:",
      error
    );


    // Nếu API lỗi vẫn hiện IP server thật

    const serverIp =
      document.getElementById("serverIp");

    if (serverIp) {

      serverIp.textContent =
        "boxpvpkhanhmc.levyathan.ch";

    }


    const onlineElement =
      document.querySelector(".online-text");

    if (onlineElement) {

      onlineElement.textContent =
        "🔴 Ngoại tuyến";

    }


    const footerStatus =
      document.getElementById(
        "footerServerStatus"
      );

    if (footerStatus) {

      footerStatus.textContent =
        "🔴 Ngoại tuyến";

    }

  }

}


// =====================================================
// SAO CHÉP IP SERVER
// =====================================================

async function copyServerIP() {

  const serverIpElement =
    document.getElementById("serverIp");


  const serverIp =
    serverIpElement?.textContent.trim();


  if (!serverIp) {

    showToast(
      "❌ Không tìm thấy IP server."
    );

    return;
  }


  try {

    await navigator.clipboard.writeText(
      serverIp
    );


    showToast(
      `📋 Đã sao chép IP: ${serverIp}`
    );


  } catch (error) {

    showToast(
      `🎮 IP server: ${serverIp}`
    );

  }

}


const copyIp =
  document.getElementById("copyIp");


if (copyIp) {

  copyIp.addEventListener(
    "click",
    copyServerIP
  );

}


// =====================================================
// NÚT CHƠI NGAY
// =====================================================

const playButton =
  document.getElementById("playButton");


if (playButton) {

  playButton.addEventListener(
    "click",
    async () => {

      const serverIpElement =
        document.getElementById("serverIp");


      const serverIp =
        serverIpElement?.textContent.trim()
        || "boxpvpkhanhmc.levyathan.ch";


      try {

        await navigator.clipboard.writeText(
          serverIp
        );


        showToast(
          `🎮 Đã sao chép IP ${serverIp}. Mở Minecraft để tham gia!`
        );


      } catch {

        showToast(
          `🎮 IP server: ${serverIp}`
        );

      }

    }
  );

}


// =====================================================
// TÊN NGƯỜI DÙNG
// =====================================================

const saveUsername =
  document.getElementById("saveUsername");


if (saveUsername) {

  saveUsername.addEventListener(
    "click",
    () => {

      const input =
        document.getElementById(
          "usernameInput"
        );


      const username =
        input?.value.trim();


      if (!username) {

        showToast(
          "⚠️ Hãy nhập tên người dùng Minecraft."
        );

        return;
      }


      const avatar =
        document.getElementById(
          "profileAvatar"
        );


      const profileUsername =
        document.getElementById(
          "profileUsername"
        );


      const skinUsername =
        document.getElementById(
          "skinUsername"
        );


      if (avatar) {

        avatar.textContent =
          username
            .charAt(0)
            .toUpperCase();

      }


      if (profileUsername) {

        profileUsername.textContent =
          username;

      }


      if (skinUsername) {

        skinUsername.textContent =
          username;

      }


      localStorage.setItem(
        "boxpvp_username",
        username
      );


      showToast(
        `✅ Đã lưu username: ${username}`
      );

    }
  );

}


// =====================================================
// TẢI TÊN NGƯỜI DÙNG
// =====================================================

function loadUsername() {

  const username =
    localStorage.getItem(
      "boxpvp_username"
    );


  if (!username) {
    return;
  }


  const input =
    document.getElementById(
      "usernameInput"
    );


  const avatar =
    document.getElementById(
      "profileAvatar"
    );


  const profileUsername =
    document.getElementById(
      "profileUsername"
    );


  const skinUsername =
    document.getElementById(
      "skinUsername"
    );


  if (input) {

    input.value =
      username;

  }


  if (avatar) {

    avatar.textContent =
      username
        .charAt(0)
        .toUpperCase();

  }


  if (profileUsername) {

    profileUsername.textContent =
      username;

  }


  if (skinUsername) {

    skinUsername.textContent =
      username;

  }

}


// =====================================================
// ĐẶT LẠI TÀI KHOẢN
// =====================================================

const resetAccount =
  document.getElementById(
    "resetAccount"
  );


if (resetAccount) {

  resetAccount.addEventListener(
    "click",
    () => {

      localStorage.removeItem(
        "boxpvp_username"
      );


      const input =
        document.getElementById(
          "usernameInput"
        );


      const avatar =
        document.getElementById(
          "profileAvatar"
        );


      const username =
        document.getElementById(
          "profileUsername"
        );


      const skinUsername =
        document.getElementById(
          "skinUsername"
        );


      if (input) {

        input.value = "";

      }


      if (avatar) {

        avatar.textContent = "?";

      }


      if (username) {

        username.textContent =
          "Username";

      }


      if (skinUsername) {

        skinUsername.textContent =
          "Username";

      }


      showToast(
        "🔄 Đã xóa tài khoản test."
      );

    }
  );

}


// =====================================================
// CODE HÀNG NGÀY
// =====================================================

const claimCode =
  document.getElementById(
    "claimCode"
  );


if (claimCode) {

  claimCode.addEventListener(
    "click",
    () => {

      showToast(
        "🎁 Mã Hàng Ngày: BXP-7K2M-91QX"
      );

    }
  );

}


// =====================================================
// SKIN
// =====================================================

const updateSkin =
  document.getElementById(
    "updateSkin"
  );


if (updateSkin) {

  updateSkin.addEventListener(
    "click",
    () => {

      const input =
        document.getElementById(
          "skinName"
        );


      const hint =
        document.getElementById(
          "skinHint"
        );


      const skinUsername =
        document.getElementById(
          "skinUsername"
        );


      const name =
        input?.value.trim();


      if (!name) {

        if (hint) {

          hint.textContent =
            "⚠️ Hãy nhập tên người dùng Minecraft.";

        }

        return;
      }


      if (skinUsername) {

        skinUsername.textContent =
          name;

      }


      if (hint) {

        hint.textContent =
          `✅ Đã cập nhật skin cho ${name}.`;

      }


      showToast(
        `👕 Đã cập nhật skin: ${name}`
      );

    }
  );

}


// =====================================================
// DEMO NẠP TIỀN
// =====================================================

document
  .querySelectorAll("[data-demo]")
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        showToast(
          button.dataset.demo
        );

      }
    );

  });


// =====================================================
// DISCORD
// =====================================================

// THAY LINK NÀY BẰNG LINK DISCORD THẬT CỦA SERVER

const DISCORD_URL =
  "https://discord.gg/";


const discordButton =
  document.getElementById(
    "discordButton"
  );


if (discordButton) {

  discordButton.addEventListener(
    "click",
    (event) => {

      event.preventDefault();


      if (
        DISCORD_URL ===
        "https://discord.gg/"
      ) {

        showToast(
          "💬 Discord chưa được cấu hình."
        );

        return;
      }


      window.location.href =
        DISCORD_URL;

    }
  );

}


// =====================================================
// LINK DISCORD TỰ ĐỘNG
// =====================================================

const discordLinks =
  document.querySelectorAll(
    'a[href="#discord"]'
  );


discordLinks.forEach((link) => {

  link.addEventListener(
    "click",
    (event) => {

      event.preventDefault();


      if (
        DISCORD_URL ===
        "https://discord.gg/"
      ) {

        const discordSection =
          document.getElementById(
            "discord"
          );


        if (discordSection) {

          discordSection.scrollIntoView({
            behavior: "smooth"
          });

        }


        showToast(
          "💬 Discord chưa được cấu hình."
        );

        return;
      }


      window.location.href =
        DISCORD_URL;

    }
  );

});


// =====================================================
// KHỞI ĐỘNG
// =====================================================

loadUsername();

loadServerStatus();


// Cập nhật trạng thái server mỗi 30 giây

setInterval(
  loadServerStatus,
  30000
);
