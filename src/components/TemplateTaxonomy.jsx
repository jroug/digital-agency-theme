import React from 'react';

import { _BannerTop, SectionBlog } from ".";

const TemplateTaxonomy = (props) => {

    const title = props.title;
    const taxSlug = props.pageSlug.slice(0, -1).split("/")[0];

    return (
        <>
            <_BannerTop title={"Blog: " + title} />
            <SectionBlog taxonomyName={title} taxSlug={taxSlug} />
        </>
    );
};

export default TemplateTaxonomy;