import React, { useState } from "react";
import BasicTable from "./components/BasicTable";
import EditableTable from "./components/EditableTable/EditableTable";
import EditableAndNonEditableColumn from "./components/EditableAndNonEditableColumn/EditableAndNonEditableColumn";
import EditAndDisabledCell from "./components/EditAndDisabledCell/EditAndDisabledCell";
import Accessibility from "./components/Accessibility/Accessibility";
import CursorBasedSelection from "./components/CursorBasedSelection/CursorBasedSelection";
import DragHandleBasedCopy from "./components/DragHandleBasedCopy/DragHandleBasedCopy";
import BasicTableUsingCanvas from "./components/BasicTableUsingCanvas/BasicTableUsingCanvas";

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
    accessibility: {
      name: "Table with accessibilty",
      value: "accessibility",
      component: <Accessibility />,
    },
    cursorBasedSelection: {
      name: "Cursor based multi selection",
      value: "cursorBasedSelection",
      component: <CursorBasedSelection />,
    },
    dragHandleBasedCopy: {
      name: "Drag handle in cell to copy data",
      value: "dragHandleBasedCopy",
      component: <DragHandleBasedCopy />,
    },
    basicTableUsingCanvas: {
      name: "Basic table using canvas",
      value: "basicTableUsingCanvas",
      component: <BasicTableUsingCanvas />,
    },
  };
  const allDemosKeys = Object.keys(allDemos);
  const defaultValue = allDemosKeys[allDemosKeys.length - 1];
  const [currentDemo, setCurrentDemo] = useState(allDemos[defaultValue].value);

  return (
    <div className="space-y-10 p-10">
      <select
        onChange={(event) => setCurrentDemo(event.target.value)}
        value={currentDemo}
      >
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
