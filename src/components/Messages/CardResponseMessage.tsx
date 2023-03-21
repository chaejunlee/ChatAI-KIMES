import React from "react";
import {ImageResponseCardType} from "../../Interface/Message/ResponseMessageType";
import {Button} from "@mui/material";

export interface CardResponseMessageTypeProps {
    data: ImageResponseCardType,
    onButtonClick: (text: string) => void
}

export default function CardResponseMessage(
    {data,onButtonClick}: CardResponseMessageTypeProps) {
    const message=data.imageResponseCard
    return (
        <div>
            {message.imageUrl ? <img src={message.imageUrl} alt={message.title}/> : null}
            {message.imageUrl && message.title ? <h3>{message.title}</h3> : null}
            {message.imageUrl && message.subtitle? <p>{message.subtitle}</p> : null}
            {message.buttons.map((button) =>
                <Button key={button.text}
                        onClick={()=>onButtonClick(button.value)}
                >{button.text}</Button>)
            }
        </div>
    )
}