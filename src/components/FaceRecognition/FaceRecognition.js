import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imgUrl, boundingBox }) => {
  return (
    <div id='url-container'>
      <div style={{position: 'absolute'}}>
        <img id='input-image' alt='' src={imgUrl} width='400px' height='auto' />
        <div
          className='bounding-box' 
          style={{'top': boundingBox.topRow, 
                  'bottom': boundingBox.bottomRow, 
                  'left': boundingBox.leftCol, 
                  'right': boundingBox.rightCol}}>
        </div>
      </div>
    </div>
  );
}

export default FaceRecognition;