import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import "../../App.css";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="homePage page">
      <div className="relative p-5 flex items-center justify-between">
        <div>
          <div className="absolute top-[-10px] left-0">
            <img src="/logo.png" alt="logo" width={250} height={250} />
          </div>
        </div>
        <div className="flex items-center">
          <Button
            className="text-lg text-gray-700"
            size="lg"
            variant="link"
            onClick={() => navigate("/signup")}
          >
            Join now
          </Button>
          <Button
            size="lg"
            className="text-blue-500 border-blue-500 rounded-full text-md"
            variant="outline"
            onClick={() => navigate("/login")}
          >
            Sign in
          </Button>
        </div>
      </div>
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
    </section>
  );
};

export default Home;
