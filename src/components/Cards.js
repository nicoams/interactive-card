import React, {useContext} from "react";
import { FormContext } from "../context/Context";

import '../css/Cards.scss'


export default function Cards() {
  const { variables, functions } = useContext(FormContext);

  return (
    <section className="cards-display">
      <div className="card-back">
        <p className="cvc-ch">{variables.CVC ? variables.CVC : '000'}</p>
      </div>

      <div className="card-front">
        <div className="card-logo"></div>
        <div className="card-info">
          <p className="number-ch">{functions.renderDigits("variables.cardNumber")}</p>

          <div className="name-date">
            <p className="name-ch">{variables.name ? functions.renderDigits("variables.name") : 'Jane Appleseed' }</p>
            <p className="date-ch">{functions.renderDigits("variables.month")}/{functions.renderDigits("variables.year")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
