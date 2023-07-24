import React, { Suspense, lazy } from 'react';
// import { _BannerTop } from "./";
import { Link } from 'react-router-dom';

const Page404 = () => {

    const _BannerTop = lazy ( () => import( './_BannerTop' ) );
 

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}> <_BannerTop title={"404"} /></Suspense>
            <section className="error-section">
                <div className="auto-container">
                    <div className="content">
                        <h1>404</h1>
                        <h2>Oops! That page can’t be found</h2>
                        <div className="text">Sorry, but the page you are looking for does not existing</div>
                        <Link to="/" className="theme-btn btn-style-two"><span className="txt">Go to home page</span></Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page404;