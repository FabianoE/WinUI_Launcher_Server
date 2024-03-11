import { Socket } from "socket.io";
import GetUserInfo from "../DiscordAPI/GetUserInfo";
import DB_Login from "../DataBase/DB_LauncherLogin";

class Client {
    private socket: Socket | undefined;
    private hardware: string | undefined;
    private userInfo: any | { userData: any, serverData: any, access_token: string };

    constructor(socket: Socket) {
        this.socket = socket;
        this.onConnected();
        this.onHandle();
    }

    private onConnected() {

    }

    private sendLoginResponse(result: boolean) {
        this.socket?.emit(
            'loginResponse',
            result,
            'https://encurtador.com.br/jlrGK'
        );
    }

    private sendUserInfo() {
        this.socket?.emit(
            'userInfo',
            'Discord Name: ' + this.userInfo.userData.global_name,
        );
    }

    //Incomplete, need to be implemented/fixed in launcher
    private sendNotices() {
        this.socket?.emit("notices",
            2, //Count
            "Notice 1", //Title
            "http://localhost/", //Link
            "11/12", //Date
            "-", //Img

            /////////////////////////////////////

            "IMG", //Title
            "IMG", //Link
            "IMG", //Date
            "https://windows-cdn.softpedia.com/screenshots/Starward_3.png", //Img
        );
    }

    private onHandle() {
        this.socket?.on('hardware', (hardware) => {
            this.onReceiveHardware(hardware);
            this.hardware = hardware;
            this.sendLoginResponse(false);
        });

        this.socket?.on('dscode', async (code) => {
            console.log(code);
            this.userInfo = await GetUserInfo.GetInfoWithCode(code);

            if (this.userInfo == "Error" || this.hardware == undefined) {
                this.sendLoginResponse(false);
                return;
            }

            DB_Login.addDiscordInfo(this.hardware, this.userInfo.userData.id, this.userInfo.access_token);
            this.sendLoginResponse(true);
            this.sendUserInfo();
            this.sendNotices();
        });
    }

    onReceiveHardware(hardware: any) {
        DB_Login.getLauncherHardware(hardware).then(async (result) => {
            console.log(result);
            if (result.length == 0) {
                this.sendLoginResponse(false);
                DB_Login.addLauncherHardware(hardware);
                return;
            }

            if (result[0].discord_id == null || result[0].discord_access_token == null || result[0].discord_id == '' || result[0].discord_access_token == '') {
                this.sendLoginResponse(false);
                return;
            }

            var userInfoResponse = await GetUserInfo.GetInfoWithToken(result[0].discord_access_token);

            if (userInfoResponse == "Error") {
                DB_Login.addDiscordInfo(this.hardware ?? '', '', '');
                this.sendLoginResponse(false);
                return;
            }

            this.userInfo = userInfoResponse;
            this.sendLoginResponse(true);
            this.sendUserInfo();
            this.sendNotices();
        });
    }

    public onDisconnect() {
        console.log('Disconnected');
    }
}

export default Client;
