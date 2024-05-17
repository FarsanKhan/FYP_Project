import React from "react";
import { SiUnilever } from "react-icons/si";
import { RiEnglishInput } from "react-icons/ri";
import { TbBrandPepsi } from "react-icons/tb";



const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Unilever",
      location: "Markaz G-8 Islamabad, Pakistan",
      openPositions: 10,
      icon: <SiUnilever />,
      
    },
    {
      id: 2,
      title: "PepsiCo",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <TbBrandPepsi />,
    },
    {
      id: 3,
      title: "Engro",
      location: "Blue Area, Islamabad, Pakistan",
      openPositions: 20,
      icon: <RiEnglishInput />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
