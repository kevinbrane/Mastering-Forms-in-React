import React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import  { useState } from 'react';
import '../Styles/Form.css';

const Form = () => {

    const initialFormValues = {
        firstName: '',
        lastName: '',
        age: '',
        employed: false,
        favoriteColor: '',
        sauces: [],
        bestStooge: '',
        notes: '',
    }

    const { register, handleSubmit, reset, formState: {isDirty, dirtyFields} } = useForm();
    const [formData, setFormData] = useState(initialFormValues);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const isFormModified = Object.keys(dirtyFields).some(
        field => formData[field] !== initialFormValues[field]
    );

    const onSubmit = (data) => {
    console.log(data);
    setFormData(data);
    setFormSubmitted(true);
    }
    
    const handleReset = () => {
        reset(initialFormValues);
        setFormData(initialFormValues);
        setFormSubmitted(true); // reset formSubmitted state to false
    }

    return (
        <>
            <div className='form-container'>
                <div className='sub-form-container'>
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
                            <input type="text" placeholder='Age' {...register('age')}/>
                        </div>
                        <div>
                            <label htmlFor="">Employed</label>
                            <input type="checkbox" {...register('employed')} />
                        </div>
                        <div>
                            <label htmlFor="">Favorite Color</label>
                            <select name="" id="">
                                <option value="" {...register('favoriteColor')}></option>
                                <option value="black" {...register('favoriteColor')}>Black</option>
                                <option value="red" {...register('favoriteColor')}>Red</option>
                                <option value="white" {...register('favoriteColor')}>White</option>
                                <option value="green" {...register('favoriteColor')}>Green</option>
                                <option value="gray" {...register('favoriteColor')}>Gray</option>
                            </select>
                        </div>
                        <div className='sauces-container'>
                            <label htmlFor="" className='sauces1'>Sauces</label>
                            <div className='sauces-sub-container'>
                                <div className='sauces'>
                                    <input type="checkbox" value='ketchup' {...register('sauces')}/>
                                    <label htmlFor="">Ketchup</label>
                                </div>
                                <div className='sauces'>
                                    <input type="checkbox" value='mustard' {...register('sauces')}/>
                                    <label htmlFor="">Mustard</label>
                                </div>
                                <div className='sauces'>
                                    <input type="checkbox" value='mayonaisse' {...register('sauces')}/>
                                    <label htmlFor="">Mayonnaise</label>
                                </div>
                                <div className='sauces'>
                                    <input type="checkbox" value='guacamole' {...register('sauces')}/>
                                    <label htmlFor="">Guacamole</label>
                                </div>
                            </div>
                        </div>
                        <div className='bestStooge-container'>
                            <label htmlFor="">Best Stooge</label>
                            <div className='bestStooge-sub-container'>
                                <div className='stooge'>
                                    <input type="radio" value='larry' {...register('bestStooge')} />
                                    <label htmlFor="">Larry</label>
                                </div>
                                <div className='stooge'>
                                    <input type="radio" value='moe' {...register('bestStooge')} />
                                    <label htmlFor="">Moe</label>
                                </div>
                                <div className='stooge'>
                                    <input type="radio" value='curly'{...register('bestStooge')} />
                                    <label htmlFor="">Curly</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Notes</label>
                            <textarea name="" id="" cols="30" rows="10" placeholder='Notes' className='notes' {...register('textArea')}></textarea>
                        </div>
                        <div className='buttons-container'>
                            <button type="submit" className='submit-button'  disabled={!isDirty}>Submit</button>
                            <button type='reset' className='reset-button' onClick={handleReset}  disabled={!isDirty}>Reset</button>
                        </div>
                    </form>
                </div>
                <div className='object-container'>
                    <pre>
                        {JSON.stringify(formData, null, 2) === JSON.stringify(initialFormValues, null, 2) ? '' : JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
            </div>
        </>
    );
}

export default Form;
