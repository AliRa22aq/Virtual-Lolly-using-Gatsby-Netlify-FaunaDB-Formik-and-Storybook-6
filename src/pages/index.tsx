import React from "react"
import { navigate } from "gatsby";
import Lolly from '../components/lolly'
import './main.css'
import Button from '@material-ui/core/Button';

export default function Home() {
  return (
    <div className="container">
      <div className="container_text" >
         <h3> Virtual Lollypop</h3>
         <p> A Lolly that you can share with your loved ones</p>
      </div> 
      <div className="container_lollies">
        <div>
          <Lolly top="red" middle="green" bottom="blue"  />
        </div>
        <div>
          <Lolly top="pink" middle="yellow" bottom="black"  />
        </div>  
        <div>
          <Lolly top="green" middle="green" bottom="red"  />
        </div>    
      </div>
      <Button variant="outlined" onClick= {() => {navigate("/createLolly") }}> 
      Make a Lolly 
      </Button>
    </div>
  );
}
