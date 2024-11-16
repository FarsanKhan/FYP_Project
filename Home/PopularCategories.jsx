import React from "react";
import {
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineEngineering,
  MdOutlineAgriculture,
} from "react-icons/md";
import { IoRestaurantOutline } from "react-icons/io5";
import { IoMedkitOutline } from "react-icons/io5";
import { CiCamera } from "react-icons/ci";
import { GrTechnology } from "react-icons/gr";
import { TypographyH3 } from "../ui/typography";

const categories = [
  {
    id: 1,
    title: "Information Technology",
    subTitle: "3 Open Positions",
    icon: <GrTechnology />,
  },
  {
    id: 2,
    title: "Engineering",
    subTitle: "5 Open Positions",
    icon: <MdOutlineEngineering />,
  },
  {
    id: 3,
    title: "Media",
    subTitle: "6 Open Positions",
    icon: <MdOutlineWebhook />,
  },
  {
    id: 4,
    title: "Tourism",
    subTitle: "1 Open Postions",
    icon: <CiCamera />,
  },
  {
    id: 5,
    title: "Account & Finance",
    subTitle: "5 Open Positions",
    icon: <MdAccountBalance />,
  },
  {
    id: 6,
    title: "Healthcare",
    subTitle: "8 Open Positions",
    icon: <IoMedkitOutline />,
  },
  {
    id: 7,
    title: "Restuarants",
    subTitle: "2 Open Positions",
    icon: <IoRestaurantOutline />,
  },
  {
    id: 8,
    title: "Agriculture",
    subTitle: "3 Open Positions",
    icon: <MdOutlineAgriculture />,
  },
];

const PopularCategories = () => {
  return (
    <div className="categories">
      <TypographyH3>POPULAR CATEGORIES</TypographyH3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card shadow rounded-md" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
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

export default PopularCategories;
