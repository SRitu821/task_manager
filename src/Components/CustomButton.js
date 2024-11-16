import '../App.css';

function Button(props) {
  return (
        <button onClick={props.click} className="btn"
        style={{backgroundColor : props.bg, color:props.color }}> 
        {props.name} </button>
     
  );
}

export default Button;
