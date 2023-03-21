import React from "react";
import RequestMessageType from "../../Interface/Message/RequestMessageType";
interface RequestMessageTypeProps {
    message : RequestMessageType
}
export default function RequestMessage({message}: RequestMessageTypeProps) {
    return (
        <div>
            Request : {message.message}
        </div>
    )
}