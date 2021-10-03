import React from 'react'
import Productpagecontent from '../../components/Productpagecontent'
import {getallProduct,getItem} from "../../lib/shopify"

function ProductPage({product}) {
    return (
        <div>
            <Productpagecontent product={product}/>
        </div>
    )
}

export default ProductPage

export async function getStaticPaths() {

    const products = await getallProduct()
    const paths = products.map(items =>{
        const handle =String(items.node.handle)
        return {
            params:{product:handle}
        }
    })
    return {
      paths,
      fallback: false// See the "fallback" section below
    };
  }

  export async function getStaticProps({params}) {
      const product = await getItem(params.product);
      return {
          props:{
              product
          }
      }
  }