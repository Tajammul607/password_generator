import { useCallback, useEffect, useRef, useState } from "react";

const App=()=>{
  const [lenth,setLength]=useState(8);
  const [numberAllowed, setNumberAllowed] =useState(false);
  const [charAllowed,setCharAllowed] =useState(false)
  const [password,setPassword] =useState("")

  const passwordRef=useRef(null)

  const passwordGenerator =useCallback(()=>{
    let pass="";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if(numberAllowed) str +="0123456789";
    if(charAllowed) str+='!@#$%^&*(){}[]'

    for(let i=1; i<lenth; i++){
      let char=Math.floor(Math.random () * str.length +1);
      pass +=str.charAt(char)
    }

    setPassword(pass)
    
  },
  [numberAllowed,charAllowed,setPassword])

  const copyToClipBoard =useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,9)
    window.navigator.clipboard.writeText(password)
  },[password])

   useEffect(()=> passwordGenerator(),
   [lenth,numberAllowed,charAllowed,passwordGenerator])
 return (
 <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-blue-500 text-center bg-gray-700 ">
    <h1 className="text-white text-center">Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
         <input 
         type="text"
         value={password}
         className="outline-none w-full py-1 px-1"
         placeholder="Password"
         readOnly
         ref={passwordRef}
         />
         <button 
         onClick={copyToClipBoard}
         className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">COPY</button>
         </div>
         <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
           <input 
           type="range" 
           min={6}
           max={100}
           className="cursor-pointer"
           value={lenth}
           onChange={e => setLength(e.target.value)}
           />
           <label >Length :{lenth}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>setNumberAllowed( prev => !prev)}
             />
            <label >Number </label>
 
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={()=> setCharAllowed(prev => !prev)} /> 
            <label htmlFor=""> Charater</label>
          </div>
         </div>
    
 </div>
 )
};

export default App;