import { motion } from 'framer-motion'
import './TrilhaCard.css'

/*
- Para utilizar, forneça no campo "line1" a primeira linha do título e no campo "line2" a segunda linha do título 
- O campo "icon" deve receber o nome do arquivo de ícone presente em /public/icons/trilhas/ sem extensão, como "EXEMPLO" para EXEMPLO.png
- "type" é um campo opcional. Caso deseje utilizar um card vertical (texto abaixo do ícone), basta fornecer o valor "vertical"
- "color" é um campo opcional para definir a cor do texto. Confira /index.css para as opções de cores ou adicione uma nova
*/

function TrilhaCard({ line1, line2, icon, type, color }) {

    if (!line1 || !line2 || !icon) return null

    return (
        <motion.div 
        className={`trilha-card ${type === 'vertical' ? 'vertical' : ''}`} 
        whileHover={{
            scale: 1.15,
            transition: { duration: 0.2, ease: 'easeOut' },
        }}
        >
            <img className="icon" src={`/icons/trilhas/${icon}.png`} alt={line2} />
            <div className="trilha-label" style={{color: `var(--${color || 'yellow'})`}}>
                <h5>{line1}</h5>
                <h4>{line2}</h4>
            </div>
        </motion.div>
    )
}

export default TrilhaCard