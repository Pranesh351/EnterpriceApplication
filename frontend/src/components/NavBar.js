import { useLocation, useNavigate } from "react-router-dom";
import Categories from "./Categories";
import Search from "./Search";
import useProductContext from "../Hooks/UseProductContext";

const NavBar = () => {
    const navigate= useNavigate();
    const {dispatch}= useProductContext();
    const location= useLocation();
    const isInHomePage= location.pathname==="/";

    const handleClick = async() => {
        await  dispatch({ type: 'SET_SELECTED_CATEGORY', payload: {name:"all", url:""}});
        await dispatch({type: 'SET_SEARCH_TERM', payload: ""});

        const response= await fetch(`https://dummyjson.com/products?limit=11`)
        const JSON= await response.json()
        const actualArray= JSON.products.length===11 ? JSON.products.slice(0,10) : JSON.products;

        dispatch({ type: 'SET_NEW_PRODUCTS', payload: actualArray})
        dispatch({type:'SET_HAS_NEXT', payload: JSON.products.length===11})

        if (!isInHomePage) navigate('/');
    };
      

    return ( <div className="navBar">
        <h1 onClick={()=>handleClick()}>Enterprice Application</h1>
        <Search />
        <Categories />
    </div> );
}
 
export default NavBar;