import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'


const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const [hex, setHex] = useState("#32a852")

  const quoteAPI = async () => {
    let arrayOfQuotes = [];
    try{
      // api from luke peavy https://github.com/lukePeavey/quotable
      const data = await axios.get("https://api.quotable.io/random")
      arrayOfQuotes = data.data;
    } catch (error) {
      console.log(error)
    }

    try {
      setQuote(arrayOfQuotes.content)
      setAuthor(arrayOfQuotes.author)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    quoteAPI()
  }, [])

  const randomizedHex = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    setHex(randomColor);
  };


  return (
    <div className="App" style = {
      {backgroundColor: `${hex}`,
      minHeight: "100vh"
    }}>
      <div class="text">
      <div class="quote">"{quote}"</div>
      <div class="author">-{author}</div>
      
      <div class="button">
      <button onClick={()=>{quoteAPI(); randomizedHex()}}>Random Quote</button>
      </div>
      </div>
    </div>
  );
}

export default App;
