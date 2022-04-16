import React from "react"
import { Link , graphql, useStaticQuery} from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faInstagram, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons"
import Layout from "../components/layout"
import SEO from "../components/seo"
import moment from 'moment';

const AboutPage = () => {
  const data = useStaticQuery(query);

  const about = data.strapiAboutPage;

  const socialMedia = data.strapiSocialMedia;
  return <Layout>

    <SEO title="About Kendra" />
    <div className="container mx-auto min-h-screen pt-20 px-6 md:px-0">
    	<div className="grid md:grid-cols-2 gap-10">
    	<div style={{zIndex:0}} >
    		<GatsbyImage image={about.Photo.localFile.childImageSharp.gatsbyImageData} style={{zIndex:0}} className="max-w-full z-10" alt="Kendra Borgen"/>
    		</div>
    		<div className="">
    			<h3 className="text-yellow-400 uppercase font-futura md:tracking-widest font-bold text-3xl mb-3">{about.Title}</h3>
    			<p className="text-white">{about.Description}</p>
    			<div className="hidden md:block my-5 pt-5 border-t border-white">
            <a href={socialMedia.Facebook} target="_blank"><FontAwesomeIcon icon={faFacebook} className="text-xl text-white mr-3"/></a>
            <a href={socialMedia.Twitter} target="_blank"><FontAwesomeIcon icon={faTwitter} className="text-xl text-white mr-3"/></a>
            <a href={socialMedia.YouTube} target="_blank"><FontAwesomeIcon icon={faYoutube} className="text-xl text-white mr-3"/></a>
            <a href={socialMedia.Instagram} target="_blank"><FontAwesomeIcon icon={faInstagram} className="text-xl text-white"/></a>

          </div>
    		</div>
    		
    	</div>

    </div>

  </Layout>
}


export const query = graphql`
query AboutQuery {
  strapiAboutPage {
    Title
    Description
    Photo {
      localFile {
        childImageSharp {
          gatsbyImageData(width: 1024)
        }
      }
    }
  }
  strapiSocialMedia {
    Facebook
    Instagram
    Twitter
    YouTube
  }
}
`;

export default AboutPage;