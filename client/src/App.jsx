import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashbord from './component/dashbord';
import CreateCustomer from './page/create-customer';
import CustomerList from "./page/customerList.jsx";
import UpdateCustomer from "./page/update-customer.jsx";
import AddBalancePage from "./page/add-balance-page.jsx";
import WithdrawBalancePage from "./page/withdraw-balance-page.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/"  element={<Dashbord/>} />
                <Route path="/add-customer" element={<CreateCustomer/>} />
                <Route path="/update-customer/:id" element={<UpdateCustomer/>} />
                <Route path="/customer-list" element={<CustomerList/>} />
                <Route path="/add-balance" element={<AddBalancePage/>}/>
                <Route path="/withdraw-balance" element={<WithdrawBalancePage/>}/>

                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}


export default App;