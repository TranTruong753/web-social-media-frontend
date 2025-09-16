'use client'
import { Box, Button, Container, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { useTranslations } from "next-intl"; import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL

type SignUpForm = {
    handleComplete : () => void
}

export default function SignUpForm({handleComplete} : SignUpForm) {

    const t = useTranslations('SignUpPage');

    const handleSignUpForm = async() => {
        handleComplete()
    }


    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <AccountCircleIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography component="h1" variant="h5" noWrap fontSize={'21px'} fontWeight={'bold'}>
                    {t('title')}
                </Typography>

                <Typography component="h2" variant="h5" noWrap fontSize={'21px'} fontWeight={'bold'} marginBottom={0}>
                    {t('title-second')}
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
                            label={t('text-field-ln')}
                            name="lastName"
                            sx={{ mb: 0 }}
                        />
                        <TextField
                            size="small"
                            margin="normal"
                            fullWidth
                            id="firstName"
                            label={t('text-field-fn')}
                            name="firstName"
                            sx={{ mb: 0 }}
                        />
                    </Stack>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label={t('text-field-dob')}
                            // disabled={disabled}
                            format="DD/MM/YYYY"
                            sx={{

                                '& .MuiFormLabel-asterisk': {
                                    color: 'red'
                                },
                                mb: 2

                            }}
                            // minDate={minDate}
                            maxDate={dayjs()}
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

                    <FormLabel id="demo-row-radio-buttons-group-label">{t('text-field-genders')}</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="male"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="male" control={<Radio />} label={t('text-field-gender.Male')} />
                        <FormControlLabel value="female" control={<Radio />} label={t('text-field-gender.Female')} />
                        <FormControlLabel value="other" control={<Radio />} label={t('text-field-gender.Other')} />
                    </RadioGroup>

                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        id="phone"
                        label={t('text-field-phone')}
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
                        onClick={()=>handleSignUpForm()}
                    // loading={isPending}
                    >
                        {/* {isPending ? t('text-btn-sign-in-pending') : t('text-btn-sign-in')} */}
                        {t('text-btn-sign-up')}

                    </Button>

                    <Stack alignItems={'center'}>
                        <Typography component={'span'} variant="caption" noWrap fontSize={'14px'} fontWeight={'normal'}>
                            {t('text-caption')}
                            {/* <Link href="/sign-in" underline="hover" > {t('text-caption-second')}</Link> */}
                            <Link href={"/sign-in"} className=" hover:underline"  > {t('text-caption-second')}</Link>
                        </Typography>
                    </Stack>





                </Box>
            </Paper>
        </Container>
    )
}