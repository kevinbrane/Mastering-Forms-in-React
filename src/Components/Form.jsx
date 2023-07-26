import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '../Styles/Form.css';
import DataObject from './DataObject';

const Form = () => {
    const isInvalidCharacter = (value) => {
        const regex = /[!@#$%^&*()_+={}ç|[\]\\:';"<>?,./~]/;
        return regex.test(value);
    };

    const initialFormValues = {
        firstName: '',
        lastName: '',
        age: '',
        employed: false,
        favoriteColor: '',
        sauces: '',
        bestStooge: 'Larry',
        notes: '',
    }

    const { register, handleSubmit, reset, formState: {isDirty}, watch } = useForm({
        defaultValues: initialFormValues,
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isReset, setIsReset] = useState(false);

    const watchAllFields = watch();

    const onSubmit = (data) => {
        setFormSubmitted(true);
        setIsReset(false);
    }

    const handleReset = () => {
        reset(initialFormValues);
        setIsReset(true);
        setFormSubmitted(false);
    }

    let formDataDisplay = Object.entries(watchAllFields)
    .filter(([key, value]) => value !== '' && value !== [] && value !== null)
    .reduce((newObj, [key, value]) => {
        newObj[key] = value;
        return newObj;
    }, {});

    useEffect(() => {
        if(formSubmitted && !isReset) {
            alert(JSON.stringify(formDataDisplay, null, 2));
            setFormSubmitted(false);
        }
    }, [formSubmitted, isReset, formDataDisplay]);

    
    return (
        <>
            <div className='form-container'>
                <div className='sub-form-container'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="">First Name</label>
                            <input type="text" placeholder='First Name' pattern='[A-Za-z\s]*' className={isInvalidCharacter(watchAllFields.firstName) ? "invalid-input" : ""} {...register('firstName')} />
                        </div>
                        <div>
                            <label htmlFor="">Last Name</label>
                            <input type="text" placeholder='Last Name' pattern='[A-Za-z\s]*' className={isInvalidCharacter(watchAllFields.lastName) ? "invalid-input" : ""} {...register('lastName')} />
                        </div>
                        <div>
                            <label htmlFor="">Age</label>
                            <input type="number" placeholder='Age' min="0" {...register('age')}/>
                        </div>
                        <div>
                            <label htmlFor="">Employed</label>
                            <input type="checkbox" {...register('employed')} />
                        </div>
                        <div>
                            <label htmlFor="">Favorite Color</label>
                            <select name="" id="" {...register('favoriteColor')}>
                                <option value=""></option>
                                <option value="#000000" >Black</option>
                                <option value="#FF2D00" >Red</option>
                                <option value="#FFFFFF" >White</option>
                                <option value="#00ff00" >Green</option>
                                <option value="#959595" >Gray</option>
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
                                    <input type="radio" value='larry' {...register('bestStooge')} defaultChecked />
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
                            <textarea name="" id="" cols="30" rows="10" placeholder='Notes' className='notes' maxLength="100" {...register('notes')}></textarea>
                        </div>
                        <div className='buttons-container'>
                            <button type="submit" className='submit-button' disabled={!isDirty}>Submit</button>
                            <button type='reset' className='reset-button' onClick={handleReset} disabled={!isDirty}>Reset</button>
                        </div>
                    </form>
                </div>
                <DataObject formDataDisplay={{...initialFormValues, ...formDataDisplay}} />
            </div>
        </>
    );
}

export default Form;
