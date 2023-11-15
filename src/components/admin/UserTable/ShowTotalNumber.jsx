import React from "react";

const ShowTotalNumber = ({ users, userFrom }) => {
  return (
    <span className="flex items-center col-span-3">
      Showing {(userFrom - 1) * 10 + 1}-
      {users?.length - (userFrom - 1) * 10 + 1 < 10
        ? users?.length
        : userFrom * 10}{" "}
      of {users?.length}
    </span>
  );
};

export default ShowTotalNumber;
