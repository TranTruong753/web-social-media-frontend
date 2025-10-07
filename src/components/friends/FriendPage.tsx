import { Box, Grid } from "@mui/material";

function FriendPage() {
    return (
        <Box sx={{ flexGrow: 1, backgroundColor: 'background.default', p:1 }}>


            <Grid container spacing={2}>

                {/* Left Sidebar - for navigation */}
                <Grid size={{ xs: 12, md: 3 }}>
                   left
                </Grid>

                {/* Main Feed - for content */}
                <Grid size={{ xs: 12, md: 9 }}>
                    List user
                </Grid>

             
            </Grid>
        </Box>
    );
}

export default FriendPage;