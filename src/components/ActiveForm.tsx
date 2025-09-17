'use client'
import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useActionState } from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useTranslations } from "next-intl";
import { activateAccount } from "@/app/actions/auth";
import { useNotifications } from "@toolpad/core";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sleep } from "@/lib/utils";


type ActiveForm = {

}


export default function ActiveForm({ }: ActiveForm) {
    const t = useTranslations('ActivatePage');

    const [state, action, isPending] = useActionState(activateAccount, undefined)

    const notifications = useNotifications()

    const router = useRouter()

    const count = React.useState(5)

    React.useEffect(() => {
        if (!state?.message) return;

        if (state.success) {
            notifications.show('Activation successful! Go to sign in link after 5 seconds', {
                severity: "info",
            });
            sleep(5000)
            router.push('/sign-in')
        } else {
            notifications.show(state.message, {
                severity: "error",
            });
        }

    }, [state, notifications])

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

                                <Stack alignItems={'center'}>
                                    <Typography component={'span'} variant="caption" noWrap fontSize={'14px'} fontWeight={'normal'}>

                                        <Link href="#" className="hover:underline hover:text-blue-500 transition-all" >{t('text-caption')}</Link>
                                    </Typography>
                                </Stack>

                            </Box>
                        </Paper>
                    </Container>
                </React.Fragment>
            }



        </Container>
    );
}