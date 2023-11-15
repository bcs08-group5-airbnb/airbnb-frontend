import React, { useEffect } from "react";
import CTA from "./CTA";
import LoadingPage from "../../../components/admin/LoadingPage/LoadingPage";
import UserList from "../../../components/admin/UserTable/UserList";
import HeadingAdmin from "../../../components/admin/HeadingAdmin/HeadingAdmin";
import CardAdmin from "../../../components/admin/CardAdmin/CardAdmin";
import ChartAdmin from "../../../components/admin/ChartAdmin/ChartAdmin";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Airbnb - Admin";
  }, []);
  return (
    <>
      <main className="h-full overflow-y-auto">
        <div className="container px-6 mx-auto grid">
          <HeadingAdmin heading="Dashboard" />
          {/* <!-- CTA --> */}
          <CTA />
          {/* <!-- Cards --> */}
          <CardAdmin />

          {/* <!-- New Table --> */}
          <UserList />

          {/* <!-- Charts --> */}
          <HeadingAdmin heading="Charts" />
          <ChartAdmin />
        </div>
      </main>
      <LoadingPage />
    </>
  );
};

export default Dashboard;
