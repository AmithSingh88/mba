import React from 'react';
import { useState, useEffect } from 'react';
import {useParams, Link} from 'react-router-dom';
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
  
  const {trailerUrl = "",
          posterUrl="",
          name ="",
          description="",
          director="",
          releaseDate="",
          casts=[],
          _id = "",
          releaseStatus,
        } = movieDetail;

  const buttonText =
        releaseStatus === "RELEASED" ? "BOOK TICKETS" : "COMIN SOON";
  

  const buttonUrl = 
        releaseStatus === "RELEASED" ? `/buyTickets/${name}/${_id}`: "#"; 



  return (
    <div  className='movie-detail'>
        <Header/>
              <div className="videoPlayer  d-flex justify-content-center">
                  <ReactPlayer
                    url={trailerUrl}
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
                          src={posterUrl}
                          className='movie-poster'
                          alt='movie-poster'
                          width= '45%'
                        />
                    </div>
                    <div className="col">
                        <h2>{name}</h2>
                        <hr/>
                        <h2>{description}</h2>
                        <h2>Release Date : {releaseDate}</h2>
                        <h2>Director : {director}</h2>
                        <hr/>
                        <h2>Cast :</h2>{casts.map(cast => {
                            return<h4>{cast}</h4>
                        })}

                        <hr/>

                        <Link 
                          className='btn btn-danger'
                          to={buttonUrl}>
                              {buttonText}
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
             
        <Footer />
    </div>
  )
} 

export default MovieDetail;