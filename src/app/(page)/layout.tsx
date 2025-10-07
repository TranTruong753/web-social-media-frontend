import HeaderBar from "@/components/layout/HeaderBar";
import { Box } from "@mui/material";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box>
            <HeaderBar />
            {children}
        </Box>
    );
}