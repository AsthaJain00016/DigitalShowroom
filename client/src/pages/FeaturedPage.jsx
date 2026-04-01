import { useEffect, useState } from "react";
import { getFeaturedProduct } from "../api/product.api.js";

const FeaturedPage = () => {
    const [products, setProduct] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getFeaturedProduct()
                setProduct(data)
            } catch (err) {
                console.log("Error while fecthing featured peoducts", err)
            }
            fetchProduct()
        }

    }, [])
    return (
        <div className="px-4 md:px-10 py-10">
            <h1>Featured Collection</h1>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p._id}>
            <img src={p.images?.[0]} />
            <p>{p.name}</p>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>

        </div>
    )
            
}   

export default FeaturedPage