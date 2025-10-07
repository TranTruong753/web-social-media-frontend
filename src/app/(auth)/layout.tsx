import { Box } from "@mui/material";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      {children}
    </Box>
  );
}