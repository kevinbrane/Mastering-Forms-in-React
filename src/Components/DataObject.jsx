import React from 'react';
import '../Styles/DataObject.css';

const DataObject = ({ formDataDisplay }) => {
  formDataDisplay = Object.entries(formDataDisplay)
    .filter(([key, value]) => value !== '' && value !== [] && value !== false && value !== null)
    .reduce((newObj, [key, value]) => {
      newObj[key] = value;
      return newObj;
    }, {});

  return (
    <div className='object-container'>
      <pre>
        {formDataDisplay && Object.keys(formDataDisplay).length === 0
          ? ''
          : JSON.stringify(formDataDisplay, null, 2)}
      </pre>
    </div>
  );
};

export default DataObject;
