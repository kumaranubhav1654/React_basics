import React, { useState } from "react";

function Modal() {
  const [isOpen, setIsOpen] = useState(false)

  const handleModalClose = () => {
    setIsOpen(false);
  }

  const handleModalOpen = () => {
    setIsOpen(true);
  }

  return (
    <div style={{ textAlign: "center", padding: "50px", height: "100vh", backgroundColor: `${isOpen ? "gray" : "transparent"} ` }}>
      <h1>Modal Popup</h1>

      <button
        style={{ padding: "10px", cursor: "pointer" }}
        onClick={handleModalOpen}
        onMouseDown={(e) => e.stopPropagation()}
      >
        Open Modal
      </button>
      {isOpen
        ? (<div data-testid="modal-backdrop" onMouseDown={handleModalClose} style={{
          textAlign: "center", padding: "50px", height: "100vh"
        }}>
          <div onMouseDown={(e) => e.stopPropagation()} style={{ textAlign: "center", padding: "50px", border: 'solid black 1px', backgroundColor: "white" }}>
            <h1>Modal Header</h1>
            <div>This is the modal body</div>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>)
        : <></>}
    </div>
  );
}

export default Modal;
