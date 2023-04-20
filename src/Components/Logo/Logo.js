import Tilt from 'react-parallax-tilt';
import './Logo.css'


const Logo = () => {
    return (
        <div className="ma4 mt0 ">
            <Tilt className=' logo br4 shadow-4' style={{width: "100px", height:"100px"}}>
            <div className='pa2'>
                <img style={{paddingTop:'6px'}}  alt='logo' src="https://img.icons8.com/cotton/64/000000/brains.png"/>
                </div>
            </Tilt>
        </div>


    )
}




export default Logo;