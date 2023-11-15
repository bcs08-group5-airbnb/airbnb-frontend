import React from "react";

const User = ({ user, index }) => {
  let DOB = user.birthday;
  let showBirthday = "";
  if (DOB.length < 9) {
    showBirthday = "Invalid Date";
  } else {
    if (DOB !== "Invalid Date") {
      showBirthday = DOB.slice(0, 9)
        ?.replaceAll("-", "/")
        ?.replaceAll(".", "/");
    } else {
      showBirthday = DOB;
    }
  }

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
    <tr className="text-gray-700 dark:text-gray-400">
      <td className="px-4 py-3">
        <div className="flex items-center text-sm">
          {/* <!-- Avatar with inset shadow --> */}
          <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
            <img
              className="object-cover w-full h-full rounded-full"
              src={user.avatar}
              alt="avatar"
              loading="lazy"
            />
            <div
              className="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {user.role}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">$ 863.45</td>
      <td className="px-4 py-3 text-xs">
        {status[Math.floor(Math.random() * 4)]}
      </td>
      <td className="px-4 py-3 text-sm">{showBirthday}</td>
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
    </tr>
  );
};

export default User;
