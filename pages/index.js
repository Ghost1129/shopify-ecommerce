import { getproducts } from "../lib/shopify"
import Products from "../components/Products"

export default function Home({products}) {
  return (
    <div className="text-2xl">
      <Products products={products}/>
      
    </div>
  )
}
export async function getStaticProps() {
  const products = await getproducts()
  return {
    props: {products}, // will be passed to the page component as props
  }
}
