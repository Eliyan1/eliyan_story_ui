import StyleCSS from '@/styles/general.module.css'

export default function Footer({setActivePage}) {
    return <div className={`${StyleCSS.footer}`}>
        <div className={`${StyleCSS.footeritem}`} onClick={() => {setActivePage(1)}}> Story </div>
        <div className={`${StyleCSS.footeritem}`} onClick={() => {setActivePage(2)}}> Audio </div>
        <div className={`${StyleCSS.footeritem}`} onClick={() => {setActivePage(3)}}> Visual </div>
    </div>

}