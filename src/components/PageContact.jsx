import React, { useEffect } from 'react';
import contact_1 from '../assets/images/resource/contact-1.jpg';
import { _BannerTop } from "./";
import { useApolloClient, gql } from '@apollo/client';
import { validateName } from "./utils/Utils";
import { GraphQLQueries } from "./queries/GraphQLQueries";
import { logVar } from "./utils/Utils";

const PageContact = (props) => {

    // use later in button action
    const client = useApolloClient();

    // useEffect( () => {
    //     // document.body.classList.add('contact-us');

    //     // const script = document.createElement('script');
    //     // script.src = "https://www.google.com/recaptcha/api.js?render=" + reCAPTCHA_site_key;
    //     // script.id = "g-rec";
    //     // script.addEventListener("load", handleLoadedScript)
    //     // document.body.appendChild(script);

    //     // // clean up after unload
    //     // return () => {
    //     //     document.body.classList.remove('contact-us');
    //     // }
    // });

    const handleContactSubmit = (e) => {
        e.preventDefault();
        document.getElementById('contact_submit').disabled=true;
        logVar('button pressed');

        // window.grecaptcha.ready(_ => {
        // window.grecaptcha
        //     .execute(reCAPTCHA_site_key, { action: "submitContact" })
        //     .then(token => {

                let form_name = document.getElementById('form_name').value;
                let form_email = document.getElementById('form_email').value;
                let form_phone = document.getElementById('form_phone').value;
                let form_message = document.getElementById('form_message').value;
                let form_google_token = 'testgoogle';

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

                const SEND_EMAIL = gql`query SEND_EMAIL($form_name: String, $form_email: String, $form_message: String, $form_google_token: String){
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

                        document.getElementById("form_name").classList.remove("input-error");
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
 
        //     });

        // });

        return false;

    }

    return (
        <>
            <_BannerTop title={props.title} /> 
            {/* <!-- Contact Section --> */}
            <section className="contact-page-section">
                <div className="auto-container">
                    {/* <!-- Sec Title --> */}
                    <div className="sec-title centered">
                        <div className="title">We Help You</div>
                        <div className="separator"><span></span></div>
                        <h2>Contact Us Now</h2>
                    </div>

                    {/* <!-- Contact Form --> */}
                    <div className="contact-form">
                        <form method="post" action="" id="contact-form" onSubmit={handleContactSubmit} >
                            <div className="row clearfix">

                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                    <input type="text" id="form_name" name="form_name" placeholder="Name" required />
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                    <input type="email" id="form_email" name="form_email" placeholder="Email" required />
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                    <input type="text" id="form_phone" name="form_phone" placeholder="Phone" required />
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                    <textarea name="form_message" placeholder="form_message"></textarea>
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 text-center form-group">
                                    <button id="contact_submit" className="theme-btn btn-style-four" type="submit" name="submit-form"><span className="txt">Send Now</span></button>
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 text-center form-group">
                                    <span id="contact-msg">Test</span>
                                </div>

                            </div>
                        </form>

                    </div>

                </div>
            </section>
            {/* <!-- End Contact Section --> */}

            {/* <!-- Map Contact Section --> */}
            <section className="map-contact-page-section">
                <div className="auto-container">
                    <div className="title-box">
                        <h2>Our Support Guys or <br /> Make Appointment With Our Consultan</h2>
                        <div className="text">Please contact us using the information below. For additional information on our management consulting services, please visit <br /> the appropriate page on our site.</div>
                    </div>
                    <div className="map-outer">
                        <div className="map-canvas">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.27990907297!2d-74.25987368715494!3d40.697670064588735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1599163067611!5m2!1sen!2s" height="500" ></iframe>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End Map Contact Section --> */}

            {/* <!-- Contact Info Section --> */}
            <section className="contact-info-section">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="column col-lg-3 col-md-6 col-sm-12">
                            <div className="image">
                                <img src={contact_1} alt="" />
                            </div>
                        </div>
                        <div className="column col-lg-3 col-md-6 col-sm-12">
                            <h3>United Kingdom</h3>
                            <ul>
                                <li>49488 Avenida Obregon, La Quinta, CA 92253</li>
                                <li>+1-(281)-813 926 <br /> +1-(281)-813 612</li>
                                <li>support@ocean.com.uk</li>
                            </ul>
                        </div>
                        <div className="column col-lg-3 col-md-6 col-sm-12">
                            <h3>Australia</h3>
                            <ul>
                                <li>13/1 Dixon Street, Sydney <br /> NSW 2000</li>
                                <li>+1-(281)-813 926 <br /> +1-(281)-813 612</li>
                                <li>support@ocean.com.uk</li>
                            </ul>
                        </div>
                        <div className="column col-lg-3 col-md-6 col-sm-12">
                            <h3>Netherlands</h3>
                            <ul>
                                <li>Nieuwe Leliestraat 27-HS <br /> 101J Amsterdam</li>
                                <li>+1-(281)-813 926 <br /> +1-(281)-813 612</li>
                                <li>support@ocean.com.uk</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End Contact Info Section --> */}
        </>
    );
};

export default PageContact;