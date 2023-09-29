import React from 'react'
import NavBar from '../src/components/NavBar/NavBar'
import Main from '../src/components/Main/Main'

const HomePage = () => {
  return (
    <div>
    <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background-image: linear-gradient(to top, white 40%, #2e74f5);
          background-size: cover;
          background-position: center bottom; /* Isso ajusta o azul mais para baixo */
          min-height: 100vh;
        }
      `}</style>
        <NavBar/>
      <Main />
        
    </div>
  )
}

export default HomePage