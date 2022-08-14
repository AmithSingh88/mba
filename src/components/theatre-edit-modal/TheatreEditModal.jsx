import React from 'react';
import {Modal} from 'react-bootstrap';


const TheatreEditModal = (props) => {
    const{
        selectedTheatre,
        setErrorMessage,
        showEditModal,
        setShowEditModal,
        handleEditTheatreSubmit,
        errorMessage,
        handleTicketsChange,
    } = props
  return (
    <Modal
    show ={ showEditModal}
    onHide={() => {
        setErrorMessage(false);
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
            <form onSubmit={handleEditTheatreSubmit}>
            <div>
                <h4>Theatre Id :{selectedTheatre._id}</h4>
            </div>
            <hr/>
            <div className='form-control'>
                <label>
                    Theatre Name:
                    <input type ="text"
                    name='name'
                     value={selectedTheatre.name}
                     onChange={handleTicketsChange}
                     className='form-control m-1'/>
                </label>
            </div>
            <div>
                <label>
                    City:
                    <input type ="text" 
                    name  ='city'
                    onChange={handleTicketsChange}
                    value={selectedTheatre.city}
                    className='form-control m-1'/>
                </label>
            </div>
            <div>
                <label>
                    Pincode:
                    <input type ="text"
                        name='pinCode'
                    value={selectedTheatre.pinCode}
                    onChange={handleTicketsChange}
                    className='form-control m-1'/>
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <textarea
                    name='description'
                    onChange={handleTicketsChange}
                    className='form-control m-1'>
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
  )
}

export default TheatreEditModal
