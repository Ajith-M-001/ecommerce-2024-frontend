import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {userNotExist} from '../redux/reducer/userReducer'

import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { toast } from 'react-hot-toast'






const Header = () => {
    const { user } = useSelector((state) => state.userReducer)
    console.log("check_user", user)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dispatch = useDispatch()
    const logoutHandler = async () => {
        try {
            await signOut(auth)
            toast.success("sign out successful")
            dispatch(userNotExist())
            setIsOpen(false)
        } catch (error) {
            toast.error("sign out failed")
        }
    }

    return (
        <nav className="header">
            <Link onClick={() => setIsOpen(false)} to={"/"}>Home</Link>
            <Link onClick={() => setIsOpen(false)} to={"/search"}>
                <FaSearch />
            </Link>
            <Link onClick={() => setIsOpen(false)} to={"/cart"}>
                <FaShoppingBag />
            </Link>

            {user?._id ? (
                <>
                    <button onClick={() => setIsOpen((prev) => !prev)}>
                        <FaUser />
                    </button>
                    <dialog open={isOpen}>
                        <div>{user.role === "admin" && (
                            <Link to={'/admin/dashboard'}>Admin</Link>
                        )}</div>
                        <Link to={"/orders"}>Orders</Link>
                        <button onClick={logoutHandler}><FaSignOutAlt /></button>
                    </dialog>
                </>
            ) : (
                <>
                    {" "}
                    <Link to={"/login"}>
                        <FaSignInAlt />
                    </Link>
                </>
            )}
        </nav>
    );
};

export default Header;
