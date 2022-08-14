import React from 'react';
import { useEffect, useState,  } from 'react';
import Header from '../../components/header/Header';
import img1 from '../../assets/carousel-img/1.avif';
import img2 from '../../assets/carousel-img/2.png';
import img3 from '../../assets/carousel-img/3.avif';
import img4 from '../../assets/carousel-img/4.avif';
import ImageCarousel from '../../components/image-carousel/ImageCarousel';
import Footer from '../../components/footer/Footer';
import './home.css';
import { getAllMovies } from '../../api/movies';
import Loader from '../../components/loader/Loader';
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [allMovies, setAllMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(true);
        getAllMovies()
        .then(res =>{
            const {data, status} = res;
            if(status === 200){
                // console.log(data);
                setMovies(data);
                setAllMovies(data);
                setLoading(false);

            }
        })
        .catch(err =>{
            console.log(err);
            setLoading(false);

        })
    },[]);

    const filtermoviesBySearch = searchText =>{
        const filteredMovies = allMovies.filter(movie => {
            return movie.name.toLowerCase().includes(searchText.toLowerCase());
        });
        setMovies(filteredMovies);
    }

    const handleGoToDetailPage = (movieId) => {
        navigate(`/movie-detail/${movieId}`);
    }

    return (
        <div>
            
            <Header filtermoviesBySearch ={filtermoviesBySearch}/>

            <ImageCarousel  images={[img1, img2, img3, img4 ]}/>

            <div className='body--container'>
                <div className='container  main-section'>
                    {isLoading ?<Loader/> :
                    
                    <div className='row'>
                        {movies.map(movie => {
                            return(
                                <div className='col-lg-3 col-md-4 col-sm-6 movie-title' onClick={ () => handleGoToDetailPage(movie._id)}>
                                    <img
                                        src={movie.posterUrl}
                                        alt='poster'
                                        className='image-title'
                                    />
                                    <h3>{movie.name}</h3>
                                </div>
                            );
                        })}
                    </div>
                    }
                </div>
            </div>

            <Footer/>
        </div>
    )
}


export default Home;
