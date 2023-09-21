import React from "react";

function LeadModal({ isOpen, onClose, onSubmit }) {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Modal Title</h2>
        <p>Modal Content</p>
        <button onClick={onSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default LeadModal;
