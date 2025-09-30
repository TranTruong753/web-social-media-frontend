'use client'
import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useTranslations } from "next-intl";
import { useNotifications } from "@toolpad/core";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { sleep } from "@/lib/utils";
import { ActivateFormSchema, FormActivateType } from "@/lib/definitions";
import { activateAccountApi, resendCodeApi } from "@/services/authServices";
import { useCountdown, useCountdownVer2 } from "@/hooks/useCountdown";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

const COUNTDOWN_EVENT = 'countdown-update';

export default function ActiveForm() {
    const t = useTranslations('ActivatePage');

    const notifications = useNotifications()

    const router = useRouter()

    const searchParams = useSearchParams()

    const id = searchParams.get("id")

    const [isLoading, setIsLoading] = React.useState(false)

    const [isSuccess, setIsSuccess] = React.useState(false)

    const { countdown, startCountdown } = useCountdownVer2();

    const formInitialState = {
        codeId: ""
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormActivateType>({
        resolver: zodResolver(ActivateFormSchema),
        defaultValues: formInitialState
    })


    const onSubmit: SubmitHandler<FormActivateType> = async (data) => {
        if (!id) return notifications.show("There is an error with the system, we will fix it soon!", {
            severity: "error",
        });
        setIsLoading(true)
        const values = {
            id: id,
            codeId: data.codeId,
        }
        try {
            await sleep(2000);
            const res = await activateAccountApi(values) // axios throw nếu lỗi
            if (res?.status) {
                startCountdown(5)
                setIsSuccess(true)
                return notifications.show(t('text-form-submit.success'), {
                    severity: "info",
                });
            }

        } catch (error) {
            setIsSuccess(false)
            const err = error as AxiosError
            if (err.response?.status === 404 || err.response?.status === 404 ) return notifications.show(t('text-form-submit.failed'), { severity: 'error' })

            if (err.response?.status === 409 ) return notifications.show(t('text-form-submit.conflict'), { severity: 'error' })

            return notifications.show(t('text-form-submit.error'), {
                severity: "error",
            });

        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {

        if (countdown === 0) {
            router.push("/sign-in");
            return
        }

    }, [countdown])


    return (
        <Container maxWidth="md">

            {isSuccess ?
                <React.Fragment>
                    <Paper sx={{ p: 4, mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Stack alignItems={'center'} >
                            <Typography component={'span'} variant="caption" noWrap fontSize={'16px'} fontWeight={'normal'}>
                                {t('text-success')}
                                <Link href={"/sign-in"} className=" hover:underline"  > {t('text-link-return')}</Link>
                            </Typography>
                            <Typography>
                                {t('text-router.title')} {countdown} {t('text-router.unit')} 
                            </Typography>
                        </Stack>
                    </Paper>

                </React.Fragment>
                :
                <React.Fragment>
                    <Container maxWidth="xs">
                        <Paper elevation={3} sx={{ p: 4, mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <LockOpenIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                            <Typography component="h1" variant="h5" noWrap fontSize={'21px'} fontWeight={'bold'}>
                                {t('title')}
                            </Typography>


                            <Box noValidate
                                // action={action} 
                                onSubmit={handleSubmit(onSubmit)}
                                component="form" sx={{ mt: 1, width: '100%' }}>

                                <Controller
                                    control={control}
                                    name="codeId"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            size="small"
                                            margin="normal"
                                            fullWidth
                                            id="codeId"
                                            label={t('text-field-codeId')}
                                            sx={{ mb: 0 }}
                                            error={!!errors.codeId}
                                            helperText={errors.codeId ? errors.codeId.message : " "}                             
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
                                    {isLoading ? t('text-btn-activate-pending') : t('text-btn-activate')}
                                </Button>

                                <ResendCodeComponent id={id} t={t} />

                            </Box>
                        </Paper>
                    </Container>
                </React.Fragment>
            }



        </Container>
    );
}

type ResendCodeComponentType = {
    id: string | null,
    t: ReturnType<typeof useTranslations>
}


function ResendCodeComponent({ id, t }: ResendCodeComponentType) {

    const notifications = useNotifications()

    const { startCountdown, getCountdown } = useCountdown();

    const [displayCountdown, setDisplayCountdown] = React.useState(getCountdown());

    React.useEffect(() => {
        const handleCountdownUpdate = (event: CustomEvent<{ countdown: number }>) => {
            setDisplayCountdown(event.detail.countdown);
        };

        window.addEventListener(COUNTDOWN_EVENT, handleCountdownUpdate as EventListener);
        return () => {
            window.removeEventListener(COUNTDOWN_EVENT, handleCountdownUpdate as EventListener);
        };
    }, []);


    const handleResendCode = async () => {
        if (!id) return

        startCountdown(30)

        try {
            await resendCodeApi(id)
        } catch (error) {
            return notifications.show(t('text-form-submit.error'), {
                severity: "error",
            });
        }
    }

    return (
        <Stack alignItems={'center'}>
            {displayCountdown > 0 ? (
                <Typography sx={{
                    fontSize: "14px",
                    color: "#919EAB",
                    textAlign: "center"
                }}>
                   {t('text-resend-code')} {displayCountdown}s
                </Typography>
            ) : (
                <Typography component={'span'} variant="caption" noWrap fontSize={'14px'} fontWeight={'normal'}>
                    <Link href="#" onClick={() => handleResendCode()} className="hover:underline hover:text-blue-500 transition-all" >{t('text-caption')}</Link>
                </Typography>
            )}

        </Stack>
    )
}