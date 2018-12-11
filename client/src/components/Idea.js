import React from 'react'

const Idea = ({props}) => (
  <div className="tile" key={props.id}>
    <h4>{props.title}</h4>
    <p>{props.body}</p>
  </div>
)

export default Idea