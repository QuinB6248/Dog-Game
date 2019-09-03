import React, { Component } from 'react';
import * as request from 'superagent';
import { connect } from 'react-redux';
import Game1 from './Game1';
import ProgressBarContainer from './ProgressBarContainer';

class Game1Container extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'RESET_ANSWERS',
      payload: []
    })
    this.getToNextStage()
  }

  getToNextStage = () => {
    request
      .get('https://dog.ceo/api/breeds/image/random')
      .then(response => {
        
        const url = response.body.message
        const breedName = url.toString().split('/')[4]
        
        this.props.dispatch({
          type: 'SHOW_RANDOM_IMAGE',
          payload: {
            url: url,
            breed: breedName
          }
        })
      })
      .catch(console.error)

    request
      .get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        const breeds = Object.keys(response.body.message)
        const random = () => Math.floor(Math.random() * 86)
        this.props.dispatch({
          type: 'TWO_RANDOM_BREEDS',
          payload: [breeds[random()], breeds[random()]]
        })
      })
      .catch(console.error)
  }

  checkAnswer = (event) => {

    if (event.target.name === this.props.dogRandomImage.breed) {
      this.props.dispatch({
        type: 'ANSWERS',
        payload: true
      })
      this.getToNextStage()
    } else {
      this.props.dispatch({
        type: 'ANSWERS',
        payload: false
      })
      this.props.dispatch({
        type: 'SHOW_RIGHT_NAME',
        payload: 
        <div  >
           <p>The answer is:</p>
           <h1 class="rightName">{this.props.dogRandomImage.breed}</h1>
        </div>
       })      
       setTimeout(this.removeAnswer, 2000) 
       setTimeout(this.getToNextStage, 2000)
      }


  }

  removeAnswer = () => {
    this.props.dispatch({
      type: 'SHOW_RIGHT_NAME',
      payload: []
    })
  }

  render() {
    console.log('RANDOM',this.props.randomBreeds)
    return (
 
      <div>
        <ProgressBarContainer answers={this.answers} />
        <Game1
          dogRandomImage={this.props.dogRandomImage}
          randomBreeds={this.props.randomBreeds}
          checkAnswer={this.checkAnswer}
          showRightName={this.props.showRightName}
          randomize={this.randomize}
          randomized={this.props.randomized} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    dogRandomImage: state.dogRandomImage,
    randomBreeds: state.randomBreeds,
    showRightName: state.showRightName,
  }
}

export default connect(mapStateToProps)(Game1Container)
