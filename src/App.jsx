import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  // for react_app -> process.env.-------
  // for vite app -> import.meta.env.------
  console.log(import.meta.env.VITE_APPWRITE_URL);

  return (
    <>
    <h1>Hello this is a Abhishek </h1>
    </>
  )
}

export default App
