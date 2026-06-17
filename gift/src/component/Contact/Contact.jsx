import React from "react";
import { useNavigate } from "react-router-dom";

import contactus from "../../assets/contactus.webp";

import "./Contact.css"

function Contact() {
    const navigate = useNavigate();
    return (
        <>
            <div className="contacts" >
                <div className="contact-header">

                    <button
                        className="back-btn"
                        onClick={() => navigate("/Shop")}
                    >
                        ←Back
                    </button>

                    <h2 className="heading"><span>Contact </span>Us</h2>
                </div>

                <div className="row">

                    <form action="" >
                        <input type="text" placeholder="name" className="box"></input>
                        
                        <input type="email" placeholder="email" className="box"></input>
                       
                        <input type="number" placeholder="number" className="box"></input>
                        
                        <textarea name="" className="box" placeholder="Message" id=" " cols="30" rows="10"></textarea>
                        
                        <input type="submit" value="send message" className="box"></input>
                        
                    </form>
                    <div className="image">
                    <img src={contactus} alt="" />
                </div>
                </div>

                

                


            </div>
        </>
    );
}

export default Contact;