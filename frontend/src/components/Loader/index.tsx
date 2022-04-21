import { Spinner } from "./styles";

const Loader = () => {
  return (
    <Spinner>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Spinner>
  );
};

export default Loader;
