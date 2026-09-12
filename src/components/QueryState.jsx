import React from 'react';

export default function QueryState({ loading = false, onRetry }) {
    return (
        <div className="auto-container" style={{ paddingTop: 40, paddingBottom: 40 }}>
            {loading ? <p role="status">Loading content…</p> : <div role="alert">
                <p>We couldn’t load this content. Please try again.</p>
                {onRetry && <button type="button" className="theme-btn btn-style-two" onClick={() => {
                    Promise.resolve(onRetry()).catch(() => {});
                }}>Try again</button>}
            </div>}
        </div>
    );
}
