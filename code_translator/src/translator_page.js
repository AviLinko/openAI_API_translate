import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = "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";


function CodeTranslator() {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
  
    const handleChange = (event) => {
      setCode(event.target.value);
    };

    useEffect(() => {
        async function translateCode() {
          const response = await axios.post("https://api.openai.com/v1/engines/code-translation/jobs", {
            prompt: code,
            max_tokens: 2048,
            n: 1,
            stop: null,
            temperature: 0.5,
          }, {
            headers: {
              "Authorization": `Bearer ${API_KEY}`,
              "Content-Type": "application/json"
            }
          });
    
          setOutput(response.data.choices[0].text);
        }
    
        if (code) {
          translateCode();
        }
      }, [code]);
    
      return (
        <div>
          <textarea value={code} onChange={handleChange} />
          <pre>{output}</pre>
        </div>
      );
    }
    
export default CodeTranslator;
