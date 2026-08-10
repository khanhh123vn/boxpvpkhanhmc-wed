const API_URL = "https://boxpvp-backend.vercel.app";

const toast = document.getElementById("toast");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");

function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        nav?.classList.remove("open");
    });
});

/* SERVER API */

async function loadServerStatus() {
    try {
        const response = await fetch(`${API_URL}/api/server`);

        if (!response.ok) {
            throw new Error("API error");
        }

        const data = await response.json();

        const serverIp = document.getElementById("serverIp");

        if (serverIp) {
            serverIp.textContent = data.ip;
        }

        const onlineElement =
            document.querySelector(".online-text");

        if (onlineElement) {
            onlineElement.textContent =
                data.online ? "🟢 ONLINE" : "🔴 OFFLINE";
        }

        const playerElement =
            document.querySelector(".server-stat strong");

        if (playerElement) {
            playerElement.innerHTML =
                `${data.players} <small>/ ${data.maxPlayers}</small>`;
        }

    } catch (error) {
        console.error("BOXPVP API:", error);

        const onlineElement =
            document.querySelector(".online-text");

        if (onlineElement) {
            onlineElement.textContent = "🔴 OFFLINE";
        }
    }
}

/* COPY IP */

async function copyServerIP() {
    const serverIp =
        document.getElementById("serverIp")?.textContent.trim();

    if (!serverIp) {
        showToast("❌ Không tìm thấy IP server.");
        return;
    }

    try {
        await navigator.clipboard.writeText(serverIp);
        showToast(`📋 Đã sao chép IP: ${serverIp}`);
    } catch {
        showToast(`🎮 IP server: ${serverIp}`);
    }
}

document.getElementById("copyIp")?.addEventListener(
    "click",
    copyServerIP
);

document.getElementById("playButton")?.addEventListener(
    "click",
    async () => {
        const serverIp =
            document.getElementById("serverIp")?.textContent.trim();

        if (!serverIp) return;

        try {
            await navigator.clipboard.writeText(serverIp);

            showToast(
                `🎮 Đã sao chép IP ${serverIp}. Mở Minecraft để tham gia!`
            );

        } catch {
            showToast(`🎮 IP server: ${serverIp}`);
        }
    }
);

/* DAILY CODE */

document.getElementById("claimCode")?.addEventListener(
    "click",
    () => {
        showToast(
            "🎁 Daily Code sẽ được kết nối database ở bước tiếp theo."
        );
    }
);

/* SKIN */

document.getElementById("updateSkin")?.addEventListener(
    "click",
    () => {
        const input =
            document.getElementById("skinName");

        const hint =
            document.getElementById("skinHint");

        const name =
            input?.value.trim();

        if (!name) {
            if (hint) {
                hint.textContent =
                    "⚠️ Hãy nhập tên
