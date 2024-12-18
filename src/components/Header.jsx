import React from 'react';
import { Link } from "react-router-dom";
// import logo from '../assets/images/logo-wis.png';
import { logVar } from "./utils/Utils";

const Header = (props) => {

    const handleMenuClick = () => {
        document.getElementById('navbarSupportedContent').classList.toggle('show');
        document.getElementById('navbarSupportedContent1').classList.toggle('show');
        logVar('handleMenuClick');
    }

    const handleMenuItemClick = () => {
        setTimeout(function(){
            document.getElementById('navbarSupportedContent').classList.remove('show');
            document.getElementById('navbarSupportedContent1').classList.remove('show');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },400)
    }

    const menuNodes = props.menuNodes;
    const headerLogoUrl = props.headerLogoUrl;
    logVar('--_Header--')
    return (
        <header className="main-header header-style-two">
            {/* <!--Header-Upper--> */}
            <div className="header-upper">
                <div className="auto-container">
                    <div className="clearfix">
                        <div className="pull-left logo-box">
                            <div className="logo"><Link to="/"><img src={headerLogoUrl} alt="" title="" /></Link></div>
                        </div>
                        <div className="nav-outer clearfix">
                            {/* <!-- Main Menu --> */}
                            <nav className="main-menu navbar-expand-md">
                                <div className="navbar-header">
                                    <button onClick={handleMenuClick} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>
                                <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                                    <ul className="navigation clearfix">
                                        {/* <li className="current"><Link to="/">Αρχική</Link></li> */}
                                        {
                                            menuNodes.map( (menuItem, index) => {
                                                return (
                                                    <li className={menuItem.childItems.nodes.length > 0 ? "dropdown" : ""} key={"primaryMenuNode" + index}>
                                                        <Link to={menuItem.uri} onClick={handleMenuItemClick} >{menuItem.label}</Link>
                                                        {
                                                            menuItem.childItems.nodes.length > 0 
                                                            ?
                                                            <ul>
                                                                {
                                                                    menuItem.childItems.nodes.map( (menuItemInner, idx) => {
                                                                        if (menuItemInner.parentDatabaseId == menuItem.databaseId){
                                                                            // map the cpt_services to services
                                                                            // it is custom post types slug
                                                                            let _uri = menuItemInner.uri.includes('cpt_services') ? menuItemInner.uri.replace('cpt_services', 'services') : menuItemInner.uri;
                                                                            return ( <li className="" key={"primaryMenuNodeInner" + idx}><Link to={_uri} onClick={handleMenuItemClick}>{menuItemInner.label}</Link></li> )
                                                                        }   
                                                                    })
                                                                }
                                                            </ul>
                                                            :
                                                            null
                                                        }
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </nav>
                            {/* <!--Nav Toggler--> */}
                            {/* <div className="outer-box">
                                <div className="sidebar-btn hidden-bar-opener"><div className="nav-btn"><span className="flaticon-menu"></span></div></div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End Header Upper--> */}

            {/* <!--Sticky Header--> */}
            <div className="sticky-header">
                <div className="auto-container clearfix">
                    <div className="logo pull-left">
                        <Link to="/"><img src={headerLogoUrl} alt="" title="" /></Link>
                    </div>
                    <div className="right-col">
                        <nav className="main-menu navbar-expand-md">
                            <button onClick={handleMenuClick} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent1">
                            <ul className="navigation clearfix">
                                {
                                    menuNodes.map( (menuItem, index) => {
                                        return (
                                            <li className={menuItem.childItems.nodes.length > 0 ? "dropdown" : ""} key={"primaryMenuNode" + index}>
                                                <Link to={menuItem.uri} onClick={handleMenuItemClick} >{menuItem.label}</Link>
                                                {
                                                    menuItem.childItems.nodes.length > 0 
                                                    ?
                                                    <ul>
                                                        {
                                                            menuItem.childItems.nodes.map( (menuItemInner, idx) => {
                                                                if (menuItemInner.parentDatabaseId == menuItem.databaseId){
                                                                    // map the cpt_services to services
                                                                    // it is custom post types slug
                                                                    let _uri = menuItemInner.uri.includes('cpt_services') ? menuItemInner.uri.replace('cpt_services', 'services') : menuItemInner.uri;
                                                                    return ( <li className="" key={"primaryMenuNodeInner" + idx}  ><Link to={_uri} onClick={handleMenuItemClick} >{menuItemInner.label}</Link></li> )
                                                                }   
                                                            })
                                                        }
                                                    </ul>
                                                    :
                                                    null
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {/* <!--End Sticky Header--> */}
        </header>
    );
}
export default Header;