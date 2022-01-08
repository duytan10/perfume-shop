import React, { FC } from 'react'

import { Link } from 'react-router-dom'

import Grid from './Grid'

import logo from '../assets/images/Logo.png'

const footerAboutLinks = [
    {
        display: "Company Profile",
        path: "/about"
    },
    {
        display: "Contact Us",
        path: "/about"
    },
    {
        display: "Careers",
        path: "/about"
    },
    {
        display: "News",
        path: "/about"
    },
    {
        display: "Store location",
        path: "/about"
    }
]

const footerCustomerLinks = [
    {
        display: "Returns & Refunds",
        path: "/about"
    },
    {
        display: "Orders & Shipping",
        path: "/about"
    },
    {
        display: "Privacy Policy",
        path: "/about"
    }
]

const Footer: FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <Grid
                    colProp={4}
                    mdColProp={2}
                    smColProp={1}
                    gap={10}>
                        <div>
                        <div className="footer__title">
                            Hotline
                        </div>
                        <div className="footer__content">
                            <p>
                                Order <strong>0123456789</strong>
                            </p>
                            <p>
                                Help/FAQs <strong>0123456789</strong>
                            </p>
                            <p>
                                Complain <strong>0123456789</strong>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            about us
                        </div>
                        <div className="footer__content">
                            {
                                footerAboutLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            CUSTOMER CARE
                        </div>
                        <div className="footer__content">
                            {
                                footerCustomerLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo} className="footer__logo" alt="" />
                            </Link>
                        </p>
                        <p>
                            Vietnam’s Largest Fragrance Retailer QC Perfume has some expertise in the clearance of authentic fashioner scents, shower and body, beauty care products, healthy skin items and related blessings and frill for men, ladies and kids.
                        </p>
                    </div>
                </Grid>
            </div>
        </footer>
    )
}

export default Footer