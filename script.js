```javascript
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

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        if (nav) {
            nav.classList.remove("open");
        }
    });
});


// =====================================================
// 6 Ô TÍNH NĂNG
// =====================================================

document.querySelectorAll(".feature-click").forEach(card => {

    card.addEventListener("click", () => {

        const target = card.dataset.target;

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
    });

});


// =====================================================
// SERVER API
// =====================================================

async function loadServerStatus() {

    try {

        const response = await fetch(
            `${API_URL}/api/server`
        );

        if (!response.ok) {
            throw new Error("Lỗi API");
        }

        const data = await response.json();


        const serverIp =
            document.getElementById("serverIp");

        if (serverIp && data.ip) {
            serverIp.textContent = data.ip;
        }


        const onlineElement =
            document.querySelector(".online-text");

        if (onlineElement) {
            onlineElement.textContent =
                data.online
                    ? "🟢 ONLINE"
                    : "🔴 OFFLINE";
        }


        const playerElement =
            document.getElementById("serverPlayers");

        if (playerElement) {
            playerElement.innerHTML =
                `${data.players ?? 0} <small>/ ${data.maxPlayers ?? 100}</small>`;
        }


        const footerStatus =
            document.getElementById("footerServerStatus");

        if (footerStatus) {
            footerStatus.textContent =
                data.online
                    ? `🟢 Online • ${data.players ?? 0}/${data.maxPlayers ?? 100}`
                    : "🔴 Offline";
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
        showToast("❌ Không tìm thấy IP server.");
        return;
    }

    try {

        await navigator.clipboard.writeText(serverIp);

        showToast(
            `📋 Đã sao chép IP: ${serverIp}`
        );

    } catch {

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
// CHƠI NGAY
// =====================================================

const playButton =
    document.getElementById("playButton");

if (playButton) {

    playButton.addEventListener(
        "click",
        async () => {

            const serverIp =
                document
                    .getElementById("serverIp")
                    ?.textContent
                    .trim();

            if (!serverIp) {
                showToast("❌ Không có IP server.");
                return;
            }

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
// USERNAME
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
                    "⚠️ Hãy nhập username Minecraft."
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
// TẢI USERNAME
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
        input.value = username;
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
        () => {

            showToast(
                "🎁 Đã nhận Daily Code: BXP-7K2M-91QX"
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
                        "⚠️ Hãy nhập username Minecraft.";
                }

                showToast(
                    "⚠️ Hãy nhập username Minecraft."
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
    document.getElementById(
        "discordButton"
    );

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

setInterval(
    loadServerStatus,
    30000
);
```
