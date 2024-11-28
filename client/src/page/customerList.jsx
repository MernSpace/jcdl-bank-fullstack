import Dashboard from "../component/dashboard.jsx";
import CusList from "../component/customer/cusList.jsx";
import {useEffect} from "react";
import CustomerState from "../state/customerState.js";

const customerList=()=> {
    const {readCustomerRequest} = CustomerState();

    useEffect(() => {
        (async ()=>{
            let res = await readCustomerRequest()
        })()
    }, []);
    return (
        <Dashboard>
          <div className=''>
              <CusList/>
          </div>
        </Dashboard>
    );
}

export default customerList;