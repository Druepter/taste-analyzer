import { Fragment } from 'react'
import React, { useState, useEffect} from "react";
import axios from "axios";

import App from "./App";

export default function Login({_AUTH_ENDPOINT, _CLIENT_ID, _REDIRECT_URI, _RESPONSE_TYPE, _scope}) {

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 lg:h-screen">
        <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          

          <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-5xl">
                <span className="block xl:inline">Herzlich Willkommen</span>{' '}
                <span className="block text-spotifyColor xl:inline">Spotify Taste Analyzer</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                In dieser Webapplikation kannst du dich mit deinem Spotify-Profil anmelden. Wir werden
                dann deinen Musikgeschmack analysieren und Kategorisieren. Wir werden Playlisten zu
                verschiedenen Stimmungen auf deinem Spotify-Profil anlegen.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href={`${_AUTH_ENDPOINT}?client_id=${_CLIENT_ID}&redirect_uri=${_REDIRECT_URI}&response_type=${_RESPONSE_TYPE}&scope=${_scope}`}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-spotifyColor hover:bg-spotifyColorHover md:py-4 md:text-lg md:px-10"
                  >
                    Mit Spotify einloggen
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        />
      </div>
    </div>
  )
}