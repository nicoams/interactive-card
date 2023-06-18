import React from "react";

import Cards from '../components/Cards';
import Submitted from '../components/Submitted';

import '../css/App.scss'

function StateComplete() {
  return (
    <div className="content-wrapper">
      <Cards />
      <Submitted />
    </div>
  );
}

export default StateComplete;
