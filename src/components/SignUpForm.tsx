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
import { useNotifications } from "@toolpad/core";
import { FormSignUpType, SignupFormSchema } from "@/lib/definitions";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sleep } from "@/lib/utils";
import { signupApi } from "@/services/authServices";
import { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function SignUpForm() {

    const t = useTranslations('SignUpPage');

    const notifications = useNotifications();

    const formInitialState = {
        lastName: "",
        firstName: "",
        gender: "male",
        phone: "",
        birthDate: null,
        email: "",
        password: ""
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        reset,
    } = useForm<FormSignUpType>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: formInitialState
    });


    const [isLoading, setIsLoading] = React.useState(false)

    const router = useRouter()

    const onSubmit: SubmitHandler<FormSignUpType> = async (data) => {
        console.log("data", data)
        setIsLoading(true)

        const formatValues = {
            username: `${data.lastName} ${data.firstName}`,
            password: data.password,
            email: data.email,
            birthDate: data.birthDate ? dayjs(data.birthDate).format('YYYY-MM-DD') : "",
            gender: data.gender,
            phone: data.phone,
        }
        console.log("formatValues", formatValues)

        try {
            await sleep(2000);
            const res = await signupApi(formatValues) // axios throw nếu lỗi
            if (res?.status) {
                console.log("res", res)
                return router.push(`/activate?id=${res.data.user.id}`)
            }
        } catch (error) {
            const err = error as AxiosError

            if(err.response?.status === 500) {
                notifications.show( "email already exists", { severity: 'error' })
                return setError('email',{
                    message: 'email already exists'
                })
            }
          
            return notifications.show(error + "", { severity: 'error' })

        } finally {
            setIsLoading(false)
        }

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

                <Box noValidate component="form" 
                    onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>

                    <Stack direction="row" spacing={1} marginBottom={2}>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    size="small"
                                    margin="normal"
                                    fullWidth
                                    id="lastName"
                                    label={t('text-field-ln')}
                                    sx={{ mb: 0 }}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message ? errors.lastName.message : " "}                          
                                />
                            )}
                        />
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    size="small"
                                    margin="normal"
                                    fullWidth
                                    id="firstName"
                                    label={t('text-field-fn')}                       
                                    sx={{ mb: 0 }}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message ? errors.firstName.message : " "}                        
                                />
                            )}
                        />


                    </Stack>

                    <Controller
                        name="birthDate"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DatePicker
                                    value={value ? dayjs(value) : null}
                                    onChange={(newValue) => {
                                        onChange(newValue ? newValue.toDate() : null); // ✅ convert về Date | null
                                    }}

                                    format="DD/MM/YYYY"
                                    sx={{

                                        '& .MuiFormLabel-asterisk': {
                                            color: 'red'
                                        },
                                        mb: 2

                                    }}
                                    maxDate={dayjs()}

                                    slotProps={{
                                        textField: {
                                            id: 'birthDate',                                        
                                            size: 'small',
                                            fullWidth: true,
                                            required: true,
                                            error: !!errors.birthDate,
                                            helperText: errors.birthDate?.message ?? " ",                                   
                                        }
                                    }}
                                />

                            </LocalizationProvider>
                        )}
                    />

                    <FormLabel id="gender">{t('text-field-genders')}</FormLabel>

                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup {...field} row>
                                <FormControlLabel value="male" control={<Radio />} label={t('text-field-gender.Male')} />
                                <FormControlLabel value="female" control={<Radio />} label={t('text-field-gender.Female')} />
                                <FormControlLabel value="other" control={<Radio />} label={t('text-field-gender.Other')} />
                            </RadioGroup>
                        )}
                    />

                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                margin="normal"
                                fullWidth
                                id="phone"
                                label={t('text-field-phone')}
                                sx={{ mb: 0 }}
                                error={!!errors.phone}
                                helperText={errors.phone ? errors.phone.message : " "}                         
                            />
                        )}
                    />



                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email"                        
                                sx={{ mb: 0 }}
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : " "}
                            // inputProps={{ tabIndex: 1 }}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                margin="normal"
                                fullWidth                         
                                label={t('text-field-pw')}
                                type="password"
                                id="password"
                                sx={{ mb: 0 }}              
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : " "}                        
                            />
                        )}
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
                        loading={isLoading}
                    >
                        {isLoading ? t('text-btn-sign-up-pending') : t('text-btn-sign-up')}

                    </Button>

                    <Stack alignItems={'center'}>
                        <Typography component={'span'} variant="caption" noWrap fontSize={'14px'} fontWeight={'normal'}>
                            {t('text-caption')}
                            <Link href={"/sign-in"} className=" hover:underline"  > {t('text-caption-second')}</Link>
                        </Typography>
                    </Stack>


                </Box>
            </Paper>
        </Container>
    )
}