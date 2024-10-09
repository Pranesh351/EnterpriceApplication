import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProductContext from "../Hooks/UseProductContext";

const ProductDetails = () => {
    const {state, dispatch} =useProductContext();
    const id=useParams().id;
    const product= state.productDetails;
    const [quantity, setQuantity]= useState(0);

    useEffect(()=>{
        if(product){
            setQuantity(product.minimumOrderQuantity)
        }
    },[product]);

    useEffect(()=>{
        const details= async()=> {
            if(!state.products || state.products && state.products.length === 0){
                const response= await fetch("https://dummyjson.com/products/"+id)
                const JSON= await response.json()

                await dispatch({type:"SET_PRODUCT_DETAILS", payload: JSON})
            }else if(state.products && state.products.length>=0){
                await dispatch({type:"SET_PRODUCT_DETAILS", payload: state.products.filter((product)=>product.id===Number(id))[0]})
            }
        } 
        details()
    },[])


    return <div>
        {product && <div className='detailsTab'>
            <img src={product.images[0]}></img>

            <span className="detailsHeader">
                <h1>{product.title}</h1>
                <h2>{product.brand}</h2>
                <p>{product.description}</p>
            </span>

            <div className="subHeader">
                <span className="stock">
                    <p>Availability: {product.stock}</p>
                    <p>Stock: {product.availabilityStatus}</p>
                    <p>Min Order: {product.minimumOrderQuantity} Nos</p>
                    <span>
                        <button disabled={quantity<=product.minimumOrderQuantity} onClick={()=>setQuantity(quantity-1)}>-</button>
                            <input value={quantity} disabled={true}/>
                        <button disabled={quantity>=product.stock} onClick={()=>setQuantity(quantity+1)}>+</button>
                    </span>
                </span>

                <span className="purchase">
                    <p>Rating: {product.rating.toString().substring(0,3)}/5</p>
                    <p>Discount: {product.discountPercentage} %</p>
                    <p> 
                        Price: <span className="orginalPrice"> {product.price}$</span> 
                        <span className="price"> {Number(product.price*(1-(product.discountPercentage/100))).toFixed(2)}$</span>
                    </p>
                    <button disabled={product.stock<product.minimumOrderQuantity}>Buy Now</button>
                </span>
            </div>
            
            <div className="features">
                <p>Return Policy: {product.returnPolicy}</p>
                <p>Shipping: {product.shippingInformation}</p>
                <p>Warranty: {product.warrantyInformation}</p>
            </div>

            <h3>More Details</h3>
            <div className="moreDetails">
                {Object.entries(product.dimensions).map(([key, value]) => {
                    return <p>{key}: {value}</p>
                })}
                <p>weight: {product.weight} g</p>
            </div>

            <h3>Overall review: {product.rating.toString().substring(0,3)} / 5</h3>
            <h3>Ratings</h3>

            <div className="reviews">
                {product.reviews.map((item)=>{return <div className="review">
                    <div className="reviewHeader">
                        <h4>{item.reviewerName} <span className="reviewTime">{item.date.split('T')[0]} | {" "}
                            {item.date.split('T')[1].split(':')[0]}:
                            {item.date.split('T')[1].split(':')[1]}:
                            {item.date.split('T')[1].split(':')[2].split('.')[0]}
                        </span></h4>
                        <h6>{item.reviewerEmail}</h6>
                        <p className="rating">Rating: {item.rating}</p>
                    </div>
                    <p>{item.comment}</p>
                </div>})}
            </div>
        </div>}

        {!product && <p>No products where found, Please try to search another product.</p>}
    </div>
}
 
export default ProductDetails;