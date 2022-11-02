import { HubConnectionBuilder, JsonHubProtocol } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import ServerLinks from "../../util/ServerLinks";
import MapManager from "./MapManager";
const SignalRContainer = (props) => {
    const [connection, setConnection] = useState(null);
    const [figureInitData, setFigureInitData] = useState(null);
    const [isCadaster, setCadaster] = useState(false);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(ServerLinks.MAP_MICROSERVICE_SIGNALR_HUB)
            .withAutomaticReconnect()
            .withHubProtocol(new JsonHubProtocol())
            .build();
        newConnection.on('Recive', message => {
            setFigureInitData(message);

        })
        newConnection.on('ReciveIfCadaster', message => {
            setCadaster(message);
        })
        setConnection(newConnection);
        newConnection.start().then(() => {
            newConnection.invoke("SendMapId", props.mapId);
        });
    }, []);

    const sendFigureInfo = (figureInfo) => {
        if (connection._connectionStarted) {
            try {
                if (figureInfo !== null || figureInfo !== "")
                    connection.send("SendFigure", figureInfo);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const sendProductArea = (area) => {
        if (connection._connectionStarted) {
            try {
                connection.send("SendProductArea", area);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const removeFigureInfo = async (figureInfo) => {
        if (connection._connectionStarted) {
            try {
                await connection.invoke("RemoveFigure", figureInfo);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }


    return <MapManager sendProductArea={sendProductArea} mapId={props.mapId} isCadaster={isCadaster} figureInitData={figureInitData} removeFigureInfo={removeFigureInfo} sendFigureInfo={sendFigureInfo}> </ MapManager>
}

export default SignalRContainer;