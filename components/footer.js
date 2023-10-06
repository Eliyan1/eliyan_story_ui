import Flexstyle from '../styles/flexbox.module.css'

export default function Footer({setActivePage}) {
    return <div className={`${Flexstyle.footer}`}>
        <div className={`${Flexstyle.footeritem}`} onClick={() => {setActivePage(1)}}> Story </div>
        <div className={`${Flexstyle.footeritem}`} onClick={() => {setActivePage(2)}}> Audio </div>
        <div className={`${Flexstyle.footeritem}`} onClick={() => {setActivePage(3)}}> Visual </div>
    </div>

}