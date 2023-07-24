// in order for rendering to work properly
// we neet to NOT lazy load header footer and PageHome
// and put PageHome hardcode routing not in wordpress sitemap menu

import React , { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
    _Header, 
    _Footer,
    // _BannerTop,
    // _BannerHome,
    _AnimationLayout,

    PageHome,
    // PagePortfolio,
    // PageContact,
    // TemplatePortfolioInner,
    // TemplateServiceInner,
    // TemplateBlogInner,
    // TemplatePage,
    // PageBlog,
    // SectionOurServices,
    // SectionSubscribeToNL,
    Page404


} from "./components";

import { gql, useQuery } from '@apollo/client';
import { GraphQLQueries } from './components/queries/GraphQLQueries';
import { logVar } from './components/utils/Utils';
// import ToolEditPage from './components/utils/ToolEditPage';


import './assets/css/bootstrap.css';
import './assets/css/font-awesome.css';
import './assets/css/flaticon.css';
import './assets/css/animate.css';
// import './assets/css/owl.css';
// import './assets/css/jquery-ui.css';
import './assets/css/animation.css';
import './assets/css/jquery.fancybox.min.css';
// import './assets/css/jquery.mCustomScrollbar.min.css';
import './assets/css/main.css';
import './assets/css/responsive.css';
import './assets/css/custom.css';




const _BannerHome = lazy(() => import('./components/_BannerHome'));
const _BannerTop = lazy(() => import('./components/_BannerTop'));

const PagePortfolio = lazy(() => import('./components/PagePortfolio'));
const PageContact = lazy(() => import('./components/PageContact'));

const TemplatePage = lazy(() => import('./components/TemplatePage'));

const SectionAboutUs = lazy(() => import('./components/SectionAboutUs'));
const SectionOurServices = lazy(() => import('./components/SectionOurServices'));
const SectionSubscribeToNL = lazy(() => import('./components/SectionSubscribeToNL'));
const SectionFAQ = lazy(() => import('./components/SectionFAQ'));
const SectionTestimonials = lazy(() => import('./components/SectionTestimonials'));
const SectionWhyUs = lazy(() => import('./components/SectionWhyUs'));
const SectionBlog = lazy(() => import('./components/SectionBlog'));

const TemplatePortfolioInner = lazy(() => import('./components/TemplatePortfolioInner'));
const TemplateServiceInner = lazy(() => import('./components/TemplateServiceInner'));

// const _Footer = lazy(() => import('./components/_Footer'));

const BLOG_POST_PER_PAGE = process.env.REACT_APP_BLOG_POST_PER_PAGE;

