import React, { ReactElement, useEffect, useState } from 'react'
import TableHOC from '../Components/admin/TableHOC'
import { Column } from 'react-table';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CustomError } from '../types/api-types';
import { useMyOrderQuery } from '../redux/api/OrderApi';
import { Skeleton } from '../Components/Loader';
type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
}

const column: Column<DataType>[] = [
    {
        Header: "ID",
        accessor: "_id",
    },
    {
        Header: "Quantity",
        accessor: "quantity",
    },
    {
        Header: "Discount",
        accessor: "discount",
    },
    {
        Header: "Amount",
        accessor: "amount",
    },
    {
        Header: "Status",
        accessor: "status",
    },
];

const Orders = () => {
    const [rows, setRows] = useState<DataType[]>([]);

    const { user } = useSelector((state) => state.userReducer);
    const { data, isLoading, isError, error } = useMyOrderQuery(user._id!);
    console.log("Data", data);

    if (isError) {
        toast.error((error as CustomError).data.message);
    }

    useEffect(() => {
        if (data) {
            setRows(
                data.orders.map((order) => ({
                    _id: order._id,
                    amount: order.total,
                    discount: order.discount,
                    quantity: order.orderItems.length,
                    status: (
                        <span
                            className={
                                order.status === "Processing"
                                    ? "red"
                                    : order.status === "Shipped"
                                        ? "green"
                                        : "purple"
                            }
                        >
                            {order.status}
                        </span>
                    ),
                    action: <Link to={`/admin/transaction/${order._id}`}>manage</Link>,
                }))
            );
        }
    }, [data]);



    const Table = TableHOC<DataType>(
        column,
        rows,
        "dashboard-product-box",
        "Orders",
        rows.length > 6
    )();
    return (
        <div className="container">
            <h1>My Orders</h1>
            {isLoading ? <Skeleton /> : Table}
        </div>

    )
}

export default Orders