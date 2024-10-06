import React, { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { server, useAllProductQuery } from "../../redux/api/ProductApi";
import { toast } from 'react-hot-toast'
import { CustomError } from "../../types/api-types";
import { useSelector } from "react-redux";
import { Skeleton } from '../../Components/Loader'

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];



const Products = () => {
  const [rows, setRows] = useState<DataType[]>([]);
  const { user } = useSelector((state) => state.userReducer)
  const { data, isLoading, isError, error } = useAllProductQuery(user?._id!)


  useEffect(() => {
    if (data) {
      setRows(data.products.map((product) => ({
        key: product._id,
        photo: <img src={`${server}/${product.photos}`} />, name: product.name, price: product.price, stock: product.stock, action: <Link to={`/admin/product/${product._id}`}>Manage</Link>
      })))
    }
    console.log("data fetched")
  }, [data])


  if (isError) {
    toast.error((error as CustomError).data.message)
  }

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton /> : Table} </main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
