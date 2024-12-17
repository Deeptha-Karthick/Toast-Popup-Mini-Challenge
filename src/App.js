import "./styles.css";
import { useState } from "react";
import Toaster from "./Toaster";

export default function App() {
  const xAxisConfig = ["Left", "Right"];
  const yAxisConfig = ["Top", "Bottom"];
  const messageConfig = ["Normal", "Success", "Error", "Warning", "Info"];

  const [message, setMessage] = useState("This is a toast message!");
  const [xAxis, setXAxis] = useState(xAxisConfig[0]);
  const [yAxis, setYAxis] = useState(yAxisConfig[0]);
  const [messageType, setMessageType] = useState(messageConfig[0]);
  const [duration, setDuration] = useState(2000);
  const [toasterArray, setToasterArray] = useState([]);

  const xAxisLower = xAxis.toLowerCase();
  const yAxisLower = yAxis.toLowerCase();

  const onShowClick = () => {
    setToasterArray((prev) => [
      ...prev,
      { message, messageType, duration, id: Date.now() },
    ]);
  };

  const onOptionChange = (type, value) => {
    if (type === "x-axis") {
      setXAxis(value);
    } else if (type === "y-axis") {
      setYAxis(value);
    } else if (type === "message-type") {
      setMessageType(value);
    } else if (type === "message-content") {
      setMessage(value);
    } else if (type === "duration") {
      setDuration(Number(value));
    }
  };

  return (
    <div className="App">
      <h1>Toast Popup</h1>
      <div className="input-area">
        <select
          className="dropdown-style"
          name="x-axis"
          id="x-axis"
          value={xAxis}
          onChange={(event) => onOptionChange("x-axis", event.target.value)}
        >
          {xAxisConfig.map((el) => (
            <option key={el} value={el} selected={el === xAxis}>
              {el}
            </option>
          ))}
        </select>

        <select
          className="dropdown-style"
          name="y-axis"
          id="y-axis"
          value={yAxis}
          onChange={(event) => onOptionChange("y-axis", event.target.value)}
        >
          {yAxisConfig.map((el) => (
            <option key={el} value={el} selected={el === yAxis}>
              {el}
            </option>
          ))}
        </select>

        <select
          className="dropdown-style"
          name="message-type"
          id="message-type"
          value={messageType}
          onChange={(event) =>
            onOptionChange("message-type", event.target.value)
          }
        >
          {messageConfig.map((el) => (
            <option key={el} value={el} selected={el === messageType}>
              {el}
            </option>
          ))}
        </select>
        <input
          className="dropdown-style"
          type="text"
          value={message}
          onChange={(event) =>
            onOptionChange("message-content", event.target.value)
          }
        />
        <input
          type="range"
          min="2000"
          max="8000"
          step="1000"
          value={duration} // Value comes from the state
          onChange={(event) => onOptionChange("duration", event.target.value)}
        />
        {`Duration: ${duration}`}
      </div>
      <button onClick={onShowClick}>Show</button>
      <div
        className="toaster"
        style={{
          position: "absolute",
          [xAxisLower]: "0",
          [yAxisLower]: "0",
        }}
      >
        {toasterArray.map((el) => {
          return (
            <Toaster
              key={el.id}
              messageType={el.messageType}
              message={el.message}
              duration={el.duration}
              id={el.id}
              setToasterArray={setToasterArray}
            />
          );
        })}
      </div>
    </div>
  );
}
