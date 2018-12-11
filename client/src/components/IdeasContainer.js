import React, { Component } from 'react';
import axios from 'axios'
import update from 'immutability-helper'
import Idea from './Idea'
import IdeaForm from './IdeaForm'

class IdeasContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ideas: [],
      editingIdeaId: null
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
      const ideas = update(this.state.ideas, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({
        ideas: ideas,
        editingIdeaId: response.data.id
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    let ideas = this.state.ideas.map((idea, index) => {
      if (this.state.editingIdeaId === idea.id) {
        return (<IdeaForm props={idea} key={index} />)
      } else {
        return (<Idea props={idea} key={index} />)
      }
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
