import { use } from 'react'
import { useState, useCallback, useEffect, useRef  } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const [password , setPassword] = useState('')

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if(numberAllowed) str += '1234567890'
    if(charAllowed) str += '!@#$%^&*()_+'
    for(let i =1; i <= length; i++) {
       let char = Math.floor(Math.random() * str.length + 1)
       pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed]) 
  useEffect(() => {}, [length, numberAllowed, charAllowed ,setPassword]) 

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0, 99999)
  window.navigator.clipboard.writeText(password)
}, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed ,passwordGenerator])


  return (
 
   <div className='w-full  max-w-md mx-auto  shadow-md rounded-lg px-4 my-9  text-black-500 bg-gray-500'>  <h1 className='p-4  text-center text-3xl flex '>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
       <input
        type="text" 
        
        value={password} className='outline-none w-full py-1 px-3' readOnly placeholder='password'
        ref={passwordRef}
        />
        <button
         onClick= {copyPasswordToClipboard}
         className='bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800'>copy</button>
    </div>
    <div className='flex text-sm gap-x-2 my-2 '>
      <div className='flex items-center
       gap-x-2'>
        <input type="range"
        min={6}
        max={30}
        value={length}
        className='cursor-pointer'
        onChange={e => setLength(e.target.value)}
        />
        <label> Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-2'>
        <input 
        type="checkbox"
        
        defaultChecked={numberAllowed}
        id='numbersInput'
       onChange={() => setNumberAllowed((prev) => !prev)}
        />
          <label htmlFor='numbersInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-2'>
        <input type="checkbox"
        defaultChecked={charAllowed}
        id='symbolsInput'
        onChange={() => setCharAllowed((prev) => !prev)} 
        
        />
        <label htmlFor='symbolsInput'>Character</label>

    </div>
   </div>
   </div>

  )
}

export default App
