export default async function handler(req, res) {
    const SERVER_IP = "boxpvpkhanhmc.levyathan.ch";

    try {
        const response = await fetch(
            `https://api.mcsrvstat.us/3/${SERVER_IP}`
        );

        if (!response.ok) {
            throw new Error("Không thể kết nối API Minecraft");
        }

        const data = await response.json();

        res.status(200).json({
            online: data.online === true,
            players: data.players?.online ?? 0,
            maxPlayers: data.players?.max ?? 100
        });

    } catch (error) {
        console.error("BOXPVP API ERROR:", error);

        res.status(200).json({
            online: false,
            players: 0,
            maxPlayers: 100
        });
    }
}
