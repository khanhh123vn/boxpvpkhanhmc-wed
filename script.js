```javascript
const API_URL = "https://boxpvp-backend.vercel.app";

const toast = document.getElementById("toast");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}


/* =========================================================
   MOBILE MENU
========================================================= */

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


/* =========================================================
   SERVER STATUS
========================================================= */

async function loadServerStatus() {
    try {
        const response = await fetch(
            `${API_URL}/api/server`,
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error("API error");
        }

        const data = await response.json();

        const serverIp =
            document.getElementById("serverIp");

        const onlineElement =
            document.querySelector(".online-text");

        const playerElement =
            document.getElementById("serverPlayers");

        const footerStatus =
            document.getElementById("footerServerStatus");


        if (serverIp && data.ip) {
            serverIp.textContent = data.ip;
        }


        if (onlineElement) {
            onlineElement.textContent =
                data.online
                    ? "🟢 ONLINE"
                    : "🔴 OFFLINE";
        }


        if (playerElement) {
            playerElement.innerHTML =
                `${Number(data.players || 0)} <small>/ ${Number(data.maxPlayers || 0)}</small>`;
        }


        if (footerStatus) {
            footerStatus.textContent =
                data.online
                    ? `🟢 Online • ${Number(data.players || 0)}/${Number(data.maxPlayers || 0)}`
                    : "🔴 Offline";
        }

    } catch (error) {

        console.error(
            "BOXPVP SERVER API:",
            error
        );

        const onlineElement =
            document.querySelector(".online-text");

        if (onlineElement) {
            onlineElement.textContent =
                "🔴 OFFLINE";
        }
    }
}


/* =========================================================
   COPY SERVER IP
========================================================= */

async function copyServerIP() {

    const serverIp =
        document
            .getElementById("serverIp")
            ?.textContent
            ?.trim();


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

        console.error(
            "COPY IP:",
            error
        );

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


/* =========================================================
   PLAY BUTTON
========================================================= */

document
    .getElementById("playButton")
    ?.addEventListener(
        "click",
        async () => {

            const serverIp =
                document
                    .getElementById("serverIp")
                    ?.textContent
                    ?.trim();


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
                    `🎮 Đã sao chép IP ${serverIp}. Mở Minecraft để tham gia!`
                );

            } catch {

                showToast(
                    `🎮 IP server: ${serverIp}`
                );
            }
        }
    );


/* =========================================================
   PLAYER ACCOUNT ELEMENTS
========================================================= */

const usernameInput =
    document.getElementById(
        "usernameInput"
    );

const saveUsername =
    document.getElementById(
        "saveUsername"
    );

const resetAccount =
    document.getElementById(
        "resetAccount"
    );

const profileUsername =
    document.getElementById(
        "profileUsername"
    );

const profileRank =
    document.getElementById(
        "profileRank"
    );

const profileCoin =
    document.getElementById(
        "profileCoin"
    );

const profileShard =
    document.getElementById(
        "profileShard"
    );

const profileKills =
    document.getElementById(
        "profileKills"
    );

const profileDeaths =
    document.getElementById(
        "profileDeaths"
    );

const profileAvatar =
    document.getElementById(
        "profileAvatar"
    );


/* =========================================================
   DEFAULT PLAYER
========================================================= */

function resetPlayerDisplay() {

    if (profileUsername) {
        profileUsername.textContent =
            "Username";
    }


    if (profileRank) {
        profileRank.textContent =
            "Chưa có rank";
    }


    if (profileCoin) {
        profileCoin.textContent =
            "0";
    }


    if (profileShard) {
        profileShard.textContent =
            "0";
    }


    if (profileKills) {
        profileKills.textContent =
            "0";
    }


    if (profileDeaths) {
        profileDeaths.textContent =
            "0";
    }


    if (profileAvatar) {
        profileAvatar.textContent =
            "?";
    }
}


/* =========================================================
   DISPLAY PLAYER
========================================================= */

function displayPlayer(username) {

    if (!username) {
        resetPlayerDisplay();
        return;
    }


    if (profileUsername) {
        profileUsername.textContent =
            username;
    }


    if (profileRank) {
        profileRank.textContent =
            "Member";
    }


    if (profileCoin) {
        profileCoin.textContent =
            "0";
    }


    if (profileShard) {
        profileShard.textContent =
            "0";
    }


    if (profileKills) {
        profileKills.textContent =
            "0";
    }


    if (profileDeaths) {
        profileDeaths.textContent =
            "0";
    }


    if (profileAvatar) {
        profileAvatar.textContent =
            username
                .charAt(0)
                .toUpperCase();
    }
}


/* =========================================================
   SAVE USERNAME
========================================================= */

if (saveUsername) {

    saveUsername.addEventListener(
        "click",
        () => {

            const username =
                usernameInput
                    ?.value
                    ?.trim();


            if (!username) {

                showToast(
                    "❌ Hãy nhập username Minecraft."
                );

                return;
            }


            if (
                !/^[A-Za-z0-9_]{3,16}$/
                    .test(username)
            ) {

                showToast(
                    "❌ Username phải dài 3-16 ký tự và chỉ gồm chữ, số hoặc _."
                );

                return;
            }


            localStorage.setItem(
                "boxpvp_username",
                username
            );


            displayPlayer(
                username
            );


            showToast(
                `✅ Đã lưu username: ${username}`
            );
        }
    );
}


/* =========================================================
   RESET ACCOUNT
========================================================= */

if (resetAccount) {

    resetAccount.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "boxpvp_username"
            );


            if (usernameInput) {
                usernameInput.value = "";
            }


            resetPlayerDisplay();


            showToast(
                "🔄 Đã xóa tài khoản test."
            );
        }
    );
}


/* =========================================================
   LOAD SAVED PLAYER
========================================================= */

function loadSavedPlayer() {

    const username =
        localStorage.getItem(
            "boxpvp_username"
        );


    if (!username) {
        resetPlayerDisplay();
        return;
    }


    if (usernameInput) {
        usernameInput.value =
            username;
    }


    displayPlayer(
        username
    );
}


/* =========================================================
   DAILY CODE
========================================================= */

const claimCode =
    document.getElementById(
        "claimCode"
    );


if (claimCode) {

    claimCode.addEventListener(
        "click",
        () => {

            const today =
                new Date()
                    .toISOString()
                    .slice(0, 10);


            const storageKey =
                `boxpvp_code_${today}`;


            const alreadyClaimed =
                localStorage.getItem(
                    storageKey
                );


            if (alreadyClaimed) {

                showToast(
                    "⚠️ Hôm nay bạn đã nhận code rồi."
                );

                return;
            }


            localStorage.setItem(
                storageKey,
                "claimed"
            );


            showToast(
                "🎁 Đã nhận Daily Code hôm nay!"
            );
        }
    );
}


/* =========================================================
   SKIN
========================================================= */

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
                input
                    ?.value
                    ?.trim();


            if (!name) {

                if (hint) {
                    hint.textContent =
                        "⚠️ Hãy nhập username Minecraft.";
                }


                showToast(
                    "❌ Hãy nhập username."
                );

                return;
            }


            if (
                !/^[A-Za-z0-9_]{3,16}$/
                    .test(name)
            ) {

                showToast(
                    "❌ Username không hợp lệ."
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


/* =========================================================
   TOPUP BUTTONS
========================================================= */

document
    .querySelectorAll(
        ".topup-list button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const message =
                    button.dataset.demo ||
                    "Đã chọn gói nạp.";


                showToast(
                    `🛒 ${message}`
                );
            }
        );
    });


/* =========================================================
   DISCORD
========================================================= */

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


/* =========================================================
   RANKING
========================================================= */

async function loadRanking() {

    const rankingList =
        document.getElementById(
            "rankingList"
        );


    if (!rankingList) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/ranking`,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {
            throw new Error(
                "Ranking API chưa có"
            );
        }


        const players =
            await response.json();


        if (
            !Array.isArray(players) ||
            players.length === 0
        ) {

            rankingList.innerHTML = `
                <div class="rank-row">

                    <div class="rank-position">
                        🏆
                    </div>

                    <div class="avatar">
                        ?
                    </div>

                    <div class="rank-player">

                        <strong>
                            Chưa có dữ liệu
                        </strong>

                        <span>
                            Chưa có người chơi
                        </span>

                    </div>

                    <div class="rank-score">
                        ⚔️ 0
                        <small>Kills</small>
                    </div>

                </div>
            `;

            return;
        }


        rankingList.innerHTML =
            players
                .slice(0, 10)
                .map(
                    (player, index) => {

                        const medals = [
                            "🥇",
                            "🥈",
                            "🥉"
                        ];


                        const position =
                            medals[index] ||
                            `#${index + 1}`;


                        const username =
                            player.username ||
                            "Username";


                        const rank =
                            player.rank ||
                            "Member";


                        const kills =
                            Number(
                                player.kills || 0
                            ).toLocaleString(
                                "vi-VN"
                            );


                        return `
                            <div class="rank-row">

                                <div class="rank-position">
                                    ${position}
                                </div>

                                <div class="avatar">
                                    ${escapeHTML(
                                        username
                                            .charAt(0)
                                            .toUpperCase()
                                    )}
                                </div>

                                <div class="rank-player">

                                    <strong>
                                        ${escapeHTML(username)}
                                    </strong>

                                    <span>
                                        ${escapeHTML(rank)}
                                    </span>

                                </div>

                                <div class="rank-score">
                                    ⚔️ ${kills}
                                    <small>Kills</small>
                                </div>

                            </div>
                        `;
                    }
                )
                .join("");

    } catch (error) {

        console.error(
            "BOXPVP RANKING:",
            error
        );


        rankingList.innerHTML = `
            <div class="rank-row">

                <div class="rank-position">
                    🏆
                </div>

                <div class="avatar">
                    ?
                </div>

                <div class="rank-player">

                    <strong>
                        Chưa có dữ liệu
                    </strong>

                    <span>
                        Backend chưa có API BXH
                    </span>

                </div>

                <div class="rank-score">
                    ⚔️ 0
                    <small>Kills</small>
                </div>

            </div>
        `;
    }
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );
}


/* =========================================================
   START WEBSITE
========================================================= */

loadServerStatus();

loadSavedPlayer();

loadRanking();


/* =========================================================
   AUTO UPDATE SERVER
========================================================= */

setInterval(
    loadServerStatus,
    10000
);


/* =========================================================
   AUTO UPDATE RANKING
========================================================= */

setInterval(
    loadRanking,
    15000
);
```
