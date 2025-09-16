'use client'
import { Box, Button, Container, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useTranslations } from "next-intl";

export default function ActiveForm() {
    const t = useTranslations('ActivatePage');
    
    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LockOpenIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography component="h1" variant="h5" noWrap fontSize={'21px'} fontWeight={'bold'}>
                    {t('title')}
                </Typography>


                <Box noValidate component="form" sx={{ mt: 1, width: '100%' }}>

                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        id="activeCode"
                        label= {t('text-field-codeId')}
                        name="activeCode"
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
                        {t('text-btn-activate')}
                    </Button>

                    <Stack alignItems={'center'}>
                        <Typography component={'span'} variant="caption" noWrap fontSize={'14px'} fontWeight={'normal'}>

                            <Link href="#" underline="hover" >{t('text-caption')}</Link>
                        </Typography>
                    </Stack>

                </Box>
            </Paper>
        </Container>
    );
}