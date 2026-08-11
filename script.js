// =========================================================
// BOXPVP - SCRIPT TRANG CHỦ
// =========================================================

// ===================== CẤU HÌNH =====================

const API_URL = "https://boxpvp-backend.vercel.app";
const SERVER_IP = "boxpvpkhanhmc.levyathan.ch";

// ===================== PHẦN TỬ =====================

const toast = document.getElementById("toast");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");


// =====================================================
// TOAST
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

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        if (nav) {
            nav.classList.remove("open");
        }

    });

});


// =====================================================
// TRẠNG THÁI SERVER
// =====================================================

async function loadServerStatus() {

    const serverIp = document.getElementById("serverIp");
    const onlineElement = document.querySelector(".online-text");
    const playerElement = document.getElementById("serverPlayers");
    const footerStatus = document.getElementById("footerServerStatus");

    // Luôn hiển thị IP server thật
    if (serverIp) {
        serverIp.textContent = SERVER_IP;
    }

    try {

        const response = await fetch(
            `${API_URL}/api/server`,
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error("API server lỗi");
        }

        const data = await response.json();

        // =============================================
        // ONLINE / OFFLINE
        // =============================================

        const isOnline = Boolean(data.online);

        if (onlineElement) {

            onlineElement.textContent = isOnline
                ? "🟢 TRỰC TUYẾN"
                : "🔴 NGOẠI TUYẾN";

        }

        // =============================================
        // NGƯỜI CHƠI
        // =============================================

        const players = Number(data.players ?? 0);
        const maxPlayers = Number(data.maxPlayers ?? 100);

        if (playerElement) {

            playerElement.innerHTML =
                `${players} <small>/ ${maxPlayers}</small>`;

        }

        // =============================================
        // FOOTER
        // =============================================

        if (footerStatus) {

            footerStatus.textContent = isOnline
                ? `🟢 Trực tuyến • ${players}/${maxPlayers}`
                : "🔴 Ngoại tuyến";

        }

    } catch (error) {

        console.error("BOXPVP API:", error);

        // =============================================
        // API KHÔNG KẾT NỐI ĐƯỢC
        // =============================================

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


// =====================================================
// COPY IP
// =====================================================

async function copyServerIP() {

    const ip = SERVER_IP;

    try {

        await navigator.clipboard.writeText(ip);

        showToast(
            `📋 Đã sao chép IP: ${ip}`
        );

    } catch {

        showToast(
            `🎮 IP server: ${ip}`
        );

    }

}

const copyIp = document.getElementById("copyIp");

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

            try {

                await navigator.clipboard.writeText(
                    SERVER_IP
                );

                showToast(
                    `🎮 Đã sao chép IP ${SERVER_IP}. Mở Minecraft để tham gia!`
                );

            } catch {

                showToast(
                    `🎮 IP server: ${SERVER_IP}`
                );

            }

        }
    );

}


// =====================================================
// USERNAME
// =====================================================

const saveUsername =
    document.getElementById("saveUsername");

if (saveUsername) {

    saveUsername.addEventListener(
        "click",
        () => {

            const input =
                document.getElementById("usernameInput");

            const username =
                input?.value.trim();

            if (!username) {

                showToast(
                    "⚠️ Hãy nhập tên Minecraft."
                );

                return;
            }

            const avatar =
                document.getElementById("profileAvatar");

            const profileUsername =
                document.getElementById("profileUsername");

            const skinUsername =
                document.getElementById("skinUsername");

            if (avatar) {
                avatar.textContent =
                    username.charAt(0).toUpperCase();
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
// LOAD USERNAME
// =====================================================

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
        profileUsername.textContent =
            username;
    }

    if (skinUsername) {
        skinUsername.textContent =
            username;
    }

}


// =====================================================
// RESET ACCOUNT
// =====================================================

const resetAccount =
    document.getElementById("resetAccount");

if (resetAccount) {

    resetAccount.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "boxpvp_username"
            );

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

            showToast(
                "🔄 Đã xóa tài khoản test."
            );

        }
    );

}


// =====================================================
// CODE HÔM NAY
// =====================================================

const claimCode =
    document.getElementById("claimCode");

if (claimCode) {

    claimCode.addEventListener(
        "click",
        () => {

            showToast(
                "🎁 Mã hôm nay: BXP-7K2M-91QX"
            );

        }
    );

}


// =====================================================
// SKIN
// =====================================================

const updateSkin =
    document.getElementById("updateSkin");

if (updateSkin) {

    updateSkin.addEventListener(
        "click",
        () => {

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
                        "⚠️ Vui lòng nhập tên Minecraft.";
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
// DEMO BUTTON
// =====================================================

document
    .querySelectorAll("[data-demo]")
    .forEach(button => {

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

const discordButton =
    document.getElementById("discordButton");

if (discordButton) {

    discordButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            showToast(
                "💬 Discord chưa được cấu hình."
            );

        }
    );

}


// =====================================================
// KHỞI ĐỘNG
// =====================================================

loadUsername();

loadServerStatus();


// =====================================================
// TỰ ĐỘNG CẬP NHẬT SERVER
// Mỗi 30 giây
// =====================================================

setInterval(
    loadServerStatus,
    30000
);
