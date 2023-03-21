import React from "react";
import {IconButton, Paper, TextField} from "@mui/material";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

interface MessageInputProps {
    onClick: (message: string) => void
}
export default function MessageInput({onClick}: MessageInputProps) {
    const [text, setText] = React.useState<string>('')

    return(
        <Paper>
            <TextField onChange={v=>setText(v.target.value)}/>
            <IconButton onClick={(e)=>onClick(text)}><InsertEmoticonIcon/></IconButton>
        </Paper>
    )
}

MessageInput.defaultProps = {
    onClick: (message: string) => {
        console.log(message)
    }
}