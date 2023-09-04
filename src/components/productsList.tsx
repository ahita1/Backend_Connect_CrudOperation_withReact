import React , { useEffect, useState } from "react"

const productsList = ({category} : {category : string}) => {
    const [products , setProducts] = useState<string[]>([])
    //after render
    useEffect(() => {
        console.log("Fetching products in " , category);
        setProducts(["clothing" , "houseHold"])
    } , [category])
  return (
    <div>
     Products list haha
    </div>
  )
}

export default productsList
