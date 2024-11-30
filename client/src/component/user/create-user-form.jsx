import React from 'react';
import userState from "../../state/userState.js";
import {isEmpty} from "../../helper/formHelper.js";
import {toast, ToastContainer} from "react-toastify";
import { useNavigate } from 'react-router-dom'; // React Router v6+ navigate

const CreateUserForm = () => {
    const {createUserFormData, userFormOnChange,createUserRequest,resetFormData} = userState()
    const navigation = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        if(isEmpty(createUserFormData.Name)){
            toast.warning('Name is required');
        }else if(isEmpty(createUserFormData.email)){
            toast.warning('Email is required');
        }else if(isEmpty(createUserFormData.phone)){
            toast.warning('Phone number is required');
        }else if(isEmpty(createUserFormData.password)){
            toast.warning('Password is required');
        }else {
            await createUserRequest(createUserFormData);
            resetFormData();
            toast.success('Successfully created!');
            navigation('/login')

        }

    }

    return (
        <div className='container'>
            <ToastContainer />
            <div className='row vh-100'>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                    <div className='col-4'>
                        <div className='form-group shadow-lg p-5'>
                            <h2>Create an Account</h2>
                            <input type='text' value={createUserFormData.Name} onChange={(e) => {
                                userFormOnChange('Name', e.target.value)
                            }} placeholder='Name' className='form-control my-4'/>
                            <input type='text' value={createUserFormData.email} onChange={(e) => {
                                userFormOnChange('email', e.target.value)
                            }} placeholder='Email' className='form-control my-4'/>
                            <input type='text' value={createUserFormData.phone} onChange={(e) => {
                                userFormOnChange('phone', e.target.value)
                            }} placeholder='Phone' className='form-control my-4'/>
                            <input type='password' value={createUserFormData.password} onChange={(e) => {
                                userFormOnChange('password', e.target.value)
                            }} placeholder='Password' className='form-control my-4'/>
                            <input type='submit' onClick={onSubmit} className='btn btn-primary btn-block'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUserForm;