import React , { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
    _Header,
    _BannerHome, 
    _Footer,
    Page404,
    // PageHome,
    // PagePortfolio,
    // PageContact,
    // TemplatePortfolioInner,
    // TemplateServiceInner,
    // TemplateBlogInner,
    // TemplatePage,
    // PageBlog,
} from "./components";

import { gql, useQuery } from '@apollo/client';
import { GraphQLQueries } from './components/queries/GraphQLQueries';
import { logVar } from './components/utils/Utils';
import ToolEditPage from './components/utils/ToolEditPage';


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

// const ToolEditPage = lazy(() => import('./components/utils/ToolEditPage'));

// const PageHome = lazy(() => import('./components/PageHome'));
// const PagePortfolio = lazy(() => import('./components/PagePortfolio'));
// const PageContact = lazy(() => import('./components/PageContact'));
// const TemplatePortfolioInner = lazy(() => import('./components/TemplatePortfolioInner'));
// const TemplateServiceInner = lazy(() => import('./components/TemplateServiceInner'));
// const TemplateBlogInner = lazy(() => import('./components/TemplateBlogInner'));
// const TemplatePage = lazy(() => import('./components/TemplatePage'));
// const PageBlog = lazy(() => import('./components/PageBlog'));

const App = () => {

 

    const GET_MENUS_QUERY = gql`query GET_MENUS_QUERY
    {
      ${GraphQLQueries.queries.sitemapMenuItems}
      ${GraphQLQueries.queries.primaryMenuItems}
      ${GraphQLQueries.queries.footerMenuItems1}
      ${GraphQLQueries.queries.footerMenuItems2}
    }`;

    const { data, loading, error } = useQuery(GET_MENUS_QUERY);

    if (loading) { logVar('menus query'); return }
    if (error) { logVar('menus query'); return }
    if (!data) { logVar('menus query'); return }

    const sitemapMenuItems = data.sitemapMenuItems.nodes;
    const primaryMenuNodes = data.primaryMenuItems.nodes;
    const footerMenuNodes1 = data.footerMenuItems1.nodes;
    const footerMenu1_name = data.menuName1.nodes[0].name;
    const footerMenuNodes2 = data.footerMenuItems2.nodes;
    const footerMenu2_name = data.menuName2.nodes[0].name;

    // console.log(data.menuName1);

    return (
        <BrowserRouter>
            <_Header menuNodes={primaryMenuNodes} />
            {
                (process.env.NODE_ENV == 'development') 
                ?
                <ToolEditPage />
                :
                <></>
            }
            <Suspense fallback={<span style={{fontSize:'40px'}}>Loading</span>} >
                <Routes >
                    <Route>
                        {
                            sitemapMenuItems.map((page, index) => {
                                let PageComponent = lazy(() => import('./components/' + page.menuExtraFieldsForSitemap.reactComponent));;
                                let pageSlug = page.uri.slice(1);
                                return (
                                    <Route key={page.id} exact path={page.uri} element={<PageComponent pageSlug={pageSlug} title={page.label} />} />
                                )
                            })
                        }
                        <Route key={"page404"} path="*" element={<Page404 title={"404"} />} />
                        {/* They have been entered to sitemap menu */}
                        {/* <Route key={"post"} path="/blog/:slug" element={<TemplateBlogInner title={"Post"} />} />
                        <Route key={"portfolio"} path="/services/:slug" element={<TemplatePortfolioInner title={"Ιστοσελίδα"} />} /> */}
                    </Route>
                </Routes>
            </Suspense>
            <_Footer footerMenu1_name={footerMenu1_name} footerMenuNodes1={footerMenuNodes1} footerMenu2_name={footerMenu2_name} footerMenuNodes2={footerMenuNodes2} />
        </BrowserRouter>
    );
}; 

export default App;