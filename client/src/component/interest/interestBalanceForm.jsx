import React, {useEffect,useState} from 'react';
import Select from "react-select";
import customerStore from "../../state/customerState.js";
import interestStore from "../../state/interestState.js";
import {toast} from "react-toastify";

const InterestBalanceForm = () => {
    const {readCustomerRequest,customerData,createCustomerFormData,customerDetailRequest,resetFormData} =customerStore();
    const {interestFormData,interestFormOnChange,addInterestRequest,resetInterestFormData} = interestStore();
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        ( async ()=>{
            await readCustomerRequest()
        })()
    },[selectedUserId])

    const options = customerData.map(customer => ({
        value: customer._id,
        label: `${customer.fName} ${customer.lName}`
    }));
    const handleChange = (selectedOption) => {
        console.log(selectedOption)
        const userId = selectedOption ? selectedOption.value : null;
        setSelectedUserId(userId);
        console.log(selectedUserId)
    };

    useEffect(() => {
        if (selectedUserId) {
            (async () => {
                await customerDetailRequest(selectedUserId);
            })();
        }
    }, [selectedUserId]);

    const onClick= async ()=>{
        await addInterestRequest(selectedUserId,interestFormData);
        toast.info('Balance Added successfully');
        resetFormData();
        resetInterestFormData();
    }
    return (
        <div>
            <div className='col-10 px-5 mt-5 justify-content-center align-items-center'>
                <div>
                    <Select options={options} onChange={handleChange} placeholder="Search Customer and Select"/>
                </div>
                <div className='col-12 px-2 mt-5'>

                    <div className='d-flex align-items-center gap-5 mt-5'>
                        <div className=" mb-3 w-50 gap-3">
                            <span className="form-label fs-5 fw-bold" id="basic-addon1">Customer First Name :</span>
                            <input type="text" value={createCustomerFormData.fName}
                                   className="form-control border-1 mt-2 border-success rounded-2 shadow-sm p-2 "
                                   placeholder="Customer First Name" aria-label="CusFName"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className=" mb-3 w-50 gap-3">
                            <span className="form-label fs-5 fw-bold" id="basic-addon1">Customer Last Name :</span>
                            <input type="text" value={createCustomerFormData.lName}
                                   className="form-control border-1 mt-2 border-success rounded-2 shadow-sm p-2 "
                                   placeholder="Customer Last Name" aria-label="CusLName"
                                   aria-describedby="basic-addon1"/>
                        </div>

                    </div>
                    <div className='d-flex align-items-center gap-5 mt-5'>
                        <div className=" mb-3 w-50 gap-5 ">
                            <span className="form-label fs-5 fw-bold " id="basic-addon1">Customer Address :</span>
                            <input type="text" value={createCustomerFormData.address}
                                   className="form-control border-1 mt-2 border-success rounded-2 shadow-sm p-2 "
                                   placeholder="Customer Address" aria-label="CusAddress"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className=" mb-3 w-50 gap-5">
                            <span className="form-label fs-5 fw-bold " id="basic-addon1">Customer Phone</span>
                            <input type="text" value={createCustomerFormData.phone}
                                   className="form-control border-1 mt-2 border-success rounded-2 shadow-sm p-2 "
                                   placeholder="Customer Phone" aria-label="CusAdd"
                                   aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className='d-flex align-items-center gap-5 mt-5'>
                        <div className=" mb-3 w-50 gap-2">
                            <span className="form-label fs-5 fw-bold" id="basic-addon1">Last Balance</span>
                            <input type="number" value={createCustomerFormData.balance}
                                   className="form-control border-1 mt-2 border-success rounded-2 shadow-sm p-2 "
                                   placeholder="Last Balance" aria-label="CusInvest" disabled
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className=" mb-3 w-50 gap-2">
                            <span className="form-label fs-5 fw-bold" id="basic-addon1">Add Balance</span>
                            <input type="number" value={interestFormData.balance} onChange={(e) => {
                                interestFormOnChange('balance', e.target.value)
                            }}
                                   className="form-control border-1 mt-2 border-success rounded-2 shadow-sm p-2 "
                                   placeholder="Add Balance" aria-label="CusInvest"
                                   aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className='d-flex align-items-center gap-5 mt-5'>
                        <div className=" mb-3 w-50 gap-2">
                            <span className="form-label fs-5 fw-bold" id="basic-addon1">Check Number</span>
                            <input type="number" value={interestFormData.invoiceID} onChange={(e) => {
                                interestFormOnChange('invoiceID', e.target.value)
                            }}
                                   className="form-control border-1 mt-2 border-success rounded-2 shadow-sm p-2 "
                                   placeholder="Check Number" aria-label="CusInvest"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className=" mb-3 w-50 gap-2 d-none">
                            <span className="form-label fs-5 fw-bold" id="basic-addon1">Customer ID</span>
                            <input type="text" value={interestFormData.cusID = selectedUserId} onChange={(e) => {
                                interestFormOnChange('cusID', e.target.value)
                            }}
                                   className="form-control border-1 mt-2 border-success rounded-2 shadow-sm p-2 "
                                   placeholder="Last Balance" aria-label="CusInvest" disabled
                                   aria-describedby="basic-addon1"/>
                        </div>

                    </div>
                    <input type='submit' value='submit' onClick={onClick} className='btn btn-success w-50 p-2 mt-3 '
                    />

                </div>
            </div>
        </div>
    );
};

export default InterestBalanceForm;