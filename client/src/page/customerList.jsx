import Dashbord from "../component/dashbord.jsx";
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
        <Dashbord>
          <div className=''>
              <CusList/>
          </div>
        </Dashbord>
    );
}

export default customerList;