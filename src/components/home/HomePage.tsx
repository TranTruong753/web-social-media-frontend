"use client";
import LeftSidebar from "@/components/layout/LeftSidebar";
import MainFeed from "@/components/layout/MainFeed";
import RightSidebar from "@/components/layout/RightSidebar";
import { Box, Grid } from "@mui/material";

function HomePage() {
    return (
        <Box sx={{ flexGrow: 1, backgroundColor: 'background.default', p:1 }}>


            <Grid container spacing={2}>

                {/* Left Sidebar - for navigation */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <LeftSidebar />
                </Grid>

                {/* Main Feed - for content */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <MainFeed />
                </Grid>

                {/* Right Sidebar - for widgets */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <RightSidebar />
                </Grid>
            </Grid>
        </Box>
    );
}

export default HomePage;