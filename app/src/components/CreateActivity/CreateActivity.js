import React from 'react';
import PropTypes from 'prop-types';
import './createActivity.scss';

function CreateActivity({...rest}){
   return (
       <form
           className={'createActivity'}
           {...rest}
       >
           {/**
            * input activité
            * input lieu
            * input nbre participants
            * input nbre invités
            * input date
            * input niveau
            * textarea description
            */}
            <div className='field'>
                <label className='label'>Activité</label>
                <div className='control'>
                    <input className='input' type='text' placeholder='intitulé'/>
                </div>
            </div>
            <div className='field'>
                <label className='label'>Adresse</label>
                <div className='control'>
                    <input className='input' type='text' placeholder='addresse'/>
                </div>
            
                <label className='label'>Ville</label>
                <div className='control'>
                    <input className='input' type='text' placeholder='ville'/>
                </div>
        
                <label className='label'>Code Postal</label>
                <div className='control'>
                    <input className='input' type='text' placeholder='code postal'/>
                </div>
            </div>
            <div className='field is-grouped'>
                <label className='label'>Nombre de participants</label>
                <div className='control'>
                    <input className='input' type='text' placeholder='Nombre de participants'/>
                </div>
                <label className='label'>Invités</label>
                <div className='control'>
                    <input className='input' type='text'/>
                </div>
            </div>
            <div className='field'>
                <label className='label'>Date</label>
                <div className='control'>
                    <input className='input' type='text'/>
                </div>
            </div>
            <div className='field'>
                <label className='label'>Niveau</label>
                <div className='control'>
                    <input className='input' type='text'/>
                </div>
            </div>
            <div className='field'>
                <label className='label'>Description</label>
                <div className='control'>
                    <textarea className='textarea' type='text' placeholder='Description'/>
                </div>
            </div>
            <div className='field is-grouped'>
                <p className='control'>
                    <button className='button is-primary'>Submit</button>
                </p>
                <p className='control'>
                    <button className='button is-light'>Cancel</button>
                </p>
            </div>

       </form>
   );
};

CreateActivity.propTypes = {
    className: PropTypes.string,
};
CreateActivity.defaultProps = {
    className: '',
};
export default CreateActivity;
