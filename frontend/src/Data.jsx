/**
 * Menu data structure for navigation, used as a fallback or mock data.
 * @type {Array<Object>}
 */
export const tempMenuList = [
    { id: 1, title: 'Home', link: '/', parentId: null },
    { id: 2, title: 'Company Information', link: '/company-information', parentId: null },
    { id: 3, title: 'Product', link: '/product', parentId: null },
    { id: 4, title: 'Catalogues', link: '/catalogues', parentId: null },
    { id: 5, title: 'Dealer', link: '/dealer', parentId: null },
    { id: 6, title: 'Contact', link: '/contact', parentId: null },
    { id: 7, title: 'Water Closet', link: '/product', parentId: 3 },
    { id: 11, title: 'Wall Hung Toilet', link: '/product', parentId: 7 },
    { id: 12, title: 'One Piece Toilet', link: '/product', parentId: 7 },
    { id: 13, title: 'Two Piece Toilet', link: '/product', parentId: 7 },
    { id: 14, title: 'Squat Asian Pan', link: '/product', parentId: 7 },
    { id: 8, title: 'Wash Basin', link: '/product', parentId: 3 },
    { id: 15, title: 'Above Counter Basin', link: '/product', parentId: 8 },
    { id: 16, title: 'Counter Top Basin', link: '/product', parentId: 8 },
    { id: 17, title: 'Padestal Basins', link: '/product', parentId: 8 },
    { id: 18, title: 'Half Padestal Basin', link: '/product', parentId: 8 },
    { id: 19, title: 'Under Counter Basin', link: '/product', parentId: 8 },
    { id: 9, title: 'Public Area', link: '/product', parentId: 3 },
    { id: 20, title: 'Flush Valve Toilets', link: '/product', parentId: 9 },
    { id: 21, title: 'Wall Hung Toilets', link: '/product', parentId: 9 },
    { id: 22, title: 'Urinal', link: '/product', parentId: 9 },
    { id: 23, title: 'Concealed Tanks', link: '/product', parentId: 9 },
    { id: 10, title: 'Bathware', link: '/product', parentId: 3 },
    { id: 24, title: 'Faucet', link: '/product', parentId: 10 },
    { id: 25, title: 'Shower Mixer', link: '/product', parentId: 10 },
    { id: 26, title: 'Fixed Shower Head', link: '/product', parentId: 10 },
    { id: 27, title: 'Hand Shower', link: '/product', parentId: 10 },
    { id: 28, title: 'Bath Accessories', link: '/product', parentId: 10 },
];



import StarIcon from '@mui/icons-material/Star';
export const homePagePropsList = [{
    id: 1,
    title: "Coating Technology",
    details: "Advanced coating creates ultra-smooth surfaces, preventing stains and germs."
},
{
    id: 2,
    title: "Green Innovation",
    details: "Eco-friendly toilet technology saves water and supports sustainable living."
},
{
    id: 3,
    title: "Clean Comfort",
    details: "Easy-clean design ensures hygiene, comfort, and effortless maintenance."
}];



export const catalogyList = [
    { id: "B001", title: "Sanitaryware" },
    { id: "B002", title: "Wash Basins" },
    { id: "B003", title: "Toilets & WC" },
    { id: "B004", title: "Urinals" },
    { id: "B005", title: "Bidets" },

    { id: "B006", title: "Faucets & Taps" },
    { id: "B007", title: "Basin Mixers" },
    { id: "B008", title: "Kitchen Taps" },
    { id: "B009", title: "Shower Mixers" },
    { id: "B010", title: "Sensor Taps" },

    { id: "B011", title: "Showers" },
    { id: "B012", title: "Overhead Showers" },
    { id: "B013", title: "Hand Showers" },
    { id: "B014", title: "Shower Panels" },
    { id: "B015", title: "Shower Arms" },

    { id: "B016", title: "Bath Fittings" },
    { id: "B017", title: "Angle Valves" },
    { id: "B018", title: "Stop Cocks" },
    { id: "B019", title: "Bottle Traps" },
    { id: "B020", title: "Waste Couplings" },

    { id: "B021", title: "Bath Accessories" },
    { id: "B022", title: "Towel Rails" },
    { id: "B023", title: "Soap Holders" },
    { id: "B024", title: "Robe Hooks" },
    { id: "B025", title: "Mirror Cabinets" },

    { id: "B026", title: "Drainage & Plumbing" },
    { id: "B027", title: "Floor Drains" },
    { id: "B028", title: "Pipes & Fittings" },
    { id: "B029", title: "Traps & Connectors" }
]



