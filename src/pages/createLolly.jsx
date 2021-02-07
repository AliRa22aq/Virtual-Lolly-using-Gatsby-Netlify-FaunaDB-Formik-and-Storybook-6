import React, { useRef, useState } from 'react';
import Lolly from '../components/lolly'
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { navigate } from "gatsby";
import './styles/createLolly.css';
import Grid from '@material-ui/core/Grid';
import Header from "../components/header";

const createLollyMutation = gql`
    mutation createLolly(
        $recipient: String!, 
        $message: String!, 
        $sender: String!, 
        $c1: String!, 
        $c2: String!,
        $c3: String!) {
            createLolly(
                recipient: $recipient, 
                message: $message, 
                sender: $sender,
                c1: $c1, 
                c2: $c2,
                c3: $c3) {
                            link
        }
    }
`

const CreateLolly = () => {

    const [c1, setC1] = useState("#deaa43");
    const [c2, setC2] = useState("#e95946");
    const [c3, setC3] = useState("#d52358");

    const [createLolly] = useMutation(createLollyMutation);

    const submitLollyForm = async () => {
        console.log("clicked");
        const result = await createLolly({
            variables: {
                recipient: toField.current.value,
                message: msgField.current.value,
                sender: fromField.current.value,
                c1,
                c2,
                c3,
            }
        });
        console.log("result form server = ", result);
        navigate(`/showLolly?id=${result.data.createLolly.link}`)
    }

    const fromField = useRef();
    const toField = useRef();
    const msgField = useRef();

    return (
        <>
            <Header />
            <Grid container className='container' >

<div className='container_lolly'> 
                <Grid item xs={6} >

                    <Lolly top={c1} middle={c2} bottom={c3} />


                    <input type="color" value={c1} onChange={(e) => { setC1(e.target.value) }} />
                    <input type="color" value={c2} onChange={(e) => { setC2(e.target.value) }} />
                    <input type="color" value={c3} onChange={(e) => { setC3(e.target.value) }} />

                </Grid>
</div>
                <Grid item xs={6} className='container_form'>

                    <input type="text" placeholder="To" ref={toField} />
                    <textarea placeholder="Enter your message!" ref={msgField}></textarea>
                    <input type="text" placeholder="From" ref={fromField} />
                    <button onClick={submitLollyForm}>Send</button>
                </Grid>

            </Grid>
        </>
    )
}

export default CreateLolly
