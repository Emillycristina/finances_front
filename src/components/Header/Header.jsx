import Image from 'next/image'
import React from 'react'
import Logo from '../../assets/LogoTexto.png'

const Header = () => {
  return (

  
    <div style={{ display:'flex', justifyContent:'center',alignItems:'center', margin:'0 auto', marginTop:'3px'}}>
      <div>
        <Image src={Logo} alt='logoTexto' width={200}></Image>
        
        </div>
    </div>

  )
}

export default Header