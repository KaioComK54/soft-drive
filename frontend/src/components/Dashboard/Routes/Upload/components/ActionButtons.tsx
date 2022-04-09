import React from "react";

interface props {
  file: File | any;
  setFile: Function;
}

const ActionButtons = ({ file, setFile }: props) => {
  if (!file) return null;

  return (
    <React.Fragment>
      <div className="buttons">
        <button onClick={() => setFile(null)}>Limpar</button>
        <button>Enviar</button>
      </div>
      ;
    </React.Fragment>
  );
};

export default ActionButtons;