import productImg from './img/productImg.jpg';
import productImg1 from './img/prdct1.png';
import productImg2 from './img/prdct2.jpg';
import productImg3 from './img/prdct3.jpg';
import productImg4 from './img/prdct4.jpg';
import productImg5 from './img/prdct5.jpg';
import productImg6 from './img/prdct6.png';
import productImg7 from './img/prdct7.png';
import productImg8 from './img/prdct8.png';
export const homePageProductList = [
    {
        id: 1,
        imgSrc: productImg1,
        productName: 'Water Closet',
        url: '',
    },
    {
        id: 2,
        imgSrc: productImg2,
        productName: 'Wash Basin',
        url: '',
    },
    {
        id: 3,
        imgSrc: productImg3,
        productName: 'Urinal',
        url: '',
    },
    {
        id: 4,
        imgSrc: productImg4,
        productName: 'Public Area',
        url: '',
    },
    {
        id: 5,
        imgSrc: productImg5,
        productName: 'SQUAT ASIAN PAN',
        url: '',
    },
    {
        id: 6,
        imgSrc: productImg6,
        productName: 'Faucet',
        url: '',
    },
    {
        id: 7,
        imgSrc: productImg7,
        productName: 'Shower Mixer',
        url: '',
    },
    {
        id: 8,
        imgSrc: productImg8,
        productName: 'Accessories',
        url: '',
    },
];




export const dealerDetailList = [
    {
        id: 1,
        name: "Dealer One",
        address: "123 Main St, City, Country",
        phone: "+1234567890",
        email: ""
    },
    {
        id: 2,
        name: "Dealer Two",
        address: "123 Main St, City, Country",
        phone: "+1234567890",
        email: ""
    },
    {
        id: 3,
        name: "Dealer Three",
        address: "123 Main St, City, Country",
        phone: "+1234567890",
        email: ""
    },
    {
        id: 4,
        name: "Dealer Four",
        address: "123 Main St, City, Country",
        phone: "",
        email: ""
    },
    {
        id: 5,
        name: "Dealer Five",
        address: "123 Main St, City, Country",
        phone: "+1234567890",
        email: ""
    },
    {
        id: 6,
        name: "Dealer Six",
        address: "123 Main St, City, Country",
        phone: "+1234567890",
        email: ""
    }
]




export const catalogueList = [
    {
        id: 1,
        title: "Catalogue One",
        url: "",
        imgSrc: productImg,
        details: "lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        score: 4.5
    },
    {
        id: 2,
        title: "Catalogue Two",
        url: "",
        imgSrc: productImg,
        details: "lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        score: 4.0
    },
    {
        id: 3,
        title: "Catalogue Three",
        url: "",
        imgSrc: productImg,
        details: "lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        score: 3.5
    }]

export const seriesList = [
    {
        id: 1,
        title: "Catalogue One",
        url: "",
        imgSrc: productImg,
        details: "lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        score: 4.5
    },
    {
        id: 2,
        title: "Catalogue Two",
        url: "",
        imgSrc: productImg,
        details: "lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        score: 4.0
    },
    {
        id: 3,
        title: "Catalogue Three",
        url: "",
        imgSrc: productImg,
        details: "lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        score: 3.5
    },
    {
        id: 4,
        title: "Catalogue Four",
        url: "",
        imgSrc: productImg,
        details: "lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        score: 3.5
    }]



