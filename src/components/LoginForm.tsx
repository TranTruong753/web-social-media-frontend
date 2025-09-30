'use client'
import { Box, Button, Container, FormLabel, IconButton, InputAdornment, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { useTranslations } from "next-intl";
import { useNotifications } from "@toolpad/core";
import { useRouter } from "next/navigation";
import React from "react";
import { forgetPassword, loginApi, resendCodeApi } from "@/services/authServices";
import ClearIcon from '@mui/icons-material/Clear';
import { FormSendEmailType, FormSignInType, SendEmailFormSchema, SigninFormSchema } from "@/lib/definitions";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sleep } from "@/lib/utils";
import { AxiosError } from "axios";
import { InactiveAccountError } from "@/lib/type";



const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function LoginForm() {

    const t = useTranslations('SignInPage');

    const notifications = useNotifications();

    const router = useRouter();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const [isLoading, setIsLoading] = React.useState(false)

    const [showPassword, setShowPassword] = React.useState(false);

    const formInitialState = {
        email: "",
        password: ""
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSignInType>({
        resolver: zodResolver(SigninFormSchema),
        defaultValues: formInitialState
    });



    const onSubmit: SubmitHandler<FormSignInType> = async (data) => {
        setIsLoading(true)

        try {
            await sleep(2000);
            const res = await loginApi(data) // axios throw nếu lỗi
            if (res?.status) {
                notifications.show(t('text-success'), { severity: "success" })
                return router.push("/");
            }
        } catch (error) {
            const err = error as AxiosError
            if (err.response?.status === 401) {
                return notifications.show(t('text-error-form-submit.account'), { severity: 'error' })
            }

            if (err.response?.status === 403) {
                const { userId } = err.response.data as InactiveAccountError
                notifications.show(t('text-info'), { severity: 'info' })
                await resendCodeApi(userId)
                return router.push(`/activate?id=${userId}`)
            };
            setIsLoading(false)
            return notifications.show(t('text-error-form-submit.error'), { severity: 'error' })
        } 
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LockOutlined color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography component="h1" variant="h5" noWrap fontSize={'21px'} fontWeight={'bold'}>
                    {t('title')}
                </Typography>

                <Button
                    startIcon={<GoogleIcon />}
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2, fontWeight: '500' }}
                    href={`${API_URL}/auth/google`}
                    tabIndex={5}
                >
                    {t('text-btn-sign-email')}
                </Button>


                <Box component={'span'} sx={{ m: 1, width: '100%', height: '1px', background: '#aaa' }}></Box>

                <Box noValidate component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 1, width: '100%' }}>
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
                                autoComplete="email"
                                autoFocus
                                error={!!errors.email}
                                helperText={errors.email ? t('text-error-form.email') : " "}
                                sx={{ mb: 0 }}
                                inputProps={{ tabIndex: 1 }}

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
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                                error={!!errors.password}
                                helperText={errors.password ? t('text-error-form.password') : " "}
                                sx={{ mb: 0 }}
                                inputProps={{ tabIndex: 2 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                        )}
                    />

                    <ForgetPwComponent t={t} handleOpen={handleOpen} />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 1,
                            mb: 2,
                            textTransform: 'none'
                        }}
                        tabIndex={3}
                        loading={isLoading}
                    >
                        {isLoading ? t('text-btn-sign-in-pending') : t('text-btn-sign-in')}

                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => { router.push("/sign-up"); }}
                        fullWidth
                        sx={{
                            textTransform: 'none'
                        }}
                        tabIndex={4}
                    >
                        {t('text-btn-sign-up')}
                    </Button>


                </Box>

                <ForgetPwModal handleClose={handleClose} open={open} />
            </Paper>
        </Container>
    )
}

type ForgetPwType = {
    t: ReturnType<typeof useTranslations>
    handleOpen: () => void
}

function ForgetPwComponent({ t, handleOpen }: ForgetPwType) {

    return (
        <Stack alignItems={'flex-end'} justifyContent={'center'}>
            <Typography
                onClick={handleOpen}

                component="a" variant="caption" className=" text-blue-700 hover:underline cursor-pointer" fontSize={'13px'} >
                {t('text-forget-pw')}
            </Typography>

        </Stack>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    outline: 'none',
    boxShadow: 24,
};

interface ForgetPwModalInterface {
    handleClose: () => void,
    open: boolean
}

function ForgetPwModal({ open, handleClose }: ForgetPwModalInterface) {

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<FormSendEmailType>({
        resolver: zodResolver(SendEmailFormSchema),
        defaultValues: {
            email_forget: ""
        }
    });

    const [isLoading, setIsLoading] = React.useState(false)

    const notifications = useNotifications()

    const handleCloseModal = () => {
        reset()
        return handleClose()
    }

    const onSubmit: SubmitHandler<FormSendEmailType> = async (data) => {
        setIsLoading(true)

        try {
            const res = await forgetPassword(data.email_forget)
            if (res.status) notifications.show(res.data.message + "", { severity: 'success' })
        } catch (error) {
            setError('email_forget', {
                type: 'manual',
                message: 'Error !'
            })
            return notifications.show(error + "", { severity: 'error' })
        } finally {
            setIsLoading(false)
        }
        return handleCloseModal()
    }

    return (
        <Modal
            open={open}
            onClose={(_, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    // chặn đóng khi click ngoài hoặc nhấn ESC
                    return;
                }
                handleCloseModal(); // chỉ cho phép đóng khi bạn muốn
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableRestoreFocus={true}
        >
            <Box sx={style}>
                <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 1, px: 1 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Forget password
                    </Typography>

                    <IconButton aria-label="delete" color="primary" onClick={handleCloseModal}>
                        <ClearIcon />
                    </IconButton>
                </Stack>


                <Box noValidate component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, px: 4, pb: 2 }} >

                    <FormLabel id="email_forget">Please enter your email account</FormLabel>

                    <Controller
                        name="email_forget"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                margin="normal"
                                fullWidth
                                id="email_forget"
                                label="Email"
                                autoComplete="email"
                                autoFocus
                                required={true}
                                error={!!errors.email_forget}
                                helperText={errors.email_forget?.message ? errors.email_forget?.message : " "}
                            />
                        )}
                    />



                    <Stack direction={'column'} spacing={1}>
                        <Button loading={isLoading}
                            type="submit"
                            variant="contained"
                            sx={{ textTransform: 'none' }}
                        >
                            Send Code
                        </Button>
                        <Button variant="outlined" onClick={() => handleCloseModal()} sx={{ textTransform: 'none' }}>Cancel</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

