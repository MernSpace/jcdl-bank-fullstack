import React, {useEffect} from 'react';
import Table from "react-bootstrap/Table";
import {DeleteAlert} from "../../helper/deleteAlert.js";
import interestStore from "../../state/interestState.js";



const InterestList = () => {

    const {readBalanceListRequest,interestBalanceData} = interestStore();

    useEffect(() => {
        (async ()=>{
            await readBalanceListRequest()
        })()
    }, []);

    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        console.log(id)
        if (Result.isConfirmed) {
            console.log(id)
        }
    }
    return (
        <div>
            <div className=' px-3  mt-5'>
                <h2 className='py-3'>Interest Balance List</h2>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Customer Name</th>
                        <th>Customer Phone</th>
                        <th>Customer Address</th>
                        <th>Invoice No:</th>
                        <th>Balance</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {interestBalanceData.length > 0 ? (
                        interestBalanceData.map((customer, index) => {
                            const createdDate = new Date(customer.createdAt);

                            // Format the createdAt date (Example: "DD/MM/YYYY")
                            const formattedDate = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`;

                            return (
                                <tr key={customer.id || index}>
                                    <td>{index + 1}</td>
                                    <td>{customer.customerDetails.fName}</td>
                                    <td>{customer.customerDetails.phone}</td>
                                    <td>{customer.customerDetails.address}</td>
                                    <td>{customer.invoiceID}</td>
                                    <td>{customer.balance}</td>
                                    <td>{formattedDate}</td>
                                    <td className='text-center'>
                                        <button onClick={DeleteItem.bind(this, customer._id)}
                                                className='btn btn-success mx-2'>Edit
                                        </button>
                                        <button onClick={DeleteItem.bind(this, customer._id)}
                                                className='btn btn-danger'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan="7">No customers available</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default InterestList;