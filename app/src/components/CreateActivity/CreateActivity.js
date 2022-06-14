import React from 'react';
import PropTypes from 'prop-types';
import './createActivity.scss';
import axios from 'axios';

function CreateActivity({
    ...rest
}){
    const [activity, setActivity] = React.useState({
        name:"",
        level:"",
        date:"",
        tag: "",
        address:"",
        zip_code:"",
        city:"",
        country:"",
        description:""
    });

    const handleChange = e =>{
        const { name, value } = e.target;
        setActivity(previousActivity => ({
            ...previousActivity,
            [name]: value
        }));
        console.log(activity)
    };

    const handleSubmit = (event) =>{
        axios({
            method:'post',
            url:'https://api.totum.ovh/v1/activity/createNew',
            data:{activity}
        })
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        })

        console.log(`new activity object${activity}`)
        event.preventDefault();
    }


   return (
       <form
           className={'createActivity'}
           {...rest}
           onSubmit={handleSubmit}
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
                    <input 
                    className='input' 
                    type='text' 
                    placeholder='intitulé'
                    name='name' 
                    value={activity.name} 
                    onChange={handleChange}
                    />
                </div>
            </div>
            <div className='field'>
                <label className='label'>Adresse</label>
                <div className='control'>
                    <input 
                    className='input' 
                    type='text' 
                    placeholder='addresse'
                    name='address'
                    value={activity.address}
                    onChange={handleChange}
                    />
                </div>
            
                <label className='label'>Ville</label>
                <div className='control'>
                    <input 
                    className='input' 
                    type='text' 
                    placeholder='ville' 
                    name='city'
                    value={activity.city}
                    onChange={handleChange}
                    />
                </div>
        
                <label className='label'>Code Postal</label>
                <div className='control'>
                    <input 
                    className='input' 
                    type='text' 
                    placeholder='code postal'
                    name='zip_code'
                    value={activity.zip_code}
                    onChange={handleChange}
                     />
                </div>
            </div>
            {/*<div className='field is-grouped'>
                <label className='label'>Nombre de participants</label>
                <div className='control'>
                    <input 
                    className='input' 
                    type='text' 
                    placeholder='Nombre de participants'
                    />
                </div>
                <label className='label'>Invités</label>
                <div className='control'>
                    <input 
                    className='input' 
                    type='text'
                    />
                </div>
        </div>*/}
            <div className='field'>
                <label className='label'>Date</label>
                {/*Find a calendar module */}
                <div className='control'>
                    <input 
                    className='input' 
                    type='text' 
                    name='date'
                    value={activity.date}
                    onChange={handleChange} 
                    />
                </div>
            </div>
            <div className='field'>
                {/*might be a select and give options according to ux */}
                <label className='label'>Niveau</label>
                <div className='control'>
                    <input 
                    className='input' 
                    type='text' 
                    name='level'
                    value={activity.level}
                    onChange={handleChange} 
                    />
                </div>
            </div>
            <div className='field'>
                <label className='label'>Description</label>
                <div className='control'>
                    <textarea 
                    className='textarea' 
                    type='text' 
                    name='description'
                    placeholder='Description' 
                    value={activity.description}
                    onChange={handleChange} 
                    />
                </div>
            </div>
            <div className='field is-grouped'>
                <p className='control'>
                    {/*redirect to the activity page */}
                    <button 
                    className='button is-primary'
                    type='submit'
                    >
                    Submit
                    </button>
                </p>
                <p className='control'>
                    {/*redirect to root */}
                    <button 
                    className='button is-light'
                    >
                    Cancel
                    </button>
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
