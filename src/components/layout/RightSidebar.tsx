import { Stack } from "@mui/material";
import React from "react";

function RightSidebar() {
    return (
        <React.Fragment>
            <Stack direction={'column'} alignItems={'end'}>
                <p> List friend</p>
                <p>  user 1</p>
                <p>  user 2</p>
            </Stack>
        </React.Fragment>
    );
}

export default RightSidebar;