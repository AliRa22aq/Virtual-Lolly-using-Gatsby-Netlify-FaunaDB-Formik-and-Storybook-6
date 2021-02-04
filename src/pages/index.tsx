import React, { useRef, useState } from 'react';
import Lolly from '../components/lolly'
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const ADD_VCARD = gql`
        mutation addVCard($c1: String!, $c2: String!, $c3: String!, $to: String!, $from: String!, $msg: String!){
           addVCard(c1: $c1, c2: $c2, c3: $c3, to: $to, from: $from, msg: $msg){
                    c1
                    c2
                    c3
                    to
                    from
                    msg
            }
    }
`



export default function Home() {

  const [c1, setC1] = useState("#deaa43");
  const [c2, setC2] = useState("#e95946");
  const [c3, setC3] = useState("#d52358");

  const [addVCard] = useMutation(ADD_VCARD);

  const handleSubmit = () => {
      console.log(fromField.current.value)
      console.log(toField.current.value)
      console.log(msgField.current.value)
      addVCard({
          variables: {
              c1, c2, c3,
              to: toField.current.value,
              from: fromField.current.value,
              msg: msgField.current.value
          }
      })

  }

  const fromField = useRef<HTMLInputElement>();
  const toField = useRef<HTMLInputElement>();
  const msgField = useRef<HTMLTextAreaElement>();


  return (<div className="container">
  <h1>Create Lolly</h1>
  <div className="main-container">

      <div>
          <Lolly top={c1} middle={c2} bottom={c3} />
          <br />
          <input type="color" value={c1} onChange={(e) => { setC1(e.target.value) }} />
          <input type="color" value={c2} onChange={(e) => { setC2(e.target.value) }} />
          <input type="color" value={c3} onChange={(e) => { setC3(e.target.value) }} />
      </div>
      <div className="form-container">
          <input type="text" placeholder="To" ref={toField} />
          <textarea placeholder="Enter your message!" ref={msgField}></textarea>
          <input type="text" placeholder="From" ref={fromField} />
          <button onClick={handleSubmit}>Send</button>
      </div>
  </div>
</div>
)}