const App = () => {

    // logVar('--------- App --------------');

    useEffect(() => {
        console.log('my useEffect')
    })

    // promote caching
    const GET_ALL_QUERY = gql`query GET_ALL_QUERY
    {
      ${GraphQLQueries.queries.sitemapMenuItems}
      ${GraphQLQueries.queries.primaryMenuItems}
      ${GraphQLQueries.queries.footerMenuItems1}
      ${GraphQLQueries.queries.footerMenuItems2}

      ${GraphQLQueries.queries.homePage}
      ${GraphQLQueries.queries.contactPage}
      
      ${GraphQLQueries.queries.getGenericPageQuery('about/') }
      ${GraphQLQueries.queries.getGenericPageQuery('about/testimonials/') }
      ${GraphQLQueries.queries.getGenericPageQuery('services/') }
      ${GraphQLQueries.queries.getGenericPageQuery('faq/') }
      ${GraphQLQueries.queries.getGenericPageQuery('blog/') }

      ${GraphQLQueries.queries.getProjects()}
      ${GraphQLQueries.queries.allProjectCategories}

      ${GraphQLQueries.queries.sectionFAQ}
      ${GraphQLQueries.queries.sectionOurServices}
      ${GraphQLQueries.queries.sectionSubscribeToNL}
      ${GraphQLQueries.queries.sectionTestimonials}
      ${GraphQLQueries.queries.sectionWhyUs}
      ${GraphQLQueries.queries.sectionAboutUs}
      
      ${GraphQLQueries.queries.getServiceTemplateQuery('services/web-design-develpment/')}
      ${GraphQLQueries.queries.getServiceTemplateQuery('services/digital-marketing/')}
      ${GraphQLQueries.queries.getServiceTemplateQuery('services/ecommerce/')}
      ${GraphQLQueries.queries.getServiceTemplateQuery('services/seo-optimization/')}
      ${GraphQLQueries.queries.getServiceTemplateQuery('services/hosting/')}
      ${GraphQLQueries.queries.allServices}

      ${GraphQLQueries.queries.getBlogPosts('' ,'' ,'' ,BLOG_POST_PER_PAGE ,'')}

      ${GraphQLQueries.queries.options}

      ${GraphQLQueries.queries.getProjectTemplateQuery('projects/project-1')}
      ${GraphQLQueries.queries.getProjectTemplateQuery('projects/project-2')}
      ${GraphQLQueries.queries.getProjectTemplateQuery('projects/project-3')}
      ${GraphQLQueries.queries.getProjectTemplateQuery('projects/project-4')}

      ${GraphQLQueries.queries.getProjects(4)}



    }`;

    const { data, loading, error } = useQuery(GET_ALL_QUERY);

    if (loading) { logVar('menus query loading'); return }
    if (error) { logVar(error); return }
    if (!data) { logVar('menus query !data'); return }

    const sitemapMenuItems = data.sitemapMenuItems.nodes;
    const primaryMenuNodes = data.primaryMenuItems.nodes;
    const footerMenuNodes1 = data.footerMenuItems1.nodes;
    const footerMenu1_name = data.menuName1.nodes[0].name;
    const footerMenuNodes2 = data.footerMenuItems2.nodes;
    const footerMenu2_name = data.menuName2.nodes[0].name;

    const siteOptions = data.siteOptions.optionsFieds;

    // console.log(data);
    logVar('--------------- App.js before return -------------------------');

    return (
        <BrowserRouter>
            <_Header menuNodes={primaryMenuNodes} headerLogoUrl={siteOptions.headerLogo.sourceUrl} key={"header"} />
            {/* {
                (process.env.NODE_ENV == 'development') 
                ?
                <ToolEditPage />
                :
                <></>
            } */}
            <Suspense fallback={<span style={{fontSize:'40px'}}>Loading</span>} >
                <Routes >
                    <Route element={<_AnimationLayout />}  >
                        {/* we need home to be outside in order not to render for ever */}
                        <Route key={"home"} path="/" exact element={<PageHome />} />
                        {
                            sitemapMenuItems.map((page, index) => {
                                let PageComponent = lazy(() => import('./components/' + page.menuExtraFieldsForSitemap.reactComponent));
                                let pUri = page.uri;
                                if (pUri.includes('cpt_services')) {
                                    pUri = pUri.replace('cpt_services', 'services');
                                }
                                let pageSlug = pUri.slice(1);
                                
                                // console.log(page.menuExtraFieldsForSitemap.reactComponent, pageSlug, pUri);
                                return (
                                    <Route key={page.id} exact path={pUri} element={<PageComponent pageSlug={pageSlug} title={page.label} />} />
                                )
                            })
                        }
                        <Route key={"page404"} path="*" element={<Page404 title={"404"} />} />
                        {/* They have been entered to sitemap menu */}
                        {/* <Route key={"post"} path="/blog/:slug" element={<TemplateBlogInner title={"Post"} />} /> */}
                    </Route>
                </Routes>
            </Suspense>
            <_Footer key={"footer"}
                    footerLogoUrl={siteOptions.footerLogo.sourceUrl}
                    footerMenu1_name={footerMenu1_name} 
                    footerMenuNodes1={footerMenuNodes1} 
                    footerMenu2_name={footerMenu2_name} 
                    footerMenuNodes2={footerMenuNodes2} 

                    footerText = {siteOptions.footerText}
                    footerAddress = {siteOptions.footerAddress}
                    footerAddressLink = {siteOptions.footerAddressLink}
                    footerPhone1 = {siteOptions.footerPhone1}
                    footerPhone2 = {siteOptions.footerPhone2}
                    footerEmail = {siteOptions.footerEmail}
                    footerCopyrights = {siteOptions.footerCopyrights}
                    socialLinkFacebook = {siteOptions.socialLinkFacebook}
                    socialLinkInstagram = {siteOptions.socialLinkInstagram}
                    socialLinkTwitter = {siteOptions.socialLinkTwitter}
                    socialLinkLinkedin = {siteOptions.socialLinkLinkedin}
                />
        </BrowserRouter>
    );
}; 

export default App;