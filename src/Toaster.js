import { useRef, useEffect } from "react";

const Toaster = ({ message, messageType, duration, id, setToasterArray }) => {
  const timerID = useRef(null);

  const onCloseClick = (id) => {
    setToasterArray((prev) => {
      let newArray = [...prev];
      return newArray.filter((el) => el.id !== id);
    });

    if (timerID.current) {
      clearTimeout(timerID.current);
    }
  };

  useEffect(() => {
    timerID.current = setTimeout(() => {
      onCloseClick(id);
    }, duration);

    return () => clearTimeout(timerID.current);
  }, [duration]);

  return (
    <>
      <div className={`single-toaster ${messageType.toLowerCase()}`}>
        <div style={{ marginRight: "10px" }}>{message}</div>
        <div
          className="close-btn"
          style={{ marginRight: "10px", cursor: "pointer" }}
          onClick={() => onCloseClick(id)}
        >
          x
        </div>
      </div>
    </>
  );
};

export default Toaster;
