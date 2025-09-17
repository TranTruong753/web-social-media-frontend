'use client'
import { Box, Button, Container, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { LockOutlined } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { signin } from "@/app/actions/auth";
import { useNotifications } from "@toolpad/core";
import { useRouter } from "next/navigation";


const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function LoginForm() {

    const t = useTranslations('SignInPage');

    const notifications = useNotifications();

    const router = useRouter()

    const [state, action, isPending] = useActionState(signin, undefined)

    useEffect(() => {
        if (!state?.message) return;
        
        notifications.show(state.message, {
            severity: state.success ? "success" : "error",
        });

        if (state.success) {
            router.push("/");
        }
    }, [state, notifications]);



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

                <Box component="form" action={action} sx={{ mt: 1, width: '100%' }}>

                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={!!state?.errors?.email}
                        helperText={state?.errors?.email ? t('text-error-form.email') : " "}
                        sx={{ mb: 0 }}
                        inputProps={{ tabIndex: 1 }}
                        defaultValue={state?.values?.email ?? ''}
                    />

                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        name="password"
                        label={t('text-field-pw')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={!!state?.errors?.password}
                        helperText={state?.errors?.password ? t('text-error-form.password') : " "}
                        sx={{ mb: 0 }}
                        inputProps={{ tabIndex: 2 }}
                        defaultValue={state?.values?.password ?? ''}
                    />


                    <Stack alignItems={'flex-end'} justifyContent={'center'}>
                        <Link href="/sign-in/identify" underline="hover" fontSize={'14px'}  >
                            {t('text-forget-pw')}
                        </Link>
                    </Stack>

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
                        // disabled={isPending}
                        loading={isPending}
                    >
                        {isPending ? t('text-btn-sign-in-pending') : t('text-btn-sign-in')}

                    </Button>

                    <Button
                        variant="outlined"
                        onClick={()=>{router.push("/sign-up");}}
                        fullWidth
                        sx={{
                            textTransform: 'none'
                        }}
                        tabIndex={4}
                    >
                        {t('text-btn-sign-up')}
                    </Button>


                </Box>
            </Paper>
        </Container>
    )
}