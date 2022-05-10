import { Link } from 'react-router-dom'
import image from '../img/header.jpg'

function Home() {
  return (
    <div>
      <header className='header'>
        <img src={image} alt="Recipe Handbook" />
        <span className="header-text">Recipe Handbook</span>
      </header>
      <div className='heading'>Welcome to Recipe Handbook!</div>
      <div className="content">
        <p>The ultimate recipe collection.</p>
        <p>Browse through endless amounts of delicious food recipes. We offer recipes for every occasion ranging from healthy plant-based vegetarian to greasy fat-rich slow cooking meals.</p>
        <Link to='/recipes'>
          Start browsing recipes!
        </Link>
      </div>
    </div>
  )
}

export default Home