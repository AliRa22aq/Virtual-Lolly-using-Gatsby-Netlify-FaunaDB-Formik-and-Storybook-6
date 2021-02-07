import React from 'react'
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Lolly from '../components/lolly'



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

    const id = props.location.search.slice(4)
    console.log(id)

    const {loading , error , data} = useQuery(GET_LOLLY , {
        variables :{
            link : id
        }

    })

    // console.log(data.getLollybyLink)


    if(loading) return <h1> Loading . . . </h1>
    if(error) return <h1> {error.message} </h1>

    return (
        <div>
            {
                data && data.getLollybyLink && (
                    <div>
                    <Lolly top={data.getLollybyLink.c1} middle={data.getLollybyLink.c2} bottom={data.getLollybyLink.c3} />

                    <h1> {data.getLollybyLink.sender }</h1>
                    <h1> {data.getLollybyLink.message }</h1>
                    <h1> {data.getLollybyLink.recipient }</h1>
                    <h1> {data.getLollybyLink.link }</h1>
                    </div>
                )
            }
        </div>
    )
}

export default ShowLolly
