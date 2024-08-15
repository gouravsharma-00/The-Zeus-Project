import Iframe from "./components/Frame";

export default function App() {
  return(
    <div className="main flex">
    <div className="div-text">
      <h1>Your Carrer in 3D Devlopment Starts Here<br/> | The Zeus Project</h1>
      <button>Begin</button>
    </div>
      <div className="div-iframe">
        <Iframe src={"http://127.0.0.1:5500/src/frames/P-00/index.html"}></Iframe>
      </div>
    </div>
  )
}