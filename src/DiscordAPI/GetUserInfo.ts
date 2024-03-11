import axios from 'axios';

class GetUserInfo {

    private async GetTokens(code: string) {
        const params = new URLSearchParams();
        params.append('client_id', "CLIENT ID");
        params.append('client_secret', "CLIENT SECRET");
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', "http://127.0.0.1:3456/discord/");

        const response = await axios.post('https://discord.com/api/oauth2/token', params)

        return response.data;
    };

    public async GetInfoWithCode(code: string) : Promise<any> {
        try {
            const { access_token, token_type } = await this.GetTokens(code);

            const userDataResponse = await axios.get('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `${token_type} ${access_token}`
                }
            })

            const serverDataResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
                headers: {
                    authorization: `${token_type} ${access_token}`
                }
            })

            return {userData: userDataResponse.data, serverData: serverDataResponse.data, access_token: access_token}

        } catch (error) {
            console.log('Error', error)
            return "Error"
        }
    }

    public async GetInfoWithToken(token: string) : Promise<any>{
        try {
            const userDataResponse = await axios.get('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            const serverDataResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            return {userData: userDataResponse.data, serverData: serverDataResponse.data}

        } catch (error) {
            console.log('Error', error)
            return "Error"
        }
    }
}

export default new GetUserInfo();