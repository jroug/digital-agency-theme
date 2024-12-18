// in order for rendering to work properly
// we neet to NOT lazy load header footer and PageHome
// and put PageHome hardcode routing not in wordpress sitemap menu

import React , { Suspense, lazy, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
    Header, 
    Footer,
    // BannerTop,
    // BannerHome,
    AnimationLayout,

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

import { Helmet, HelmetProvider } from "react-helmet-async";

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

// const Footer = lazy(() => import('./components/Footer'));

const BLOG_POST_PER_PAGE = parseInt(process.env.REACT_APP_BLOG_POST_PER_PAGE);

const App = () => {

    // logVar('--------- App --------------');
 
    useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const handleScroll = (event) => {
 

        var mainHeader = document.querySelector('.main-header') || null;
        // var scrollLink = document.querySelector('.scroll-to-top'); 
        var windowpos = window.pageYOffset || document.documentElement.scrollTop;
        if (mainHeader){
            var headerHeight = mainHeader.offsetHeight;
            if (windowpos >= headerHeight) {
                mainHeader.classList.add('fixed-header');
                // scrollLink.style.display = 'block';
            } else {
                mainHeader.classList.remove('fixed-header');
                // scrollLink.style.display = 'none';
            }
        }
    
    }

    // promote caching 
    // **** SOS **** 
    // if you want to remove them and disable caching you need to put each one to graphql document with allow 
    const GET_ALL_QUERY = gql`query GET_ALL_QUERY ($first_gbp: Int, $after_gbp: String)
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
      ${GraphQLQueries.queries.getServiceTemplateQuery('services/development/')}
      ${GraphQLQueries.queries.allServices}

      ${GraphQLQueries.queries.getBlogPosts}

      ${GraphQLQueries.queries.options}

      ${GraphQLQueries.queries.getProjectTemplateQuery('projects/project-1')}
      ${GraphQLQueries.queries.getProjectTemplateQuery('projects/project-2')}
      ${GraphQLQueries.queries.getProjectTemplateQuery('projects/project-3')}
      ${GraphQLQueries.queries.getProjectTemplateQuery('projects/project-4')}

      ${GraphQLQueries.queries.getProjects(4)}

    }`;

    const { data, loading, error } = useQuery(GET_ALL_QUERY,{
        variables: {
            first_gbp: BLOG_POST_PER_PAGE,
            after_gbp: '',
        }
    });

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

    let seoFieldsHome = {title: siteOptions.seoTitleGeneric , description: siteOptions.seoDescriptionGeneric , canonical: process.env.PUBLIC_URL + '/'};
    let seoFields404 = {title: "Page not Found" , description: siteOptions.seoDescriptionGeneric , canonical: process.env.PUBLIC_URL + '/404/'};

    return (
        <HelmetProvider>
            <Helmet>
                <title>WebInSite</title>
            </Helmet>
            <BrowserRouter>
                <Header menuNodes={primaryMenuNodes} headerLogoUrl={siteOptions.headerLogo.sourceUrl} key={"header"} />
                {/* {
                    (process.env.NODE_ENV == 'development') 
                    ?
                    <ToolEditPage />
                    :
                    <></>
                } */}
                <Suspense fallback={<div style={{ display:'block', fontSize:'40px', height:'100vh'}}>Loading</div>} >
                    <div style={{ display:'block', minHeight:'100vh'}} >
                        <Routes >
                            <Route element={<AnimationLayout />}  >
                                <Route key={"home"} path="/" exact element={<PageHome seoFields={seoFieldsHome} />} />
                                {
                                    sitemapMenuItems.map((page, index) => {
                                        let PageComponent = lazy(() => import('./components/' + page.menuExtraFieldsForSitemap.reactComponent));
                                        let pUri = page.uri;
                                        if (pUri.includes('cpt_services')) {
                                            pUri = pUri.replace('cpt_services', 'services');
                                        }
                                        let pageSlug = pUri.slice(1);
                                        let seoFields = {};

                                        // in portfolio will be overriden inside component
                                        seoFields.title = page.menuExtraFieldsForSitemap.seoTitle != null ? page.menuExtraFieldsForSitemap.seoTitle : page.label + ' | ' + siteOptions.seoTitleGeneric;
                                        seoFields.description = page.menuExtraFieldsForSitemap.seoDescription != null ? page.menuExtraFieldsForSitemap.seoDescription : siteOptions.seoDescriptionGeneric;
                                        seoFields.canonical = page.menuExtraFieldsForSitemap.seoCanonical != null ? page.menuExtraFieldsForSitemap.seoCanonical : process.env.PUBLIC_URL + pUri;
                                        // console.log('<'+page.menuExtraFieldsForSitemap.reactComponent, page.id, pUri, pageSlug,  );
                                        return (
                                            <Route key={page.id} exact path={pUri} element={<PageComponent pageSlug={pageSlug} title={page.label} seoFields={seoFields} />} />
                                        )
                                    })
                                }
                                <Route key={"page404"} path="*" element={<Page404 title={"404"} seoFields={seoFields404} />} />
                            </Route>
                        </Routes>
                    </div>
                </Suspense>
                <Footer key={"footer"}
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
        </HelmetProvider>
    );
}; 

export default App;