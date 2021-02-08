import React from "react"
import { navigate } from "gatsby";
import Lolly from '../components/lolly'
import './styles/main.css'
import Button from '@material-ui/core/Button';
import Header from "../components/header";


export default function Home() {
  return (
    <>
    <Header />
    <div className="container">
      

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
    </>
  );
}
