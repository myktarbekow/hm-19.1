import React, { useState } from "react";

const Items = ({ name, id, deleteId, editData }) => {
  const [tast, setTask] = useState(name);
  const [edit, setEdit] = useState(true);

  
  const changeEditContent = () => {
    setEdit((prevState) => !prevState);
  };

  
console.log(id);
  return ( <div> {edit ? (
        <>
          {name}

          <button onClick={() => deleteId(id)}>DELETE</button>
          <button onClick={changeEditContent}>Edit</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={tast}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={() => editData(id, tast,changeEditContent)}>save</button>
        </>
      )}
    </div>
  );
};

export default Items;
