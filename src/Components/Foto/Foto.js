import './Foto.css'

const Foto = ({imageUrl, box}) => {
    return (
        <div className='center'> 
            <div className="absolute mt2">
                <img id = 'inputImage' alt = '' src = {imageUrl} width='500px' heigh='auto'></img>
                <div className="bounding-box" style = {{top: box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
            </div>
        </div>


    )
}




export default Foto;