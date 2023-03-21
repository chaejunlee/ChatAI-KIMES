import React from "react";
import {IconButton, Paper, TextField} from "@mui/material";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
export default function MessageInput(){
    return(
        <Paper>
            <TextField/>
            <IconButton><InsertEmoticonIcon/></IconButton>
        </Paper>
    )
}