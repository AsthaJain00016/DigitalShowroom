import { useEffect, useState } from "react";
import { getSaleProduct } from "../api/product.api.js";

const SalePage = () => {
  const [products, setProducts] = useState([]);

 useEffect(() => {
         const fetchProduct = async () => {
             try {
                 const data = await getSaleProduct()
                 setProduct(data)
             } catch (err) {
                 console.log("Error while fecthing featured peoducts", err)
             }
             fetchProduct()
         }
 
     }, [])
  return (
    <div className="px-4 md:px-10 py-10">

      <h1 className="text-2xl font-semibold mb-6 text-red-800">
        Sale Products 🔥
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {products.map((p) => (
          <div key={p._id}>
            <img src={p.images?.[0]} />
            <p>{p.name}</p>

            <p className="text-gray-400 line-through">
              ₹{p.price}
            </p>

            <p className="text-red-800 font-bold">
              ₹{p.discountPrice}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default SalePage;