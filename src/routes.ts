function homeRoute() {
    return '/';
}

function albumRoute(albumTitle: string): string {
    return `${ homeRoute() }album/${ albumTitle }`;
}

function photoRoute(albumTitle: string, photoIx: string): string {
    return `${ albumRoute(albumTitle) }/photo/${ photoIx }`;
}

function mapRoute(): string {
    return `${ homeRoute() }map`;
}

export { homeRoute, albumRoute, photoRoute, mapRoute };