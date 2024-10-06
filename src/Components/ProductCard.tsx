import React from 'react';
import { FaPlus, FaExpandAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { server } from '../redux/api/userApi';
import { CartItem } from '../types/types';

type ProductsProps = {
    productId: string;
    // photos: {
    //     url: string;
    //     public_id: string;
    // }[];
    photos: string;
    name: string;
    price: number;
    stock: number;
    // handler: () => void;
    handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
    productId,
    price,
    name,
    photos,
    stock,
    handler,
}: ProductsProps) => {
    return (
        <div className="product-card">
            <img src={`${server}/${photos}`} alt={name} />
            <p>{name}</p>
            <span>₹{price}</span>

            <div>
                <button
                    onClick={() =>
                        handler({
                            productId,
                            price,
                            name,
                            photos,
                            stock,
                            quantity: 1,
                        })
                    }
                >
                    <FaPlus />
                </button>

                <Link to={`/product/${productId}`}>
                    <FaExpandAlt />
                </Link>
            </div>
        </div>


    )
}

export default ProductCard