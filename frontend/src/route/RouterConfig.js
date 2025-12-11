import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../pages/Layout/PublicLayout";
import Homepage from "../pages/Home/Homepage";
import Contact from "../pages/Contact/Contact";
import Dealer from "../pages/Dealer/Dealer";
import Catalogue from "../pages/Catalogue/Catalogue";
import CompanyInfo from "../pages/About/CompanyInfo";
import Product from "../pages/Product/Product";
import SingleProduct from "../pages/Product/SingleProduct";
import Project from "../pages/Project/Project";
import Career from "../pages/Career/Career";
import Certification from "../pages/Certificate/Certification";
import FAQ from "../pages/FAQ/FAQ";
import Policy from "../pages/FAQ/Policy";
import NewsArticle from "../pages/News&Article/NewsArticle";
import BuyingGuide from "../pages/BuyingGuide/BuyingGuide";
import TandC from "../pages/FAQ/TandC";

export const RouterConfig = createBrowserRouter([
    {
        path: "/",
        Component: PublicLayout,
        children: [
            { path: "", Component: Homepage },
            { path: "company-information", Component: CompanyInfo },
            { path: "product", Component: Product },
            { path: "01", Component: SingleProduct },
            { path: "catalogues", Component: Catalogue },
            { path: "dealer", Component: Dealer },
            { path: "contact", Component: Contact },

            //extra in footers
            { path: "project", Component: Project },
            { path: "career", Component: Career },
            { path: "certification", Component: Certification },
            { path: "news-article", Component: NewsArticle },
            { path: "buying-guide", Component: BuyingGuide },
            { path: "faq", Component: FAQ },
            { path: "privacy-policy", Component: Policy},
            { path: "terms-conditions", Component: TandC}
        ],
    }
]);