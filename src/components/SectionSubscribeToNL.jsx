import React, { useEffect } from 'react';

import pattern19 from '../assets/images/background/pattern-19.png';
// import subscribe from '../assets/images/resource/subscribe.png';

import { useApolloClient } from '@apollo/client';
import { validateName } from "./utils/Utils";
import { useQuery, gql } from '@apollo/client';

import {GraphQLQueries} from "./queries/GraphQLQueries";
import { logVar } from "./utils/Utils";


let reCAPTCHA_site_key = process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY; // site key - google recaptcha
 

const SectionSubscribeToNL = () => {

    // use later in button action
    const client = useApolloClient();

    useEffect( () => {
        if (!reCAPTCHA_site_key) return;
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


    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!reCAPTCHA_site_key || !window.grecaptcha) {
            window.alert('This form is not configured yet. Please try again later.');
            return;
        }
        document.getElementById('submit-button').disabled=true;
        alert('code ready but deactivated / check cases of subscriber status && check accept terms && change email to correct one && id double opt in needed with verification email');
        return;
        logVar('button pressed');

        window.grecaptcha.ready(_ => {
        window.grecaptcha
            .execute(reCAPTCHA_site_key, { action: "submitNL" })
            .then(token => {

                let first_name = document.getElementById('first_name').value;
                let last_name = document.getElementById('last_name').value;
                let email = document.getElementById('email').value;
                let form_google_token = token;

                let doSubmit = true;
                if ( !validateName(first_name) ) {
                    // first_name
                    document.getElementById("first_name").classList.add("input-error");
                    doSubmit = false;
                }
                if ( !validateName(last_name) ) {
                    // last_name
                    document.getElementById("last_name").classList.add("input-error");
                    doSubmit = false;
                }

                // form_email html validation
                // form_message html validation

                if (!doSubmit){
                    document.getElementById('submit-button').disabled=false;
                    return false;
                } 

                const data_vars = {
                    'first_name': first_name,
                    'last_name': last_name,
                    'email': email,
                    'form_google_token': form_google_token,
                } ;

                console.log(data_vars);

                const SEND_EMAIL = gql`query SEND_FOR_REGISTRATION_MC ($first_name: String, $last_name: String, $email: String, $form_google_token: String){
                    ${GraphQLQueries.queries.registerToMailchimp}
                } `;
                
                client.query({
                    fetchPolicy: 'network-only',
                    query: SEND_EMAIL,
                    variables: data_vars
                }).then(result_data => {
                    document.getElementById('submit-button').disabled=false;
                    // logVar(result_data);
                    var result = JSON.parse(result_data.data.registerToMailchimp);
                    if (result.status === 200){
                        document.getElementById('first_name').value='';
                        document.getElementById('last_name').value='';
                        document.getElementById('email').value='';

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
                    document.getElementById('submit-button').disabled=false;
                    logVar(error);
                });
 
            });

        });

        return false;

    }

    const SUBNL_SECTION_CONTENT = gql`query SUBNL_SECTION_CONTENT
    {
      ${GraphQLQueries.queries.sectionSubscribeToNL}
    }`;

    const { data, loading, error } = useQuery(SUBNL_SECTION_CONTENT);

    if (loading) { logVar('loading From SectionSubscribeToNL'); return }
    if (error) { logVar('error From SectionSubscribeToNL'); return }
    if (!data) { logVar('!data From SectionSubscribeToNL'); return }

    const sectionSubscribeToNLData = data.sectionSubscribeToNL.sectionSubscribeToNLFields;
// console.log(sectionSubscribeToNLData);

    return (
        <section className="subscribe-section">
            <div className="pattern-layer" style={{ "backgroundImage" : "url(" + pattern19 + ")" }} ></div>
            <div className="auto-container">
                <div className="row clearfix">
    
                    {/* <!-- Image Column --> */}
                    <div className="image-column col-lg-6 col-md-12 col-sm-12">
                        <div className="inner-column">
                            <div className="image">
                                <img src={sectionSubscribeToNLData.mainImage.sourceUrl} alt="" />
                            </div>
                        </div>
                    </div>
    
                    {/* <!-- Form Column --> */}
                    <div className="form-column col-lg-6 col-md-12 col-sm-12">
                        <div className="inner-column">
                            <h2 dangerouslySetInnerHTML={{__html:sectionSubscribeToNLData.mainTitle}}></h2>
                            {/* <!-- Subscribe Form --> */}
                            <div className="subscribe-form">
                                <form method="post" action="" onSubmit={handleFormSubmit} >
                                    <div className="form-group">
                                        <input type="text" id="first_name" name="first_name" placeholder="First Name" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" id="last_name" name="last_name" placeholder="Last Name" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" id="email" name="email" placeholder="Email" required />
                                    </div>
                                    <div className="form-group">
                                        <button className="theme-btn btn-style-five" type="submit" id="submit-button" name="submit-button"><span className="txt">subscribe</span></button>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 text-center form-group">
                                        <span id="contact-msg" style={{"color":"blue"}}></span>
                                        <span id="contact-msg-error" style={{"color":"red"}}></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                     
                </div>
            </div>
        </section>
    );
};

export default SectionSubscribeToNL;