import React from 'react'
import "./footer.css"
import logo from "./logo.png"
import banner from "../images/banner.jpg"
import { BsArrowRightShort,BsBicycle,BsStarHalf,BsFillTelephoneFill } from "react-icons/bs";

const Footer = () => {
  return (
    <>
        {/* <div className="banner"> */}
            {/* <h6>HOTEL RESERVATION</h6>
            <h1>Extra Perks When You BooK Directly With Us</h1>
            <h6>CALL US NOW :</h6>
            <div className="no">
                <BsFillTelephoneFill/>
            <h1> +91 9593231620</h1>
            </div> */}
        {/* </div> */}
        <div className="footer">
            <div className="hoteldetails">
                <img src={logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur quia optio officiis voluptatum aliquam earum eveniet totam mollitia ipsa eum. excepturi ex, cupiditate qui modi rem nemo autem error harum reprehenderit.</p>
            </div>
            <div className="hotelshortcurts">
                <h2>Useful Links</h2>
                <div className="links">
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Reviews</a></li>
                    <li><a href="#">News</a></li>
                    <li><a href="#">Contact Us</a></li>
                </div>
            </div>
            <div className="customerhelp">
                <h2>Customer Service</h2>
                <div className="links">
                    <li><a href="#">Customer Support</a></li>
                    <li><a href="#">Guest Feedback</a></li>
                    {/* <li><a href="#">Sitemap</a></li> */}
                    <li><a href="#">FAQs</a></li>
                </div>
            </div>
            <div className="contact">
                <h2>Contact</h2>
                <div className="Contact_links">
                    <p><label className='Contact_links_label' >Phone No: </label> <span className='Contact_links_contant'>{"  "} +91 9593231620</span></p>
                    <p><label className='Contact_links_label'>Email Id: </label> <span className='Contact_links_contant'>{"  "} shreetammanna5@gmail.com</span></p>
                    <p><label className='Contact_links_label'>Address: </label> <span className='Contact_links_contant'>{"  "} Kolkata, India</span></p>
                </div>
            </div>
        </div>
        <div className="copywrite">
            <p>Copyright &copy; 2024 FootFable | Developed by Shreetam Manna | All Rights Reserved</p>
        </div>
    </>
  )
}

export default Footer