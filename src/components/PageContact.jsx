import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BannerTop } from "./";
import { useApolloClient, gql, useQuery } from '@apollo/client';
import { validateName } from "./utils/Utils";
import { GraphQLQueries } from "./queries/GraphQLQueries";
import { logVar } from "./utils/Utils";

let reCAPTCHA_site_key = process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY; // site key - google recaptcha


const PageContact = (props) => {

    // use later in button action
    const client = useApolloClient();

    useEffect( () => {
        // document.body.classList.add('contact-us');

        const script = document.createElement('script');
        script.src = "https://www.google.com/recaptcha/api.js?render=" + reCAPTCHA_site_key;
        script.id = "g-rec";
        // script.addEventListener("load", handleLoadedScript)
        document.body.appendChild(script);

        // clean up after unload
        return () => {
            document.getElementById('g-rec').remove();
            if (document.getElementsByClassName('grecaptcha-badge')[0]) {
                document.getElementsByClassName('grecaptcha-badge')[0].remove();
            }else{
                setTimeout(function(){
                    if (document.getElementsByClassName('grecaptcha-badge')[0]) {
                        document.getElementsByClassName('grecaptcha-badge')[0].remove();
                    }
                },1200)
            }
        }
    }, []);

 

    const handleContactSubmit = (e) => {
        e.preventDefault();
        document.getElementById('contact_submit').disabled=true;
        alert('code ready but deactivated');
        return;
        logVar('button pressed');

        window.grecaptcha.ready(_ => {
        window.grecaptcha
            .execute(reCAPTCHA_site_key, { action: "submitContact" })
            .then(token => {

                let form_name = document.getElementById('form_name').value;
                let form_email = document.getElementById('form_email').value;
                let form_phone = document.getElementById('form_phone').value;
                let form_message = document.getElementById('form_message').value;
                let form_google_token = token;

                let doSubmit = true;
                if ( !validateName(form_name) ) {
                    // form_name
                    document.getElementById("form_name").classList.add("input-error");
                    doSubmit = false;
                }

                // form_email html validation
                // form_message html validation

                if (!doSubmit){
                    document.getElementById('contact_submit').disabled=false;
                    return false;
                } 

                const data_vars = {
                    'form_name': form_name,
                    'form_email': form_email,
                    'form_phone': form_phone,
                    'form_message': form_message,
                    'form_google_token': form_google_token,
                } ;

                const SEND_EMAIL = gql`query SEND_EMAIL($form_name: String, $form_email: String, $form_phone: String, $form_message: String, $form_google_token: String){
                    ${GraphQLQueries.queries.emailSent}
                } `;
                
                client.query({
                    fetchPolicy: 'network-only',
                    query: SEND_EMAIL,
                    variables: data_vars
                }).then(result_data => {
                    document.getElementById('contact_submit').disabled=false;
                    var result = JSON.parse(result_data.data.emailSent);
                    if (result.status==200){
                        document.getElementById('form_name').value='';
                        document.getElementById('form_email').value='';
                        document.getElementById('form_phone').value='';
                        document.getElementById('form_message').value='';
                        document.getElementById('contact-msg-error').innerHTML = '';
                        document.getElementById('contact-msg').innerHTML = result.message;
                        setTimeout(function(){
                            document.getElementById('contact-msg').innerHTML = '';
                        }, 5000);

                        // document.getElementById("form_name").classList.remove("input-error");
                        // document.getElementById("form_email").classList.remove("input-error");
                        // document.getElementById("form_message").classList.remove("input-error");

                    }else{
                        document.getElementById('contact-msg').innerHTML = '';
                        document.getElementById('contact-msg-error').innerHTML = result.message;
                    }
                })
                .catch(error => {
                    document.getElementById('contact-msg').innerHTML = '';
                    document.getElementById('contact-msg-error').innerHTML = 'There was an error!';
                    document.getElementById('contact_submit').disabled=false;
                    logVar(error);
                });
 
            });

        });

        return false;

    }


    const CONTACT_CONTENT = gql`query CONTACT_CONTENT
    {
      ${GraphQLQueries.queries.contactPage}
    }`;

    const { data, loading, error } = useQuery(CONTACT_CONTENT);

    if (loading) { logVar('loading From Contact_Page'); return }
    if (error) { logVar('error From Contact_Page'); return }
    if (!data) { logVar('!data From Contact_Page'); return }

    const contactData = data.contactPage;
    const contactFields = contactData.contactFields;

    return (
        <>
            <BannerTop title={contactData.title} seoFields={props.seoFields} /> 
            {/* <!-- Contact Section --> */}
            <section className="contact-page-section">
                <div className="auto-container">
                    {/* <!-- Sec Title --> */}
                    <div className="sec-title centered">
                        <div className="title">{contactFields.smallTitleTop}</div>
                        <div className="separator"><span></span></div>
                        <h2>{contactFields.mainTitle}</h2>
                    </div>

                    {/* <!-- Contact Form --> */}
                    <div className="contact-form">
                        <form method="post" action="" id="contact-form" onSubmit={handleContactSubmit} >
                            <div className="row clearfix">

                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                    <input type="text" id="form_name" name="form_name" placeholder="Name" maxLength={100} required />
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                    <input type="email" id="form_email" name="form_email" placeholder="Email" maxLength={100} required />
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                    <input type="text" id="form_phone" name="form_phone" placeholder="Phone" maxLength={30} required />
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                    <textarea id="form_message" name="form_message" placeholder="Message" maxLength={1000} required ></textarea>
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 text-center form-group">
                                    <button id="contact_submit" className="theme-btn btn-style-four" type="submit" name="submit-form"><span className="txt">Send Now</span></button>
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 text-center form-group">
                                    <span id="contact-msg" style={{"color":"blue"}}></span>
                                    <span id="contact-msg-error" style={{"color":"red"}}></span>
                                </div>

                            </div>
                        </form>

                    </div>

                </div>
            </section>
            {/* <!-- End Contact Section --> */}

            {/* <!-- Map Contact Section --> */}
            <section className="map-contact-page-section contact-info-section">
                <div className="auto-container">
                    <div className="title-box">
                        <h2>{contactFields.secondaryTitle}</h2>
                        <div className="text">{contactFields.secondaryText}</div>
                    </div>
                    <div className="row clearfix">
                        <div className="column col-md-8">
                            <div className="map-outer">
                                <div className="map-canvas" dangerouslySetInnerHTML={{__html: contactFields.embedMapCode}}></div>
                            </div>
                        </div>
                        <div className="column col-md-4 mt-5">
                            <div>
                            <h3>{contactFields.contactTitle}</h3>
                            <ul>
                                <li>A: <Link to={contactFields.contactAddressLink} target="_blank" >{contactFields.contactAddress}</Link></li>
                                <li>
                                    T: <Link to={"tel:" + contactFields.contactPhone1.replaceAll(' ','')} >{contactFields.contactPhone1}</Link> 
                                    <br /> 
                                    T: <Link to={"tel:" + contactFields.contactPhone2.replaceAll(' ','')}>{contactFields.contactPhone2}</Link>
                                </li>
                                <li>E: <Link to={"mailto:" + contactFields.contactEmail} >{contactFields.contactEmail}</Link></li>
                            </ul>
                        </div>
                        </div>
                    </div>


                </div>
            </section>
            {/* <!-- End Map Contact Section --> */}

            {/* <!-- Contact Info Section --> */}
            {/* <section className="contact-info-section">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="column col-md-6 col-sm-12">
                            <div className="image text-sm-center text-md-right">
                                <img src={contactFields.contactImage.sourceUrl} alt="" />
                            </div>
                        </div>
                        <div className="column col-md-6 col-sm-12 text-sm-center text-md-left">
                            <h3>{contactFields.contactTitle}</h3>
                            <ul>
                                <li><Link to={contactFields.contactAddressLink} target="_blank" >{contactFields.contactAddress}</Link></li>
                                <li>
                                    <Link to={"tel:" + contactFields.contactPhone1.replaceAll(' ','')} >{contactFields.contactPhone1}</Link> 
                                    <br /> 
                                    <Link to={"tel:" + contactFields.contactPhone2.replaceAll(' ','')}>{contactFields.contactPhone2}</Link>
                                </li>
                                <li><Link to={"mailto:" + contactFields.contactEmail} >{contactFields.contactEmail}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <!-- End Contact Info Section --> */}
        </>
    );
};

export default PageContact;