export const faqQuestions = [
    {
        id: 1,
        question: "What is Charu Ceramic?",
        answer: "Charu Ceramic is a premium Bangladeshi sanitaryware manufacturer known for blending modern technology with artistic craftsmanship. Under the COTTO brand, they deliver stylish, durable, and high-performance bathroom solutions designed for modern living."
    },
    {
        id: 2,
        question: "Where are Charu Ceramic products made?",
        answer: "All Charu Ceramic products are manufactured in Bangladesh using world-class production facilities and sustainable methods that ensure both quality and efficiency at every stage of production."
    },
    {
        id: 3,
        question: "What types of products does Charu Ceramic offer?",
        answer: "Charu Ceramic offers one-piece and two-piece toilets, wall-hung models, basins, pedestals, urinals, bidets, flushing systems, and bathroom accessories designed for homes, hotels, and commercial projects."
    },
    {
        id: 4,
        question: "How does Charu Ceramic ensure product quality?",
        answer: "Every product undergoes multi-level quality inspections, from raw material selection to firing and final water tests, ensuring excellent glaze finish, high durability, and zero water leakage."
    },
    {
        id: 5,
        question: "Are Charu Ceramic products eco-friendly?",
        answer: "Yes. Charu Ceramic integrates eco-conscious manufacturing processes and water-saving designs, using low-flush systems, non-toxic glazing, and recyclable materials to reduce environmental impact."
    },
    {
        id: 6,
        question: "What are Charu Ceramic’s Green Building Solutions?",
        answer: "Charu Ceramic supports Green Building and LEED-certified projects by producing sanitaryware that reduces water consumption and meets environmental standards. Their dual-flush technology, efficient flushing systems, and sustainable glazing materials help architects and builders achieve energy-efficient and eco-certified goals."
    },
    {
        id: 7,
        question: "What is Charu Ceramic’s ISO 9001:2015 certification?",
        answer: "Charu Ceramic is ISO 9001:2015 certified, ensuring that their production, management, and customer service processes meet international quality standards and reflect their commitment to consistency and continuous improvement."
    },
    {
        id: 8,
        question: "What kind of technologically advanced productions does Charu Ceramic offer?",
        answer: "Charu Ceramic uses advanced high-pressure casting, robotic glazing, automatic shuttle and tunnel kilns, and computerized quality testing. Their digital water performance labs simulate real-life use to optimize flushing efficiency and user comfort."
    },
    {
        id: 9,
        question: "Where can I buy Charu Ceramic products?",
        answer: "Charu Ceramic products are available through a nationwide network of authorized dealers and showrooms. Customers can also browse collections online or connect through official social media pages."
    },
    {
        id: 10,
        question: "Does Charu Ceramic provide warranty and after-sales service?",
        answer: "Yes. Charu Ceramic offers comprehensive product warranties and a responsive after-sales service team for smooth installation, maintenance, and long-term satisfaction."
    },
    {
        id: 11,
        question: "Can Charu Ceramic products be customized?",
        answer: "Yes. Charu Ceramic collaborates with developers, architects, and hospitality projects to deliver customized solutions, including color tones and design specifications."
    },
    {
        id: 12,
        question: "What makes Charu Ceramic different from other brands?",
        answer: "Charu Ceramic stands out for its ‘Heart and Craftsmanship’ — a fusion of modern design, advanced technology, and Bangladeshi artistry. Their promise: ‘Stylish Living — From our heart to your home.’"
    },
    {
        id: 13,
        question: "How can I contact Charu Ceramic for inquiries or dealership opportunities?",
        answer: "You can reach Charu Ceramic through their official website, social media channels, or directly at their corporate office. They welcome dealership collaborations and project partnerships with professionals across Bangladesh."
    }
]


import pdf1 from "./assets/pdf/pdf1.pdf";
import pdf2 from "./assets/pdf/pdf2.pdf";
import pdf3 from "./assets/pdf/pdf3.pdf";
export const buyingGuideList = [{
    id: 1,
    title: "High Commode Price in Bangladesh: A Water Closets Buying Guide",
    tag: "Buying Guide",
    header: "High Commode",
    pdf: pdf1
},{
    id: 2,
    title: "A Guide to Choosing the Perfect Wash Basin in Bangladesh",
    tag: "Buying Guide",
    header: "Wash Basin",
    pdf: pdf2
},
{
    id: 3,
    title: "Ultimate Water Closet Buying Guide in Bangladesh",
    tag: "Buying Guide",
    header: "Water Closet",
    pdf: pdf3
}]