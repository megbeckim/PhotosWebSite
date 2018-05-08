function homeRoute() {
    return '/';
}

function albumRoute(albumTitle) {
    return `${ homeRoute() }album/${ albumTitle }`;
}

function photoRoute(albumTitle, photoIx) {
    return `${ albumRoute(albumTitle) }/photo/${ photoIx }`;
}

export { homeRoute, albumRoute, photoRoute };