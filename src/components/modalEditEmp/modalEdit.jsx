import React, { useEffect, useCallback } from "react";
import "./modalEdit.scss";
import commSellerDataService from "../../services/firebase.services";

const ModalEdit = ({
  toggle,
  action,
  action1,
  modalFirstName,
  modalLastName,
  setModalFirstName,
  setModalLastName,
  id,
}) => {
  const handleEdit = useCallback(
    async (e) => {
      try {
        const docSnap = await commSellerDataService.getCommSeller(id);
        console.log(docSnap.data());
        setModalLastName(docSnap.data().lname);
        setModalFirstName(docSnap.data().fname);
      } catch (err) {
        alert(err.message);
      }
    },
    [id, setModalFirstName, setModalLastName]
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    await commSellerDataService.updateCommSeller(id, {
      lname: modalLastName,
      fname: modalFirstName,
    });
    alert("Updated Successfully");
    action1();
  };

  useEffect(() => {
    console.log(id);
    if (id !== undefined && id !== "") {
      handleEdit();
    }
  }, [id, handleEdit]);

  return (
    <div
      className={`modalAdd-container
    ${toggle ? `active` : ""}`}
    >
      <form className="modalAdd-form" onSubmit={handleSubmit}>
        <div className="modalAdd-close" onClick={action}></div>

        <div className="inputmodalAdd-container">
          <label className="inputmodalAdd">
            Last Name:{" "}
            <input
              onChange={(event) => {
                setModalLastName(event.target.value);
              }}
              value={modalLastName}
              type="text"
              size="12"
              autoFocus
            />
          </label>
          <label className="inputmodalAdd">
            First Name:{" "}
            <input
              onChange={(event) => {
                setModalFirstName(event.target.value);
              }}
              value={modalFirstName}
              type="text"
              size="12"
            />
          </label>
        </div>
        <div className="modalAdd-buttons">
          <button className="modalAdd-but" type="submit">
            update
          </button>
          <button className="modalAdd-but" onClick={action}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalEdit;
