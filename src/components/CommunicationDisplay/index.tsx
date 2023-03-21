import React from "react";
import Message from "../../Interface/Message/Message";
import {ContentResponseMessageType} from "../../Interface/Message/ResponseMessageType";
import sampleMessages from "../../Data/Message";
import {Stack} from "@mui/material";
import MessageBuilder from "./MessageBuilder";


interface CommunicationDisplayProps {
    messages: Message[]
    onButtonClick: (text: string) => void
}

export default function CommunicationDisplay({messages,onButtonClick}: CommunicationDisplayProps) {
    return (
        <Stack>
            {messages.map((message) => MessageBuilder(message,onButtonClick))}
        </Stack>
    )
}

CommunicationDisplay.defaultProps = {
    messages: sampleMessages
}
