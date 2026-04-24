import { useNavigate } from 'react-router-dom'
import './HomeButton.css'

function HomeButton() {
    const navigate = useNavigate()

    return (
        <div className="home-button" onClick={() => navigate('/')}>
            <img src="/icons/logos/white.svg" alt="Home" style={{width: '4rem', height: '4rem' }} />
        </div>
    )
}

export default HomeButton