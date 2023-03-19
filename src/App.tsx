import { useState } from "react";
import { CartItem } from './interfaces/CartItem';
import { Address } from './interfaces/Address';
import ShoppingList from './ShoppingList/ShoppingList'
import './App.css'
import Navbar from './Navigation/Navbar'
import Delivery from './Delivery/Delivery'
import Submit from './Submit/Submit'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import ProductList from './ProductList/ProductList'
import { ProductItem } from './interfaces/ProductItem';

type Products = { [key: string]: ProductItem };
import Finish from "./Finish/Finish";

const address: Address = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNr: 0,
    company: "",
    vatNr: "",
    country: "Danmark",
    zipCode: "",
    city: "",
    address1: "",
    address2: "",
};

function App() {
    const [basket, setBasket] = useState<CartItem[]>([]);
    const [productList, setList] = useState<Products>({})
    const [billingAddress, setBilling] = useState<Address>(address);
    const [shippingAddress, setShipping] = useState<Address>(address);
    const [check, setCheck] = useState(false);

    const resetAfterSubmit = () => {
        setBasket([]);
        setBilling(address);
        setShipping(address);
        setCheck(false);
    }

    return (
        <Router>
        <div className="App">
            <Navbar/>
            <div className="content">
                <Routes>
                    <Route path='/' element= { <ProductList basket={basket} setBasket={setBasket} setList={setList}/> } />
                    <Route path='/cart' element= { <ShoppingList items={basket} setItems={setBasket} productList={productList}/> } />
                    <Route path='/delivery' element={<Delivery billingAddress={billingAddress} setBilling={setBilling} shippingAddress={shippingAddress} setShipping={setShipping} address={address} check={check} setCheck={setCheck}/>}/>
                    <Route path='/submit' element={<Submit cartItems={basket} billingAddress={billingAddress} shippingAddress={shippingAddress} resetAfterSubmit={resetAfterSubmit}/>}/>
                    <Route path='/finish' element={<Finish/>} />
                </Routes>                  
            </div>
        </div>
        </Router>
    )
}

export default App
