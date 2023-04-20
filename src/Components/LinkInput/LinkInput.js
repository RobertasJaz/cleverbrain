const LinkInput = ({onInputChange, onSubmit}) => {
    return (
        <div>
            <p className="f3">{'This magic brain will detect a face in your picture. Try it :)'}</p>
            <div style={{display: "flex", justifyContent:"center"}}>
                <div className=' pa4 br4 shadow-4' style = {{width:"800px"}}>
                
                        <input className="f4 pa2 w-50" type="text" onChange={onInputChange}/>
                        <button  onClick={onSubmit}
                        className="pointer w-20 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
                    
                </div>
            </div>
        </div>
        
        


    )
}




export default LinkInput