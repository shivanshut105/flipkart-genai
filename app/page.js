'use client';
import { useState } from "react";
import Cards from "./components/Card/Cards";
// import axios from "axios";


const CARD_DATA = {
  "shirt": [
    {
      name: "Volga NX Hiking & Trekking Shoes For Men  (Black)",
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/u/x/1/-original-imagzry3ynhpbapg.jpeg?q=70",
      link: "https://www.flipkart.com/wildcraft-volga-nx-hiking-trekking-shoes-men/p/itm56f68cb8c3f78?pid=SHOG4HG3FH3H2E7U&lid=LSTSHOG4HG3FH3H2E7UGDYAVM&marketplace=FLIPKART&q=shoes&store=osp&srno=s_1_1&otracker=search&otracker1=search&fm=Search&iid=en_bTejWKauEn4-Vu89Dqz-09EYz3iBdhqJQkFXnO8ZwgXKUjju_jtNEQTFbcGItI_YtbDxpzVNDPmiYmP-kMCcjw%3D%3D&ppt=sp&ppn=sp&qH=b0a8b6f820479900"
    },
    {
      name: "Synthetic Leather |Lightweight|Comfort|Outdoor|Daily Use Sneakers For Men  (White, Black, Red)",
      image: "https://rukminim2.flixcart.com/image/612/612/l51d30w0/shoe/z/w/c/10-mrj1914-10-aadi-white-black-red-original-imagft9k9hydnfjp.jpeg?q=70",
      link: "https://www.flipkart.com/aadi-synthetic-leather-lightweight-comfort-summer-trendy-walking-outdoor-daily-use-sneakers-men/p/itma442bf9226209?pid=SHOGDZZENAJYR87Z&lid=LSTSHOGDZZENAJYR87ZVP3RIY&marketplace=FLIPKART&q=shoes&store=osp&spotlightTagId=BestsellerId_osp&srno=s_1_3&otracker=search&otracker1=search&fm=Search&iid=cd8253bd-58a9-42e2-9f9b-10cbe4e37cdf.SHOGDZZENAJYR87Z.SEARCH&ppt=sp&ppn=sp&qH=b0a8b6f820479900"
    },
    {
      name: "Casual Premium Ankle Length Black Denim Boots Canvas Shoes For Men  (Black)",
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/z/n/r/6-410-boot-for-men-waan-black-original-imagnzdhns4heugy.jpeg?q=70",
      link: "https://www.flipkart.com/waan-casual-premium-ankle-length-black-denim-boots-canvas-shoes-men/p/itma521f0dfc75f5?pid=SHOGNZHUZR6J4TEZ&lid=LSTSHOGNZHUZR6J4TEZIGISNR&marketplace=FLIPKART&q=shoes&store=osp&srno=s_1_5&otracker=search&otracker1=search&fm=Search&iid=cd8253bd-58a9-42e2-9f9b-10cbe4e37cdf.SHOGNZHUZR6J4TEZ.SEARCH&ppt=sp&ppn=sp&qH=b0a8b6f820479900"
    },
  ],
}

export default function Home() {

  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api", {
      body: JSON.stringify({ query }),
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    // const response = await axios.get(`/api`);
    // console.log(response.data);

  };

  return (
    <>
      <main className="w-1/2 mt-7 translate-x-1/2">
        <form onSubmit={handleSubmit}>
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" name='query' onChange={(e) => setQuery(e.target.value)} value={query} required />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
      </main>
      <section>
        <Cards items={CARD_DATA['shirt']} />
      </section>
    </>
  )
}
