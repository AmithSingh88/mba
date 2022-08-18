import React from 'react';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { getMovieDetail } from '../../api/movies';
import ReactPlayer from 'react-player';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './movieDetail.css'

const MovieDetail = () => {
  const params = useParams();
  const {movieId} = params;
  const [movieDetail, setMovieDetail] = useState({});

  console.log(movieId);

  useEffect(()=>{
    fetchMovieDetail(movieId);
  },[]);

  const fetchMovieDetail = (movieId)=>{
      getMovieDetail(movieId)
        .then(res => {
          const {data, status} = res;
            if(status === 200){
                console.log(data);
                setMovieDetail(data);
            }
        })
        .catch(err => {
          console.log(err.message);
        });
  };
  
  
  return (
    <div  className='movie-detail'>
        <Header/>
              <div className="videoPlayer  d-flex justify-content-center">
                  <ReactPlayer
                    url={"https://youtu.be/AgS_6UbQ8JM"}
                    controls
                    className='videop'
                    width='70%'
                    height='450px'
                  />
              </div>


              <div>
                <div className=" container movie-data m-5">
                  <div className="row">
                    <div className="col">
                        <img
                          src='https://images.news18.com/ibnlive/uploads/2022/06/anuritta-jha-1.jpg'
                          className='movie-poster'
                          alt='movie-poster'
                          width= '50%'
                        />
                    </div>
                    <div className="col">
                        <h2>Brahmastra</h2>
                        <h2>Lorem ipsum dolor sit.</h2>
                        <h2>Release Date</h2>
                    </div>
                  </div>
                </div>
              </div>
  

        <Footer />
    </div>
  )
} 

export default MovieDetail;