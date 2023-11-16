import React from "react";
import PopupRoomPhoto from "./PopupRoomPhoto";
import PopupRoomInfo from "./PopupRoomInfo";

const Room = ({ room, index }) => {
  const status = [
    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
      Approved
    </span>,
    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
      Denied
    </span>,
    <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700">
      Expired
    </span>,
    <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
      Pending
    </span>,
  ];

  return (
    <tr className="text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 relative cursor-pointer group">
      <td className="px-4 py-3 text-sm">{room.id}</td>
      <td className="px-4 py-3 text-sm ">{room.tenPhong}</td>

      <td className="px-4 py-3 text-sm">
        {room.giaTien} <b>$</b>
      </td>
      <td className="px-4 py-3 text-sm">
        <div className="w-[20px] h-[20px] leading-[20px] rounded-full text-center font-bold bg-primary text-white relative cursor-pointer group/item">
          !
          <PopupRoomInfo room={room} index={index} />
        </div>
      </td>

      <td className="px-4 py-3 text-xs">
        {status[Math.floor(Math.random() * 4)]}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-4 text-sm">
          <button
            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-primary rounded-lg dark:text-primary-dark focus:outline-none focus:shadow-outline-gray"
            aria-label="Edit"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
          </button>
          <button
            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-primary rounded-lg dark:text-primary-dark focus:outline-none focus:shadow-outline-gray"
            aria-label="Delete"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </td>
      <PopupRoomPhoto photo={room.hinhAnh} index={index} />
    </tr>
  );
};

export default Room;
