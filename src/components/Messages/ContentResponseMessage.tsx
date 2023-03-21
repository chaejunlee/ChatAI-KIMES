import React from "react";
import {ContentResponseMessageType} from "../../Interface/Message/ResponseMessageType";

interface ContentResponseMessageTypeProps {
    message: ContentResponseMessageType
}

export default function ContentResponseMessage({message}: ContentResponseMessageTypeProps) {
    return (
        <div>
            Response : {message.content}
        </div>
    )
}