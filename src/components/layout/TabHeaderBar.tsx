import { Box, Stack, Tab, Tabs } from "@mui/material";
import React from "react";
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { usePathname, useRouter } from "next/navigation";

function samePageLinkNavigation(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}

interface LinkTabProps {
    icon?: string | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | undefined;
    href?: string;
    selected?: boolean;
}

function LinkTab(props: LinkTabProps) {
    const router = useRouter();
    return (
        <Tab
            component="a"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                // Routing libraries handle this, you can remove the onClick handle when using them.
                if (samePageLinkNavigation(event)) {
                    event.preventDefault();
                    console.log('event', props.href)
                    router.push(props.href as string)
                }
            }}
            aria-current={props.selected && 'page'}
            icon={props.icon}
            {...props}
        />
    );
}



function TabHeaderBar() {
    // const [value, setValue] = React.useState(0);
    const pathname = usePathname();

    // xác định tab nào được chọn dựa trên URL hiện tại
    const value = React.useMemo(() => {
        if (pathname.startsWith("/friends")) return 1;
        return 0;
    }, [pathname]);

    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //     // event.type can be equal to focus with selectionFollowsFocus.
    //     if (
    //         event.type !== 'click' ||
    //         (event.type === 'click' &&
    //             samePageLinkNavigation(
    //                 event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    //             ))
    //     ) {
    //         setValue(newValue);
    //     }
    // };
    return (
        <Stack direction={'row'} justifyContent={'center'}>
            <Box sx={{ width: 300 }}>
                <Tabs
                    value={value}
                    // onChange={handleChange}
                    aria-label="nav tabs"
                    variant="fullWidth"
                    role="navigation"
                >
                    <LinkTab icon={<HomeFilledIcon />} href="/" />
                    <LinkTab icon={<PeopleAltIcon />} href="/friends" />
                </Tabs>
            </Box>
        </Stack>
    );
}

export default TabHeaderBar;