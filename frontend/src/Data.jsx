/**
 * Menu data structure for navigation, used as a fallback or mock data.
 * @type {Array<Object>}
 */
export const tempMenuList = [
  { id: 1, title: 'Home', link: '/', parentId: null },
  { id: 2, title: 'Company Information', link: '/company-information', parentId: null },
  { id: 3, title: 'Product', link: '/product', parentId: null },
  { id: 4, title: 'Catalogues', link: '/catalogues', parentId: null },
  { id: 5, title: 'Find a store', link: '/dealer', parentId: null },
  { id: 6, title: 'Contact', link: '/contact', parentId: null },

  // Water Closet
  { id: 7, title: 'Water Closet', link: '/product/water-closet', parentId: 3 },
  { id: 11, title: 'One Piece Toilet', link: '/product/one-piece-toilet', parentId: 7 },
  { id: 12, title: 'Two Piece Toilet', link: '/product/two-piece-toilet', parentId: 7 },
  { id: 13, title: 'Wall Hung Toilet', link: '/product/wall-hung-toilet', parentId: 7 },
  { id: 14, title: 'Squat Asian Pan', link: '/product/squat-asian-pan', parentId: 7 },

  // Wash Basin
  { id: 8, title: 'Wash Basin', link: '/product/wash-basin', parentId: 3 },
  { id: 15, title: 'Above Counter Basin', link: '/product/above-counter-basin', parentId: 8 },
  { id: 16, title: 'Counter Top Basin', link: '/product/counter-top-basin', parentId: 8 },
  { id: 17, title: 'Padestal Basin', link: '/product/pedestal-basin', parentId: 8 },
  { id: 18, title: 'Half Padestal Basin', link: '/product/half-pedestal-basin', parentId: 8 },
  { id: 19, title: 'Under Counter Basin', link: '/product/under-counter-basin', parentId: 8 },

  // Public Area
  { id: 9, title: 'Public Area', link: '/product/public-area', parentId: 3 },
  { id: 20, title: 'Wall Hung Toilet', link: '/product/wall-hung-toilet', parentId: 9 },
  { id: 21, title: 'Flush Valve Toilet', link: '/product/flush-valve-toilet', parentId: 9 },
  { id: 22, title: 'Concealed Tank', link: '/product/concealed-tank', parentId: 9 },
  { id: 23, title: 'Urinal', link: '/product/urinal', parentId: 9 },

  // Bathware
  { id: 10, title: 'Bathware', link: '/product/bathware', parentId: 3 },
  { id: 24, title: 'Faucet', link: '/product/faucet', parentId: 10 },
  { id: 25, title: 'Shower Mixer', link: '/product/shower-mixer', parentId: 10 },
  { id: 26, title: 'Hand Shower', link: '/product/hand-shower', parentId: 10 },
  { id: 27, title: 'Fixed Shower Head', link: '/product/fixed-shower-head', parentId: 10 },
  { id: 28, title: 'Bath Accessories', link: '/product/accessories', parentId: 10 },
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

import productImg from './img/productImg.jpg';
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

