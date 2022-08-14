import React, { useEffect, useState } from 'react'

import MaterialTable from '@material-table/core';
import  Delete  from '@material-ui/icons/Delete';
import  Edit  from '@material-ui/icons/Edit';
// import  Add from '@material-ui/icons/Add';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { getAllMovies,getMovieDetails, removeMovie } from '../../api/movies';
import { Modal } from 'react-bootstrap';

const MoviesList= () =>{
  const [moviesList, setMoviesList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [showMovieEditModal, setShowMovieEditModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(()=>{
    fetchMovies()
;  },[]);

  const fetchMovies = () => {
    getAllMovies()
    .then(res => {
      const{status, data, message} = res;
      if(status === 200){
        console.log({movies: data});
        setMoviesList(data);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  const editMovie = (rowData) => {
      setSelectedMovie({...rowData});
      setShowMovieEditModal(true);
  };


  const handleEditMovie = (e) => {
    e.preventDefault();
    const tempMovie = { ...selectedMovie}

    if(e.target.name ===  'name'){
        tempMovie.name = e.target.value;
    }else if(e.target.releaseDate === 'releaseDate'){
        tempMovie.releaseDate = e.target.value;
    }else if(e.target.description === 'description'){
        tempMovie.description = e.target.value;
    }else if(e.target.director === 'director'){
        tempMovie.director = e.target.value;
    }else if(e.target.releaseStatus === 'releaseStatus'){
        tempMovie.releaseStatus = e.target.value;
    }

  }

  const handleEditMovieSubmit = (e) => {
    getMovieDetails(selectedMovie._id, selectedMovie)
      .then(res => {
        const {data, status} = res;


        if(status === 200){
          setErrorMessage('');
          setSelectedMovie({});
          fetchMovies();
          setShowMovieEditModal(false);
        }
      })
      .catch(err => {
        setErrorMessage(err.message);
      });
    e.preventDefault();
  };
  
  const deleteMovie = (rowData) => {
      console.log(rowData );
      const movieId = rowData._id;
      removeMovie(movieId)
      .then(res =>{
        console.log(res);
        if (res.status === 200){
          fetchMovies();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className='my-5'>
        <MaterialTable 
         data={moviesList }
         title = 'MOVIES LIST'
         columns ={[
             {
                 title:"Movie Name",
                 field:"name",
             },
             {
                 title:"Release date",
                 field:"releaseDate",
             },
             {
                 title:"Description",
                 field:"description",
             },
             {
                 title:"Director",
                 field:"director",
             },
             {
                 title:"Release status",
                 field:"releaseStatus",
             },
             
         ]}
         actions = {[
             {
                 icon:Edit,
                 tooltip:'Edit Movie',
                 onClick: (event, rowData) => editMovie(rowData),
             },
/*              {
                 icon:Delete,
                 tooltip:'Delete Movie',
                 onClick: (event, rowData) =>deleteMovie(rowData),
             } */
         ]}
         options={{
             actionsColumnIndex:-1,
             sorting: true,
             filtering: true,
             exportMenu:[  {
                     label:'Export PDF',
                     exportFunc:(cols, datas)=>
                     ExportPdf(cols, datas, "Movies records"),
                 },
                   {
                     label:'Export CSV',
                     exportFunc:(cols, datas)=>
                     ExportCsv(cols, datas, "Movies re  cords"),
                 },
             ],
             headerStyle:{
                 backgroundColor:'#202429',
                 color:'#fff',
             },
             rowSStyle:{
                 backgroundColor:'#EEE',
             },

         }}

         
        />
        {showMovieEditModal && 
        (<Modal
          show ={ showMovieEditModal}
          onHide={() => {
              setErrorMessage(false);
              setShowMovieEditModal(false); 
          }}
          backdrop={false}
          centered>
          <Modal.Header closeButton>
              <Modal.Title>
                  EDIT MOVIE DETAILS
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4>
                Theatre Id: {selectedMovie._id}
              </h4>
              <hr/>
              <form onSubmit = {handleEditMovieSubmit}
                    className='my-2 p-2'>
                <div className="input-group  p-2">
                  <label>Movie name:
                    <input type='text'
                           name='name'
                           value={selectedMovie.name}
                           onChange={handleEditMovie}
                    />
                  </label>
                </div>
                <div className="input-group">
                  <label>Release Date:
                    <input type='text'
                           name='releaseDate'
                           value={selectedMovie.releaseDate}
                           onChange={handleEditMovie}
                    />
                  </label>
                </div>
                <div className="input-group">
                  <label>Description:
                    <input type='text'
                           name='description'
                           value={selectedMovie.description}
                           onChange={handleEditMovie}
                           
                    />
                  </label>
                </div>
                <div className="input-group">
                  <label>Director:
                    <input type='text'
                           name='director'
                           value={selectedMovie.director}
                           onChange={handleEditMovie}
                    />
                  </label>
                </div>
                <div className="input-group">
                  <label>Release Status:
                    <input type='text'
                           name='releaseStatus'
                           value={selectedMovie.releaseStatus}
                           onChange={handleEditMovie}
                    />
                  </label>
                </div>
                <div className='input-group '>
                  <div>

                    <button type='button' className='m-2 btn btn-secondary' 
                            onClick={()=>setShowMovieEditModal(false)}>
                        Cancel
                    </button>
                  </div>
                <div>
                    <button type='submit' className='m-2 btn btn-primary'>
                        Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>

         </Modal>)}
    </div>
  )
}

export default MoviesList;