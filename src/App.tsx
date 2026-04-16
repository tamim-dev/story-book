import './App.css'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { useState } from 'react'
import { Toggle } from './components/Toggle'
import { Card } from './components/Card'

function App() {
  const [inputValue, setInputValue] = useState<string>('')
  const [buttonClicked, setButtonClicked] = useState<boolean>(false)
  const [toggleChecked, setToggleChecked] = useState<boolean>(false)
  const handleButtonClick = () => {
    setButtonClicked(!buttonClicked)
    console.log('Button clicked')
  }
  console.log('Button clicked:', buttonClicked);
  
  const handleInputChange = (value: string) => {
    setInputValue(value)
    console.log('Input value:', value)
  }
  const handleToggleChange = (value: boolean) => {
    setToggleChecked(value)
    console.log('Toggle value:', value)
  }

  return (
    <>
      <Button label="Click me" onClick={handleButtonClick} variant={buttonClicked ? 'secondary' : 'primary'} size={buttonClicked ? 'large' : 'small'} />
      <Input value={inputValue} onChange={handleInputChange} placeholder="Enter your name" />
      <p>Input value: {inputValue}</p>
      <Toggle checked={toggleChecked} onChange={handleToggleChange} />
      <p>Toggle value: {toggleChecked ? 'Checked' : 'Unchecked'}</p>
      <Card title="Card Title" description="Card Description" />
      <Card title="Card With Content" description="You can place extra elements in the card body." >
        <p>Card Content</p>
      </Card>
    </>
  )
}

export default App
