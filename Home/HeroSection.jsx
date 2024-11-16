import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { TypographyH1, TypographyP } from "../ui/typography";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "123",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "4+",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "34",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "7",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <TypographyH1>
            Take your job profile <br />
            to the next level
          </TypographyH1>
          <TypographyP>
            Get recognized by colleagues for your skills and land your dream job
            with glowing recommendations.
          </TypographyP>
        </div>
        <div className="image">
          <img src="/profile.jpg" alt="Profile" />
        </div>
      </div>
      <div className="details">
        {details.map((element) => {
          return (
            <div className="card shadow rounded-md" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="content">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
