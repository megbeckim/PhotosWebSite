function homeRoute() {
    return '';
}

function albumRoute(albumTitle) {
    return `${ homeRoute() }/album/${ albumTitle }`;
}

function photoRoute(albumTitle, photoIx) {
    return `${ albumRoute(albumTitle) }/photo/${ photoIx }`;
}

function mapRoute() {
    return `${ homeRoute() }/map`;
}

export { homeRoute, albumRoute, photoRoute, mapRoute };