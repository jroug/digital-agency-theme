import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { logVar, isValidSlug } from "./utils/Utils";
import { GraphQLQueries } from "./queries/GraphQLQueries";

// import all images resources
// import img17 from '../assets/images/gallery/17.jpg';
// import img18 from '../assets/images/gallery/18.jpg';
// import img11 from '../assets/images/gallery/11.jpg';
// import img12 from '../assets/images/gallery/12.jpg';
// import img13 from '../assets/images/gallery/13.jpg';

import { Link } from 'react-router-dom';    

import { BannerTop } from "./";

const TemplatePortfolioInner = (props) => {

    const navigate = useNavigate();
	let projectTemplateData;

	useEffect(() => {
		if (projectTemplateData === null ){
			navigate('/404');
		}
	});

	const pagePathName = window.location.pathname;
	const pageSlug = isValidSlug(pagePathName) ? pagePathName.slice(1, -1) : '404'; // trim slash from the beginning and the end

	const GET_PROJECT_QUERY = gql`query GET_PROJECT_QUERY
    {
      ${GraphQLQueries.queries.getProjectTemplateQuery(pageSlug)}
      ${GraphQLQueries.queries.getProjects(4)}
    }`;
    
    // logVar(GET_PROJECT_QUERY);
    
    const { data, loading, error } = useQuery(GET_PROJECT_QUERY);

    if (loading) { logVar('loading from TemplatePortfolioInner'); return }
    if (error) { logVar('error from TemplatePortfolioInner'); return }
    if (!data) { logVar('!data from TemplatePortfolioInner'); return }

    projectTemplateData = data["portfolioProject_" + pageSlug.replaceAll('/','').replaceAll('-','')];

	// if service not found redirect to 404
	if (projectTemplateData === null ){
		// return in order to be faster
		return;
	}

    // logVar(projectTemplateData);
    const projectTitle = projectTemplateData!=null ? projectTemplateData.title : '';
    const projectContent = projectTemplateData.content;
    const projectInfo = projectTemplateData.projectExtraFields.projectInfo;
    const projectMainImage = projectTemplateData.projectExtraFields.mainImage.sourceUrl;
    const projectSecondImage = projectTemplateData.projectExtraFields.secondImage !== null ? projectTemplateData.projectExtraFields.secondImage.sourceUrl : null;
    const projectCategories = projectTemplateData.projectCategories;

// logVar('projectCategories', projectCategories);
 


    const allProjects = data["allProjects_4"];
    let countOfProjects = 0;
    // logVar(projectInfo);
    // logVar(data);

    // 
    let getTitleParts = props.seoFields.title.split(" | ");
    const seoFieldsForPortfolio = {
        title: ( projectTemplateData!=null ? projectTemplateData.title : '' ) + " | " + getTitleParts[1] ,
        description: props.seoFields.description,
        canonical: props.seoFields.canonical,
    }

    const projectSecondImageClass = projectSecondImage !== null ?  8 : 12 ;

    return (
        <>
            <BannerTop seoFields={seoFieldsForPortfolio} title={projectTitle} parentTitle={"Portfolio"} parentLink={"/portfolio/"} />   

            { /* <!-- Projects Detail Section --> */ }
            <section className="projects-detail-section">
                <div className="auto-container">
                    { /* <!-- Gallery Boxed --> */ }
                    <div className="gallery-boxed">
                        <div className="row clearfix">

                            <div className={"column col-lg-" + projectSecondImageClass + " col-md-" + projectSecondImageClass + " col-sm-12"}>
                                <div className="single-item-carousel owl-carousel owl-theme">
                                    <div className="slide">
                                        <div className={  projectSecondImage !== null ? "image imageFrame imageFrame510" : "image imageFrame" }>
                                            <img src={projectMainImage} alt="" />
                                        </div>
                                    </div>
                                    {/* <div className="slide">
                                        <div className="image">
                                            <img src={img17} alt="" />
                                        </div>
                                    </div>
                                    <div className="slide">
                                        <div className="image">
                                            <img src={img17} alt="" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            { 
                                projectSecondImage!== null 
                                ?
                                    <div className="column col-lg-4 col-md-4 col-sm-12">
                                        <div className="image imageFrame imageFrame510 imageFrameMob">
                                            <img src={projectSecondImage} alt="" />
                                        </div>
                                    </div>
                                :
                                    <></>
                            }
                        </div>
                    </div>

                    { /* <!-- Lower Content --> */ }
                    <div className="lower-content">
                        <div className="row clearfix">

                            <div className="column col-lg-8 col-md-12 col-sm-12">
                                <h3>Analysis</h3>
                                <div dangerouslySetInnerHTML={{__html: projectContent}}></div>
                            </div>
                            <div className="column col-lg-4 col-md-12 col-sm-12">
                                <h3>Project Info</h3>
                                <ul className="project-info">
                                    {
                                        projectInfo === null || projectInfo.trim() === '' 
                                        ?
                                            <>
                                                <li >Client: {projectTitle}</li>
                                                <li >Project: 
                                                    <ul className="project-inner-cats-ul">
                                                        {
                                                            projectCategories.nodes && projectCategories.nodes.map( (category, index) => (
                                                                    <li key={"prj_cats_"+index} > {category.uri.replace('/project_cat/','').replace('/','')}</li>
                                                            ))
                                                        }  
                                                    </ul> 
                                                </li>
                                            </>
                                        :
                                            <li>{projectInfo}</li> 
                                    }
                                </ul>
                            </div>

                        </div>
                    </div>

                    {/* <h3>Challenge & Solutions</h3>
                    <p>Peacefully between its four familiar walls. A collection of textile samples lay spread out on the table – Samsa was a travelling salesman – and above it there hung a piture that he had recently cut out of an illustrated magazine A collection of textile samples lay spread out on the table</p>
                    <div className="row clearfix">
                        <div className="column col-lg-6 col-md-12 col-sm-12">
                            <ul className="list-style-four">
                                <li>Between its four familiar walls. A collection of textile samples</li>
                                <li>A collection of textile samples lay spread out on the table</li>
                            </ul>
                        </div>
                        <div className="column col-lg-6 col-md-12 col-sm-12">
                            <ul className="list-style-four">
                                <li>Familiar walls a collection of textile samples</li>
                            </ul>
                        </div>
                    </div> */}
                </div>
            </section>
            { /* <!-- End Projects Page Section --> */ }

            { /* <!-- Related Section --> */ }
            <section className="related-projects-section">
                <div className="auto-container">
                    <div className="inner-container">

                        { /* <!-- Sec Title --> */ }
                        <div className="sec-title centered">
                            <div className="title">Related Work</div>
                            <div className="separator"><span></span></div>
                            <h2>More Projects</h2>
                        </div>

                        <div className="row clearfix">
                            {
                                
                                allProjects.nodes.map( (project, index) => {

                                    if (project.uri === '/' + pageSlug + '/' || countOfProjects === 3) {
                                        return null;
                                    }
                                    countOfProjects++;

                                    let categories = project.projectCategories.nodes;
                                    let categoriesString = '';
                                    categories.forEach( (category, index) => {
                                        categoriesString += index !== 0 ? ' / ' : ''
                                        categoriesString += category.uri.replace('/project_cat/','').replace('/','')  ;
                                    });

                                    return (
                                        <div key={"prj"+index} className="gallery-item-two col-lg-4 col-md-6 col-sm-12">
                                            <div className="inner-box">
                                                <figure className="image-box imageFrame370">
                                                    <img src={project.projectExtraFields.listThumb.sourceUrl} alt="" />
                                                    { /* <!--Overlay Box--> */ }
                                                    <div className="overlay-box">
                                                        <div className="overlay-inner">
                                                            <div className="content">
                                                                <Link to={project.uri} className="link"><span className="icon fa fa-link"></span></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </figure>
                                                { /* <!-- Lower Box --> */ }
                                                <div className="lower-box">
                                                    <Link className="arrow-link" to={project.uri} ><span className="icon fa fa-arrow-right"></span></Link>
                                                    <h3><Link to={project.uri} >{project.title}</Link></h3>
                                                    <div className="category">{categoriesString}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </section>
            { /* <!-- End Related Section --> */ }

            {/* <SectionSubscribeToNL /> */}
        </>
    );
};

export default TemplatePortfolioInner;