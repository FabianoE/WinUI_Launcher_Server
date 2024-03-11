import { Socket } from "socket.io";
import List from "./List";
import Client from "../Client/Client";

class Connections {
    public static ClientsConnecteds = new List<Client>();

    public static Add(client: Client) {
        this.ClientsConnecteds.add(client);
    }

    public static Remove(client: Client) {
        this.ClientsConnecteds.remove(client);
    }
}

export default Connections;