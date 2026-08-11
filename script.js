const API_URL = "https://boxpvp-backend.vercel.app";

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
// MENU
// =====================================================

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}

document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        nav?.classList.remove("open");
    });
});

// =====================================================
// CHUYỂN ĐẾN KHU VỰC
// =====================================================

function goToSection(target) {
    if (!target) {
        showToast("❌ Không tìm thấy liên kết.");
        return;
    }

    const section = document.querySelector(target);

    if (!section) {
        showToast("❌ Không tìm thấy khu vực.");
        return;
    }

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    history.replaceState(null, "", target);
}

// =====================================================
// 6 Ô TÍNH NĂNG
// =====================================================

document.querySelectorAll(".feature-click").forEach((card) => {

    card.addEventListener("click", () => {
        goToSection(card.dataset.target);
    });

    card.addEventListener("keydown", (event) => {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();

            goToSection(card.dataset.target);
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
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error("Lỗi API");
        }

        const data = await response.json();

        // IP

        const serverIp =
            document.getElementById("serverIp");

        if (serverIp && data.ip) {
            serverIp.textContent = data.ip;
        }

        // ONLINE

        const onlineElement =
            document.querySelector(".online-text");

        if (onlineElement) {

            onlineElement.textContent =
                data.online
                    ? "🟢 ONLINE"
                    : "🔴 OFFLINE";
        }

        // PLAYER

        const players =
            Number(data.players) || 0;

        const maxPlayers =
            Number(data.maxPlayers) || 100;

        const playerElement =
            document.getElementById("serverPlayers");

        if (playerElement) {

            playerElement.innerHTML =
                `${players} <small>/ ${maxPlayers}</small>`;
        }

        // FOOTER

        const footerStatus =
            document.getElementById(
                "footerServerStatus"
            );

        if (footerStatus) {

            footerStatus.textContent =
                data.online
                    ? `🟢 Online • ${players}/${maxPlayers}`
                    : "🔴 Offline";
        }

    } catch (error) {

        console.error(
            "BOXPVP API:",
            error
        );

        const onlineElement =
            document.querySelector(
                ".online-text"
            );

        if (onlineElement) {
            onlineElement.textContent =
                "🔴 OFFLINE";
        }
    }
}

// =====================================================
// COPY IP
// =====================================================

async function copyServerIP() {

    const serverIp =
        document
            .getElementById("serverIp")
            ?.textContent
            .trim();

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

    } catch {

        showToast(
            `🎮 IP server: ${serverIp}`
        );
    }
}

document
    .getElementById("copyIp")
    ?.addEventListener(
        "click",
        copyServerIP
    );

// =====================================================
// CHƠI NGAY
// =====================================================

document
    .getElementById("playButton")
    ?.addEventListener(
        "click",
        copyServerIP
    );

// =====================================================
// USERNAME
// =====================================================

function setUsername(username) {

    const cleanName =
        String(username || "").trim();

    if (!cleanName) return;

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
        input.value = cleanName;
    }

    if (avatar) {

        avatar.textContent =
            cleanName
                .charAt(0)
                .toUpperCase();
    }

    if (profileUsername) {

        profileUsername.textContent =
            cleanName;
    }

    if (skinUsername) {

        skinUsername.textContent =
            cleanName;
    }
}

// =====================================================
// LƯU USERNAME
// =====================================================

const saveUsername =
    document.getElementById(
        "saveUsername"
    );

if (saveUsername) {

    saveUsername.addEventListener(
        "click",
        () => {

            const username =
                document
                    .getElementById(
                        "usernameInput"
                    )
                    ?.value
                    .trim();

            if (!username) {

                showToast(
                    "⚠️ Hãy nhập username Minecraft."
                );

                return;
            }

            if (
                !/^[A-Za-z0-9_]{1,16}$/.test(
                    username
                )
            ) {

                showToast(
                    "⚠️ Username chỉ được gồm chữ, số và _ (tối đa 16 ký tự)."
                );

                return;
            }

            setUsername(username);

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
// TẢI USERNAME
// =====================================================

function loadUsername() {

    const username =
        localStorage.getItem(
            "boxpvp_username"
        );

    if (username) {
        setUsername(username);
    }
}

// =====================================================
// XÓA TÀI KHOẢN TEST
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

            const profileUsername =
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

            if (profileUsername) {
                profileUsername.textContent =
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
// DAILY CODE
// =====================================================

const claimCode =
    document.getElementById(
        "claimCode"
    );

if (claimCode) {

    claimCode.addEventListener(
        "click",
        async () => {

            const code =
                "BXP-7K2M-91QX";

            try {

                await navigator.clipboard.writeText(
                    code
                );

                showToast(
                    `🎁 Đã nhận và sao chép Daily Code: ${code}`
                );

            } catch {

                showToast(
                    `🎁 Daily Code: ${code}`
                );
            }
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
                        "⚠️ Hãy nhập username Minecraft.";
                }

                showToast(
                    "⚠️ Hãy nhập username Minecraft."
                );

                return;
            }

            if (
                !/^[A-Za-z0-9_]{1,16}$/.test(
                    name
                )
            ) {

                if (hint) {

                    hint.textContent =
                        "⚠️ Username không hợp lệ.";
                }

                showToast(
                    "⚠️ Username chỉ được gồm chữ, số và _."
                );

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
// NẠP TIỀN DEMO
// =====================================================

document
    .querySelectorAll("[data-demo]")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                showToast(
                    button.dataset.demo ||
                    "✅ Đã chọn."
                );
            }
        );
    });

// =====================================================
// DISCORD
// =====================================================

const discordButton =
    document.getElementById(
        "discordButton"
    );

if (discordButton) {

    discordButton.addEventListener(
        "click",
        (event) => {

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

setInterval(
    loadServerStatus,
    30000
);
