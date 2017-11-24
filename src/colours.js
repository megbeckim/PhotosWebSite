function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function createColour(input) {
    return `hsl(${(random(input) * 360)|0}, 100%, 70%)`;
}

export default createColour;