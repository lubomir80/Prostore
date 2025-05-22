const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function Home() {
   await delay(500)


   return (
      <div className="">
         Home
      </div>
   );
}
