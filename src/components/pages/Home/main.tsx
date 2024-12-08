
import { Metadata } from "next";
import Blog from "./Blog/Main";
import Faq from "./Faq/Faq";

import FeaturedServices from "./FeaturedServices/FeaturedServices";
import Footer from "./Footer/Footer";
import HeroSection from "./HeroSection/HeroSection";
import HowItWorks from "./HowItWorks/HowItWorks";
import MostPopularServices from "./MostPopularServices/MostPopularServices";
import MainNavbar from "./Nav/MainNavbar";
import Offer from "./OfferCard/OfferCard";
import OfferedServices from "./OfferedServices/OfferedServices";
import Partners from "./Partners/Partners";
import PricingPlan from "./PricingPlan/PricingPlan";
import Testimonial from "./Testimonial/Testimonial";
import TopProviders from "./TopProviders/TopProviders";
import FeaturedCategories from "./FeaturedCategories/FeaturedCategories";
import { Suspense } from "react";
import Loader from "@/components/UI/Loader";




const HomePage = () => {
    return (
        <Suspense fallback={<Loader/>}>
            <MainNavbar />
            <HeroSection/>
            <FeaturedCategories/>
            <FeaturedServices/>
            <TopProviders/>
            <HowItWorks/>
            <OfferedServices/>
            <PricingPlan/>
            <Testimonial/>
            <MostPopularServices/>
            <Blog/>
            <Faq/>
            <Partners/>
            <Footer/>
        </Suspense>
    );
};

export default HomePage;