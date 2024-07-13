import StyleCSS from '@/styles/general.module.css'
import React, { useRef, useState } from'react';


export default function Audio({activePage, audios, audiolayouts}) {

    const [currentSong, setCurrentSong] = useState([])
    const [volume, setVolume] = useState(100)
    const [playHour, setPlayHour] =useState('00')
    const [playMin, setPlayMin] = useState('00')
    const [playSec, setPlaySec] = useState('00')
    const [totalHour, setTotalHour] = useState('00')
    const [totalMin, setTotalMin] = useState('00')
    const [TotalSec, setTotalSec] = useState('00')
    const [audioState, setAudioState] = useState(1)
    const [audioButtons, setAudioButtons] = useState([])

    const [audioTitle, setAudioTitle] = useState('')
    const [audioArtist, setAudioArtist] = useState('')
    const [audioTag, setAudioTag] = useState('')
    const [audioURL, setAudioURL] = useState('')

    const [currentLayout, setCurrentLayout] = useState('Name Layout')

    const [saveState, setSaveState] = useState(0)

    const [audioLayoutList, setAudioLayoutList] = useState(audiolayouts)

    const audioElem = useRef();
    const navRef = useRef();
    const volRef = useRef();

    const returnMusic = () =>{
        setAudioState(1)
        setSaveState(0)
    }

    const saveLayout = async () =>{

        const currentLayoutTitles = audioLayoutList.map(({title}) => title)
        if(document.getElementById('layoutName').value == 'Name Layout'){
            alert('Please name the Layout')
        }else{
            if(currentLayoutTitles.includes(document.getElementById('layoutName').value)){
                await fetch(`/api/audio/updatelayouttitle?title=${document.getElementById('layoutName').value}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title:		document.getElementById('layoutName').value,
                        layout:     audioButtons,
                    }),
                });
                const changedLayoutEntry = audioLayoutList.findIndex((audioLayoutList)=> audioLayoutList.title == document.getElementById('layoutName').value)
                audioLayoutList[changedLayoutEntry].layout = audioButtons
            }else{ 
                await fetch('/api/audio/createlayout',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title:    document.getElementById('layoutName').value,
                        layout:   audioButtons,
                    }),
                });
                setAudioLayoutList([...audioLayoutList, {title: document.getElementById('layoutName').value, layout:audioButtons}])
            }
            setCurrentLayout( document.getElementById('layoutName').value);
            setSaveState(0);
        }
    }

    const loadLayout = async (newLayout) => {
        setAudioButtons(newLayout.layout)
        setAudioState(1)
        setCurrentLayout(newLayout.title);
    }


    const playMusic = () =>{
        audioElem.current.play();
    }

    const stopMusic = () =>{
        audioElem.current.volume=1;
        audioElem.current.pause();
        audioElem.current.currentTime = 0;
    }

    const pauseMusic = () =>{
        audioElem.current.pause();
    }

    const whilePlaying = () => {
        const duration = audioElem.current.duration;
        const ct = audioElem.current.currentTime;
        var songPlaySec = ct;
        var songPlayMin = ct/60;

        while (songPlaySec >= 3600) {
            songPlaySec = songPlaySec-3600;
            songPlayMin = songPlayMin-60;
        }

        Math.floor(songPlayMin)<10 ? setPlayMin('0'+ Math.floor(songPlayMin)) : setPlayMin(Math.floor(songPlayMin));
        Math.floor(ct/3600)<10 ? setPlayHour('0'+ Math.floor(ct/3600)) : setPlayHour(Math.floor(ct/60));

        while (songPlaySec >= 60) {songPlaySec = songPlaySec-60}

        Math.floor(songPlaySec)<10 ? setPlaySec('0'+ Math.floor(songPlaySec)) : setPlaySec(Math.floor(songPlaySec));

        setCurrentSong({...currentSong, "progress": ct / duration * 100, "length": duration})
    }

    const onPlay = () => {
        const duration = audioElem.current.duration;
        var songTotalSec = duration;
        var songTotalMin = duration/60;

        while (songTotalSec >=3600) {
            songTotalSec= songTotalSec-3600;
            songTotalMin = songTotalMin-60;
        }
        Math.floor(duration/3600)<10 ? setTotalHour('0'+ Math.floor(duration/3600)) : setTotalMin(Math.floor(duration/3600));
        Math.floor(songTotalMin)<10 ? setTotalMin('0'+ Math.floor(songTotalMin)) : setTotalMin(Math.floor(songTotalMin));

        while (songTotalSec >= 60) {songTotalSec = songTotalSec-60}
        Math.floor(songTotalSec)<10 ? setTotalSec('0'+ Math.floor(songTotalSec)) : setTotalSec(Math.floor(songTotalSec));        
        
    }

    const setAudioPosition = (e) => {
        if(audioElem.current.currentTime != 0) {
            let width = navRef.current.clientWidth;
            const offset = e.nativeEvent.offsetX;
    
            const divprogress = offset / width;
            audioElem.current.currentTime = divprogress  * currentSong.length;
        }
    }

    const setAudioVolume = (e) => {
        let width = volRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const divvolume = offset / width;
        
        audioElem.current.volume = divvolume;
        setVolume(divvolume*100)
    }

    const createSong = async (e) => {
        e.preventDefault()

        await fetch('/api/audio/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title:    audioTitle,
                artist:   audioArtist,
                url:      audioURL,
                tag:      audioTag,
            }),
        });

        setAudioState(1)
    };

    const addAudioButton = ({e,audios}) => {
      e.preventDefault()
      const checkIfAdded = audioButtons.findIndex((audioButtons)=> audioButtons._id == audios._id)
      if (checkIfAdded == -1) {
        setAudioButtons([...audioButtons, audios])
        setAudioState(1)
      }else{
        alert("Song is already added")
      }
    }

    const buttonPlay = async ({e,audioButtons}) => {
        e.preventDefault();
        await setCurrentSong(audioButtons);
        audioElem.current.play();
    }


    return <div className={`${StyleCSS.audiocontent}`} style={{display: activePage==2 ? "flex" : "none"}}>
    <div className={`${StyleCSS.container}`}>
        <div 
        className={`${StyleCSS.audiobox}`} 
        style={{display: audioState==1 ? "flex" : "none"}}>
            {audioButtons.map(audioButtons => (
            <div 
            className={`${StyleCSS.audiobutton}`} 
            key={audioButtons._id} 
            onClick={(e) => {buttonPlay({e, audioButtons})}}
            > 
                {audioButtons.tag}
            </div>
            ))}
        </div>

        <div className={`${StyleCSS.audiobox}`} style={{display: audioState==2 ? "flex" : "none"}}>
            <div className={`${StyleCSS.newaudiolist}`}>
                <div className={`${StyleCSS.newaudioentry}`}>
                    <div className={`${StyleCSS.newaudioname}`}> Title: </div>
                    <input className={`${StyleCSS.newaudioinput}`} onChange={(e) => setAudioTitle(e.target.value)}/>
                </div>
                <div className={`${StyleCSS.newaudioentry}`}>
                    <div className={`${StyleCSS.newaudioname}`}> Artist: </div>
                    <input className={`${StyleCSS.newaudioinput}`} onChange={(e) => setAudioArtist(e.target.value)}/>
                </div>
                <div className={`${StyleCSS.newaudioentry}`}>
                    <div className={`${StyleCSS.newaudioname}`}> Button Tag: </div>
                    <input className={`${StyleCSS.newaudioinput}`} onChange={(e) => setAudioTag(e.target.value)}/>
                </div>
                <div className={`${StyleCSS.newaudioentry}`}>
                    <div className={`${StyleCSS.newaudioname}`}> URL: </div>
                    <input className={`${StyleCSS.newaudioinput}`} onChange={(e) => setAudioURL(e.target.value)}/>
                </div>
                <button className={`${StyleCSS.newaudiobutton}`} onClick={createSong}> Add </button>
            </div>
        </div>

        <div className={`${StyleCSS.audiobox}`} style={{display: audioState==3 ? "flex" : "none"}}>
        <div className={`${StyleCSS.audiooptionheaderwrapper}`}>
            <div className={`${StyleCSS.audiooptionheader}`}> Select Song </div>
        </div>
        <div className={`${StyleCSS.audiooptionvalues}`}>
                <div className={`${StyleCSS.audiooptionartist}`}> Artist</div>
                <div className={`${StyleCSS.audiooptiontitle}`}> Title</div>
            </div>
            <div className={`${StyleCSS.audiooptionwrapper}`}>


                {audios.map(audios => (
                    <div 
                        className={`${StyleCSS.audiooption}`}
                        key={audios._id} 
                        onClick={(e) => {addAudioButton({e, audios})}}
                        >
                        <div className={`${StyleCSS.audiooptionartist}`}> {audios.artist}</div>
                        <div className={`${StyleCSS.audiooptiontitle}`}> {audios.title}</div>
                    </div>
                ))}
            </div>
        </div>

        <div className={`${StyleCSS.audiobox}`} style={{display: audioState==4 ? "flex" : "none"}}>
        <div className={`${StyleCSS.audiooptionheaderwrapper}`}>
            <div className={`${StyleCSS.layoutoptionheader}`}> Select Layout </div>
        </div>
            <div className={`${StyleCSS.layoutoptionwrapper}`}>
                {audioLayoutList.map(audioLayoutList => (
                    <div 
                        className={`${StyleCSS.audiooption}`}
                        key={audioLayoutList.title} 
                        onClick={() => {loadLayout(audioLayoutList)}}
                        >
                        <div className={`${StyleCSS.layoutoptiontitle}`}> - {audioLayoutList.title}</div>
                    </div> 
                ))}

            </div>
        </div>

        <div className={`${StyleCSS.audioline}`}/>

        <div className={`${StyleCSS.audiocontrol}`}>
            {saveState == 0 &&<div className={`${StyleCSS.audiocontrolbutton}`} onClick={()=>{setSaveState(1)}}>Save Layout</div>}
            {saveState == 0 && <div className={`${StyleCSS.audiocontrolbutton}`} onClick={()=>{setAudioState(4)}}>Load Layout</div>}
            {saveState == 1 && <input className={`${StyleCSS.newaudiolayout}`} defaultValue={currentLayout} id='layoutName' spellCheck='false' autoFocus onFocus={(e) => e.target.select()}/>}
            {saveState == 1 && <div className={`${StyleCSS.audiocontrolbutton}`} onClick={saveLayout}> Accept</div>}
            <div className={`${StyleCSS.audiocontrolspacer}`}></div>
            <div className={`${StyleCSS.audiocontrolbutton}`} onClick={()=>{setAudioState(2)}}>Add Song</div>
            <div className={`${StyleCSS.audiocontrolbutton}`} onClick={()=>{setAudioState(3)}}>Load Song</div>
            <div className={`${StyleCSS.audiocontrolspacer}`}></div>
            <div className={`${StyleCSS.audiocontrolbutton}`} onClick={returnMusic}>Return</div>
        </div>
    </div>



    <div className={`${StyleCSS.audiobar}`}>

        <div className={`${StyleCSS.audionavigation}`}>
            <div className={`${StyleCSS.audionavbar}`} onClick={setAudioPosition} ref={navRef}>
                <div className={`${StyleCSS.audioprog}`} style={{width: `${currentSong.progress+'%'}`}}/>
            </div>
        </div>
        <div className={`${StyleCSS.playtime}`}>
            <div className={`${StyleCSS.playhour}`}>{playHour}</div>
            :
            <div className={`${StyleCSS.playmin}`}>{playMin}</div>
            :
            <div className={`${StyleCSS.playsec}`}>{playSec}</div>
            /
            <div className={`${StyleCSS.playhour}`}>{totalHour}</div>
            :
            <div className={`${StyleCSS.playmin}`}>{totalMin}</div>
            :
            <div className={`${StyleCSS.playsec}`}>{TotalSec}</div>
        </div>
        <div className={`${StyleCSS.audiovolume}`}>
            <div className={`${StyleCSS.audiovolumebar}`} onClick={setAudioVolume} ref={volRef}>
                <div className={`${StyleCSS.audiocurrentvolume}`} style={{width: `${volume+'%'}`}}/>
            </div>
        </div>
        <div className={`${StyleCSS.volumenumber}`}>
            {Math.ceil(volume)}
        </div>
    </div>

    <div className={`${StyleCSS.audiobar}`}>
        <audio 
        src={currentSong.url} 
        ref={audioElem}
        onTimeUpdate={whilePlaying}
        onPlaying={onPlay}
        />
        {/* <span id='current-time-audio' className='time'>0:00</span>
        <input type="range" id="seek-slider-audio" max="100" value="0"/>
        <span id='duration-audio' className='time'>0:00</span>
        <output id="volume-output">100</output>
        <input type="range" id="volume-slider" max="100" value="100"/> */}
    </div>

    <div className={`${StyleCSS.audiobuttonbar}`}>
        <button className={`${StyleCSS.audioplay}`} onClick={playMusic}/>
        <button className={`${StyleCSS.audiopause}`} onClick={pauseMusic}/>
        <button className={`${StyleCSS.audiostop}`}  onClick={stopMusic}/>
    </div>
    </div>;				
}
