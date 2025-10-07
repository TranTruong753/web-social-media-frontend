'use client'
import { Avatar, Grid, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import Image from 'next/image'
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import TabHeaderBar from "./TabHeaderBar";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { deepOrange } from "@mui/material/colors";

function HeaderBar() {
    return (
        <React.Fragment>
            <Grid container spacing={2} sx={{ py: 0, px:2 }} className="bg-gray-50">
                <Grid size={{ md: 3 }} spacing={2}>
                    <Stack direction={'row'} alignItems={'center'}>
                        <IconButton sx={{pl:0}}>
                            <Image src={'/img/logox4.png'}
                                width={48}
                                height={48}
                                alt="Picture of the author"
                                className="p-0"
                                />
                        </IconButton>
                        <TextField
                            label="search"

                            size="small"
                            InputProps={{
                                style: {
                                    borderRadius: "20px",
                                },
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                </Grid>

                <Grid size={{ md: 6 }} >
                    {/* list icon */}
                    <TabHeaderBar />

                </Grid>

                <Grid size={{ md: 3 }}>
                    <Stack direction={'row'} justifyContent={'end'} alignItems={'center'} spacing={2} height={'100%'}>
                        <IconButton className="!bg-blue-500 !text-gray-50">
                            <ChatBubbleIcon />
                        </IconButton>
                        <Avatar
                            // sizes="10px"
                            sx={{ bgcolor: deepOrange[500] }}
                            alt="avatar"
                        />
                    </Stack>
                </Grid>
            </Grid>
        </React.Fragment>

    );
}

export default HeaderBar;