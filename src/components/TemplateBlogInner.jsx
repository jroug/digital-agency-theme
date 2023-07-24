import React, { Suspense, useEffect, lazy } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { _BannerTop } from "./";
import { useQuery, gql } from '@apollo/client';
import { logVar, isValidSlug } from "./utils/Utils";
import { GraphQLQueries } from "./queries/GraphQLQueries";

const _BannerTop = lazy ( () => import( './_BannerTop' ) );

const TemplateBlogInner = () => {

    let countRecentPosts = 0;

	const navigate = useNavigate();
	let postTemplateData;

	useEffect(() => {
		if (postTemplateData === null ){
			navigate('/404');
		}
	});

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        logVar(event.target.elements);
        const searchField = event.target.elements.searchField.value;
        navigate('/search/' + searchField);
    }

	const pagePathName = window.location.pathname;
	const pageSlug = isValidSlug(pagePathName) ? pagePathName.slice(1, -1) : '404'; // trim slash from the beginning and the end
    // const pageSlug = pagePathName.slice(1, -1);
	// chech for sql injection in the pageSlug variable
	const GET_POST_QUERY = gql`query GET_POST_QUERY_11
    {
      ${GraphQLQueries.queries.getBlogPostTemplateQuery(pageSlug)}
      ${GraphQLQueries.queries.allPostCategories}
      ${GraphQLQueries.queries.allPostTags}
      ${GraphQLQueries.queries.getAllPosts(4)}
    }`;

    const { data, loading, error } = useQuery(GET_POST_QUERY);

    if (loading) { logVar('loading from Post'); return }
    if (error) { logVar('error from Post'); return }
    if (!data) { logVar('!data from Post'); return }

    postTemplateData = data.blogPost;

	// if service not found redirect to 404
	if (postTemplateData === null ){
		// return in order to be faster
		return;
	}

    const allPostCategories = data.allPostCategories;
    const allPostTags = data.allPostTags;
    const allPosts = data.allPosts;

    // logVar(allPosts);
    // logVar(allPostTags);
    // logVar(allPostCategories);

    return (
        <> 
            <Suspense fallback={<div>Loading...</div>} >
                <_BannerTop parentTitle={"Blog"} parentLink={"/blog/"} title={postTemplateData == undefined ? "" : postTemplateData.title } />  
            </Suspense>
            <div className="sidebar-page-container">
                <div className="auto-container">
                    <div className="row clearfix">
                        { /* <!-- Content Side / Blog Single --> */ }
                        <div className="content-side col-lg-8 col-md-12 col-sm-12">
                            <div className="blog-single">
                                <div className="inner-box">
                                    <div className="image">
                                        <img src={postTemplateData?.postExtraFields?.mainImage?.sourceUrl} alt="" />
                                    </div>
                                    <div className="lower-content">
                                        {/* <div className="post-date">20 March, 2018</div> */}
                                        {/* <h6>Top aide possible contender forced to resign over creepy.</h6> */}
                                        <div className="text" dangerouslySetInnerHTML={{__html:postTemplateData?.content}}></div>
                                        <div className="post-share-option clearfix">
                                            {/* <div className="pull-left">
                                                <div className="author">
                                                    <div className="image"><img src={author3} alt="" /></div>
                                                    by Jhon Kenedy
                                                </div>
                                            </div> */}
                                            <div className="pull-right">
                                                <ul className="post-info">
                                                    {/* <li><a href="blog-single.html"><span className="icon flaticon-chat-comment-oval-speech-bubble-with-text-lines"></span></a></li> */}
                                                    <li><a href="blog-single.html"><span className="icon flaticon-share"></span></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        { /* <!--Sidebar Side--> */ }
                        <div className="sidebar-side col-lg-4 col-md-12 col-sm-12">
                            <aside className="sidebar">
                                { /* <!-- Search --> */ }
                                <div className="sidebar-widget search-box">
                                    <form method="post" action="" onSubmit={handleSearchSubmit} >
                                        <div className="form-group">
                                            <input type="search" id="searchField" name="searchField" placeholder="Search Now" required="" />
                                            <button type="submit"><span className="icon fa fa-search"></span></button>
                                        </div>
                                    </form>
                                </div>
                                { /* <!--Blog Category Widget--> */ }
                                <div className="sidebar-widget sidebar-blog-category">
                                    <div className="sidebar-title">
                                        <h2>Categories</h2>
                                    </div>
                                    <ul className="cat-list">
                                        {
                                            allPostCategories == undefined ? '' :
                                            allPostCategories.nodes.map( (category, index) => {
                                                let slug = category.uri.replace('/category/','').replace('/','');
                                                return (
                                                    <li key={"category-" + index} ><Link to={category.uri} >{category.name}<span>({category.count})</span></Link></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                { /* <!-- Popular Posts --> */ }
                                <div className="sidebar-widget popular-posts">
                                    <div className="sidebar-title"><h2>Recent News</h2></div>
                                    {
                                        allPosts == undefined ? '' :
                                        allPosts.nodes.map( (post, index) => {

                                            if ('/' + pageSlug + '/' == '/blog' + post.uri) return;
                                            if (countRecentPosts++ >= 3) return;
                                            
                                            let parser = new DOMParser();
                                            let parsedDocument = parser.parseFromString(post.excerpt, "text/html");
                                            let excerptText = parsedDocument.getElementsByTagName("p")[0].innerText;
                                            return (
                                                <article className="post" key={"post-" + index} >
                                                    <div className="text"><Link to={"/blog" + post.uri} >{post.title}</Link></div>
                                                    <div className="post-info">{excerptText}</div>
                                                </article>
                                            )
                                        })
                                    }
                                </div>
                                { /* <!-- Popular Tags --> */ }
                                <div className="sidebar-widget popular-tags">
                                    <div className="sidebar-title"><h2>Popular Tags</h2></div>
                                    {
                                        allPostTags == undefined ? '' :
                                        allPostTags.nodes.map( (tag, index) => {
                                            let slug = tag.uri.replace('/tag/','').replace('/','');
                                            return (
                                                <Link to={tag.uri} key={"tag-" + index} >{tag.name}</Link>
                                            )
                                        })
                                    }
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TemplateBlogInner;