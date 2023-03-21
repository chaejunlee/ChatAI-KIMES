import React from "react";
import Message from "../../Interface/Message/Message";
import {ContentResponseMessageType} from "../../Interface/Message/ResponseMessageType";
import sampleMessages from "../../Data/Message";
import {Stack} from "@mui/material";
import MessageBuilder from "./MessageBuilder";


interface CommunicationDisplayProps {
    messages: Message[]
}

export default function CommunicationDisplay({messages}: CommunicationDisplayProps) {
    console.log(messages)
    return (
        <Stack>
            {messages.map((message) => MessageBuilder(message))}
        </Stack>
    )
}

CommunicationDisplay.defaultProps = {
    messages: sampleMessages
}
