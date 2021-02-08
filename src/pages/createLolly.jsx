import React, { useRef, useState } from 'react';
import Lolly from '../components/lolly'
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { navigate } from "gatsby";
import './styles/createLolly.css';
import Grid from '@material-ui/core/Grid';
import Header from "../components/header";
import {Button, TextField, TextareaAutosize} from '@material-ui/core';
import { Formik, Form,  Field, ErrorMessage} from 'formik';
import * as yup from 'yup';




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

    let schema = yup.object().shape({
        recipient: yup.string().required("Required"),
        message: yup.string().required("Required"),
        sender: yup.string().required("Required"),       
      });


    return (
        <>
            <Header />
            <Grid container spacing={2} className='container'>

                <Grid item xs={12} lg={6} className='container_lolly'>
                <div className='lolly'> 

                    <Lolly top={c1} middle={c2} bottom={c3} />
                </div>
                <div className='container_lolly_input' >

                    
                    <input type="color" value={c1} onChange={(e) => { setC1(e.target.value) }} />
                    <input type="color" value={c2} onChange={(e) => { setC2(e.target.value) }} />
                    <input type="color" value={c3} onChange={(e) => { setC3(e.target.value) }} />
                    
                </div>
                </Grid>
                <Grid item xs={12} lg={6} className='container_form'>

                    <Formik
                        initialValues={{ recipient: '', message: '', sender: '' }}
                        onSubmit={ async (values) => {

                                console.log("clicked");
                                const result = await createLolly({
                                    variables: {
                                        recipient: values.recipient,
                                        message: values.message,
                                        sender: values.sender,
                                        c1: c1,
                                        c2: c2,
                                        c3: c3,
                                    }
                                });
                                console.log("result form server = ", result);
                                navigate(`/showLolly?id=${result.data.createLolly.link}`)
                        }}
                    >
                        {({values}) => (
                            <Form>
   
                                        <Field as={TextField} autoComplete = "off" fullWidth required name="recipient" placeholder="To" label="To" /> <br />
                                        <Field as={TextareaAutosize} rowsMin={10} style={{width: "100%", marginTop: 20}} aria-label="maximum height"  name="message" placeholder="Enter your message!" label="Message" /> <br />
                                        <Field as={TextField} autoComplete = "off" fullWidth required name="sender" placeholder="sender" label="From" /> <br />

                                        <Button type="submit" style={{width: "100%", marginTop: 20}} variant="contained" color="primary"> Send to {values.recipient} </Button> <br />

                            </Form>
                        )}
                    </Formik>
                </Grid>

            </Grid>
        </>
    )
}

export default CreateLolly
