import { motion } from 'framer-motion'
import './Tracejado.css'
import getPathEnd from '@utils/getPathEnd'

function Tracejado({d, comeco, final, id}) {
    const { start, end } = getPathEnd(d);

    const padding = 10;

    const minX = end.x - padding;
    const minY = end.y - padding;
    const maxX = start.x + padding;
    const maxY = start.y + padding;

    const width = maxX - minX;
    const height = maxY - minY;

    return (
        <svg className="tracejado" viewBox={`${minX} ${minY} ${width} ${height}`} id={id}>
            {final === "seta" &&
                <marker
                id="arrowUp"
                markerWidth="10"
                markerHeight="7"
                viewBox="-2 -2 14 14"
                refX="5"
                refY="5"
                orient="0"
                markerUnits="strokeWidth"
                >
                    <path d="M0,10 L5,0 L10,10 Z" fill="white" />
                </marker>
            }

            <motion.path
                d={d}
                fill="transparent"
                stroke="white"
                strokeWidth="2.5"
                strokeDasharray="6 7"
                initial={{ strokeDashoffset: 250 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                duration: 3,
                ease: "easeOut",
                }}
                markerEnd="url(#arrowUp)"
            />

            {comeco === "circulo" &&
                <circle cx={start.x} cy={start.y} r="6" fill="white" />
            }
        </svg>
    )
}

export default Tracejado