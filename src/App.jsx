import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [textLength, setTextLength] = useState();
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAlllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAlllowed) str += "!#$%&()*+-./:;<=>?@[]^_`{|}~";

    for (let i = 1; i <= textLength; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [textLength, numberAllowed, characterAlllowed, setPassword]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const checkPasswordStrength = ()=>{
    const passwordLength = password?.length;
    console.log("check length", passwordLength);
    if(passwordLength<1){
      return ""
    }
    else if(passwordLength<4){
      return "Very Weak"
    }
    else if(passwordLength<8){
      return "Poor"
    }
    else if(passwordLength<12){
      return "Medium"
    }
    else if(passwordLength<16){
      return "Strong"
    }
    else{
      return "Very Strong"
    }
  }

  const passwordStrength = checkPasswordStrength();
 
 

  useEffect(() => {
    passwordGenerator();
  }, [textLength, numberAllowed, characterAlllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto text-orange-700 text-center px-4 py-3 bg-gray-700 my-12">
        <h1 className="text-white text-center my-4">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-10">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-slate-600"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-green-800 text-white px-3 py-4"
            onClick={copyToClipBoard}
          >
            Copy
          </button>
        </div>
        <span className="text-white ">
           {passwordStrength && <span>Password Strength: {passwordStrength}</span>}  
        </span>
        <div className="flex text-sm gap-x-2 mt-5">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={textLength}
              className="cursor-pointer"
              onChange={(e) => {
                setTextLength(e.target.value);
              }}
            />
            <label>Length: {textLength}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterAlllowed}
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
