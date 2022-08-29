import React from "react";
import Dropdown from "./components/Dropdown/Dropdown";
import { listOfOptions } from "./data/listOfOptions";

const App = () => {
  return (
    <div>
      <Dropdown
        isMultiSelect
        options={listOfOptions}
        placeHolder="Choose up to 3 your favorites"
      />
    </div>
  );
};

export default App;
