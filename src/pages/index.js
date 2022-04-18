import React from "react"
import { Link , graphql, useStaticQuery} from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faInstagram, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons"
import Layout from "../components/layout"
import SEO from "../components/seo"
import moment from 'moment';

const IndexPage = () => {
  const data = useStaticQuery(query);

  const today = new Date().toISOString().slice(0, 10);

  const socialMedia = data.strapiSocialMedia;

  const page = data.strapiHomePage;

  const [shows, setShows] = React.useState([]);
  
  React.useEffect(() => {

    let _shows = [];

      data.allStrapiShow.edges.forEach(show => {

        show.node.Dates.forEach(dt => {
          //alert(moment(dt.StartDate).isSameOrAfter(today));
          if (moment(dt.StartDate).isSameOrAfter(today) ) {

            let _show = {... show.node};
            _show.Dates = null;
            _show.DateTime = dt;
            _shows.push(_show);
          }
        });

      });
  

    _shows.sort((a, b) => {
      if (moment(a.DateTime.StartDate).isBefore(b.DateTime.StartDate)) {
        return -1;
      }
      return 1;
    });


    setShows(_shows);

  }, []);

  return <Layout>
    <SEO title="Home" />
    <div className="bg-cover bg-fixed relative lg:bg-no-repeat bg-black h-screen hero md:bg-center" style={{backgroundImage: "url('https://res.cloudinary.com/meshed-nyc/w_3000,c_fill,q_auto/KB1_kgacty_ie7qef.jpg')"}}>
      <div className="container mx-auto flex justify-center md:justify-start items-end h-full pb-32">
        <div className="md:inline-block text-center md:text-left">
          <h1 className="text-white text-3xl md:text-5xl text-center block md:text-left font-bold font-futura uppercase tracking-widest">{page.Title}</h1>
          <h3 className="text-white md:text-gray-400 text-center md:text-left  font-sans  uppercase tracking-widest mt-2">{page.Subtitle}</h3>
          <div className="w-full flex items-between justify-between mt-3">
            <a href={socialMedia.Facebook} className="text-white hover:text-gray-400" target="_blank"><FontAwesomeIcon icon={faFacebook} className="text-2xl "/></a>
            <a href={socialMedia.Twitter} className="text-white hover:text-gray-400"  target="_blank"><FontAwesomeIcon icon={faTwitter} className="text-2xl"/></a>
            <a href={socialMedia.YouTube} className="text-white hover:text-gray-400"  target="_blank"><FontAwesomeIcon icon={faYoutube} className="text-2xl"/></a>
            <a href={socialMedia.Instagram} className="text-white hover:text-gray-400"  target="_blank"><FontAwesomeIcon icon={faInstagram} className="text-2xl"/></a>
            
          </div>

        </div>

      <div className="absolute w-full text-center md:text-left" style={{left: 0, bottom:0}}>
      <div className="container mx-auto px-1 py-1">
        <small className="text-gray-600">Photo credit: <a className="text-gray-300" href="https://twitter.com/korneeldefeyter" target="_blank">@korneeldefeyter</a></small>
      </div>
      </div>
      </div>
    </div> 
    <div className="bg-black" id="shows">
      <div className="container max-w-5xl mx-auto py-20 px-5 md:px-0">
        <div className="text-center">
          <h1 className="text-yellow-400 font-bold uppercase font-futura text-5xl mb-20 mt-10 tracking-widest">Upcoming Shows</h1>
        </div>  
          {shows.length == 0 && <div className="text-center">
              <p className="text-gray-400">Nothing right now. Check back soon for show dates.</p>
            </div>}
          {
            shows.map(show => <div key={`show-${show.id}`} className="grid grid-cols-2 md:grid-cols-3 w-full mb-10 clear-both overflow-auto block">
                <div className="">
                  <div className="bg-white float-left p-2 md:p-3 text-center w-16 md:w-20 h-16 md:h-20 flex justify-center items-center">
                    <h3 className="text-black font-bold uppercase font-futura" style={{fontWeight:'700'}}>{moment(show.DateTime.StartDate).format('MMM')}<br/>{moment(show.DateTime.StartDate).format('D')}</h3>
                  </div>
                  <div className="bg-black float-left p-2 md:p-3 border border-white text-center w-16 md:w-20 h-16 md:h-20 flex justify-center items-center">
                  <h3 className="text-white font-bold uppercase  font-futura">{moment(show.DateTime.StartDate).format('h:mm a')}</h3>
                  </div>
                </div>
                <div className="">
                  <h1 className="text-white font-bold font-futura"><a href={show.DateTime.TicketsURL} target="_blank" className="text-white hover:text-yellow-400">{show.Title}</a></h1>
                  <span className="font-bold text-yellow-300 text-sm">{show.Location.Name}&nbsp;</span>
                  <span className=" text-gray-100 text-sm">{show.Location.Address1}</span><br/><span className=" text-gray-100 text-sm">{show.Location.Address2}</span>
                </div>
                <div className="hidden md:flex justify-end items-center">
                  {
                    show.DateTime.TicketsURL!=''&&<a href={show.DateTime.TicketsURL} target="_blank" className="uppercase text-white border-whitet px-7 py-5 border font-futura font-bold float-right">Tickets</a>
                  }
                </div>
              </div>)
          }
        

      </div>

    </div>
    <div className="bg-black">
      <div className="container mx-auto  max-w-3xl px-5 md:px-0">
      <form action="https://kendraborgen.us14.list-manage.com/subscribe/post?u=935ddc2ec69be34aa4f93aedc&id=73663b4e86" method="POST">
        <h3 className="font-futura uppercase tracking-widest text-white">Receive updates in your inbox</h3>
        <div className="grid md:grid-cols-3 gap-2">
          <input name="EMAIL" type="email" className="md:col-span-2 p-3 bg-white font-sans" placeholder="Your email address"/>
          <button className="border border-white text-white font-futura font-bold py-3 uppercase" type="submit">Subscribe</button>
        </div>
        </form>
      </div>
    </div>
  </Layout>
};

export const query = graphql`
query MyQuery($today: Date) {
  allStrapiShow(filter: {Dates: {elemMatch: {StartDate: {gte: $today}}}}) {
    edges {
      node {
        id
        Title
        Location {
          Address1
          Address2
          Name
          Website
        }
        Dates {
          StartDate
          TicketsURL
        }
      }
    }
  }
  strapiHomePage {
    Title
    Subtitle
  }
  strapiSocialMedia {
    Facebook
    Instagram
    Twitter
    YouTube
  }
}
`;

export default IndexPage
