import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const useProductContext= ()=>{
    const context = useContext(ProductContext);
    if(!context){
        throw Error("UseProductContext can't be used outside the context of ProductContext ");
    }

    return context;
}

export default useProductContext;