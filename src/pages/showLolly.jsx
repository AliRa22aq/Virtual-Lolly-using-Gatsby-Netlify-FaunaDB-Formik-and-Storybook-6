import React, {useState} from 'react'
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Lolly from '../components/lolly'
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles/showLolly.css'
import Header from "../components/header";
import { navigate } from "gatsby";

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import {Input, Button, Grid} from '@material-ui/core';





const GET_LOLLY = gql `
      query getLollybyLink($link : String!){
        getLollybyLink(link : $link){
                    c1    
                    c2 
                    c3 
                    recipient 
                    message       
                    sender    
                    link
            }
        }
            
    
`

const ShowLolly = (props) => {

    const [state, setState] = useState()




    const id = props.location.search.slice(4)
    console.log(id)

    const {loading , error , data} = useQuery(GET_LOLLY , {
        variables :{
            link : id
        }

    })

    // console.log(data.getLollybyLink)


    if(loading) return <div className='progress'> <CircularProgress  disableShrink size={100} thickness={5}/></div>
    if(error) return <h1> {error.message} </h1>

    return (
        <div>
                <Header />
            
            {
                data && data.getLollybyLink && (
                    <Grid container className='container'>
                    
                    <Grid item xs={12} lg={4} className='container_lolly'>
                    <Lolly top={data.getLollybyLink.c1} middle={data.getLollybyLink.c2} bottom={data.getLollybyLink.c3} />
                    </Grid>



                    <Grid  item xs={12} lg={8} className='container_text'> 
                    <span> 
                    
                    <CopyToClipboard text={`https://lolly-app-bootcamp2020.netlify.app/showLolly?id=${data.getLollybyLink.link}`}
                        onClick ={() => this.setState({copied: true})}>
                        <button> <FileCopyOutlinedIcon /> </button>
                    </CopyToClipboard>

                    <Input 
                           defaultValue={`https://lolly-app-bootcamp2020.netlify.app/showLolly?id=${data.getLollybyLink.link}`}
                           disabled 
                           fullWidth
                           
                           />
 
                    
                    </span>

                    

                    <h2> Hye {data.getLollybyLink.recipient },</h2>
                    <h4> Message:  I made this Lolly for you. {data.getLollybyLink.message }</h4>                   
                    <h2> From, {data.getLollybyLink.sender }</h2>

                    <div className='container_request'> 
                    <h3> You can also make a Lolly like this to send your loved ones</h3>
                    <Button variant="outlined" onClick= {() => {navigate("/createLolly") }}> 
                                        Make a new Lolly 
                    </Button>
                    </div>
                    </Grid>
                    

                    </Grid>
                )
            }

        </div>
    )
}

export default ShowLolly
