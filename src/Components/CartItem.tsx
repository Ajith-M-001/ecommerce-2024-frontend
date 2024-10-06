import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { server } from '../redux/api/ProductApi';
import { CartItem as CartItemType } from '../types/types'; // Rename the type here

type CartItemProps = {
    cartItem: CartItemType,  // Use the renamed type here
    incrementHandler: (cartItem: CartItemType) => void,
    decrementHandler: (cartItem: CartItemType) => void,
    removeHandler: (id: string) => void,
};

const CartItem = ({ cartItem, incrementHandler, decrementHandler, removeHandler }: CartItemProps) => {
    const { photos, productId, name, price, quantity, stock } = cartItem;

    return (
        <div className="cart-item">
            <img src={`${server}/${photos}`} alt={name} />
            <article>
                <Link to={`/product/${productId}`}>{name}</Link>
                <span>₹{price}</span>
            </article>
            <div>
                <button onClick={() => decrementHandler(cartItem,)}>-</button>
                <p>{quantity}</p>
                <button onClick={() => incrementHandler(cartItem)}>+</button>
            </div>
            <button onClick={() => removeHandler(productId)}>
                <FaTrash />
            </button>
        </div>
    );
};

export default CartItem;
