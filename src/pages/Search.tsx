import React, { useState } from 'react'
import ProductCard from '../Components/ProductCard';
import { server, useCategoriesQuery, useSearchProductQuery } from '../redux/api/ProductApi';
import { CustomError } from '../types/api-types';
import { toast } from 'react-hot-toast'
import { CartItem } from '../types/types';
import { addToCart } from '../redux/reducer/cartReducer';
import { useDispatch } from 'react-redux';

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch()

  const { data: searchedData, isLoading: ProductLoading } = useSearchProductQuery({ search, sort, category, page, price: maxPrice })

  const { data: categoriesResponse, isLoading: loadingCategories, isError, error } = useCategoriesQuery("")


  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message)
  }


  const isPrevPage = page > 1;
  const isNextPage = page < 4

  const addToCartHandler = (cartItem: CartItem) => {

    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");

  };
  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="search-product-list">
          {searchedData?.products.map((i) => {
            { console.log(`${ server }/${ i.photos }`)}
            return <ProductCard handler={addToCartHandler} photos={i.photos} productId={i._id} name={i.name} price={i.price} stock={i.stock} />


          })}
        </div>

        {searchedData && searchedData.totalPage > 1 &&
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page}
              of {searchedData.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        }
      </main>

    </div>
  )
}

export default Search