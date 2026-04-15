import './App.css'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { useState } from 'react'

function App() {
  const [inputValue, setInputValue] = useState<string>('')
  const [buttonClicked, setButtonClicked] = useState<boolean>(false)
  const handleButtonClick = () => {
    setButtonClicked(!buttonClicked)
    console.log('Button clicked')
  }
  const handleInputChange = (value: string) => {
    setInputValue(value)
    console.log('Input value:', value)
  }

  return (
    <>
      <Button label="Click me" onClick={handleButtonClick}  variant={buttonClicked ? 'secondary' : 'primary'} size={buttonClicked ? 'large' : 'small'} />
      <Input value={inputValue} onChange={handleInputChange} placeholder="Enter your name" />
      <p>Input value: {inputValue}</p>
    </>
  )
}

export default App
