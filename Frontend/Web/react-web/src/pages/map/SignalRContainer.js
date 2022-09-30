import React, {useEffect, useState} from "react";
import {HubConnectionBuilder, JsonHubProtocol} from "@microsoft/signalr";
import MapManager from "./MapManager";
import ServerLinks from "../../util/ServerLinks";
import * as signalR from "@microsoft/signalr";
const SignalRContainer = (props) => {
    const [ connection, setConnection ] = useState(null);
    const [ figureInitData, setFigureInitData ] = useState(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(ServerLinks.MAP_MICROSERVICE_SIGNALR_HUB)
            .withAutomaticReconnect()
            .withHubProtocol(new JsonHubProtocol())
            .build();
        newConnection.on('Recive', message => {
            setFigureInitData(message);
        })
        setConnection(newConnection);
        newConnection.start().then(() => {
            newConnection.invoke("SendMapId", props.mapId);
        });
    }, []);

    const sendFigureInfo = ( figureInfo) => {
        if (connection._connectionStarted) {
            try {
                if (figureInfo !== null || figureInfo !== "")
                        connection.send("SendFigure", figureInfo);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const sendProductArea = ( area) => {
        if (connection._connectionStarted) {
            try {
                connection.send("SendProductArea", area);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const removeFigureInfo = async ( figureInfo) => {
        if (connection._connectionStarted) {
            try {
                await connection.invoke("RemoveFigure", figureInfo);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }


    return <MapManager sendProductArea={sendProductArea} mapId={props.mapId} figureInitData={figureInitData} removeFigureInfo={removeFigureInfo} sendFigureInfo={sendFigureInfo}> </ MapManager>
}

export default SignalRContainer;