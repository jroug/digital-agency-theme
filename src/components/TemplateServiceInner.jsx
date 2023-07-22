import React from 'react';
import service from '../assets/images/resource/service.jpg';
import { _BannerTop } from "./";
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { logVar } from "./utils/Utils";
import { GraphQLQueries } from "./queries/GraphQLQueries";


const TemplateServiceInner = (props) => {

	const pageSlug = props.pageSlug;

	// chech for sql injection in the pageSlug variable
	const GET_SERVICE_QUERY = gql`query GET_SERVICE_QUERY
    {
      	${GraphQLQueries.queries.getServiceTemplateQuery(pageSlug)}
		${GraphQLQueries.queries.allServices}
    }`;

    const { data, loading, error } = useQuery(GET_SERVICE_QUERY);

    if (loading) { logVar('loading from TemplateServiceInner'); return }
    if (error) { logVar('error from TemplateServiceInner'); return }
    if (!data) { logVar('!data from TemplateServiceInner'); return }

    const serviceTemplateData = data["serviceTemplate_" + pageSlug.replaceAll('/', '').replaceAll('-', '')];
 
 

	const allServices = data.allServices;

	const serviceContent = serviceTemplateData.content;
 
	let parser = new DOMParser();
	let parsedDocument = parser.parseFromString(serviceTemplateData.excerpt, "text/html");
	let serviceTitle = parsedDocument.getElementsByTagName("p")[0].innerText;


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
										{
											allServices.nodes.map( (service, index) => {
												let serviceSlug = service.uri.replace('cpt_services/', 'services/');
												let _className = window.location.pathname === serviceSlug ? 'current' : '';
												return (
													<li className={_className} key={"service" + index}><Link to={serviceSlug}>{service.title}</Link></li>
												)
											})
										}
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
										<h2>{serviceTitle}</h2>
										<div className="text" dangerouslySetInnerHTML={{__html:serviceContent}} ></div>
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