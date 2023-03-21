import React from "react";
import MessageInput from "../../components/MessageInput";
import CommunicationDisplay from "../../components/CommunicationDisplay";

export default function ChatPage() {

    return (
        <div>
            <h1>Chat Page</h1>
            <CommunicationDisplay/>
            <MessageInput/>
        </div>
    )
}