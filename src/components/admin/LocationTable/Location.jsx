import React from "react";
import LocationDeleteButton from "../Button/Delete/Location/LocationDeleteButton";
import LocationUpdateButton from "../Button/Update/Location/LocationUpdateButton";

const Location = ({ location, index }) => {
  return (
    <tr className="text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 relative cursor-pointer group">
      <td className="px-4 py-3 text-sm">{location.id}</td>
      <td className="px-4 py-3 text-sm">
        <img
          src={location.hinhAnh}
          alt="hinh vi tri"
          className="h-[100px] w-[200px] object-cover rounded-[3px]"
        />
      </td>
      <td className="px-4 py-3 text-sm">{location.tenViTri}</td>
      <td className="px-4 py-3 text-sm">{location.tinhThanh}</td>
      <td className="px-4 py-3 text-sm ">{location.quocGia}</td>
      <td className="px-4 py-3 text-sm ">
        <div className="flex items-center space-x-4 text-sm">
          <LocationUpdateButton location={location} />
          <LocationDeleteButton location={location} />
        </div>
      </td>
    </tr>
  );
};

export default Location;
