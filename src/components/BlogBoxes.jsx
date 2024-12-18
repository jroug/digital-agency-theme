import React from 'react';
import { Link } from 'react-router-dom';
import { InlineShareButtons } from 'sharethis-reactjs';

const BlogBoxes = (props) => {

    const post = props.post;
    const index = props.index;

    let parser = new DOMParser();
    let parsedDocument = parser.parseFromString(post.node.excerpt, "text/html");
    let excerptText = parsedDocument.getElementsByTagName("p")[0].innerText;

    let postCategories = post.node.categories.edges;
    let postTags = post.node.tags.edges;

    return (
        <div className="news-block col-lg-4 col-md-6 col-sm-12" key={"post-" + props.taxSlug + "-" + props.taxonomyName + "-" + index} >
            <div className="inner-box wow fadeInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms" style={{"visibility":"visible","animationDuration":"1500ms","animationDelay":"0ms","animationName":"fadeInLeft"}}>
                <div className="image">
                    <Link to={"/blog" + post.node.uri} ><img src={post.node.featuredImage.node.sourceUrl} alt="" /></Link>
                </div>
                <div className="lower-content">
                    <h6><Link to={"/blog" + post.node.uri } >{post.node.title}</Link></h6>
                    <div className="post-date">{excerptText}</div>
                    <div className="clearfix">
                        <div className="pull-left blog-tile">
                            <div className="author">
                                <div className="r1" >
                                {/* <div className="image"><img src={author3} alt="" /></div> */}
                                {
                                    
                                    postCategories.map( (category, index) => {
                                        return (
                                            <Link to={category.node.uri} key={"category-" + index} >{category.node.name}</Link>
                                        )
                                    })
                                }
                                </div>
                                <div className="r2" >
                                {
                                    postTags.map( (tag, index) => {
                                        return (
                                            <Link to={tag.node.uri} key={"tag-" + index} >{tag.node.name}</Link>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        </div>
                        <div className="pull-right">
                            <InlineShareButtons 
                                config={{
                                    alignment: 'center',  // alignment of buttons (left, center, right)
                                    color: 'white',      // set the color of buttons (social, white)
                                    enabled: true,        // show/hide buttons (true, false)
                                    font_size: 16,        // font size for the buttons
                                    labels: 'null',        // button labels (cta, counts, null)
                                    language: 'en',       // which language to use (see LANGUAGES)
                                    networks: [           // which networks to include (see SHARING NETWORKS)
                                        'sharethis'
                                    ],
                                    padding: 7,          // padding within buttons (INTEGER)
                                    radius: 4,            // the corner radius on each button (INTEGER)
                                    show_total: false,
                                    size: 30,             // the size of each button (INTEGER)
                                    url: 'https://webinsite.gr' + '/blog' + post.node.uri, // (defaults to current url)

                                }}
                            />
                            {/* <ul className="post-info">
                                <li><a href="blog-single.html"><span className="icon flaticon-chat-comment-oval-speech-bubble-with-text-lines"></span></a></li>
                                <li><Link to="#"><span className="icon flaticon-share"></span></Link></li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogBoxes;