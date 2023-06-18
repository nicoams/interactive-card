import React, { useContext } from 'react';
import { FormContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';

import '../css/Submitted.scss';

export default function Submitted() {
  const { functions } = useContext(FormContext);
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();
    functions.setInputs({
      Name: '',
      CardNumber: '',
      Month: '',
      Year: '',
      CVC: '',
    });
    functions.setError({});
    navigate('/');
  };

  return (
    <section className="submitted-wrapper">
      <img
        src={process.env.PUBLIC_URL + '/images/icon-complete.svg'}
        alt=""
      />

      <div className="text-wrapper">
        <h1>Thank You!</h1>
        <p>We've added your card details</p>
      </div>

      <button
        id="#continue-btn"
        onClick={handleContinue}
      >
        Continue
      </button>
    </section>
  );
}
