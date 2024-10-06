import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { useLatestProductQuery } from "../redux/api/ProductApi";
import { toast } from 'react-hot-toast'
import Loader from '../Components/Loader'
import { Skeleton } from "../Components/Loader";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductQuery("");
  console.log(data);
  const dispatch = useDispatch()

  const addToCartHandler = (cartItem: CartItem) => {

    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");

  };

  if (isError) toast.error("Cannot fetch the Product")




  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        {isLoading ? (<Skeleton width="80vw" />) : (data?.products.map((product) => (
          <ProductCard
            key={product._id}
            handler={addToCartHandler}
            photos={product.photos}
            productId={product._id}
            name={product.name}
            price={product.price}
            stock={product.stock}
          />)
        ))}
      </main>
    </div>
  );
};

export default Home;
