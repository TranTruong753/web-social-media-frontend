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

export default function ResetPwForm() {

    const [isLoading, setIsLoading] = React.useState(false)
    const [fieldPw, setFieldPw] = React.useState('')
    const [fieldPwError, setFieldPwError] = React.useState('')
    const notifications = useNotifications()

    const searchParams = useSearchParams()

    const id = searchParams.get("id")

    const codeId = searchParams.get("code")

    const router = useRouter()

    const resetValue = () => {
        setFieldPw('')
        setFieldPwError('')
    }

    const handleResetPw = async () => {
        console.log('id', !id)
        console.log('codeId', !codeId)
        console.log("!id || !codeId", !id || !codeId)
        if (!id || !codeId) return

        if (fieldPw === '') return setFieldPwError('Password cannot be blank!')

        setIsLoading(true)

        setFieldPwError('')

        try {
            const res = await changePassword(id, codeId, fieldPw)
            if (res.status){
                notifications.show('Update password success!', { severity: 'success' })
                await sleep(2000)
                router.push('/sign-in')
            }
        } catch (error) {
            console.log("error", error)
            if (error instanceof AxiosError) return notifications.show(error.response?.data?.message + "", { severity: 'error' })

            return notifications.show(error + "", { severity: 'error' })

        } finally {
            setIsLoading(false)
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LockResetIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />

                <Typography component="h1" variant="h5" noWrap fontSize={'21px'} fontWeight={'bold'}>
                    Reset password
                </Typography>


                <Box noValidate component="form" sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        name="password"
                        label={'New password'}
                        type="password"
                        id="password"
                        autoComplete="password"
                        error={!!fieldPwError}
                        helperText={fieldPwError ? fieldPwError : " "}
                        sx={{ mb: 0 }}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldPw(event.target.value);
                        }}
                    // inputProps={{ tabIndex: 2 }}
                    // defaultValue={state?.values?.password ?? ''}
                    />
                </Box>

                <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 1,
                        mb: 2,
                        textTransform: 'none'
                    }}
                    tabIndex={3}
                    // disabled={isPending}
                    loading={isLoading}
                    onClick={() => handleResetPw()}
                >
                    {isLoading ? 'Loading' : 'Change'}

                </Button>

                {/* <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                        // mt: 1,
                        mb: 2,
                        textTransform: 'none'
                    }}
                    tabIndex={3}
                    // disabled={isPending}
                    loading={isLoading}
                    onClick={() => handleResetPw()}
                >
                    {isLoading ? 'Loading' : 'Provide new link'}

                </Button> */}



                <Stack alignItems={'center'}>
                    <Typography component={'span'} variant="caption" noWrap fontSize={'14px'} fontWeight={'normal'}>
                        Already have an account?
                        <Link href={"/sign-in"} className=" hover:underline">   Sign in</Link>
                    </Typography>
                </Stack>

            </Paper>
        </Container>
    );
}