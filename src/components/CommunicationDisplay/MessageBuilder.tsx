import Message from "../../Interface/Message/Message";
import React from "react";
import RequestMessageType from "../../Interface/Message/RequestMessageType";
import {
    BasicResponseMessageType,
    ContentResponseMessageType, ImageResponseCardType,
    ResponseMessageType
} from "../../Interface/Message/ResponseMessageType";
import {Paper, Stack} from "@mui/material";
import RequestMessage from "../Messages/RequestMessage";
import ContentResponseMessage from "../Messages/ContentResponseMessage";
import CardResponseMessage from "../Messages/CardResponseMessage";

function RequestMessageBuilder(message: RequestMessageType) {
    return (
        <Paper style={{marginBottom:20,marginLeft:120}}>
            <RequestMessage message={message}/>
        </Paper>
    );
}


function ResponseMessageBuilder(message: ResponseMessageType,onButtonClick: (text: string) => void) {
    return(
        <Paper style={{marginBottom:20,marginRight:120}}>
            <Stack>
                {
                    message.content.map((content: BasicResponseMessageType) => {
                        switch (content.contentType) {
                            case 'PlainText':
                                return <ContentResponseMessage message={content as ContentResponseMessageType}/>
                            case 'ImageResponseCard':
                                return <CardResponseMessage data={content as ImageResponseCardType} onButtonClick={onButtonClick}/>
                        }
                    })
                }
            </Stack>
        </Paper>
    )
}

export default function MessageBuilder(message: Message,onButtonClick:(text:string)=>void): JSX.Element{
    switch(message.type){
        case 'request':
            return RequestMessageBuilder(message as RequestMessageType);
        case 'response':
            return ResponseMessageBuilder(message as ResponseMessageType,onButtonClick);
    }

}