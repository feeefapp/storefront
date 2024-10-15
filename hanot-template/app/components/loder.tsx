import React from "react";
import { FaSpinner } from "react-icons/fa";

function Loader() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <FaSpinner className="animate-spin h-10 w-10 text-primary" />
    </div>
  );
}

export default Loader;
