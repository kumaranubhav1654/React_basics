import React, { useState, createContext, useContext } from "react";
import ChildComponent from "./Child";

const ParentContext = createContext();

const ParentComponent = () => {
  const [parentState, setParentState] = useState("");

  return (
    <ParentContext.Provider value={setParentState}>
      <div>
        <ChildComponent />
        <p>Parent State: {parentState}</p>
      </div>
    </ParentContext.Provider>
  );
};

export default ParentComponent;
