import React, { useContext, useRef } from 'react';
import { FormContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';

import '../css/Form.scss';

export default function Form() {
  const { variables, functions } = useContext(FormContext);
  const navigate = useNavigate();
  const inputRefs = {
    Name: useRef(null),
    CardNumber: useRef(null),
    Month: useRef(null),
    Year: useRef(null),
    CVC: useRef(null),
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = functions.validate(variables.inputs);
    functions.setError(newErrors);

    const errorCount = Object.keys(newErrors).length;
    if (errorCount > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      inputRefs[firstErrorField].current.focus();
    } else {
      navigate('/state-complete');
    }
  };

  return (
    <section className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="card-name">
          <label>Cardholder Name</label>
          <input
            type="text"
            id="name"
            name="Name"
            value={variables.name || ''}
            onChange={functions.handleChange}
            placeholder="e.g. Jane Appleseed"
            maxLength={20}
            className={variables.error.Name ? 'error' : ''}
            ref={inputRefs.Name}
          />
          {variables.error.Name && (
            <p className="error-message">{variables.error.Name}</p>
          )}
        </div>

        <div className="card-number">
          <label>Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="CardNumber"
            value={variables.cardNumber || ''}
            onChange={functions.handleChange}
            placeholder="e.g. 1234 5678 9123 0000"
            className={variables.error.CardNumber ? 'error' : ''}
            maxLength={19}
            ref={inputRefs.CardNumber}
          />
          {variables.error.CardNumber && (
            <p className="error-message">{variables.error.CardNumber}</p>
          )}
        </div>

        <div className="card-date-n-cvc">
          <div className="date-cvc">
            <div className="date">
              <label>Exp. Date (MM/YY)</label>
              <div className="mm-yy">
                <input
                  type="text"
                  inputMode="numeric"
                  id="month"
                  name="Month"
                  value={variables.Month || ''}
                  onChange={functions.handleChange}
                  onBlur={functions.handleBlur}
                  placeholder="MM"
                  className={variables.error.Month ? 'error' : ''}
                  ref={inputRefs.Month}
                />

                <input
                  type="text"
                  inputMode="numeric"
                  id="year"
                  name="Year"
                  value={variables.Year || ''}
                  onChange={functions.handleChange}
                  onBlur={functions.handleBlur}
                  placeholder="YY"
                  className={variables.error.Year ? 'error' : ''}
                  ref={inputRefs.Year}
                />
              </div>
              {(variables.error.Month || variables.error.Year) && (
                <p className="error-message">
                  {variables.error.Month || variables.error.Year}
                </p>
              )}
            </div>

            <div className="cvc">
              <label>CVC</label>
              <input
                type="text"
                inputMode="numeric"
                id="CVC"
                name="CVC"
                value={variables.CVC || ''}
                onChange={functions.handleChange}
                placeholder="e.g. 123"
                className={variables.error.CVC ? 'error' : ''}
                maxLength={3}
                ref={inputRefs.CVC}
              />
              {variables.error.CVC && (
                <p className="error-message">{variables.error.CVC}</p>
              )}
            </div>
          </div>
        </div>
        <button
          id="#confirm-btn"
          type="submit"
        >
          Confirm
        </button>
      </form>
    </section>
  );
}
