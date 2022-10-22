import logo from './logo.svg';
import './App.css';
import React from 'react'

function App() {

const [file , setFile] = React.useState('')

  const OnClick = ( ) =>  {
    var fd = new FormData()
    fd.append('csvFile', file)
      fetch('http://localhost:4000/upload',{
      method : 'POST',
      body : 
        fd
    }).then((res) => 
      res.json()
    )
    .then((response)=>{
    console.log(response) 
    console.log(response.data[0])}
    )
  }
 
  return (
    <>
      <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])}/>
      <button onClick={OnClick}>Submit</button>
      </>
  )
}

export default App;
