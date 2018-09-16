import { homeRoute, albumRoute, photoRoute, mapRoute } from './routes';

export default function recreateHistory() {
    const hash = window.location.hash;

    const albumRegex = new RegExp('^#' + albumRoute('([^/]+)') + '$');
    const photoRegex = new RegExp('^#' + photoRoute('([^/]+)','(.+)') + '$');
    const mapRegex = new RegExp('^#' + mapRoute() + '$');

    const albumMatch = albumRegex.exec(hash);
    const photoMatch = photoRegex.exec(hash);
    const mapMatch = mapRegex.exec(hash);

    let newHistory;

    if (photoMatch) {
        newHistory = [ '#' + homeRoute(), '#' + albumRoute(photoMatch[1]), hash ];
    } else if (albumMatch) {
        newHistory = [ '#' + homeRoute(), hash ];
    } else if (mapMatch) {
        newHistory = [ '#' + homeRoute(), hash ];
    } else {
        newHistory = [ hash ];
    }

    const [ first, ...rest ] = newHistory;

    if (first !== hash) {
        window.history.replaceState({}, {}, first);
    }
    rest.forEach( url => {
        window.history.pushState({}, {}, url);
    });
}