/**
 * Premium, zero-dependency client-side SPA router utility.
 * Intercepts address changes and dispatches standard browser popstate triggers.
 */

/**
 * Programmatically navigate to a path using HTML5 history pushState
 * @param {string} path Target URL path (e.g. '/projects/ios-notification-system')
 */
export const navigateTo = (path) => {
    // Push target path to history
    window.history.pushState({}, '', path);

    // Dispatch standard PopStateEvent so state listeners in App react instantly
    window.dispatchEvent(new PopStateEvent('popstate'));

    // Scroll handling: if a hash is targeted, perform a luxurious smooth scroll
    const hashIndex = path.indexOf('#');
    if (hashIndex !== -1) {
        const hash = path.substring(hashIndex + 1);
        setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else {
        // Scroll instantly to the top of the viewport to start clean on the new page
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
};
