'use client'
import { Box, Button, Container, Link, Paper, Stack, Step, StepButton, Stepper, TextField, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { useTranslations } from "next-intl"; import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL


export default function SignUpForm() {

    const t = useTranslations('SigninPage');


    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <AccountCircleIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography component="h1" variant="h5" noWrap fontSize={'21px'} fontWeight={'bold'}>
                    Sign up for an account
                </Typography>

                <Typography component="h2" variant="h5" noWrap fontSize={'21px'} fontWeight={'bold'} marginBottom={0}>
                    or
                </Typography>

                <Button
                    startIcon={<GoogleIcon />}
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2, mb: 2, fontWeight: '500' }}
                    href={`${API_URL}/auth/google`}
                    tabIndex={5}
                >
                    {t('text-btn-sign-email')}
                </Button>


                <Box component={'span'} sx={{ m: 1, width: '100%', height: '1px', background: '#aaa' }}></Box>

                <Box noValidate component="form" sx={{ mt: 1, width: '100%' }}>

                    <Stack direction="row" spacing={1} marginBottom={2}>
                        <TextField
                            size="small"
                            margin="normal"
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            sx={{ mb: 0 }}
                        />
                        <TextField
                            size="small"
                            margin="normal"
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            sx={{ mb: 0 }}
                        />
                    </Stack>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker

                            label={'Date of birth'}
                            // disabled={disabled}
                            format="DD/MM/YYYY"
                            sx={{

                                '& .MuiFormLabel-asterisk': {
                                    color: 'red'
                                },

                            }}
                            // minDate={minDate}
                            // maxDate={maxDate}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    fullWidth: true,
                                    required: true,
                                    // ...(onBlur ? { onBlur } : {}),
                                    // error,
                                    // helperText
                                }
                            }}
                        />
                    </LocalizationProvider>

                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        sx={{ mb: 0 }}
                    />


                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        // autoComplete="email"

                        // error={!!state?.errors?.email}
                        // helperText={state?.errors?.email ? t('text-error-form.email') : " "}
                        // inputProps={{ tabIndex: 1 }}
                        // defaultValue={state?.values?.email ?? ''}
                        sx={{ mb: 0 }}
                    />

                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        name="password"
                        label={t('text-field-pw')}
                        type="password"
                        id="password"
                        // autoComplete="current-password"
                        // error={!!state?.errors?.password}
                        // helperText={state?.errors?.password ? t('text-error-form.password') : " "}
                        // inputProps={{ tabIndex: 2 }}
                        // defaultValue={state?.values?.password ?? ''}
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
                        sign up

                    </Button>

                    <Stack alignItems={'center'}>
                        <Typography component={'span'} variant="caption" noWrap fontSize={'14px'} fontWeight={'normal'}>
                            Already have an account?
                            <Link href="/sign-in" underline="hover" > Sign in</Link>
                        </Typography>
                    </Stack>





                </Box>
            </Paper>
        </Container>
    )
}