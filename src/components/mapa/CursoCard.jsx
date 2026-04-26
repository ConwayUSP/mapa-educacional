import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './CursoCard.css'
import isSmallScreen from '@utils/isSmallScreen'
import CursoModal from './CursoModal'

/*
- Para utilizar, forneça no campo "file" o nome do arquivo de dados presente em /public/data/trilhas/ como "EXEMPLO" para EXEMPLO.json
- "type" é um campo opcional. Caso deseje utilizar um card horizontal (texto à direita do ícone), basta fornecer o valor "horizontal"
*/

function CursoCard({ file, type }) {
    const [data, setData] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (file) {
            try {
                fetch(`/data/trilhas/${file}.json`)
                    .then(response => response.json())
                    .then(setData)
                    .catch(() => console.error("O campo 'file' do CursoCard deve ser uma string representando o nome do arquivo de dados (sem extensão) presente em /public/data/trilhas/", file))
            } catch (error) {
                console.error("Erro ao buscar dados do curso")
            }
        }
    }, [file])

    const filteredLabel = data ? data.label.split(' ').filter(word => word !== '&') : [];

    if (!data) return null

    return (
        <div className="curso-card-wrapper">
            <motion.div 
            className={`curso-card ${type === 'horizontal' ? 'horizontal' : ''}`} 
            onClick={isSmallScreen() ? () => setIsModalOpen(true) : () => window.open(data.link, '_blank')}
            onMouseEnter={isSmallScreen() ? null : () => setIsModalOpen(true)}
            onMouseLeave={isSmallScreen() ? null : () => setIsModalOpen(false)}
            whileHover={{
                scale: 1.15,
                transition: { duration: 0.2, ease: 'easeOut' },
                cursor: 'pointer'
            }}
            >
                <img className="icon" src={`/icons/trilhas/${data.icon}.png`} alt={data.titulo} />
                <div className="curso-label">
                    {data.label.split(' ').map((palavra, index) => {
                        if (palavra === '&') {
                            return (
                                <span key={index} style={{ color: 'var(--white)' }}>
                                    {palavra + " "}
                                </span>
                            );
                        }

                        const cor = "var(--" + data.cores[filteredLabel.indexOf(palavra)] + ")";
                        return (
                            <span key={index} style={{ color: cor }}>
                                {palavra + " "}
                            </span>
                        );
                    })}
                </div>
            </motion.div>
            {isModalOpen && (
            isSmallScreen() ? 
                <motion.div className="bg-overlay" style={{ display: isModalOpen ? 'flex' : 'none' }} onClick={() => setIsModalOpen(false) }>
                    <motion.div className="curso-modal-container" style={{ display: isModalOpen ? 'block' : 'none' }} 
                    initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 0.03, ease: 'easeOut' }}>
                        <CursoModal data={data} />
                    </motion.div>
                </motion.div>
            :
                <motion.div className="curso-modal-container" style={{ display: isModalOpen ? 'flex' : 'none' }} 
                initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 0.03, ease: 'easeIn' }}>
                    <CursoModal data={data} />
                </motion.div>
            )}
        </div>
    )
}

export default CursoCard