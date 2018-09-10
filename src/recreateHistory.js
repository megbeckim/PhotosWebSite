import { homeRoute, albumRoute, photoRoute, mapRoute } from './routes';

export default function recreateHistory() {
    const hash = window.location.hash;
    console.log('hash', window.location.hash);

    const albumRegex = new RegExp('^#' + albumRoute('([^/]+)') + '$');
    const photoRegex = new RegExp('^#' + photoRoute('([^/]+)','(.+)') + '$');
    const mapRegex = new RegExp('^#' + mapRoute() + '$');

    const albumMatch = albumRegex.exec(hash);
    const photoMatch = photoRegex.exec(hash);
    const mapMatch = mapRegex.exec(hash);

    let newHistory;

    if (photoMatch) {
        console.log('photo match', photoMatch);
        newHistory = [ '#' + homeRoute(), '#' + albumRoute(photoMatch[1]), hash ];
    } else if (albumMatch) {
        console.log('album match', albumMatch);
        newHistory = [ '#' + homeRoute(), hash ];
    } else if (mapMatch) {
        console.log('map match', mapMatch);
        newHistory = [ '#' + homeRoute(), hash ];
    } else {
        console.log('no match');
        newHistory = [ hash ];
    }

    console.log('new history is', newHistory);
    const [ first, ...rest ] = newHistory;

    if (first !== hash) {
        window.history.replaceState({}, {}, first);
    }
    rest.forEach( url => {
        window.history.pushState({}, {}, url);
    });
}