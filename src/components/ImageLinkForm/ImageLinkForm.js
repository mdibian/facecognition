import React from 'react'
import './ImageLinkForm.css'
import '../CSS/ButtonStyles.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p style={{marginTop: '30px'}}>
        Let the machine detect your pretty faces!
      </p>
      <input 
        id='url-input' 
        onChange={onInputChange} 
        type='text' 
        placeholder="Paste your image's URL here"
      />
      <button 
        className='purple-button' 
        id='upload-button'
        onClick={onSubmit}>
          Go!
      </button>
    </div>
  );
}

export default ImageLinkForm;