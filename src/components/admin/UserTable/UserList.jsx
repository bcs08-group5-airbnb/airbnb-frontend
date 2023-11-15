import React, { useEffect, useState } from "react";
import { userServ } from "../../../api/api";
import User from "./User";
import ShowTotalNumber from "./ShowTotalNumber";
import PaginationUserList from "./PaginationUserList";
import ViewMore from "./ViewMore";
import { useLocation } from "react-router-dom";

const UserList = () => {
  const { pathname } = useLocation();

  let [userFrom, setUserForm] = useState(1);

  const [users, setUsers] = useState(null);

  useEffect(() => {
    userServ
      .getAllUsers()
      .then((result) => {
        setUsers(result.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const selectPagination = (number) => {
    setUserForm(number);
  };

  const selectPaginationNextPrev = (number) => {
    if (
      (userFrom === 1 && number === -1) ||
      (userFrom === Math.ceil(users?.length / 10) && number === 1)
    ) {
      return null;
    }
    const num = (userFrom += number);
    setUserForm(num);
  };

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="px-4 py-3">Người Dùng</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Trạng Thái</th>
              <th className="px-4 py-3">Ngày Sinh</th>
              <th className="px-4 py-3">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {users
              ?.slice((userFrom - 1) * 10, userFrom * 10)
              .map((user, index) => {
                if (!user.avatar) {
                  user = {
                    ...user,
                    avatar: `https://i.pravatar.cc/300/${index}`,
                  };
                }
                return <User user={user} index={index} key={index} />;
              })}
          </tbody>
        </table>
      </div>
      <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <ShowTotalNumber users={users} userFrom={userFrom} />
        <span className="col-span-2"></span>
        {/* <!-- Pagination --> */}
        {pathname === "/admin" ? (
          <ViewMore />
        ) : (
          <PaginationUserList
            userFrom={userFrom}
            users={users}
            selectPagination={selectPagination}
            selectPaginationNextPrev={selectPaginationNextPrev}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
