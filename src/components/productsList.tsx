import React , { useEffect, useState } from "react"

const productsList = () => {
    const [products , setProducts] = useState<string[]>([])
    //after render
    useEffect(() => {
        console.log("Fetching haha");
        setProducts(["clothing" , "houseHold"])
    })
  return (
    <div>
     Products list haha
    </div>
  )
}

export default productsList
