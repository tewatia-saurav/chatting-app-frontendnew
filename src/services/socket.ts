import socketIOClient from "socket.io-client";

const ENDPOINT = "localhost:4000";


export const setupSocketConnection = () =>{

    let someData : any = "hi"
    const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
    // console.log("setting up connection with sockets")
    return socket;
}