import { createContext, useState } from 'react';

export const FormContext = createContext('');

export const FormProvider = ({ children }) => {
  const [inputs, setInputs] = useState({
    Name: '',
    CardNumber: '',
    Month: '',
    Year: '',
    CVC: '',
  });
  const [error, setError] = useState({});

  const name = inputs.Name;
  const cardNumber = inputs.CardNumber;
  const formattedCardNumber = cardNumber ? cardNumber.replace(/\D/g, '') : '';
  const Month = inputs.Month ? inputs.Month : '';
  const Year = inputs.Year ? inputs.Year : '';
  const CVC = inputs.CVC ? inputs.CVC : '';

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === 'Name') {
      let formattedValue;
      formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
      const capitalizedValue = formattedValue.replace(/\b\w/g, (match) =>
        match.toUpperCase()
      );
      value = capitalizedValue;
    }

    if (name === 'CardNumber') {
      let formattedValue;
      formattedValue = value.replace(/[^0-9]/g, '');
      value = formattedValue.replace(/(.{4})(?=.)/g, '$1 ');
    }

    if (name === 'Month' && parseInt(value) > 12) {
      value = '12';
    }

    if (name === 'Month' || name === 'Year') {
      value = value.replace(/\D/g, '');
      value = value.slice(-2);

      if (value >= 1 && value <= 9) {
        value = value.padStart(2, '0');
      }
    }

    setInputs((values) => ({ ...values, [name]: value }));
    setError((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validate = (inputs) => {
    // eslint-disable-next-line
    const { Name, CardNumber, Month, Year, CVC } = inputs;
    const errors = {};

    Object.entries(inputs).forEach(([name, value]) => {
      if (value.trim() === '') {
        errors[name] = "Can't be blank";
      }
    });

    if (formattedCardNumber.length > 0 && formattedCardNumber.length < 16) {
      errors.CardNumber = 'Insert a valid number';
    }

    if (CVC.length > 0 && CVC.length < 3) {
      errors.CVC = 'Insert a valid number';
    }

    return errors;
  };

  const handleBlur = () => {
    let newMonthValue;
    let newYearValue;

    if (Month !== '' && Month < 10) {
      newMonthValue = Month.padStart(2, '0');
    } else if (Month === '') {
      newMonthValue = '';
    } else {
      newMonthValue = Month;
    }

    if (Year !== '' && Year < 10) {
      newYearValue = Year.padStart(2, '0');
    } else if (Year === '') {
      newYearValue = '';
    } else {
      newYearValue = Year;
    }

    setInputs((values) => ({
      ...values,
      Month: newMonthValue,
      Year: newYearValue,
    }));
  };

  const renderDigits = (valueType) => {
    let renderedDigits = '';

    switch (valueType) {
      case 'variables.cardNumber':
        renderedDigits = formattedCardNumber.padEnd(16, '0');
        renderedDigits = renderedDigits.replace(/(.{4})(?=.)/g, '$1 ');
        break;
      case 'variables.name':
        renderedDigits = name;
        break;
      case 'variables.month':
        renderedDigits = Month.padStart(2, '0');
        break;
      case 'variables.year':
        renderedDigits = Year.padStart(2, '0');
        break;
      default:
        break;
    }

    return renderedDigits;
  };

  const variables = {
    inputs,
    name,
    cardNumber,
    Month,
    Year,
    CVC,
    error,
  };
  const functions = {
    setInputs,
    setError,
    handleChange,
    handleBlur,
    validate,
    renderDigits,
  };

  return (
    <FormContext.Provider
      value={{
        variables,
        functions,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
