import React from 'react';
import { _BannerTop } from "./";
import news10 from '../assets/images/resource/news-10.jpg';
import news14 from '../assets/images/resource/news-14.jpg';
import news15 from '../assets/images/resource/news-15.jpg';
import author3 from '../assets/images/resource/author-3.jpg';
// import author6 from '../assets/images/resource/author-6.png';
// import author7 from '../assets/images/resource/author-7.png';
// import author8 from '../assets/images/resource/author-8.png';
import { useQuery, gql } from '@apollo/client';
import { logVar } from "./utils/Utils";
import { GraphQLQueries } from "./queries/GraphQLQueries";


const PageBlogInner = (props) => {

    const GET_MENUS_QUERY = gql`query GET_MENUS_QUERY
    {
      ${GraphQLQueries.queries.sitemapMenuItems}
      ${GraphQLQueries.queries.primaryMenuItems}
      ${GraphQLQueries.queries.footerMenuItems}
    }`;

    const { data, loading, error } = useQuery(GET_MENUS_QUERY);

    if (loading) { logVar('loading from TemplateBlogInner'); return }
    if (error) { logVar('error from TemplateBlogInner'); return }
    if (!data) { logVar('!data from TemplateBlogInner'); return }

    const sitemapMenuItems = data.sitemapMenuItems.nodes;
    const primaryMenuNodes = data.primaryMenuItems.nodes;
    const footerMenuNodes = data.footerMenuItems.nodes;

    console.log(sitemapMenuItems);

    return (
        <>
            <_BannerTop title={props.title} />  
            <div className="sidebar-page-container">
                <div className="auto-container">
                    <div className="row clearfix">
                        { /* <!-- Content Side / Blog Single --> */ }
                        <div className="content-side col-lg-8 col-md-12 col-sm-12">
                            <div className="blog-single">
                                <div className="inner-box">
                                    <div className="image">
                                        <img src={news10} alt="" />
                                    </div>
                                    <div className="lower-content">
                                        <div className="post-date">20 March, 2018</div>
                                        <h6>Top aide possible contender forced to resign over creepy.</h6>
                                        <div className="text">
                                            <p>Eveniet in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at seds eros sed et accumsan et iusto odio dignissim. Temporibus autem quibusdam et aut officiis.</p>
                                            <div className="images-column">
                                                <div className="row clearfix">
                                                    <div className="column col-lg-6 col-md-6 col-sm-12">
                                                        <div className="image">
                                                            <img src={news14} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="column col-lg-6 col-md-6 col-sm-12">
                                                        <div className="image">
                                                            <img src={news15} alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p>Eveniet in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at seds eros sed et accumsan et iusto odio dignissim. Temporibus autem quibusdam et aut officiis.</p>
                                            <p>cookies are set through this site to recognise your repeat visits and preferences, serve more vant ads, facilitate social sharing, and to violanalyse traffic.Others wondered if the hand of od was at work over New York, heralding perhaps a new Pope, or the moment when Evangeli cals say true believers will be swept up, or "raptured", to heaven. When these electrons recombine with the excited atoms, returning them to their starting energy state, light is emitted.</p>
                                            <p>When these electrons recombine with the excited atoms, returning them to their starting energy state, light is emitted. The colour of the light emitted depends on the type of atoms involved.</p>
                                            <blockquote>
                                                <div className="quote-icon flaticon-left-quote"></div>
                                                <div className="quote-text">What sort of men would think it is acceptable to subject a young girl to this level of brutality and violence? an attack like this in ourcommunities and we must all work together.</div>
                                            </blockquote>
                                        </div>
                                        <div className="post-share-option clearfix">
                                            <div className="pull-left">
                                                <div className="author">
                                                    <div className="image"><img src={author3} alt="" /></div>
                                                    by Jhon Kenedy
                                                </div>
                                            </div>
                                            <div className="pull-right">
                                                <ul className="post-info">
                                                    <li><a href="blog-single.html"><span className="icon flaticon-chat-comment-oval-speech-bubble-with-text-lines"></span></a></li>
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
                                    <form method="post" action="">
                                        <div className="form-group">
                                            <input type="search" name="search-field" value="" placeholder="Search Now" required="" readOnly />
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
                                        <li><a href="#">Web Design <span>(09)</span></a></li>
                                        <li><a href="#">Graphics<span>(13)</span></a></li>
                                        <li><a href="#">Web Development<span>(05)</span></a></li>
                                        <li><a href="#">IOS/Android Development<span>(19)</span></a></li>
                                        <li><a href="#">Others<span>(12)</span></a></li>
                                    </ul>
                                </div>
                                { /* <!-- Popular Posts --> */ }
                                <div className="sidebar-widget popular-posts">
                                    <div className="sidebar-title"><h2>Recent News</h2></div>
                                    <article className="post">
                                        <div className="text"><a href="blog-detail.html">Best website traffice Booster with great tools.</a></div>
                                        <div className="post-info">12 May, 2016</div>
                                    </article>
                                    <article className="post">
                                        <div className="text"><a href="blog-detail.html">Google take latest step &amp; Catch the black SEO</a></div>
                                        <div className="post-info">12 May, 2016</div>
                                    </article>
                                    <article className="post">
                                        <div className="text"><a href="blog-detail.html">How to become a best sale marketer in a year!</a></div>
                                        <div className="post-info">12 May, 2016</div>
                                    </article>
                                </div>
                                { /* <!-- Popular Tags --> */ }
                                <div className="sidebar-widget popular-tags">
                                    <div className="sidebar-title"><h2>Popular Tags</h2></div>
                                    <a href="#">SEO Dightal</a>
                                    <a href="#">Animation</a>
                                    <a href="#">Ideas</a>
                                    <a href="#">Design</a>
                                    <a href="#">Develpment</a>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageBlogInner;