import { InputBase } from "./styles";

interface props {
  value: string;
  onChange: Function;
  name: string;
  placeholder: string;
  errors: string[];
}

const Input = ({ value, onChange, name, placeholder, errors }: props) => {
  return (
    <InputBase
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={({ target }: any) => onChange(target.value)}
      className={errors.includes(name) && "error"}
    />
  );
};

export default Input;
