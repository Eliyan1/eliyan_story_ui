import StyleCSS from '@/styles/general.module.css'
import React, { useState } from'react';

export default function Visual({activePage, visuals, visuallayouts}) {

    const [visualButtons, setVisualButtons] = useState([])
    const [visualState, setVisualState] = useState(1)
    const [visualMain, setVisualMain] = useState("https://storage.googleapis.com/eliyan_multimedia/Images/Commissioned/Background%20BW.png")

    const [visualTitle, setVisualTitle] = useState('')
    const [visualTag, setVisualTag] = useState('')
    const [visualURL, setVisualURL] = useState('')

    const [currentLayout, setCurrentLayout] = useState ('Name Layout')
    const [visualLayoutList, setVisualLayoutList] = useState(visuallayouts)

    const [layoutState, setLayoutState] = useState(1)

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

    const saveLayout = async () =>{

        const currentLayoutTitles = visualLayoutList.map(({title}) => title)

        if(document.getElementById('layoutName').value == 'Name Layout'){
            alert('Please name the Layout')
        }else{
            if(currentLayoutTitles.includes(document.getElementById('layoutName').value)){
                await fetch(`/api/visual/updatelayouttitle?title=${document.getElementById('layoutName').value}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title:		document.getElementById('layoutName').value,
                        layout:     visualButtons,
                    }),
                });
                const changedLayoutEntry = visualLayoutList.findIndex((visualLayoutList)=> visualLayoutList.title == document.getElementById('layoutName').value)
                visualLayoutList[changedLayoutEntry].layout = visualButtons
            }else{ 
                await fetch('/api/visual/createlayout',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title:    document.getElementById('layoutName').value,
                        layout:   visualButtons,
                    }),
                });
                setVisualLayoutList([...visualLayoutList, {title: document.getElementById('layoutName').value, layout:visualButtons}])
            }
            setCurrentLayout( document.getElementById('layoutName').value);
            setLayoutState(1);
        }
    }

    const loadLayout = async (newLayout) => {
        setVisualButtons(newLayout.layout)
        setVisualState(1)
        setCurrentLayout(newLayout.title);
    }

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


      const makeMainVisual = async ({url}) => {
        setVisualMain(url)

        await fetch('/api/viewer/update',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: url
            }),
        });
      }
  
  

    return <div className={`${StyleCSS.visualcontainer}`} style={{display: activePage==3 ? "flex" : "none"}}> 
        <div className={`${StyleCSS.visualbox}`}>
            <div className={`${StyleCSS.visualmain}`} style={{display: visualState==1 ? "flex" : "none"}}>
                <img className={`${StyleCSS.visualmainimage}`} src={visualMain} />
                <div className={`${StyleCSS.visualmainborder}`}/>
                
            </div>

            <div className={`${StyleCSS.visualmain}`} style={{display: visualState==2 ? "flex" : "none"}}>
                <div className={`${StyleCSS.newvisuallist}`}>
                    <div className={`${StyleCSS.newvisualentry}`}>
                        <div className={`${StyleCSS.newvisualname}`}> Title: </div>
                        <input className={`${StyleCSS.newvisualinput}`} onChange={(e) => setVisualTitle(e.target.value)}/>
                    </div>
                    <div className={`${StyleCSS.newvisualentry}`}>
                        <div className={`${StyleCSS.newvisualname}`}> Tags: </div>
                        <input className={`${StyleCSS.newvisualinput}`} onChange={(e) => setVisualTag(e.target.value)}/>
                    </div>
                    <div className={`${StyleCSS.newvisualentry}`}>
                        <div className={`${StyleCSS.newvisualname}`}> URL: </div>
                        <input className={`${StyleCSS.newvisualinput}`} onChange={(e) => setVisualURL(e.target.value)}/>
                    </div>
                    <button className={`${StyleCSS.newvisualbutton}`} onClick={makeVisual}> Add </button>
                </div>
            </div>


            <div className={`${StyleCSS.visualmain}`} style={{display: visualState==3 ? "flex" : "none"}}>
                <div className={`${StyleCSS.visualoptionheaderwrapper}`}>
                    <div className={`${StyleCSS.visualoptionheader}`}> Select Visual </div>
                </div>
                <div className={`${StyleCSS.visualoptionvalues}`}>
                    <div className={`${StyleCSS.visualoptiontitle}`}> Title</div>
                    <div className={`${StyleCSS.visualoptiontag}`}> Tags</div>
                </div>
                <div className={`${StyleCSS.visualoptionwrapper}`}>
                    {visuals.map(visuals => (
                        <div 
                            className={`${StyleCSS.visualoption}`}
                            key={visuals._id} 
                            onClick={(e) => {addVisualButton({e, visuals})}}
                            >
                            <div className={`${StyleCSS.visualoptiontitle}`}> {visuals.title}</div>
                            <div className={`${StyleCSS.visualoptiontag}`}> {visuals.tag}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`${StyleCSS.visualmain}`} style={{display: visualState==4 ? "flex" : "none"}}>
                <div className={`${StyleCSS.visualoptionheaderwrapper}`}>
                <div className={`${StyleCSS.layoutoptionheader}`}> Select Layout </div>
                </div>
                <div className={`${StyleCSS.layoutoptionwrapper}`}>
                    {visualLayoutList.map(visualLayoutList => (
                        <div 
                            className={`${StyleCSS.visualoption}`}
                            key={visualLayoutList.title} 
                            onClick={() => {loadLayout(visualLayoutList)}}
                            >
                            <div className={`${StyleCSS.layoutoptiontitle}`}> - {visualLayoutList.title}</div>
                        </div> 
                    ))}
                </div>
            </div>

            <div className={`${StyleCSS.visualbar}`}>
                {layoutState == 1 && visualState==1 && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={()=>{setVisualState(2)}}>Add Scene</div>}
                {layoutState == 1 && visualState==1 && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={()=>{setVisualState(3)}}>Load Scene</div>}
                {layoutState == 1 && visualState==1 && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={()=>{setLayoutState(2)}}>Save Layout</div>}
                {layoutState == 1 && visualState==1 && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={()=>{setVisualState(4)}}>Load Layout</div>}

                {layoutState == 2 && visualState==1 && <input className={`${StyleCSS.newvisuallayout}`} defaultValue={currentLayout} id="layoutName" spellCheck='false' autoFocus onFocus={(e) => e.target.select()}/>}
                {layoutState == 2 && visualState==1 && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={() => {saveLayout()}}>Accept</div>}
                {layoutState == 2 && visualState==1 && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={()=> {setLayoutState(1)}}>Cancel</div>}
                {visualState!=1 && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={()=>{setVisualState(1)}}>Cancel</div>}
            </div>
        </div>

        <div className={`${StyleCSS.visualcontrol}`}>
            {visualButtons.map(visualButtons => (
            <div 
            className={`${StyleCSS.visualside}`} 
            key={visualButtons._id} 
            onClick={() => {makeMainVisual({url: visualButtons.url})}}
            > 
                <img className={`${StyleCSS.visualsideimage}`} src={visualButtons.url}></img>
                <img className={`${StyleCSS.visualsideborder}`} src='https://storage.googleapis.com/eliyan_multimedia/Images/Commissioned/Empty_Frame.png'/>
            </div>
            ))}
        </div>
    </div>
}