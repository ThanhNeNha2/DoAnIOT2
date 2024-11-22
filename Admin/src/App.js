import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Toaster } from "react-hot-toast";
import Control from "./pages/Control/Control";
function App() {
  const location = window.location.pathname;
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      {user && <Topbar />}
      <div
        className={`${
          location === "/login" || location === "/register"
            ? "block-container"
            : "container"
        }`}
      >
        <Toaster />
        {user && <Sidebar />}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/control">
            <Control />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
