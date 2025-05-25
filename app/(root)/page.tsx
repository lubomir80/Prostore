import { getLatestProduct } from "@/actions/products";
import ProductList from "@/components/shared/product/product-list";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function Homepage() {
   await delay(500)

   const latestProducts = await getLatestProduct()


   return (
      <div>
         <ProductList
            data={latestProducts}
            title="Latest Products"
            limit={4} />
      </div>
   );
}
