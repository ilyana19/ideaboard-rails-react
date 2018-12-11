import React, { Component } from 'react';
import axios from 'axios'
import Idea from './Idea'

class IdeasContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ideas: []
    }

    this.addNewIdea = this.addNewIdea.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/ideas.json')
      .then(response => {
        this.setState({ideas: response.data})
      })
      .catch(error => console.log(error))
  }

  addNewIdea = () => {
    axios.post('http://localhost:3001/api/v1/ideas', {
      idea: {
        title: '',
        body: ''
      }
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => console.log(error))
  }

  render() {
    let ideas = this.state.ideas.map((idea, index) => {
      return (<Idea props={idea} key={index} />)
    })

    return (
      <div>
        <div>
          <button className="newIdeaButton"
            onClick={this.addNewIdea}>
            New Idea
          </button>
        </div>

        {ideas}
      </div>
    );
  }
}

export default IdeasContainer;
