import React from 'react'
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useSelector } from 'react-redux';
import { CustomError } from '../../../types/api-types';
import toast from 'react-hot-toast';
import { useBarQuery } from '../../../redux/api/dashBoardApi';
import { Skeleton } from '../../../Components/Loader';
import { getLastMonth } from '../../../utils/features';



const { last12Month, last6Month } = getLastMonth();


const Barcharts = () => {
  const { user } = useSelector((state) => state.userReducer);

  const { data, isLoading, error, isError } = useBarQuery(user._id);
  console.log("daatabar", data);

  const products = data?.charts.products || [];
  const users = data?.charts.users || [];
  const orders = data?.charts.orders || []

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        {isLoading ? <Skeleton /> : <>
          <section>
            <BarChart
              data_2={users}
              data_1={products}
              title_1="Products"
              title_2="Users"
              labels={last6Month}
              bgColor_1={`hsl(260, 50%, 30%)`}
              bgColor_2={`hsl(360, 90%, 90%)`}
            />
            <h2>Top Products & Top Customers</h2>
          </section>

          <section>
            <BarChart
              horizontal={true}
              data_1={orders}
              data_2={[]}
              title_1="Orders"
              title_2=""
              bgColor_1={`hsl(180, 40%, 50%)`}
              bgColor_2=""
              labels={last12Month}
            />
            <h2>Orders throughout the year</h2>
          </section>
        </>}
      </main>
    </div>
  );
};

export default Barcharts;
