import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function Homepage() {
   await delay(500)


   return (
      <div>
         <ProductList
            data={sampleData.products}
            title="Latest Products"
            limit={4} />
      </div>
   );
}
