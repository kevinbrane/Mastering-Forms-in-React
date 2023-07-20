import React from 'react';
import { useForm } from 'react-hook-form';
import  { useState } from 'react';
import '../Styles/Form.css';

const Form = () => {

    const { register, handleSubmit } = useForm();
    const [formData,setFormData] = useState();
    const [resetFormData,setResetFormData] = useState();

    const onSubmit = (data) => {
    console.log(data);
    setFormData(data);
    }
    
    const onReset = (data) => {
    console.log(data);
    setResetFormData(data);
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="">First Name</label>
                    <input type="text" placeholder='First Name' {...register('firstName')} />
                </div>
                <div>
                    <label htmlFor="">Last Name</label>
                    <input type="text" placeholder='Last Name' {...register('lastName')} />
                </div>
                <div>
                    <label htmlFor="">Age</label>
                    <input type="text" placeholder='Age' {...register('Age')}/>
                </div>
                <div>
                    <label htmlFor="">Employed</label>
                    <input type="checkbox" {...register('employed')} />
                </div>
                <div>
                    <label htmlFor="">Favorite Color</label>
                    <select name="" id="">
                        <option value="">Black</option>
                        <option value="">Red</option>
                        <option value="">White</option>
                        <option value="">Green</option>
                        <option value="">Gray</option>
                    </select>
                </div>
                <div className='sauces-container'>
                    <label htmlFor="" className='sauces1'>Sauces</label>
                    <div className='sauces'>
                        <div>
                            <input type="checkbox" value='ketchup' {...register('sauce')}/>
                            <label htmlFor="">Ketchup</label>
                        </div>
                        <div>
                            <input type="checkbox" value='mustard' {...register('sauce')}/>
                            <label htmlFor="">Mustard</label>
                        </div>
                        <div>
                            <input type="checkbox" value='mayonaisse' {...register('sauce')}/>
                            <label htmlFor="">Mayonnaise</label>
                        </div>
                        <div>
                            <input type="checkbox" value='guacamole' {...register('sauce')}/>
                            <label htmlFor="">Guacamole</label>
                        </div>
                    </div>

                </div>
                <div>
                    <label htmlFor="">Best Stooge</label>
                    <div>
                        <input type="radio" {...register('bestStooge')} />
                        <label htmlFor="">Larry</label>
                        <input type="radio" {...register('bestStooge')} />
                        <label htmlFor="">Moe</label>
                        <input type="radio" {...register('bestStooge')} />
                        <label htmlFor="">Curly</label>
                    </div>
                </div>
                <div>
                    <label htmlFor="">Notes</label>
                    <textarea name="" id="" cols="30" rows="10" placeholder='Notes' className='notes' {...register('textArea')}></textarea>
                </div>
                <div className='buttons-container'>
                    <button type="submit" className='submit-button'>Submit</button>
                    <button type='reset' className='reset-button'>Reset</button>
                </div>
                <div className='object-container'>
                    <pre>
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
            </form>
        </div>
    );
}

export default Form;
