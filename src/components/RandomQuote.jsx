import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RandomQuote() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [favorites, setFavorites] = useState([]);
  
    const fetchQuote = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/quotes');
        const randomIndex = Math.floor(Math.random() * response.data.quotes.length);
        const randomQuote = response.data.quotes[randomIndex];
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
      } catch (error) {
        console.error('Error fetching the quote', error);
      }
    }

    useEffect(() => {
        fetchQuote();
      }, []);

      const handleFavorite = () => {
        const favoriteQuote = { quote, author };
        setFavorites((prevFavorites) => [...prevFavorites, favoriteQuote]);
        alert('Quote added to favorites!');
      };


      const handleShare = () => {
        const shareMessage = `Check out this quote: "${quote}" - ${author}`;
        if (navigator.share) {
          navigator.share({
            title: 'Random Quote',
            text: shareMessage,
            url: window.location.href,
          })
          .then(() => console.log('Quote shared successfully!'))
          .catch((error) => console.error('Error sharing quote', error));
        } else {
          // Fallback for browsers that do not support the Web Share API
          alert(shareMessage);
        }
      };

  return (
    
        <div className='container d-flex ' style={{ textAlign: 'center', margin: '20px',background:'grey',borderRadius:'15px' }}>
      <h1> Quotes </h1>
      
      <blockquote style={{ fontStyle: 'italic', margin: '20px' }}>
        "{quote}"
      </blockquote>

      <p style={{ fontWeight: 'bold' }}>— {author}</p>
      <div className='line' style={{width:'auto',height:'1.5px',backgroundColor:'white'}}></div>
      <div style={{marginTop:'24px'}}>
      <button  onClick={fetchQuote} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Next
      </button>
      <div style={{marginLeft:'383px',marginTop:'-30px',cursor:'pointer',color:'red'}} onClick={handleFavorite}>
        <i class="fa-regular fa-heart"></i>
        </div>
      <div style={{marginLeft:'450px',marginTop:'-24px',cursor:'pointer',color:'blue'}} onClick={handleShare} >
      <i class="fa-regular fa-share-from-square"></i>
      </div>
      </div>
    </div>
  )
}

export default RandomQuote