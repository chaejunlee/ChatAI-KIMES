import React from "react";
import {ImageResponseCardType} from "../../Interface/Message/ResponseMessageType";
import {Button} from "@mui/material";

export interface CardResponseMessageTypeProps {
    message: ImageResponseCardType
}

export default function CardResponseMessage({message}: CardResponseMessageTypeProps) {
    return (
        <div>
            {message.buttons.map((button) => <Button>{button.text}</Button>)}
            {message.imageUrl ? <img src={message.imageUrl} alt={message.title}/> : null}
            {message.title ? <h3>{message.title}</h3> : null}
            {message.subtitle? <p>{message.subtitle}</p> : null}
        </div>
    )
}