import "../App.css";

function InputSection(props) {
  return (
    <div className="InputWrapper">
      <label>{props.label}</label>
      <input
        value={props.value}
        className="inputForm"
        placeholder={props.placeHolder}
        onChange={props.change}
      />
    </div>
  );
}

export default InputSection;
