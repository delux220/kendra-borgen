import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

function Header({ siteTitle }) {
  const [isExpanded, toggleExpansion] = useState(false)

  return (
    <nav className=" w-full absolute z-40">
      <div className=" container mx-auto">
      <div className="md:flex flex-wrap items-center justify-between px-6 md:px-0 py-6 z-40">
      <div className="hidden lg:flex items-center flex-shrink-0 mr-6 text-white">
        <span className="text-xl font-futura font-semibold tracking-tight">
          {siteTitle}
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => toggleExpansion(!isExpanded)}
          className="flex items-center px-3 py-3 z-40 text-white border border-white hover:text-white hover:border-white"
        >
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isExpanded ? `block` : `hidden`
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto z-40`}
      >
        <div className="text-sm lg:flex-grow bg bg-black/90 lg:bg-transparent w-1/2 mt-4 md:mt-0 z-40 md:w-1/3 lg:w-auto p-4 md:p-0">
        <Link
            to={`/`}
            className="block md:mt-4 mr-4 text-white lg:inline-block lg:mt-0 hover:text-white uppercase font-sans hover:text-red-400"
          >
            Home
          </Link>
        <Link
            to={`/about`}
            className="block mt-4 mr-4 text-white lg:inline-block lg:mt-0 hover:text-white uppercase font-sans hover:text-red-400"
          >
            About
          </Link>
          <Link
            to={`/#shows`}
            className="block mt-4 mr-4 text-white lg:inline-block lg:mt-0 hover:text-white uppercase font-sans hover:text-red-400"
          >
            Shows
          </Link>
          
          <Link
            to={`/media`}
            className="block mt-4 mr-4 text-white lg:inline-block lg:mt-0 hover:text-white uppercase font-sans hover:text-red-400"
          >
            Media
          </Link>
       
          <Link
            to={`/contact`}
            className="block mt-4 mr-4 text-white lg:inline-block lg:mt-0 hover:text-white uppercase font-sans hover:text-red-400"
          >
            Contact
          </Link>
        </div>
      </div>
      </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
