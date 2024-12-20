import React from 'react';
import { NavLink } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {removeSessions} from "../helper/SessionHelper.js";


const dashboard = (props) => {
    return (
        <div className='continer'>
            <ToastContainer />
            <div className='row'>
                <div className='col-md-12 bg-danger d-flex justify-content-between align-items-center px-5'><h1 className='text-white text-center fs-1'> Welcome to
                    dashbord</h1>
                    <button className='btn btn-danger shadow-lg' onClick={removeSessions}>Log Out</button>
                </div>

                <div className='col-md-12 d-flex'>
                    <div className='col-2 '>
                        <div className="accordion" id="accordionExample">
                            <NavLink to='/'>
                                <div className="accordion-item bg-dark text-white py-2">
                                    <h2 className='gap-2'><i className="bi bi-house-door-fill px-3"></i>
                                        HOME</h2>

                                </div>
                            </NavLink>

                            <div className="accordion-item ">
                                <h2 className="accordion-header border-bottom" id="headingTwo">
                                    <button className="accordion-button collapsed " type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                            aria-expanded="false" aria-controls="collapseTwo">
                                        <h6 className='gap-2 '><i className="bi bi-people-fill mx-2"></i>
                                            Customer</h6>
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse show"
                                     aria-labelledby="headingTwo" data-bs-parent="#accordionExample">

                                    <div className="accordion-body">

                                        <h6 className='gap-2 py-3 border-bottom '>
                                            <NavLink to='/customer-list'
                                                     className="d-flex align-items-center  text-decoration-none text-black">
                                                <i className="bi bi-person-lines-fill mx-2"></i>
                                                Customers
                                            </NavLink>
                                        </h6>
                                        <h6 className='gap-2 py-3 border-bottom'>
                                            <NavLink to='/add-customer'
                                                     className="d-flex align-items-center  text-decoration-none text-black">
                                                <i className="bi bi-person-plus-fill mx-2"></i>
                                                Add Customers
                                            </NavLink>
                                        </h6>

                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item ">
                                <h2 className="accordion-header border-bottom" id="headingThree">
                                    <button className="accordion-button collapsed " type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                            aria-expanded="false" aria-controls="collapseThree">
                                        <h6 className='gap-2 '>
                                            <i className="bi bi-bank px-3"></i>
                                            Balance</h6>
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse "
                                     aria-labelledby="headingThree" data-bs-parent="#accordionExampleThree">

                                    <div className="accordion-body">

                                        <h6 className='gap-2 py-3 border-bottom '>
                                            <NavLink to='/add-balance'
                                                     className="d-flex align-items-center  text-decoration-none text-black">
                                                <i className="bi bi-cash mx-2"></i>
                                                Add Balance
                                            </NavLink>
                                        </h6>

                                        <h6 className='gap-2 py-3 border-bottom '>
                                            <NavLink to='/add-balance-list'
                                                     className="d-flex align-items-center  text-decoration-none text-black">
                                                <i className="bi bi-cash mx-2"></i>
                                                Balance List
                                            </NavLink>
                                        </h6>

                                        <h6 className='gap-2 py-3 border-bottom'>
                                            <NavLink to='/withdraw-balance'
                                                     className="d-flex align-items-center  text-decoration-none text-black">
                                                <i className="bi bi-cash mx-2"></i>
                                                Withdraw Balance
                                            </NavLink>
                                        </h6>
                                        <h6 className='gap-2 py-3 border-bottom'>
                                            <NavLink to='/withdraw-balance-list'
                                                     className="d-flex align-items-center  text-decoration-none text-black">
                                                <i className="bi bi-cash mx-2"></i>
                                                Withdraw Balance List
                                            </NavLink>
                                        </h6>

                                    </div>
                                </div>
                            </div>


                            <div className="accordion-item ">
                                <h2 className="accordion-header border-bottom" id="headingFour">
                                    <button className="accordion-button collapsed " type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseFour"
                                            aria-expanded="false" aria-controls="collapseFour">
                                        <h6 className='gap-2 '>
                                            <i className="bi bi-bank px-3"></i>
                                            Interest</h6>
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse "
                                     aria-labelledby="headingFour" data-bs-parent="#accordionExampleFour">

                                    <div className="accordion-body">

                                        <h6 className='gap-2 py-3 border-bottom '>
                                            <NavLink to='/add-interest'
                                                     className="d-flex align-items-center  text-decoration-none text-black">
                                                <i className="bi bi-cash mx-2"></i>
                                                Add Interest
                                            </NavLink>
                                        </h6>
                                        <h6 className='gap-2 py-3 border-bottom '>
                                            <NavLink to='/interest-list'
                                                     className="d-flex align-items-center  text-decoration-none text-black">
                                                <i className="bi bi-cash mx-2"></i>
                                                Interest List
                                            </NavLink>
                                        </h6>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='col-10'>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default dashboard;