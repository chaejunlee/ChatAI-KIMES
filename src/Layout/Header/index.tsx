import React from "react";
import MenuButton from "../../components/MenuButton";
import {Stack} from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function Header() {
    return (
        <Stack direction={"row"}>
            <MenuButton/>
            Beamworks Logo
            <HelpOutlineIcon/>
        </Stack>
    )
}