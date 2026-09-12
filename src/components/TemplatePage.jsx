import QueryState from './QueryState';
import React, { Suspense, lazy } from 'react';
// import { BannerTop } from ".";

import { useQuery, gql } from '@apollo/client';
import { GraphQLQueries} from "./queries/GraphQLQueries";



const TemplatePage = (props) => {
 
    const BannerTop = lazy ( () => import( './BannerTop' ) );
    const pageSlug = props.pageSlug;
    const pageSlug_withoutslash = props.pageSlug.replaceAll('/', '');
    const PAGE_CONTENT = gql`query PAGE_CONTENT_${pageSlug_withoutslash}
    {
      ${ GraphQLQueries.queries.getGenericPageQuery(pageSlug) }
    }`;

    const { data, loading, error, refetch } = useQuery(PAGE_CONTENT);

    if (loading) return <QueryState loading />;
    if (error || !data) return <QueryState onRetry={refetch} />;

    const pageTitle = data[ "genericPage_" + pageSlug_withoutslash ].title;
    const pageContent = data[ "genericPage_" + pageSlug_withoutslash ].content;
    const componentsData = data[ "genericPage_" + pageSlug_withoutslash ].componentsSectionsAllPages.componentsSections;
    
    let componentArray = [];
    let idx = 0;

    componentsData && componentsData.forEach( (element) => {
        componentArray[idx++] = lazy ( () => import( './' + element.title.replaceAll(" ", "") ) );
    });

    // logVar(componentsData);
    // logVar(pageSlug);


    return (
        <>
            <Suspense fallback={<div>Loading...</div>}> <BannerTop seoFields={props.seoFields} title={pageTitle} key={"banner-top-1"} /> </Suspense>
            {/* <BannerTop title={pageTitle} key={"banner-top-2"} />  */}
            { 
                pageContent !== '' || pageContent!== null
                ?
                <section className="content-page-section">
                    <div className="auto-container" dangerouslySetInnerHTML={{__html: pageContent}} ></div>
                </section>
                :
                <></>
            }
            {
                componentArray.map( (Component, index) => {
                    return ( <Suspense key={pageSlug + index} fallback={<div>Loading...</div>}><Component /></Suspense> )
                })
            }
        </>
    );
};

export default TemplatePage;