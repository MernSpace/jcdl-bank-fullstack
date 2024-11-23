import React, { useEffect} from 'react';
import CustomerState from "../../state/customerState.js";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";

const CreateCustomerForm = () => {
    const {createCustomerFormData,createCustomerRequest,CustomerFormOnChange,updateCustomerRequest,resetFormData} = CustomerState();
    const {id}= useParams();
    const onSubmitBtnClick=async()=> {
        if(id){
            await updateCustomerRequest(id,createCustomerFormData)
            toast.success('Update customer successfully');

        }else {
            await createCustomerRequest(createCustomerFormData);
            toast.info('Create customer successfully');
            resetFormData();
        }

    }
    return (
        <div>
            <div className=' '>
                <div className=''>
                    <div className='col-12 px-2 mt-5'>
                            {
                                id ? <h2>Update customer</h2> : <h2>Create customer</h2>
                            }
                        <div className='d-flex align-items-center gap-5 mt-5'>
                            <div className=" mb-3 w-50 gap-3">
                                <span className="form-label fs-5 fw-bold" id="basic-addon1">Customer First Name :</span>
                                <input value={createCustomerFormData.fName}  onChange={(e)=>{CustomerFormOnChange("fName",e.target.value)}} type="text"
                                       className="form-control border-1 mt-2 border-success rounded-2 shadow-sm p-2 "
                                       placeholder="Customer First Name" aria-label="CusFName"
                                       aria-describedby="basic-addon1"/>
                            </div>
                            <div className=" mb-3 w-50 gap-3">
                                <span className="form-label fs-5 fw-bold" id="basic-addon1">Customer Last Name :</span>
                                <input type="text" value={createCustomerFormData.lName}  onChange={(e)=>{CustomerFormOnChange("lName",e.target.value)}}
                                       className="form-control border-1 mt-2 border-success rounded-2 shadow-sm p-2 "
                                       placeholder="Customer Last Name" aria-label="CusLName"
                                       aria-describedby="basic-addon1"/>
                            </div>

                        </div>
                        <div className=" mb-3 w-100 gap-3 mt-5">
                            <span className="form-label fs-5 fw-bold " id="basic-addon1">Customer Address :</span>
                            <input type="text" value={createCustomerFormData.address}  onChange={(e)=>{CustomerFormOnChange("address",e.target.value)}}
                                   className="form-control border-1 mt-2 border-success rounded-2 shadow-sm p-2 "
                                   placeholder="Customer Address" aria-label="CusAddress"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className='d-flex align-items-center gap-5 mt-5'>
                            <div className=" mb-3 w-50 gap-5">
                                <span className="form-label fs-5 fw-bold " id="basic-addon1">Customer Phone</span>
                                <input type="text" value={createCustomerFormData.phone} onChange={(e)=>{CustomerFormOnChange('phone',e.target.value)}}
                                       className="form-control border-1 mt-2 border-success rounded-2 shadow-sm p-2 "
                                       placeholder="Customer Phone" aria-label="CusAdd"
                                       aria-describedby="basic-addon1"/>
                            </div>

                            <div className=" mb-3 w-50 gap-2">
                                <span className="form-label fs-5 fw-bold" id="basic-addon1">Invest Amount</span>
                                <input type="number" value={createCustomerFormData.balance} onChange={(e)=>{CustomerFormOnChange("balance",e.target.value)}}
                                       className="form-control border-1 mt-2 border-success rounded-2 shadow-sm p-2 "
                                       placeholder="Invest Amount" aria-label="CusInvest"
                                       aria-describedby="basic-addon1"/>
                            </div>
                        </div>
                        <input type='submit' value='submit' className='btn btn-success w-50 p-2 mt-3 ' onClick={onSubmitBtnClick}/>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CreateCustomerForm;