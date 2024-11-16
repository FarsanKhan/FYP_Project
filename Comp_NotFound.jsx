import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const NotFound = ({ hideButton }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <img src="/notfound.png" alt="notfound" width={500} height={500} />
      {!hideButton && (
        <Link to={"/"}>
          <Button className="bg-blue-500 rounded-full" size="lg">
            Go Back
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NotFound;
