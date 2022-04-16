/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faInstagram, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons"

import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      strapiSocialMedia {
        Facebook
        Instagram
        Twitter
        YouTube
      }
    }
  `);

  const socialMedia = data.strapiSocialMedia;

  return (
    <>
      <Header siteTitle={'KB'} />
      <div>
        <main>{children}</main>
        <footer className="bg-black">
          <div className="container mx-auto py-20 text-center text-white">
            <div>
              <div className="flex items-between justify-between mb-3 w-64 mx-auto">
                <a href={socialMedia.Facebook} target="_blank"><FontAwesomeIcon icon={faFacebook} className="text-xl text-white"/></a>
                <a href={socialMedia.Twitter} target="_blank"><FontAwesomeIcon icon={faTwitter} className="text-xl text-white"/></a>
                <a href={socialMedia.YouTube} target="_blank"><FontAwesomeIcon icon={faYoutube} className="text-xl text-white"/></a>
                 <a href={socialMedia.Instagram} target="_blank"><FontAwesomeIcon icon={faInstagram} className="text-xl text-white"/></a>

              </div>
            </div>
          © {new Date().getFullYear()}, Kendra Borgen
          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
