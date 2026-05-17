import React from 'react';

const MusicWidget = () => {
    return (
        <div className="floating-outline-wrapper">
            <div className="music-widget-card">
                <div className="card-overlay"></div>
                <div className="card-inner">
                    {/* Music Content */}
                    <div className="music-card">
                        {/* Icon (Always Visible / Moves) */}
                        <img src="/assets/spotify.png" alt="Spotify Logo" className="spotify-logo" />

                        {/* Text Content (Hidden on Collapse) */}
                        <div className="music-content">
                            <div className="currentplaying">
                                <p className="heading">Currently Playing</p>
                            </div>
                            {/* Song 1 */}
                            <div className="loader">
                                <div className="song">
                                    <p className="name">Time in a Bottle</p>
                                    <p className="artist">Jim Corce</p>
                                </div>
                                <div className="albumcover"></div>
                                <div className="loading">
                                    <div className="load"></div>
                                    <div className="load"></div>
                                    <div className="load"></div>
                                    <div className="load"></div>
                                </div>
                            </div>
                            {/* Song 2 */}
                            <div className="loader">
                                <div className="song">
                                    <p className="name">My Way</p>
                                    <p className="artist">Frank Sinatra</p>
                                </div>
                                <div className="albumcover"></div>
                                <div className="play"></div>
                            </div>
                            {/* Song 3 */}
                            <div className="loader">
                                <div className="song">
                                    <p className="name">Lemon Tree</p>
                                    <p className="artist">Fools Garden</p>
                                </div>
                                <div className="albumcover"></div>
                                <div className="play"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicWidget;
