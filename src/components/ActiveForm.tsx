'use client'
import { Box, Button, Container, Link, Paper, Stack, Step, StepButton, Stepper, TextField, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { useTranslations } from "next-intl"; import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function ActiveForm() {
    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LockOpenIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography component="h1" variant="h5" noWrap fontSize={'21px'} fontWeight={'bold'}>
                    active account
                </Typography>

    
                <Box noValidate component="form" sx={{ mt: 1, width: '100%' }}>

                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        id="activeCode"
                        label="active code"
                        name="activeCode"
                        sx={{ mb: 0 }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 2,
                            mb: 2,
                            textTransform: 'none'
                        }}
                        tabIndex={3}
                    // loading={isPending}
                    >
                        {/* {isPending ? t('text-btn-sign-in-pending') : t('text-btn-sign-in')} */}
                        active
                    </Button>

                    <Stack alignItems={'center'}>
                        <Typography component={'span'} variant="caption" noWrap fontSize={'14px'} fontWeight={'normal'}>
                          
                            <Link href="/sign-in" underline="hover" >Gửi lại mã</Link>
                        </Typography>
                    </Stack>

                </Box>
            </Paper>
        </Container>
    );
}