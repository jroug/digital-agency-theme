import React, { Suspense, lazy } from 'react';
import { _BannerTop } from ".";

import { useQuery, gql } from '@apollo/client';
import { GraphQLQueries} from "./queries/GraphQLQueries";
import { logVar } from "./utils/Utils";

const TemplatePage = (props) => {

    const pageSlug = props.pageSlug;
    const pageSlug_withoutslash = props.pageSlug.replaceAll('/', '');
    const PAGE_CONTENT = gql`query PAGE_CONTENT_${pageSlug_withoutslash}
    {
      ${ GraphQLQueries.queries.getGenericPageQuery(pageSlug) }
    }`;

    const { data, loading, error } = useQuery(PAGE_CONTENT);

    if (loading) { logVar('loading From ------Template Page -----------------------------' + pageSlug + ' Page' ); return }
    if (error) { logVar('error From ' + pageSlug + ' Page' ); return }
    if (!data) { logVar('!data From ' + pageSlug + ' Page' ); return }

    const pageTitle = data[ "genericPage_" + pageSlug_withoutslash ].title;
    const componentsData = data[ "genericPage_" + pageSlug_withoutslash ].componentsSectionsAllPages.componentsSections;
    
    let componentArray = [];
    let idx = 0;

    componentsData.forEach( (element) => {
        componentArray[idx++] = lazy ( () => import( './' + element.title.replaceAll(" ", "") ) );
    });

    // logVar(componentsData);
    // logVar(pageSlug);


    return (
        <>
            <_BannerTop title={pageTitle} /> 
            {
                componentArray.map( (Component, index) => {
                    return ( <Suspense key={pageSlug + index} fallback={<div>Loading...</div>}><Component /></Suspense> )
                })
            }
        </>
    );
};

export default TemplatePage;