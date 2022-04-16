import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo";
import ReCAPTCHA from "react-google-recaptcha";

function encode(data) {
  return Object.keys(data)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
    )
    .join("&");
}

const ContactPage = () => {

  const data = useStaticQuery(query);

  const page = data.strapiContactPage;

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [recaptcha, setRecaptcha] = React.useState(null);

  const [disabled, setDisabled] = React.useState(false);

  const validate= (e) => {

    e.preventDefault();

    setErrorMessage('');

    setSuccessMessage('');

    setDisabled(true);
    
    var error = false;

    if (name == '' || email == '' || message == '') {
      error =  true;
    }

    if (error) {
      
      setErrorMessage("All fields are required");
      return false;
    }

    let myForm = document.getElementById("contact-form");
    let formData = new FormData(myForm);
    

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": e.target.getAttribute("name"),
        "name" : name,
        "email" : email,
        "message" : message,
        "g-recaptcha-response" : recaptcha
      })
    }).then((resp) => {
      setSuccessMessage('Thank you for reaching out!');
    }).catch((e) => {
      setDisabled(false);
      setErrorMessage('Your form could not be submitted..');
    });


    return false;

    
  }

  return <Layout>
    <Seo title="Contact" />
    <div className="container mx-auto grid md:grid-cols-2 py-20 gap-5 md:px-0 px-5 min-h-screen">
      
      <div className="col-span-2 md:col-span-1">
        <h1 className="text-yellow-400 font-bold tracking-widest font-futura uppercase text-3xl  mb-5">{page.Title}</h1>
        <div className="text-gray-200 mb-10">
          {page.Description}
        </div>
          <form action={'#'} method="post" netlify-honeypot="bot-field" data-netlify="true" name="contact" onSubmit={validate} id="contact-form" data-netlify-recaptcha="true">
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact" />
            <label className="font-sans text-gray-400 mb-1 text-sm block uppercase">Name </label>
            <input type="text" name="name" maxLength="255" className="p-3 bg-white block w-full mb-5" value={name} onChange={(e) => setName(e.target.value)}/>
            <label className="font-sans text-gray-400 block text-sm mb-1 uppercase">Email Address</label>
            <input type="email" name="email" maxLength="255" className="p-3 bg-white block w-full mb-5" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"/>
            <label className="font-sans text-gray-400 block text-sm mb-1 uppercase">Message</label>
            <textarea name="message" maxLength="255" className="p-3 bg-white block w-full mb-8" value={message} onChange={(e) => setMessage(e.target.value)} rows="4"></textarea>
            <ReCAPTCHA
              sitekey="6LeepXsfAAAAAIuJeT3GOJV2W0-zM9ABDXMOtURF"
              onChange={(value) => setRecaptcha(value)}
              className="mb-5"
            />
            {successMessage!=''&&<span className="text-green-500 block mb-8">{successMessage}</span>}
            {errorMessage!=''&&<span className="text-red-500 block mb-8">{errorMessage}</span>}
            <button disabled={disabled} className="border border-white uppercase text-sm font-bold px-5 py-3 text-white block md:inline w-full md:w-auto">Submit</button>
          </form>
      </div>
      

     </div>
  </Layout>
};
const query = graphql`
query ContactPageQuery {
  strapiContactPage {
        Title
        Description
  }
}
`;

export default ContactPage
