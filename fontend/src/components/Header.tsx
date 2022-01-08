import React, { FC, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import logo from '../assets/images/Logo.png'
import { AppStateType } from '../redux/reducers/root-reducer'
import { logout } from '../redux/thunks/auth-thunks'
import { Perfume } from '../types/types'

const mainNav = [
    {
        display: "Home",
        path: { pathname: "/" }
    },
    {
        display: "About",
        path: { pathname: "/about" }
    },
    {
        display: "Catalogue",
        path: { pathname: "/catalog", state: {id: "all"} }
    },
    {
        display: "Contact",
        path: { pathname: "/contact" }
    },
]

const Header: FC = () => {
    
    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex(e => e.path.pathname === pathname)

    const headerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current?.classList.add('shrink')
            } else {
                headerRef.current?.classList.remove('shrink')
            }
        })
        return () => {
            window.removeEventListener("scroll", () => {})
        }
    }, [])

    const menuLeft = useRef<HTMLDivElement>(null)

    const menuToggle = () => menuLeft.current?.classList.toggle('active')

    const dispatch = useDispatch()
    const perfumes: Array<Perfume> = useSelector((state: AppStateType) => state.cart.perfumes)
    const isLoggedIn: boolean = useSelector((state: AppStateType) => state.user.isLoggedIn)

    const handleLogout = () => {
        dispatch(logout())
    }

    let links;
    let signOut;

    if (localStorage.getItem("isLoggedIn") || isLoggedIn) {
        links = (
            <div className='header__menu__user__item'>
                <Link to={"/account"}>
                    <i className=''>My Acount</i>
                </Link>
            </div>
        )
        signOut = (
            <div className='header__menu__user__item'>
                <Link to={"/"} onClick={handleLogout}>
                    <i className=''>Log out</i>
                </Link>
            </div>
        )
    } else {
        links = (
            <>
                <div className='header__menu__user__item'>
                    <Link to={"/login"}>
                        <i className=''>Sign In</i>
                    </Link>
                </div>
                <div className='header__menu__user__item'>
                    <Link to={"/registration"}>
                        <i className=''>Sign Up</i>
                    </Link>
                </div>
            </>
        )
        signOut = null;
    }

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <i className="bx bx-search"></i>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <i className="bx bx-shopping-bag"></i>
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <i className="bx bx-user">
                                <div className="header__menu__user">
                                    <div className='header__menu__user__wrap'>
                                        {links}
                                        {signOut}
                                    </div>
                                </div>
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header