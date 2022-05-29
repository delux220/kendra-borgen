import React from "react"
import { Link , graphql, useStaticQuery} from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faInstagram, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons"
import Layout from "../components/layout"
import SEO from "../components/seo"
import moment from 'moment';

const MediaPage = () => {
  const data = useStaticQuery(query);

  const page = data.strapiVideosPage;

  const socialMedia = data.strapiSocialMedia;

  const videos = data.allStrapiVideo.edges;

  return <Layout>

    <SEO title={page.Title} />
    <div className="container mx-auto min-h-screen pt-20 px-6 md:px-0">
    	<h1 className="font-futura text-red-500 uppercase text-3xl font-bold tracking-widest">{page.Title}</h1>
      <p className="text-gray-100 mb-20">For more videos, visit my <a className="text-red-400 font-bold" href={socialMedia.YouTube}>YouTube Channel</a>.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {
          videos.map((video, i) => <div key={`video-${i}`} className="pb-10">
              <div className="flex justify-center  iframe-fit" dangerouslySetInnerHTML={{__html: video.node.YouTubeEmbedCode}}/>
              <label className="text-white font-sans block text-center text-xs">{video.node.Caption}</label>
            </div>)
        }
      </div>
    </div>

  </Layout>
}


export const query = graphql`
query MediaQuery {
  strapiVideosPage {
    Title
  }
  allStrapiVideo(sort: {order: ASC, fields: Sort}) {
    edges {
      node {
        Sort
        Caption
        YouTubeEmbedCode
      }
    }
  }
  strapiSocialMedia {
    YouTube
  }
}
`;

export default MediaPage;