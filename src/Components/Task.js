import "../App.css";
import Button from "./CustomButton";

function Task(props) {
  return (
    <div
      className="Task"
      style={{
        backgroundColor: props.complete === true ? "#399918" : "white",
        color: props.complete === true ? "white" : "#000B58",
      }}
    >
      <h3>
        {props.id}. {props.title}
      </h3>
      <p>{props.des}</p>
      <p>
        <strong>Priority: </strong>
        {props.priority} 
      </p>
      <div className="btn-Wrapper">
        <Button
          bg="#4CC9FE"
          color="white"
          name="Completed"
          click={props.update}
        />
        <Button bg="#CD1818" color="white" name="Delete" click={props.delete} />
      </div>
    </div>
  );
}

export default Task;
