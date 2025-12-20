import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../assets/Header/AdminHeader";
import Sidebar from "../../assets/Sidebar/Sidebar";

const AdminLayout = () => {
    return (
        <Stack direction={{sm:"column", md:"row"}} minHeight={"100vh"} sx={{
            bgcolor:"#f8fafc"
        }}>
            <Sidebar />
            <Box width={"100%"}>
            <AdminHeader />
            <Outlet />
            </Box>
        </Stack>
    );
}
export default AdminLayout;