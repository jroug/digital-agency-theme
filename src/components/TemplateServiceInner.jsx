import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../assets/images/resource/service.jpg';
import { _BannerTop } from "./";

import { useQuery, gql } from '@apollo/client';
import { logVar, isValidSlug } from "./utils/Utils";
import { getServiceTemplateQuery } from "./queries/GraphQLQueries";


const TemplateServiceInner = () => {

	const navigate = useNavigate();
	let serviceTemplateData;

	useEffect(() => {
		if (serviceTemplateData === null ){
			navigate('/404');
		}
	});


	const pagePathName = window.location.pathname;
	const pageSlug = isValidSlug(pagePathName) ? pagePathName.slice(1, -1) : '404'; // trim slash from the beginning and the end

	// chech for sql injection in the pageSlug variable
	const GET_SERVICE_QUERY = gql`query GET_SERVICE_QUERY
    {
      ${getServiceTemplateQuery(pageSlug)}
    }`;

    const { data, loading, error } = useQuery(GET_SERVICE_QUERY);

    if (loading) { logVar('loading from TemplateServiceInner'); return }
    if (error) { logVar('error from TemplateServiceInner'); return }
    if (!data) { logVar('!data from TemplateServiceInner'); return }

    serviceTemplateData = data.serviceTemplate;

	// if service not found redirect to 404
	if (serviceTemplateData === null ){
		// return in order to be faster
		return;
	}

    return (
        <>
            <_BannerTop title={serviceTemplateData!=null ? serviceTemplateData.title : '' } />   
            <div className="sidebar-page-container">
				<div className="auto-container">
					<div className="row clearfix">

						{/* <!-- Sidebar Side --> */}
						<div className="sidebar-side col-lg-4 col-md-12 col-sm-12">
							<aside className="sidebar">

								{/* <!-- Services --> */}
								<div className="sidebar-widget">
									<ul className="service-list">
										<li className="current" ><a href="services-detail.html">Web Develpment</a></li>
										<li><a href="services-detail.html">Strategy &amp; Planning</a></li>
										<li><a href="services-detail.html">Marketing Research</a></li>
										<li><a href="services-detail.html">Growth Tracking</a></li>
										<li><a href="services-detail.html">Enterprise Consulting</a></li>
									</ul>
								</div>

								{/* <!-- Broucher Widget --> */}
								{/* <div className="sidebar-widget broucher-widget">
									<div className="widget-content">
										<h3>Download Our Brochures</h3>
										<div className="content-inner">
											<div className="icon flaticon-pdf-1"></div>
											<div className="text">Business is a marketing discipline focused on growing visibility in organic (non-paid) technic required.</div>
											<a href="#" className="download">Click here to download</a>
										</div>
									</div>
								</div> */}

							</aside>
						</div>

						{/* <!-- Content Side --> */}
						<div className="content-side col-lg-8 col-md-12 col-sm-12">
							<div className="services-detail">
								<div className="inner-box">
									<div className="image">
										<img src={service} alt="" />
									</div>
									<div className="lower-content">
										<h2>Startegy and Plan</h2>
										<div className="text">
											<p>Having been around for over a decade, Basecamp is considered a reliable tool that excels at giving organizations a high-level view of their teams. Like Asana, Basecamp can help monitor tracking, but also offers additional features like direct messaging chats, centralized document storage, and a scheduling tool.Basecamp aims to take on Slack, Asana, Google Drive, and Dropbox by melding all of their competitors into one robust management tool.</p>
											<h3>Features</h3>
											<p>Designed with the harried business person in mind, Basecamp helps managers and team members stay on top of their professional lives. The app boasts that users will no longer drown in a sea of emails as that feature is already embedded into the app. Additionally, the scheduling and tracking features help ensure teams never again miss a deadline. Another interesting component of Basecamp is that managers can eliminate the need for “check-in” meetings by sending an automated message daily to employees that ask for a recap of what they accomplished that day. Then employees can “tag” teammates in their recaps to explain what they need help with or what they finished.</p>
											<h3>Cost</h3>
											<p>A unique feature of Basecamp is that the app doesn’t charge for an increase in the number of users or projects. So unlike some of its peers, Basecamp charges a flat-fixed fee of $99 a month for a team, no matter the size.</p>
											<h3>Why It’s Good for SEO Pros</h3>
											<p>Managing a client’s SEO consists of many different timelines and action items. Keeping track of client emails, meetings , and central documents is a full-time job.</p>
											<p>By offering one of the best all-encompassing software solutions, Basecamp helps busy SEO pros stay on top of their entire business by more efficiently checking in with their team and deadlines in one easy to use the app.Casie Gillette, senior director of digital marketing at KoMarketing, uses Basecamp mainly for communicating to clients.</p>
											<p>“Basecamp is our primary means of communication with clients,” Gillette said. “For any deliverable, it allows an easy way to track the conversation and adjust docs accordingly.”</p>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
        </>
    );
};

export default TemplateServiceInner;