import React from "react";
import BasicTable from "./components/BasicTable";
import EditableTable from "./components/EditableTable/EditableTable";
import EditableAndNonEditableColumn from "./components/EditableAndNonEditableColumn/EditableAndNonEditableColumn";

const App = () => {
  return (
    <div>
      <EditableAndNonEditableColumn />
    </div>
  );
};

export default App;
