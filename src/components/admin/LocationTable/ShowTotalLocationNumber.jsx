import React from "react";

const ShowTotalLocationNumber = ({ total }) => {
  return (
    <span className="flex items-center col-span-3">
      Showing {total} of {total}
    </span>
  );
};

export default ShowTotalLocationNumber;
