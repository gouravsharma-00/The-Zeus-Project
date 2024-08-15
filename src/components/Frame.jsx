
export default function Iframe( {src} ) {

    const frameStyle = {
        height: '500px',
        width : '800px',
        border: 'none',
        borderRadius: '20px'
    }
    return(
        <iframe id="frame" src={src}></iframe>
    )
}