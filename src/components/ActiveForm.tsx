'use client'
import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useActionState } from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useTranslations } from "next-intl";
import { useNotifications } from "@toolpad/core";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { sleep } from "@/lib/utils";
import { ActivateFormSchema } from "@/lib/definitions";
import { activateAccountApi, resendCodeApi } from "@/services/authServices";
import { useCountdown } from "@/hooks/useCountdown";



const COUNTDOWN_EVENT = 'countdown-update';

export default function ActiveForm() {
    const t = useTranslations('ActivatePage');

    const notifications = useNotifications()

    const router = useRouter()

    const searchParams = useSearchParams()

    const id = searchParams.get("id")

    const [countdown, setCountdown] = React.useState(5)

    const activateAccount = async (
        _: any,
        formData: FormData
    ) => {
        const values = {
            id: id,
            codeId: formData.get('activeCode') as string,
        }

        const validatedFields = ActivateFormSchema.safeParse(values)

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                values,
            }
        }

        try {
            await sleep(2000);
            const res = await activateAccountApi(values) // axios throw nếu lỗi
            if (res?.status) {
                console.log("res", res)
                return {
                    success: true,
                    message: "Kích hoạt tài khoản thông tin thành công!"
                };
            }
            return { success: true, message: "CÓ lỗi gì đang xảy ra! chúng tôi sẽ khác phục sớm" };
        } catch (err: any) {
            console.log("err", err.message)
            return {
                values,
                success: false,
                message: err.message || "Kích hoạt tài khoản thất bại!", // ✅ thống nhất errors
            }
        }

    }

    const [state, action, isPending] = useActionState(activateAccount, undefined)


    React.useEffect(() => {
        if (!state?.message) return;

        if (countdown <= 0 && state.success) {
             router.push("/sign-in");
             return
        }
        
        const timer = setTimeout(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);

    }, [countdown, state])

    React.useEffect(() => {

        if (!state?.message) return;

        if (state.success) {
            notifications.show("Activation successful! Go to sign in link after 5 seconds", {
                severity: "info",
            });

        } else {
            notifications.show(state.message, {
                severity: "error",
            });
        }

    }, [state])

    return (
        <Container maxWidth="md">

            {state?.success ?
                <React.Fragment>
                    <Paper sx={{ p: 4, mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Stack alignItems={'center'} >
                            <Typography component={'span'} variant="caption" noWrap fontSize={'16px'} fontWeight={'normal'}>
                                {t('text-success')}
                                <Link href={"/sign-in"} className=" hover:underline"  > {t('text-link-return')}</Link>
                            </Typography>
                            <Typography>
                                Activation successful! Go to sign in link after {countdown} seconds
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


                            <Box noValidate action={action} component="form" sx={{ mt: 1, width: '100%' }}>

                                <TextField
                                    size="small"
                                    margin="normal"
                                    fullWidth
                                    id="activeCode"
                                    label={t('text-field-codeId')}
                                    name="activeCode"
                                    sx={{ mb: 0 }}
                                    error={!!state?.errors?.codeId}
                                    helperText={state?.errors?.codeId ? state?.errors?.codeId : " "}
                                    defaultValue={state?.values?.codeId ?? ''}
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
                                    loading={isPending}
                                >
                                    {isPending ? t('text-btn-activate-pending') : t('text-btn-activate')}
                                </Button>

                                <ResendCodeComponent id={id} t={t}/>

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
    t : ReturnType<typeof useTranslations>
}


function ResendCodeComponent({id, t }: ResendCodeComponentType) {

    const { startCountdown, getCountdown, isCounting } = useCountdown();

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
            const res = await resendCodeApi(id)
            console.log("res", res)
            if (res.status === 201) {
                console.log("gửi thành công!")
            }
        } catch (error) {

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
                    Gửi yêu cầu lần tiếp theo: {displayCountdown}s
                </Typography>
            ) : (
                <Typography component={'span'} variant="caption" noWrap fontSize={'14px'} fontWeight={'normal'}>
                    <Link href="#" onClick={() => handleResendCode()} className="hover:underline hover:text-blue-500 transition-all" >{t('text-caption')}</Link>
                </Typography>
            )}

        </Stack>
    )
}