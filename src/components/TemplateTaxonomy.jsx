import React, { Suspense, lazy } from 'react';
import { logVar } from './utils/Utils';
import { _BannerTop } from './';
const SectionBlog = lazy ( () => import( './SectionBlog' ) );

const TemplateTaxonomy = (props) => {
    logVar('----TemplateTaxonomy----');
    const title = props.title;
    const taxSlug = props.pageSlug.slice(0, -1).split("/")[0];

    return (
        <>
            <_BannerTop seoFields={props.seoFields} title={"Blog: " + title} key={"banner-top-1"} />
            <Suspense fallback={<div>Loading...</div>} > 
                <SectionBlog taxonomyName={title} taxSlug={taxSlug}   />
            </Suspense>
        </>
    );
};

export default TemplateTaxonomy;