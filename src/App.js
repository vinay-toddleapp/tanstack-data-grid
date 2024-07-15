import React, { useState } from "react";
import BasicTable from "./components/BasicTable";
import EditableTable from "./components/EditableTable/EditableTable";
import EditableAndNonEditableColumn from "./components/EditableAndNonEditableColumn/EditableAndNonEditableColumn";
import EditAndDisabledCell from "./components/EditAndDisabledCell/EditAndDisabledCell";

const App = () => {
  const allDemos = {
    basic: {
      name: "Basic Table",
      value: "basic",
      component: <BasicTable />,
    },
    editableWithSelectState: {
      name: "Editable Table with select state",
      value: "editableWithSelectState",
      component: <EditableTable />,
    },
    editableAndNonEditableCoExist: {
      name: "Editable and non-editable column co-exist",
      value: "editableAndNonEditableCoExist",
      component: <EditableAndNonEditableColumn />,
    },
    cellLevelControl: {
      name: "Cell level control for edit state",
      value: "cellLevelControl",
      component: <EditAndDisabledCell />,
    },
  };
  const [currentDemo, setCurrentDemo] = useState("basic");

  return (
    <div className="space-y-10 p-10">
      <select onChange={(event) => setCurrentDemo(event.target.value)}>
        {Object.values(allDemos).map((demo) => {
          return (
            <option key={demo.value} value={demo.value}>
              {demo.name}
            </option>
          );
        })}
      </select>
      {allDemos[currentDemo].component}
    </div>
  );
};

export default App;
