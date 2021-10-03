const domain = process.env.SHOPIFY_STORE_DOMAIN
const accesstoken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

async function shopifyData(query){
    const URL = `https://${domain}/api/2021-07/graphql.json`
    
    const options = {
        endpoint:URL,
        method:"POST",
        headers:{
            "X-Shopify-Storefront-Access-Token": accesstoken,
            "Accept":"application/json",
            "Content-Type":"application/json",

        },
        body:JSON.stringify({query})
    }
    try {
        const data = await fetch(URL,options). then(response => {
        return response.json()
        })
    return data
}catch(error){
    throw new Error("Problem fetch")
}
}

export async function getproducts(){
    const query =`
    {
        collectionByHandle(handle:"frontpage"){
         title
         products(first: 25){
           edges{
             node{
               id
               title
               handle
               priceRange{
                 minVariantPrice{
                   amount
                 }
               }
               images(first:5){
                 edges{
                   node{
                     originalSrc
                     altText
                   }
                 }
               }
             }
           }
         }
       }
       }`
    const response = await shopifyData(query)
    const allProduct =response.data.collectionByHandle.products.edges?response.data.collectionByHandle.products.edges:[]
    return allProduct
}

export async function getallProduct(){
    const query = `{
        products(first:25){
          edges{
            node{
              handle
              id
            }
          }
        }
      }`
      const response = await shopifyData(query)
      const slugs = response.data.products.edges?response.data.products.edges : []
      return slugs


}

export async function getItem(handle){
    const query =`{
        productByHandle(handle:"${handle}"){
          id
          title
          handle
          description
          images(first: 5){
            edges{
              node{
                originalSrc
                altText
              }
            }
          }
          options{
            name
            values
            id
          }
          variants(first:25){
            edges{
              node{
                selectedOptions{
                  name
                  value
                }
                image{
                  originalSrc
                  altText
                }
                title
                id
                priceV2{
                  amount
                }
              }
            }
          }
        }
      }`
      const response = await shopifyData(query)
      const product = response.data.productByHandle?response.data.productByHandle:[]
      return product

}