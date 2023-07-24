import React, { useEffect } from 'react';

import mixitup from 'mixitup';

import { _BannerTop, SectionSubscribeToNL } from "./";

import { gql, useQuery } from '@apollo/client';
import { logVar } from "./utils/Utils";
import { GraphQLQueries } from "./queries/GraphQLQueries";
import { Link } from 'react-router-dom';

const PagePortfolio = (props) => {

    useEffect(() => { 
        if (document.querySelector('.filter-list') == null) return;
        const mixer = mixitup('.filter-list');
        window.mixer = mixer;
        return () => {
            window.mixer.destroy();
        }
    });

    const handleFilterClassChange = (event) => {
        console.log(event.target);
        const filterBtns = document.querySelectorAll('.filter-btns li');
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }

	const GET_ALLPROJECTS_QUERY = gql`query GET_ALLPROJECTS_QUERY
    {
      ${GraphQLQueries.queries.getProjects(1000)}
      ${GraphQLQueries.queries.allProjectCategories}
    }`;

    const { data, loading, error } = useQuery(GET_ALLPROJECTS_QUERY);

    if (loading) { logVar('loading from PagePortfolio'); return }
    if (error) { logVar('error from PagePortfolio'); return }
    if (!data) { logVar('!data from PagePortfolio'); return }

    const allProjects = data["allProjects_1000"];
    const allCategories = data.allProjectCategories;

    // logVar(allProjects);
    // logVar(allCategories);
        
    return (
        <>
            <_BannerTop title={props.title} /> 
            { /* <!-- Projects Page Section --> */ }
            <section className="projects-page-section">
                <div className="auto-container">
                    { /* <!--MixitUp Galery--> */ }
                    <div className="mixitup-gallery">
                        { /* <!--Filter--> */ }
                        <div className="filters clearfix">
                            <ul className="filter-tabs filter-btns text-center clearfix">
                                <li className="active filter" data-role="button" data-filter="all" onClick={handleFilterClassChange} >All</li>
                                {
                                    allCategories.nodes.map( (category, index) => {
                                        let slug = category.uri.replace('/project_cat/','').replace('/','');
                                        return (
                                            <li className="filter"  data-role="button" data-filter={"." + slug} onClick={handleFilterClassChange} key={"category-" + index} >{category.name}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div id="filter-list" className="filter-list row clearfix" >
                            {
                                allProjects.nodes.map( (project, index) => {
                                    let categories = project.projectCategories.nodes;
                                    let categoriesString = '';
                                    categories.forEach( (category, index) => {
                                        categoriesString += ( index !== 0 ? ' / ' : '' );
                                        categoriesString += category.uri.replace('/project_cat/','').replace('/','')  ;
                                    });
                                    return (
                                        <div className={"gallery-item-two mix " + categoriesString + " col-lg-4 col-md-6 col-sm-12"} data-ref="item" key={"project-" + index} >
                                            <div className="inner-box">
                                                <figure className="image-box">
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
 
            { /* <!-- End Projects Page Section --> */ }
            <SectionSubscribeToNL />
        </>
    );
};

export default PagePortfolio;