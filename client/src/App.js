import React, { useEffect, useState } from 'react';
import './App.css';
import Axios  from 'axios';

function App() {
  const [listMovies, setListMovies] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [newReview, setNewReview] = useState('');


  //API Request:

  //GET:
  useEffect(() => {
    Axios.get('http://localhost:3000/view')
    .then((res) => setListMovies(res.data))
  }, [])


  //POST:
  //Submit Review:
  const submitReview = () => {
    Axios.post('http://localhost:3000/insert' , {
      movieName: movieName,
      movieReview: review,
    })

    setListMovies(
      [...listMovies,
        {
          movieName: movieName,
          movieReview: review,
        }
      ]
    )

    // setMovieName( " ");
    // setReview(" ");
  }

  //PUT (By Name):
  // const updateReview = () => {
  //   Axios.put('http://localhost:3000/update', {
  //     movieName: movieName,
  //     movieReview: newReview,
  //   })
  //   setNewReview(" "); //to clear the field when click button update.
  // }

  //PUT:
  const updateReview = (id) => {
    Axios.put(`http://localhost:3000/update/${id}` , {
      movieReview: newReview,
    })
    setNewReview(" "); //to clear the field when click button update.
  };


  // //DELETE (By Name):
  // const deleteReview = (movieName) => {
  //   Axios.delete(`http://localhost:3000/remove/${movieName}`)
  // };

  //DELETE:
  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3000/remove/${id}`)
  };





  return (
    <div className="App">
      <h1>CRUD Application</h1>

      <div className='form'>
        <label>Movie Name:</label>
        <input  
          type='text' 
          name='movieName' 
          onChange={(e) => setMovieName(e.target.value)}
          />
        <label>Review:</label>
        <input 
          type='text' 
          name='review' 
          onChange={(e) => setReview(e.target.value)}
          />
      </div>  
      <button onClick={submitReview}>Submit</button>  

      <div className='list'>
        {listMovies.map((movie, index) => {
          return ( 
            <div className='card' key={index}>

              <h1>{movie.movieName}</h1>
              <p>{movie.movieReview}</p>

              <button 
                onClick={() => {deleteReview(movie.id)}} //delete by id
                >
                  Delete
              </button>   {/*delete specific movie name when click the button */}
              <input 
                type='text' 
                id='update-input' 
                onChange={(e) => setNewReview(e.target.value)}
              />
              <button 
                onClick={() => {updateReview(movie.id)}} //delete by id
              >
                  Update
              </button> 
            </div>
            )
          })}
      </div>
    </div>
  );
}

export default App;
