import { Stack } from "@mui/material";
import React from "react";

function LeftSidebar() {
    return (
        <React.Fragment>
            <Stack direction={'column'} alignItems={'start'}>
                <p> avatar</p>
                <p>  item1</p>
                <p>  item1</p>
            </Stack>
        </React.Fragment>
    );
}

export default LeftSidebar;