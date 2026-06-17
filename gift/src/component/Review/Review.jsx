import react from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";

import image1 from "../../assets/image1.webp";
import image2 from "../../assets/image2.webp";
import image3 from "../../assets/image3.webp";
import image4 from "../../assets/image4.webp";
import image5 from "../../assets/image5.webp";
import image6 from "../../assets/image6.webp";

import "./Review.css"

function Review() {
    const navigate = useNavigate();

    return (
        <>

            <div className="review" >
                <div className="review-header">

                    <button
                        className="back-btn"
                        onClick={() => navigate("/Shop")}
                    >
                        ←Back
                    </button>

                    <h2 className="heading">Customer's <span>Review</span></h2>
                </div>
                <div className="box-containers">
                    <div className="box">
                        <div className="star">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis unde magni pariatur et fuga, ipsum rerum consequatur explicabo commodi quisquam, veritatis similique eos facilis eius.</p>
                        <div className="user">
                            <img src={image4} alt="" />
                            <div className="user-info">
                                <h4>Mr. Ali</h4>
                                <span>happy Customer</span>
                            </div>
                        </div>

                    </div>

                    <div className="box">
                        <div className="star">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis unde magni pariatur et fuga, ipsum rerum consequatur explicabo commodi quisquam, veritatis similique eos facilis eius.</p>
                        <div className="user">
                            <img src={image1} alt="" />
                            <div className="user-info">
                                <h4>Priti Gupta</h4>
                                <span>happy Customer</span>
                            </div>
                        </div>

                    </div>

                    <div className="box">
                        <div className="star">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis unde magni pariatur et fuga, ipsum rerum consequatur explicabo commodi quisquam, veritatis similique eos facilis eius.</p>
                        <div className="user">
                            <img src={image2} alt="" />
                            <div className="user-info">
                                <h4>Jhon doe</h4>
                                <span>happy Customer</span>
                            </div>
                        </div>

                    </div>

                    <div className="box">
                        <div className="star">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis unde magni pariatur et fuga, ipsum rerum consequatur explicabo commodi quisquam, veritatis similique eos facilis eius.</p>
                        <div className="user">
                            <img src={image3} alt="" />
                            <div className="user-info">
                                <h4>Sana</h4>
                                <span>happy Customer</span>
                            </div>
                        </div>

                    </div>

                    <div className="box">
                        <div className="star">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis unde magni pariatur et fuga, ipsum rerum consequatur explicabo commodi quisquam, veritatis similique eos facilis eius.</p>
                        <div className="user">
                            <img src={image5} alt="" />
                            <div className="user-info">
                                <h4>Sohel Mehta</h4>
                                <span>happy Customer</span>
                            </div>
                        </div>

                    </div>

                    <div className="box">
                        <div className="star">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis unde magni pariatur et fuga, ipsum rerum consequatur explicabo commodi quisquam, veritatis similique eos facilis eius.</p>
                        <div className="user">
                            <img src={image6} alt="" />
                            <div className="user-info">
                                <h4>Richard Parker</h4>
                                <span>happy Customer</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );

}
export default Review;