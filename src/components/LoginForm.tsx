'use client'
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { LockOutlined } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { useTranslations } from "next-intl";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function LoginForm() {

    const t = useTranslations('SigninPage');

    const handleLogin = () => {
        let link = ''
        if (API_URL) {
            link = `${API_URL}/auth/google`
        }
        window.location.href = link;
    };


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
                    onClick={handleLogin}
                    
                >                  
                    {t('text-btn-sign-email')}
                </Button>


                <Box component={'span'} sx={{ m: 1, width: '100%', height: '1px', background: '#aaa' }}></Box>

                <Box component="form" sx={{ mt: 1, width: '100%' }}>

                    <TextField
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    // disabled={isPending}
                    >
                        {/* {isPending ? 'Đang xử lý...' : 'Đăng nhập'} */}
                        Đăng nhập
                    </Button>


                </Box>
            </Paper>
        </Container>
    )
}