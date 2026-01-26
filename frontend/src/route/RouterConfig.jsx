import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

// 1. Regular Imports (Layouts and Critical Components)
import PublicLayout from "../pages/Layout/PublicLayout";
import ProtectedRoute from "./ProtectedRoute";
import NoPage from "../pages/NoPage";
import { Box, CircularProgress } from "@mui/material";
import CreateMetaTag from "../pages/Home/CreateMetaTag";
import MetaTagList from "../pages/Home/MetaTagList";

// 2. Lazy Loaded Pages (Public)
const Homepage = lazy(() => import("../pages/Home/Homepage"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Dealer = lazy(() => import("../pages/Dealer/Dealer"));
const Catalogue = lazy(() => import("../pages/Catalogue/Catalogue"));
const CompanyInfo = lazy(() => import("../pages/About/CompanyInfo"));
const Product = lazy(() => import("../pages/Product/Product"));
const SingleProduct = lazy(() => import("../pages/Product/SingleProduct"));
const Project = lazy(() => import("../pages/Project/Project"));
const Career = lazy(() => import("../pages/Career/Career"));
const Certification = lazy(() => import("../pages/Certificate/Certification"));
const FAQ = lazy(() => import("../pages/FAQ/FAQ"));
const Policy = lazy(() => import("../pages/FAQ/Policy"));
const NewsArticle = lazy(() => import("../pages/News&Article/NewsArticle"));
const SingleNews = lazy(() => import("../pages/News&Article/SingleNews"));
const BuyingGuide = lazy(() => import("../pages/BuyingGuide/BuyingGuide"));
const SingleGuide = lazy(() => import("../pages/BuyingGuide/SingleGuide"));
const TandC = lazy(() => import("../pages/FAQ/TandC"));
const Login = lazy(() => import("../pages/Layout/Login"));

// 3. Lazy Loaded Pages (Admin/Dashboard)
const AdminLayout = lazy(() => import("../pages/Layout/AdminLayout"));
const CreateDealer = lazy(() => import("../pages/Dealer/CreateDealer"));
const DealerList = lazy(() => import("../pages/Dealer/DealerList"));
const CategoryList = lazy(() => import("../pages/Product/CategoryList"));
const CreateCategory = lazy(() => import("../pages/Product/CreateCategory"));
const CreateFAQ = lazy(() => import("../pages/FAQ/CreateFAQ"));
const FAQList = lazy(() => import("../pages/FAQ/FAQList"));
const CreateBlogs = lazy(() => import("../pages/News&Article/CreateBlogs"));
const BlogList = lazy(() => import("../pages/News&Article/BlogList"));
const CreateProject = lazy(() => import("../pages/Project/CreateProject"));
const ProjectList = lazy(() => import("../pages/Project/ProjectList"));
const ProductList = lazy(() => import("../pages/Product/ProductList"));
const CreateProduct = lazy(() => import("../pages/Product/CreateProduct"));
const CreateCatalogue = lazy(() => import("../pages/Catalogue/CreateCatalogue"));
const CatalogueList = lazy(() => import("../pages/Catalogue/CatalogueList"));
const CareerList = lazy(() => import("../pages/Career/CareerList"));
const CreateGuide = lazy(() => import("../pages/BuyingGuide/CreateGuide"));
const GuideList = lazy(() => import("../pages/BuyingGuide/GuideList"));
const CreatePolicy = lazy(() => import("../pages/FAQ/CreatePolicy"));
const CreateTerms = lazy(() => import("../pages/FAQ/CreateTerms"));
const CreateBanner = lazy(() => import("../pages/Banner/CreateBanner"));
const BannerList = lazy(() => import("../pages/Banner/BannerList"));

const Loader = () => <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>

export const RouterConfig = createBrowserRouter([
    {
        path: "/login",
        element: (
            <Suspense fallback={<Loader />}>
                <Login />
            </Suspense>
        )
    },
    {
        path: "/",
        element: (
            <Suspense fallback={<Loader />}>
                <PublicLayout />
            </Suspense>
        ),
        children: [
            { path: "", element: <Homepage /> },
            { path: "company-information", element: <CompanyInfo /> },
            { path: "product", element: <Product /> },
            { path: "product/:category", element: <Product /> },
            { path: ":number", element: <SingleProduct /> },
            { path: "catalogues", element: <Catalogue /> },
            { path: "/find-a-store", element: <Dealer /> },
            { path: "contact", element: <Contact /> },
            { path: "project", element: <Project /> },
            { path: "career", element: <Career /> },
            { path: "certification", element: <Certification /> },
            { path: "news-article", element: <NewsArticle /> },
            { path: "news-article/:path", element: <SingleNews /> },
            { path: "buying-guide", element: <BuyingGuide /> },
            { path: "buying-guide/:path", element: <SingleGuide /> },
            { path: "faq", element: <FAQ /> },
            { path: "privacy-policy", element: <Policy /> },
            { path: "terms-conditions", element: <TandC /> },
        ],
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [{
            element: (
                <Suspense fallback={<Loader />}>
                    <AdminLayout />
                </Suspense>
            ),
            children: [
                { path: "dealer-panel", element: <CreateDealer /> },
                { path: "dealer-list", element: <DealerList /> },
                { path: "category-panel", element: <CreateCategory /> },
                { path: "category-list", element: <CategoryList /> },
                { path: "blog-panel", element: <CreateBlogs /> },
                { path: "blog-list", element: <BlogList /> },
                { path: "project-panel", element: <CreateProject /> },
                { path: "project-list", element: <ProjectList /> },
                { path: "product-panel", element: <CreateProduct /> },
                { path: "product-list", element: <ProductList /> },
                { path: "catalogue-panel", element: <CreateCatalogue /> },
                { path: "catalogue-list", element: <CatalogueList /> },
                { path: "career-list", element: <CareerList /> },
                { path: "career-view", element: <CatalogueList /> },
                { path: "buying-guide-panel", element: <CreateGuide /> },
                { path: "buying-guide-list", element: <GuideList /> },
                { path: "faq-panel", element: <CreateFAQ /> },
                { path: "faq-list", element: <FAQList /> },
                { path: "policy-panel", element: <CreatePolicy /> },
                { path: "terms-condition-panel", element: <CreateTerms /> },
                { path: "banner-panel", element: <CreateBanner /> },
                { path: "banner-list", element: <BannerList /> },
                { path: "meta-panel", element: <CreateMetaTag /> },
                { path: "meta-list", element: <MetaTagList /> },
            ]
        }],
    },
    { path: "/404-not-found", element: <NoPage /> },
    { path: "*", element: <NoPage /> }
]);