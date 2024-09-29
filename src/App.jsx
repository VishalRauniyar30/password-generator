import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {
    const [length, setLength] = useState(7)
    const [char, setChar] = useState(false)
    const [no, setNo] = useState(false)
    const [pass, setPass] = useState("")

    const passRef = useRef(null)

    const generatePassword = useCallback(() => {
        let password = ''
        let string = 'QWERTYUIOPLKJHGFDSAZXCVBNMpoiuytrewqasdfghjklmnbvcxz'
        if(setNo){
            string += '1234567890'
        }
        if(setChar){
            string += '~!@#$%^&*()_+=-`{}[]<>,.?/'
        }
        for(let i=1;i<=length;i++){
            let character = Math.floor(Math.random() * string.length + 1)
            password += string.charAt(character)
        }
        setPass(password)
    }, [length, setNo, setChar, setPass])

    const copyPasswordToClipboard = useCallback(() => {
        passRef.current?.select()
        passRef.current?.setSelectionRange(0,99)
        window.navigator.clipboard.writeText(pass)
    }, [pass])

    useEffect(() => {
        generatePassword()
    }, [length, setNo, setChar, generatePassword])

    return (
        <div>
            <div className='w-full max-w-md mx-auto shadow-2xl rounded-lg px-4 py-3 my-8 bg-orange-300 text-gray-800'>
                <h1 className='text-center text-zinc-700 my-3 text-xl'>Password Generator</h1>
                <div className='flex shadow-lg rounded-xl overflow-hidden mb-4 '>
                    <input 
                        type="text"
                        value={pass}
                        className='outline-none w-full py-2 px-5 bg-lime-300'
                        placeholder='Password'
                        readOnly
                        ref={passRef}
                    />
                    <button onClick={copyPasswordToClipboard} className='outline-none bg-teal-900 text-white px-5 py-0.5 shrink-0 hover:opacity-50'> 
                        Copy
                    </button>
                </div>
                <div className='flex text-sm gap-x-2'>
                    <div className='flex items-center gap-x-1'>
                        <input 
                            type="range" 
                            min={1}
                            max={30}
                            value={length}
                            className='cursor-pointer'
                            onChange={(e) => setLength(e.target.value)}
                        />
                        <label className='mx-2'>length : {length} </label>
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <input 
                            type="checkbox" 
                            defaultChecked={no}
                            id='numberInput'
                            onChange={() => setNo((prev) => !prev)}
                        />
                        <label htmlFor='numberInput'>Numbers</label>
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <input 
                            type="checkbox" 
                            defaultChecked={char}
                            id='characterInput'
                            onChange={() => setChar((prev) => !prev)}
                        />
                        <label htmlFor='characterInput'>Character</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App