import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';
import './App.css'
import {getToken} from "./helper/SessionHelper.js";
import CreateCustomer from './page/create-customer';
import CustomerList from "./page/customerList.jsx";
import UpdateCustomer from "./page/update-customer.jsx";
import AddBalancePage from "./page/add-balance-page.jsx";
import WithdrawBalancePage from "./page/withdraw-balance-page.jsx";
import HomePage from "./page/home-page.jsx";
import CreateUserPage from "./page/create-user-page.jsx";
import LoginUserPage from "./page/login-user-page.jsx";
import AddBalanceListPage from "./page/add-balance-list-page.jsx";
import {Fragment} from "react";
import AddInterestPage from "./page/add-interest-page.jsx";

function App() {
    if (getToken()) {
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>

                        <Route exact path="/add-customer" element={<CreateCustomer/>}/>
                        <Route exact path="/update-customer/:id" element={<UpdateCustomer/>}/>
                        <Route path="/customer-list" element={<CustomerList/>}/>

                        <Route path="/add-balance" element={<AddBalancePage/>}/>
                        <Route path="/add-balance-list" element={<AddBalanceListPage/>}/>
                        <Route path="/withdraw-balance" element={<WithdrawBalancePage/>}/>

                        <Route path="/add-interest" element={<AddInterestPage/>}/>
                    </Routes>
                </BrowserRouter>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login"/>}/>
                        <Route exact path="/register-user" element={<CreateUserPage/>}/>
                        <Route exact path="/login" element={<LoginUserPage/>}/>
                    </Routes>
                </BrowserRouter>
            </Fragment>
        )
    }
}


export default App;