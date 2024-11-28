import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import CreateCustomer from './page/create-customer';
import CustomerList from "./page/customerList.jsx";
import UpdateCustomer from "./page/update-customer.jsx";
import AddBalancePage from "./page/add-balance-page.jsx";
import WithdrawBalancePage from "./page/withdraw-balance-page.jsx";
import HomePage from "./page/home-page.jsx";
import CreateUserPage from "./page/create-user-page.jsx";
import LoginUserPage from "./page/login-user-page.jsx";
import AddBalanceListPage from "./page/add-balance-list-page.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/"  element={<HomePage/>} />
                <Route path="/register-user"  element={<CreateUserPage/>} />
                <Route path="/login-user"  element={<LoginUserPage/>} />
                <Route path="/add-customer" element={<CreateCustomer/>} />
                <Route path="/update-customer/:id" element={<UpdateCustomer/>} />
                <Route path="/customer-list" element={<CustomerList/>} />
                <Route path="/add-balance" element={<AddBalancePage/>}/>
                <Route path="/add-balance-list" element={<AddBalanceListPage/>}/>
                <Route path="/withdraw-balance" element={<WithdrawBalancePage/>}/>

                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}


export default App;