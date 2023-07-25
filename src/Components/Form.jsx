import React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import  { useState, useEffect } from 'react';
import '../Styles/Form.css';

const Form = () => {

    const isInvalidCharacter = (value) => {
        const regex = /[!@#$%^&*()_+={}|[\]\\:';"<>?,./~]/;
        return regex.test(value);
    };

    const initialFormValues = {
        firstName: '',
        lastName: '',
        age: '',
        employed: false,
        favoriteColor: '',
        sauces: '',
        bestStooge: '',
        notes: '',
    }

    const { register, handleSubmit, reset, formState: {isDirty, dirtyFields} } = useForm();
    const [formData, setFormData] = useState(initialFormValues);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isReset, setIsReset] = useState(false);

    const isFormModified = Object.keys(dirtyFields).some(
        field => formData[field] !== initialFormValues[field]
    );

    const onSubmit = (data) => {
        console.log(data);
        setFormData(data);
        setIsReset(false); // Indica que no es un reinicio
        setFormSubmitted(true);
    }
    
    const handleReset = () => {
        reset(initialFormValues);
        setFormData(initialFormValues);
        setIsReset(true); // Indica que es un reinicio
        setFormSubmitted(false); // Se vuelve a establecer formSubmitted a false
    }

    let formDataDisplay = Object.entries(formData)
    .filter(([key, value]) => value !== '' && value !== [] && value !== false && value !== null)
    .reduce((newObj, [key, value]) => {
        newObj[key] = value;
        return newObj;
    }, {});

    useEffect(() => {
        if (formSubmitted && !isReset) { // Muestra alerta solo en el envío, no en el reinicio
            alert(Object.keys(formDataDisplay).length === 0 ? '' : JSON.stringify(formDataDisplay, null, 2));
            setFormSubmitted(false); // Se vuelve a establecer formSubmitted a false
        }
    }, [formData, formSubmitted, isReset]);

    return (
        <>
            <div className='form-container'>
                <div className='sub-form-container'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="">First Name</label>
                            <input type="text" placeholder='First Name' pattern='[A-Za-z\s]*' className={isInvalidCharacter(formData.firstName) ? "invalid-input" : ""} {...register('firstName')} />
                        </div>
                        <div>
                            <label htmlFor="">Last Name</label>
                            <input type="text" placeholder='Last Name' pattern='[A-Za-z\s]*' className={isInvalidCharacter(formData.lastName) ? "invalid-input" : ""} {...register('lastName')} />
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
                                <option value="black" >Black</option>
                                <option value="red" >Red</option>
                                <option value="white" >White</option>
                                <option value="green" >Green</option>
                                <option value="gray" >Gray</option>
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
                            <textarea name="" id="" cols="30" rows="10" placeholder='Notes' className='notes' maxLength="100" {...register('notes')}></textarea>
                        </div>
                        <div className='buttons-container'>
                            <button type="submit" className='submit-button'  disabled={!isDirty}>Submit</button>
                            <button type='reset' className='reset-button' onClick={handleReset}  disabled={!isDirty}>Reset</button>
                        </div>
                    </form>
                </div>
                <div className='object-container'>
                    <pre>
                        {Object.keys(formDataDisplay).length === 0 ? '' : JSON.stringify(formDataDisplay, null, 2)}
                    </pre>
                </div>
            </div>
        </>
    );
}

export default Form;
