import React, { useEffect, useState } from "react";
import { locationServ } from "../../../api/api";
import { useLocation } from "react-router-dom";
import Location from "./Location";
import ViewMoreLocation from "./ViewMoreLocation";
import PaginationLocationList from "./PaginationLocationList";
import ShowTotalLocationNumber from "./ShowTotalLocationNumber";
import { useSelector } from "react-redux";

const LocationList = () => {
  const { pathname } = useLocation();
  const [locations, setLocations] = useState(null);

  const { reload } = useSelector((state) => state.locationSlice);

  const fetchLocation = () => {
    locationServ
      .getAllLocations()
      .then((result) => {
        setLocations(result.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [reload]);

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs pb-[50px]">
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Hình ảnh</th>
              <th className="px-4 py-3">Vị trí</th>
              <th className="px-4 py-3">Tỉnh</th>
              <th className="px-4 py-3">Quốc gia</th>
              <th className="px-4 py-3">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {locations?.map((location, index) => {
              return <Location location={location} index={index} key={index} />;
            })}
          </tbody>
        </table>
      </div>

      <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800 rounded-br-lg rounded-bl-lg ">
        <ShowTotalLocationNumber total={locations?.length} />
        <span className="col-span-2"></span>
        {/* <!-- Pagination --> */}
        {pathname === "/admin" ? (
          <ViewMoreLocation />
        ) : (
          <PaginationLocationList />
        )}
      </div>
    </div>
  );
};

export default LocationList;
