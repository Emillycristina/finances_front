import Image from 'next/image'
import React from 'react'
import Logo from '../../assets/Finances.png'

const Header = () => {
  return (

  
    <div >
        <Image src={Logo} alt='Logo'
        width={200}
        
        />
    </div>

  )
}

export default Header