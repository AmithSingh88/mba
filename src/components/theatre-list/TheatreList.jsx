import React, { useEffect, useState } from 'react'
import { getAllTheatres, updateTheatre } from '../../api/theatres';
import MaterialTable from '@material-table/core';
import  Delete  from '@material-ui/icons/Delete';
import  Edit  from '@material-ui/icons/Edit';
// import  Add from '@material-ui/icons/Add';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
// import { warning } from 'react-router/lib/router';
import {Modal} from 'react-bootstrap';


const TheatreList = () => {

    const [theatreList, setTheatreList] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTheatre, setSelectedTheatre] = useState({});
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(()=>{
            fetchTheatres();
        // api call to feetch theatre list
        //on success of data , set it to state -- setTheatreList
    },[]);

    const fetchTheatres = () =>{
        getAllTheatres()
        .then(res => {
            const {data, status, message} =res;
            if(status === 200){
                console.log(data);
                setTheatreList(data);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    const deleteTheatre = rowData =>{
            // const{_id:theatreId} = rowData;
            const theatreId = rowData._id;

            const theatreListUpdated = theatreList.filter( theatre => {
                const {_id} = theatre;
                return _id !== theatreId;
            })
            setTheatreList(theatreListUpdated);
    }
    const editTheater  = rowData =>{
         setSelectedTheatre({...rowData});
         setShowEditModal(true);
    }

    const handleTicketsChange = (e) =>{
        const tempTheatre = { ...selectedTheatre}

        if(e.target.name ===  'name'){
            tempTheatre.name = e.target.value;
        }else if(e.target.city === 'city'){
            tempTheatre.city = e.target.value;
        }else if(e.target.pinCode === 'pinCode'){
            tempTheatre.pinCode = e.target.value;
        }else if(e.target.description === 'description'){
            tempTheatre.description = e.target.value;
        }

        setSelectedTheatre(tempTheatre);
    }

    const handleEditTheatreSubmit =(e) =>
    {
        e.preventDefault()
        const id=  selectedTheatre._id;
            try{     
                updateTheatre(id, selectedTheatre)
                .then(res =>{
                    const{status , message} = res;
                    if(status === 200){
                        setSelectedTheatre({});
                        setShowEditModal(false);
                        fetchTheatres();
                    }else if(message){
                        setErrorMessage(message);
                    }
                })
                .catch(err => {
                    setErrorMessage(err.message);
                });}
                //api call to saave the data
                //send id and the theatre data
                //
            catch(err){
                setErrorMessage(err.message);
            }
       };
  //return Material table with all data in the list theatreList
  return (
    <div>
        <MaterialTable
         data={theatreList }
            title = 'THEATERS LIST'
            columns ={[
                {
                    title:"Theatre Name",
                    field:"name",
                },
                {
                    title:"Theatre ID",
                    field:"_id",
                },
                {
                    title:"Description",
                    field:"description",
                },
                {
                    title:"PinCode",
                    field:"pinCode",
                },
                {
                    title:"City",
                    field:"city",
                },
                
            ]}
            actions = {[
                {
                    icon:Edit,
                    tooltip:'Edit Theatre',
                    onClick: (event, rowData) => editTheater(rowData),
                },
                {
                    icon:Delete,
                    tooltip:'Delete Theatre',
                    onClick: (event, rowData) =>deleteTheatre(rowData),
                }
            ]}
            options={{
                actionsColumnIndex:-1,
                sorting: true,
                filtering: true,
                exportMenu:[  {
                        label:'Export PDF',
                        exportFunc:(cols, datas)=>
                        ExportPdf(cols, datas, "TheaterReacorss"),
                    },
                      {
                        label:'Export CSV',
                        exportFunc:(cols, datas)=>
                        ExportCsv(cols, datas, "TheaterReacorss"),
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

       {showEditModal && 
        <Modal
            show ={ showEditModal}
            onHide={() => {
                setShowEditModal(false);
            }}
            backdrop={false}
            centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        EDIT THEATRE
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleEditTheatreSubmit}>                    <div>
                        <h4>Theatre Id :{selectedTheatre._id}</h4>
                    </div>
                    <hr/>
                    <div>
                        <label>
                            Theatre Name:
                            <input type ="text"
                            name='name'
                             value={selectedTheatre.name}
                             onChange={handleTicketsChange}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            City:
                            <input type ="text" 
                            name  ='city'
                            onChange={handleTicketsChange}
                            value={selectedTheatre.city}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Pincode:
                            <input type ="text"
                                name='pinCode'
                            value={selectedTheatre.pinCode}
                            onChange={handleTicketsChange}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Description:
                            <textarea
                            name='description'
                            onChange={handleTicketsChange}>
                            
                           {selectedTheatre.description}
                            </textarea>
                        </label>
                    </div>
                    <div>
                        <button type='button' className='btn btn-secondary' 
                                onClick={()=>setShowEditModal(false)}>
                            Cancel
                        </button>
                    </div>
                    <div>
                        <button type='submit' className='btn btn-primary'>
                            Update
                        </button>
                    </div>
                    </form>

                    {errorMessage && (
                        <div className=' text-danger'>{errorMessage}</div>
                    )}
                </Modal.Body>
        </Modal>

            
       }
    </div>
  )
}

export default TheatreList;