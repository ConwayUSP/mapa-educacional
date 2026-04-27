import isSmallScreen from '@utils/isSmallScreen'
import { motion } from 'framer-motion'
import './CursoModal.css'
import arrow from '@assets/icons/arrow-forward.svg'
import estrelinhas1 from '@assets/enfeites/twinkles1.svg'
import estrelinhas2 from '@assets/enfeites/twinkles2.svg'

function CursoModal({data, id}) {
    if (!data) return null
    
    return (
        <div className="curso-modal" id={id}>
            <div className="curso-modal-title">
                <h2 style={{ marginRight: "2.5rem" }}>{data.titulo}</h2>
                <img className="estrelinhas-top" src={estrelinhas1} alt="Estrelinhas" style={{ height: '1.75rem', width: 'auto' }} />
            </div>
            <div className="curso-modal-content">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="0.65rem" height="0.65rem" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.1rem" y="0.1rem" width="0.4rem" height="0.4rem" transform="rotate(-45 6 6)" fill="var(--yellow)" />
                    </svg>
                    <h3 style={{ color: 'var(--yellow)' }}>{data.subtitulo}</h3>
                </div>

                {data.descricao.split('\n').map((line, index) => ( 
                    <p key={index} style={{ marginBottom: "0.25rem"}}>{line}</p>
                ))}
                
                { isSmallScreen() ?
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '0.5rem' }}>
                        <motion.button onClick={() => window.open(data.link, '_blank')}>
                            Acesse o curso
                            <img src={arrow} alt="->" style={{ width: '1rem', height: '1rem' }} />
                        </motion.button>
                        <img className="estrelinhas-bottom" src={estrelinhas2} alt="Estrelinhas" style={{ height: '1.75rem', width: 'auto' }} />
                    </div>
                : null }
            </div>
        </div>
    )
}

export default CursoModal