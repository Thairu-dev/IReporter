import React from 'react'

export default function AddRedFlag() {
  return (
    <div className='ui form'>
      <div className='field'>
         <form encType='multipart/form-data' >
        
        <label for="title">Title</label>
        <input type='text' id='title' name='title'></input>

        <label for="geolocation" >Geolocation</label>
        <input type='text' id='geolocation' name='geolocation' ></input>

        <label for="description" >Description</label>
        <textarea id='description' name='description' rows={3}></textarea>


        <label for="media" >Image/Video</label>
        <input type='file' id='media' name='media'  ></input> 
        <br></br>
        
        <button className='submit-button'>Submit</button>
       </form> 
       </div>
    </div>
  )
}

