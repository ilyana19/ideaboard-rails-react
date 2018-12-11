import React, { Component } from 'react';
import axios from 'axios'

class IdeasContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ideas: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/ideas.json')
      .then(response => {
        console.log(response)
        this.setState({ideas: response.data})
      })
      .catch(error => console.log(error))
  }

  render() {
    let ideas = this.state.ideas.map((idea, index) => {
      return (
        <div className="tile" key={index}>
          <h4>{idea.title}</h4>
          <p>{idea.body}</p>
        </div>
      )
    })

    return (
      <div>
        {ideas}
      </div>
    );
  }
}

export default IdeasContainer;
