import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { TypographyH2, TypographyP } from "../ui/typography";

const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <TypographyH2>How Job Explorer Works</TypographyH2>
        <div className="banner">
          <div className="card rounded-md shadow-md">
            <FaUserPlus />
            <p>Build a profile that stands out</p>
            <p>
              Make a strong first impression infront of potential employers and
              set the stage for your next career move.
            </p>
          </div>
          <div className="card rounded-md !bg-blue-600 shadow-lg">
            <MdFindInPage color="white" />
            <TypographyP className="text-white">
              Diverse opportunities at your fingertips
            </TypographyP>
            <TypographyP className="!text-white">
              Find your fit in a place where your passion meets your profession.
              Apply for a Job
            </TypographyP>
          </div>
          <div className="card rounded-md shadow-md">
            <IoMdSend />
            <p>Boost your application through video interviews.</p>
            <p>
              Impress recruiters by showcasing your skills through video
              interviews and elevate your profile above the competition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
