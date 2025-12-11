import { Outlet } from "react-router-dom";
import Header from "../../assets/Header/Header.jsx";
import Footer from "../../assets/Footer/Footer.jsx";

const PublicLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default PublicLayout;