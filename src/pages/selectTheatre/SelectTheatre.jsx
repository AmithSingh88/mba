import  {React,useState, useEffect} from 'react';
import  {useParams, Link} from "react-router-dom";
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { getMovieDetail } from '../../api/movies';
import './SelectTheatre.css';
import { getAllTheatres } from '../../api/theatres';
import { getThearesForCurrentMovie } from '../../utils/getTheatres';

function SelectTheatre() {

    const params = useParams();
    const [movieDetail, setMovieDetail] = useState({});
    const [currentMovieTheatres, setCurrentMovieTheatres] = useState([]);
    const {movieName,movieId} = params;

    useEffect(()=>{
        fetchMovieDetail(movieId);
        fetchAllTheatres();
    },[])

    const fetchMovieDetail = movieId => {
        getMovieDetail(movieId)
        .then(res => {
            const{data, status} =res;
            if(status === 200){
                // console.log(data);
                setMovieDetail(data)
            }
        })
        .catch(err => {
            console.log(err.message);
        });
    }

    const fetchAllTheatres = () => {
        getAllTheatres().then(res => {
                const {data, status} =res ;
                if(status === 200){
                    console.log(data);
                    //call a function which will filter out theatres for current movie
                    //out of all theatres
                    const filteredTheatres = getThearesForCurrentMovie (data, movieId);
                    setCurrentMovieTheatres(filteredTheatres);
                
                }
            })
    }


const {trailerUrl = "",
posterUrl="",
name ="",
description="",
director="",
releaseDate="",
language,
casts=[],
_id = "",
releaseStatus,
} = movieDetail;

  return (
    <div>
        <Header/>
        <div className='select-main p-5'>
        <h1>{movieName}</h1>
        <div className='d-flex justify-content-center align-items-center'>
            <div className="movieTag description" >{description}</div>
            <div className="movieTag language" >{language}</div>
            <div className="movieTag releaseStatus" >{releaseStatus}</div>
        </div>
        <hr/>
        <div>
            <h2>Director : {director}</h2>
            <h2>Release Date : {releaseDate}</h2>
        </div>

        <div className='theatre-detail bg-light p-5 my-5'>
            <h2>Select Theatre</h2>
            <hr/>
            <Link to={`/movie/${movieId}/${_id}`} className="theatre-list container my-5  p-5">
                {currentMovieTheatres.map(theatre => {
                    const {name, _id} = theatre;

                    return(
                        <div className="theatre-item row p-3 ">
                            <h4 className="text col-sm-4">{name}</h4>
                            <h4 className="text col-sm-4  text-danger">m-Ticket</h4>
                            <h4 className="text col-sm-4  text-success">Food & Beverages</h4>
                        </div>
                    )
                
                })}
            </Link>

        </div>
        </div>
        <Footer/>
    </div>

  )
}

export default SelectTheatre;