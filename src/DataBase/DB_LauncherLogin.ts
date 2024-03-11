import dbConnection from "./DB";

class DB_LauncherLogin {
    public static async getLauncherHardware(hardware: string): Promise<any> {
        const query = {
            text: 'SELECT * FROM hwid_infos WHERE hwid = $1',
            values: [hardware],
        }
        const result = await dbConnection.query(query);
        return result.rows;
    }

    public static async addLauncherHardware(hardware: string): Promise<any> {
        const query = {
            text: 'INSERT INTO hwid_infos(hwid) VALUES($1)',
            values: [hardware],
        }
        const result = await dbConnection.query(query);
        return result.rows;
    }

    public static async addDiscordInfo(hardware: string, discord_id: string, discord_access_token: string): Promise<any> {
        const query = {
            text: 'UPDATE hwid_infos SET discord_id = $1, discord_access_token = $2 WHERE hwid = $3',
            values: [discord_id, discord_access_token, hardware],
        }
        const result = await dbConnection.query(query);
        return result.rows;
    }
}

export default DB_LauncherLogin;