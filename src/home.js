import React from "react";

export default function Home(){
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Transactions</h2>
            <MeinButton>

            </MeinButton>
        </div>

    )
}

function MeinButton(){
    return(
        <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div class="rounded-md shadow">
            <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"> Get started Now</a>
            </div>
        </div>
    )
  }