import React, { useContext } from "react";

const ChildComponent = (ParentContext) => {
  const setParentState = useContext(ParentContext);

  const handleChange = (event) => {
    const value = event.target.value;
    setParentState(value);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
    </div>
  );
};

export default ChildComponent;
