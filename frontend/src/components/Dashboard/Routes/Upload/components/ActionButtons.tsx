import React from "react";

interface props {
  file: File | any;
  setFile: Function;
  submitFile: Function;
}

const ActionButtons = ({ file, setFile, submitFile }: props) => {
  if (!file) return null;

  return (
    <React.Fragment>
      <div className="buttons">
        <button onClick={() => setFile(null)}>Remover arquivo</button>
        <button className="primary" onClick={() => submitFile()}>
          Enviar
        </button>
      </div>
      ;
    </React.Fragment>
  );
};

export default ActionButtons;
