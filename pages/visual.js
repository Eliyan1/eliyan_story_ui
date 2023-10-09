import Flexstyle from '../styles/flexbox.module.css'
import VisualStyle from '../styles/visual.module.css'
import React, { useState } from'react';

export default function Visual({activePage, visuals}) {

    const [visualButtons, setVisualButtons] = useState([])
    const [visualState, setVisualState] = useState(1)
    const [visualMain, setVisualMain] = useState("https://storage.cloud.google.com/eliyan_multimedia/Images/Commissioned/Background%20BW.png")

    const [visualTitle, setVisualTitle] = useState('')
    const [visualTag, setVisualTag] = useState('')
    const [visualURL, setVisualURL] = useState('')

    const makeVisual = async (e) => {
        e.preventDefault()

        await fetch('/api/visual/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title:    visualTitle,
                url:      visualURL,
                tag:      visualTag,
            }),
        });

        setVisualState(1)
    };

    const addVisualButton = ({e,visuals}) => {
        e.preventDefault()
        const checkIfAdded = visualButtons.findIndex((visualButtons)=> visualButtons._id == visuals._id)
        if (checkIfAdded == -1) {
          setVisualButtons([...visualButtons, visuals])
          setVisualState(1)
        }else{
          alert("Scene is already added")
        }
      }
  

    return <div className={`${Flexstyle.visualcontainer}`} style={{display: activePage==3 ? "flex" : "none"}}> 
        <div className={`${Flexstyle.visualbox}`}>
            <div className={`${VisualStyle.visualmain}`} style={{display: visualState==1 ? "flex" : "none"}}>
                <img className={`${VisualStyle.visualmainimage}`} src={visualMain} />
                <div className={`${VisualStyle.visualmainborder}`}/>
                
            </div>

            <div className={`${VisualStyle.visualmain}`} style={{display: visualState==2 ? "flex" : "none"}}>
                <div className={`${VisualStyle.newvisuallist}`}>
                    <div className={`${VisualStyle.newvisualentry}`}>
                        <div className={`${VisualStyle.newvisualname}`}> Title: </div>
                        <input className={`${VisualStyle.newvisualinput}`} onChange={(e) => setVisualTitle(e.target.value)}/>
                    </div>
                    <div className={`${VisualStyle.newvisualentry}`}>
                        <div className={`${VisualStyle.newvisualname}`}> Tags: </div>
                        <input className={`${VisualStyle.newvisualinput}`} onChange={(e) => setVisualTag(e.target.value)}/>
                    </div>
                    <div className={`${VisualStyle.newvisualentry}`}>
                        <div className={`${VisualStyle.newvisualname}`}> URL: </div>
                        <input className={`${VisualStyle.newvisualinput}`} onChange={(e) => setVisualURL(e.target.value)}/>
                    </div>
                    <button className={`${VisualStyle.newvisualbutton}`} onClick={makeVisual}> Add </button>
                </div>
            </div>


            <div className={`${VisualStyle.visualmain}`} style={{display: visualState==3 ? "flex" : "none"}}>
                <div className={`${VisualStyle.visualoptionheaderwrapper}`}>
                    <div className={`${VisualStyle.visualoptionheader}`}> Select Visual </div>
                </div>
                <div className={`${VisualStyle.visualoptionvalues}`}>
                    <div className={`${VisualStyle.visualoptiontitle}`}> Title</div>
                    <div className={`${VisualStyle.visualoptiontag}`}> Tags</div>
                </div>
                <div className={`${VisualStyle.visualoptionwrapper}`}>
                    {visuals.map(visuals => (
                        <div 
                            className={`${VisualStyle.visualoption}`}
                            key={visuals._id} 
                            onClick={(e) => {addVisualButton({e, visuals})}}
                            >
                            <div className={`${VisualStyle.visualoptiontitle}`}> {visuals.title}</div>
                            <div className={`${VisualStyle.visualoptiontag}`}> {visuals.tag}</div>
                        </div>
                    ))}
                </div>
            </div>


            <div className={`${Flexstyle.visualbar}`}>
                <div className={`${VisualStyle.visualcontrolbutton}`} style={{display: visualState==1 ? "flex" : "none"}} onClick={()=>{setVisualState(2)}}>Add Scene</div>
                <div className={`${VisualStyle.visualcontrolbutton}`} style={{display: visualState==1 ? "flex" : "none"}} onClick={()=>{setVisualState(3)}}>Load Scene</div>
                <div className={`${VisualStyle.visualcontrolbutton}`} style={{display: visualState==1 ? "flex" : "none"}}>Save Setup</div>
                <div className={`${VisualStyle.visualcontrolbutton}`} style={{display: visualState==1 ? "flex" : "none"}}>Load Setup</div>
                <div className={`${VisualStyle.visualcontrolbutton}`} style={{display: visualState!=1 ? "flex" : "none"}} onClick={()=>{setVisualState(1)}}>Return</div>
            </div>
        </div>

        <div className={`${Flexstyle.visualcontrol}`}>
            {visualButtons.map(visualButtons => (
            <div 
            className={`${VisualStyle.visualside}`} 
            key={visualButtons._id} 
            onClick={() => {setVisualMain(visualButtons.url)}}
            > 
                <img className={`${VisualStyle.visualsideimage}`} src={visualButtons.url}></img>
                <img className={`${VisualStyle.visualsideborder}`} src='https://storage.cloud.google.com/eliyan_multimedia/Images/Commissioned/Empty_Frame.png'/>
            </div>
            ))}
        </div>
    </div>
}