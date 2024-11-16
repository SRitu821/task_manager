import "../App.css";
import Button from "./CustomButton";

function Header(props) {
  return (
    <div className="Header">
      <h1> Task Manager</h1>
      <div className="btnWrapper">
       <Button click={props.handleInput} name = 'Add' bg = '#4CC9FE' color ='white'/>
      </div>
    </div>
  );
}

export default Header;
