import Message from "./Message";

export default interface RequestMessageType extends Message{
    message: string;
    userId: string;
    type: 'request';
}