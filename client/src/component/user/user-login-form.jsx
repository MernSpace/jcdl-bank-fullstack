import React from 'react';
import userState from "../../state/userState.js";
import {isEmpty} from "../../helper/formHelper.js";
import {toast, ToastContainer} from "react-toastify";
import { useNavigate } from 'react-router-dom'; // React Router v6+ navigate


const UserLoginForm = () => {
    const {loginUserFormData, loginFormOnChange,loginUserRequest,resetLoginFormData} = userState()
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        if(isEmpty(loginUserFormData.email)){
            toast.warning('Email is required');
        }else if(isEmpty(loginUserFormData.password)){
            toast.warning('Password is required');
        }else {
            await loginUserRequest(loginUserFormData);
            resetLoginFormData();
            toast.success('Login Successfully!');
            navigate('/')

        }

    }

    return (
        <div className='container'>
            <ToastContainer />
            <div className='row vh-100'>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                    <div className='col-4'>
                        <div className='form-group gradient-shadow  p-5'>
                            <h2>Login</h2>

                            <input type='text' value={loginUserFormData.email} onChange={(e) => {
                                loginFormOnChange('email', e.target.value)
                            }} placeholder='Email' className='form-control my-4'/>
                            <input type='password' value={loginUserFormData.password} onChange={(e) => {
                                loginFormOnChange('password', e.target.value)
                            }} placeholder='Password' className='form-control my-4'/>
                            <input type='submit' onClick={onSubmit} className='btn btn-primary btn-block'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLoginForm;