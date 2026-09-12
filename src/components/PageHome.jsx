import QueryState from './QueryState';

import React, { Suspense, lazy } from "react";
import { useQuery, gql } from '@apollo/client';

import {GraphQLQueries} from "./queries/GraphQLQueries";
import { logVar } from "./utils/Utils";

import { BannerHome } from "./";

const PageHome = (props) => {


    const HOMEPAGE_CONTENT = gql`query HOMEPAGE_CONTENT
    {
      ${GraphQLQueries.queries.homePage}
    }`;

    // const HOMEPAGE_CONTENT = gql`query HOMEPAGE_CONTENT
    // {
    //   ${GraphQLQueries.queries.homePage}
    //   ${GraphQLQueries.queries.sectionOurServices}
    //   ${GraphQLQueries.queries.sectionWhyUs}
    // }`;

    const { data, loading, error, refetch } = useQuery(HOMEPAGE_CONTENT);

    if (loading) return <QueryState loading />;
    if (error || !data) return <QueryState onRetry={refetch} />;

    const homepageData = data.homePage.homepageFields;
    const componentsData = data.homePage.componentsSectionsAllPages.componentsSections;

    // const SectionOurServices = lazy ( () => import('./SectionOurServices') );
    // const SectionWhyUs = lazy ( () => import('./SectionWhyUs') );
    
    var componentArray = [];
    let idx = 0;
    
    componentsData.forEach( (element) => {
        componentArray[idx++] = lazy ( () => import( './' + element.title.replaceAll(" ", "") ) );
    });

    // logVar(componentArray);
    // const SectionOurServices = lazy ( () => import('./SectionOurServices') );
    
 
    console.log('home');
 
    return (
       <>
           <BannerHome seoFields={props.seoFields} homeHeaderData = { homepageData } />
           {
              componentArray.map( (Component, index) => {
                // console.log('return', index);
                return( 
                    <Suspense key={'aa'+index} fallback={<div>Loading...</div>}>
                      <Component key={'idxa'+index} />
                    </Suspense>
                )
              })
           }
       </>
    );
}
export default PageHome;