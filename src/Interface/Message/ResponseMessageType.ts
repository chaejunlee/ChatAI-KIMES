export interface BasicResponseMessageType {
    //aws lex response message content type
    contentType: string;
}


export interface ResponseMessageType{
    [key: string]: BasicResponseMessageType;
}

export interface ContentResponseMessageType extends BasicResponseMessageType{
    content: string;
}

export interface ImageResponseCardType extends BasicResponseMessageType{
    imageResponseCard:{

    }
}

export interface ImageResponseCardType{
    buttons: ButtonResponseType[]
}

export interface ButtonResponseType{
    text: string;
    value: string;
}

