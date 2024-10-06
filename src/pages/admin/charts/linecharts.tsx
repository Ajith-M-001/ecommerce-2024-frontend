import React from 'react';
import toast from "react-hot-toast";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { CustomError } from "../../../types/api-types";
import { useLineQuery } from "../../../redux/api/dashBoardApi";
import { useSelector } from "react-redux";
import { getLastMonth } from "../../../utils/features";
import { Skeleton } from '../../../Components/Loader';



const { last12Month: months } = getLastMonth();

const Linecharts = () => {

  const { user } = useSelector((state) => state.userReducer);

  const { data, isLoading, error, isError } = useLineQuery(user._id);
  console.log("daatabar", data);

  const discount = data?.charts.discount || [];
  const products = data?.charts.products || [];
  const revenue = data?.charts.revenue || []
  const users = data?.charts.users || []

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        {isLoading ? <Skeleton /> : <>

          <section>
            <LineChart
              data={users}
              label="Users"
              borderColor="rgb(53, 162, 255)"
              labels={months}
              backgroundColor="rgba(53, 162, 255, 0.5)"
            />
            <h2>Active Users</h2>
          </section>

          <section>
            <LineChart
              data={products}
              backgroundColor={"hsla(269,80%,40%,0.4)"}
              borderColor={"hsl(269,80%,40%)"}
              labels={months}
              label="Products"
            />
            <h2>Total Products (SKU)</h2>
          </section>

          <section>
            <LineChart
              data={revenue}
              backgroundColor={"hsla(129,80%,40%,0.4)"}
              borderColor={"hsl(129,80%,40%)"}
              label="Revenue"
              labels={months}
            />
            <h2>Total Revenue </h2>
          </section>

          <section>
            <LineChart
              data={discount}
              backgroundColor={"hsla(29,80%,40%,0.4)"}
              borderColor={"hsl(29,80%,40%)"}
              label="Discount"
              labels={months}
            />
            <h2>Discount Allotted </h2>
          </section>
        </>}
      </main>
    </div>
  );
};

export default Linecharts;
