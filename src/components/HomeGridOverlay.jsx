import React from 'react';

/**
 * HomeGridOverlay
 *
 * Renders subtle architectural column track lines matching the canonical 12-column
 * layout grid of the homepage.
 *
 * - Placed behind content (z-index: 0, pointer-events: none).
 * - Shares the exact same CSS variables (--home-max-width, --home-margin, --home-gutter, --home-columns).
 * - Restrained opacity derived from theme colors for an editorial architectural presence.
 */
const HomeGridOverlay = () => {
    // 12 column guides corresponding to layout tracks
    const columns = Array.from({ length: 12 }, (_, i) => i);

    return (
        <div className="home-grid-overlay" aria-hidden="true">
            <div className="home-container home-grid-overlay-inner">
                <div className="home-grid-overlay-tracks">
                    {columns.map((i) => (
                        <div key={i} className="home-grid-col-guide">
                            <span className="home-grid-col-line" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(HomeGridOverlay);
