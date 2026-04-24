export function getPathEnd(d) {
    const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+/g);

    let i = 0;
    let x = 0;
    let y = 0;

    let start = null;

    while (i < tokens.length) {
        const cmd = tokens[i++];

        switch (cmd) {
        case "M": {
            x = parseFloat(tokens[i++]);
            y = parseFloat(tokens[i++]);
            if (!start) start = { x, y };
            break;
        }

        case "L": {
            x = parseFloat(tokens[i++]);
            y = parseFloat(tokens[i++]);
            break;
        }

        case "H": {
            x = parseFloat(tokens[i++]);
            break;
        }

        case "V": {
            y = parseFloat(tokens[i++]);
            break;
        }

        case "A": {
            // A rx ry xAxisRotation largeArcFlag sweepFlag x y
            i += 5; // skip rx, ry, rotation, flags
            x = parseFloat(tokens[i++]);
            y = parseFloat(tokens[i++]);
            break;
        }

        // (optional: support lowercase relative commands)
        case "m": {
            x += parseFloat(tokens[i++]);
            y += parseFloat(tokens[i++]);
            if (!start) start = { x, y };
            break;
        }

        case "l": {
            x += parseFloat(tokens[i++]);
            y += parseFloat(tokens[i++]);
            break;
        }

        case "h": {
            x += parseFloat(tokens[i++]);
            break;
        }

        case "v": {
            y += parseFloat(tokens[i++]);
            break;
        }

        case "a": {
            i += 5;
            x += parseFloat(tokens[i++]);
            y += parseFloat(tokens[i++]);
            break;
        }

        default:
            break;
        }
    }

    return {
        start,
        end: { x, y },
    };
}

export default getPathEnd