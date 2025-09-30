'use client'
import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import LockResetIcon from '@mui/icons-material/LockReset';
import React from "react";
import Link from "next/link";
import { useNotifications } from "@toolpad/core";
import { changePassword } from "@/services/authServices";
import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import { sleep } from "@/lib/utils";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePwFormSchema, FormChangePwType } from "@/lib/definitions";
import { useTranslations } from "next-intl";

export default function ResetPwForm() {

    const t = useTranslations('ResetPasswordPage');

    const notifications = useNotifications()

    const searchParams = useSearchParams()

    const [isLoading, setIsLoading] = React.useState(false)

    const id = searchParams.get("id")

    const codeId = searchParams.get("code")

    const router = useRouter()

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<FormChangePwType>({
        resolver: zodResolver(ChangePwFormSchema),
        defaultValues: {
            password: ""
        }
    });

    const onSubmit: SubmitHandler<FormChangePwType> = async (data) => {
        if (!id || !codeId) return notifications.show(t('text-error-link'), { severity: 'error' })

        setIsLoading(true)

        try {
            const res = await changePassword(id, codeId, data.password)
            if (res.status) {
                notifications.show(t('text-success'), { severity: 'success' })
                await sleep(2000)
                router.push('/sign-in')
            }

        } catch (error) {
            const err = error as AxiosError

            if (err.response?.status === 404 || err.response?.status === 400)
                return notifications.show(t('text-error-link'), { severity: 'error' })

            return notifications.show(t('text-error'), { severity: 'error' })
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LockResetIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />

                <Typography component="h1" variant="h5" noWrap fontSize={'21px'} fontWeight={'bold'}>
                    {t('title')}
                </Typography>


                <Box id="form-reset" noValidate component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                margin="normal"
                                fullWidth
                                label={t('text-field-pw')}
                                type="password"
                                id="password"
                                autoComplete="password"
                                error={!!errors.password}
                                helperText={errors.password ? t('text-error-form.password') : " "}
                                sx={{ mb: 0 }}
                            />
                        )}
                    />

                </Box>

                <Button
                    form={"form-reset"}
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
                    {isLoading ? t('text-btn-change-pending') : t('text-btn-change')}

                </Button>


                <Stack alignItems={'center'}>
                    <Typography component={'span'} variant="caption" noWrap fontSize={'14px'} fontWeight={'normal'}>
                        {t('text-caption')}
                        <Link href={"/sign-in"} className=" hover:underline"> {t('text-link')}</Link>
                    </Typography>
                </Stack>

            </Paper>
        </Container>
    );
}