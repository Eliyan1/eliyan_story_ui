import StyleCSS from '@/styles/general.module.css'
import React, { useState } from'react';

export default function Visual({activePage, visuals, visuallayouts, activeChars, combatActive}) {

    const [visualButtons, setVisualButtons] = useState([])
    const [visualState, setVisualState] = useState(1)
    const [visualMain, setVisualMain] = useState("https://storage.googleapis.com/eliyan_multimedia/Images/Commissioned/Background%20BW.png")

    const [visualTitle, setVisualTitle] = useState('')
    const [visualTag, setVisualTag] = useState('')
    const [visualURL, setVisualURL] = useState('')

    const [visibleInitiativeUI, setVisibleInitiativeUI] = useState(false)
    const [visibleBaddieUI, setVisibleBaddieUI] = useState(false)

    const [currentLayout, setCurrentLayout] = useState ('Name Layout')
    const [visualLayoutList, setVisualLayoutList] = useState(visuallayouts)

    const [villainName, setVillainName] = useState('Enemy Forces')

    const [layoutState, setLayoutState] = useState(1)

    const toggleInitiativeUI = async () => {
        if (visibleInitiativeUI==false){
            setVisibleInitiativeUI(true)

            await fetch('/api/viewer/update',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    initiativeOverlay: true
                }),
            });

          }
        else{
            setVisibleInitiativeUI(false)

            await fetch('/api/viewer/update',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    initiativeOverlay: false
                }),
            });
        }
    }

    const toggleVillainHP = async (activeChar) => {
        var villainHP = 0
        var villainMaxHP =0

        if(activeChar.villainhp == true){
            activeChar.villainhp = false
        }else{activeChar.villainhp= true}

        for (let i=0; i < activeChars.length; i++) {
            if (activeChars[i].villainhp==true){
                villainHP= villainHP + activeChars[i].hp
                villainMaxHP = villainMaxHP + activeChars[i].maxhp
            }}

            await fetch('/api/viewer/update',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    villainCurrentHP: villainHP,
                    villainMaxHP: villainMaxHP
                }),
            });
    }


    const toggleBaddieUI = async () => {
        if (visibleBaddieUI==false){
            setVisibleBaddieUI(true)

            await fetch('/api/viewer/update',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hpOverlay: true
                }),
            });

          }
        else{
            setVisibleBaddieUI(false)
 
            await fetch('/api/viewer/update',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hpOverlay: false
                }),
            });
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            e.target.blur(); 
        }
    }

    const updateVillainDatabase = async (e) => {
        await fetch('/api/viewer/update',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                villainName: e.target.value,
            }),
        });

    }

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
  
  

    return <div className={`${StyleCSS.visualcontainer}`} spellCheck="false" style={{display: activePage==3 ? "flex" : "none"}}> 
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

            <div className={`${StyleCSS.visualmain}`} style={{display: visualState==5 ? "flex" : "none"}}>
                <div className={`${StyleCSS.combatuioptionwrapper}`}>
                    <div className={`${StyleCSS.combatuiwrapper}`}>
                        <div className={`${StyleCSS.viewertickboxdescription}`}> Display Initiative UI</div>
                        <div 
                        className={`${StyleCSS.viewertickbox}`} 
                        style={{backgroundColor: visibleInitiativeUI ? "rgba(219, 221, 229, 0.4)" : "rgba(219, 221, 229, 0.0 )"}} 
                        onClick={toggleInitiativeUI}/>
                    </div>
                    <div className={`${StyleCSS.combatuiwrapper}`}>
                        <div className={`${StyleCSS.viewertickboxdescription}`}> Display Villain HP</div>
                        <div 
                        className={`${StyleCSS.viewertickbox}`} 
                        style={{backgroundColor: visibleBaddieUI ? "rgba(219, 221, 229, 0.4)" : "rgba(219, 221, 229, 0.0 )"}} 
                        onClick={toggleBaddieUI}/>
                    </div>
                    <div className={`${StyleCSS.undercombatuiwrapper}`}>
                        <div className={`${StyleCSS.viewertickboxdescription}`}> Villain Name </div>
                        <input 
                        type='text' 
                        className={`${StyleCSS.villainname}`} 
                        value={villainName} 
                        onChange={(e) => setVillainName(e.target.value)}
                        onBlur={(e) => updateVillainDatabase(e)}
                        onKeyDown={(e) => handleKeyPress(e)}
                        onFocus={(e) => e.target.select()}/>
                    </div>
                    {activeChars.length > 0 && combatActive && <div className={`${StyleCSS.combatanttitleuiwrapper}`}>
                        <div className={`${StyleCSS.viewertickboxdescription}`}> Combatant </div>
                        <div className={`${StyleCSS.villaintickboxtitle}`}> Villain? </div>
                    </div>}
                    {activeChars.length > 0 && combatActive && activeChars.map(activeChars => (<div className={`${StyleCSS.combatantuiwrapper}`} key={activeChars.uniquechar}>
                        <div className={`${StyleCSS.viewertickboxdescription}`}> {activeChars.name}</div>
                        <div 
                        className={`${StyleCSS.viewertickbox}`} 
                        style={{backgroundColor: activeChars.villainhp ? "rgba(219, 221, 229, 0.4)" : "rgba(219, 221, 229, 0.0 )"}} 
                        onClick={() => toggleVillainHP(activeChars)}/>
                    </div>))}
                </div>
            </div>



            <div className={`${StyleCSS.visualbar}`}>
                {layoutState == 1 && visualState==1 && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={()=>{setVisualState(2)}}>Add Scene</div>}
                {layoutState == 1 && visualState==1 && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={()=>{setVisualState(3)}}>Load Scene</div>}
                {layoutState == 1 && visualState==1 && combatActive == false && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={()=>{setLayoutState(2)}}>Save Layout</div>}
                {layoutState == 1 && visualState==1 && combatActive == false && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={()=>{setVisualState(4)}}>Load Layout</div>}
                {layoutState == 1 && visualState==1 && combatActive && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={()=>{setVisualState(5)}}>Combat UI</div>}

                {layoutState == 2 && visualState==1 && <input className={`${StyleCSS.newvisuallayout}`} defaultValue={currentLayout} id="layoutName" spellCheck='false' autoFocus onFocus={(e) => e.target.select()}/>}
                {layoutState == 2 && visualState==1 && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={() => {saveLayout()}}>Accept</div>}
                {layoutState == 2 && visualState==1 && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={()=> {setLayoutState(1)}}>Cancel</div>}
                {visualState!=1 && combatActive == false && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={()=>{setVisualState(1)}}>Cancel</div>}
                {visualState!=1 && combatActive == true && <div className={`${StyleCSS.visualcontrolbutton}`} onClick={()=>{setVisualState(1)}}>Return</div>}
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