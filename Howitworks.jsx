
import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Job-Explorer Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Build a profile that stands out</p>
              <p>
              Make a strong first impression infront of potential employers and 
              set the stage for your next career move.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Diverse opportunities at your fingertips</p>
              <p>
              Find your fit in a place where your 
              passion meets your profession.
              Apply for a Job
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Boost your application through video interviews.</p>
              <p>
              Impress recruiters by showcasing your skills through video interviews and elevate 
              your profile above the competition.
              </p>
            </div>
         </div>
            </div>
            </div>
        </>
        )}
 

export default HowItWorks;
