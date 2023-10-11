import { useState } from "react";
import Select from "react-dropdown-select";

function SelectiveInputV2({ title, name, options, classes, register }: any) {
  const [value, setValue] = useState(options[0]);
  console.log(name);

  return (
    <div className={`property-sidebar__single ${classes}`}>
      <div className="mt-4">
        <h4 className="property-sidebar__title">{title}</h4>
        <div className="form-group">
          <Select
            values={[value]}
            options={options}
            labelField="name"
            valueField="id"
            onChange={(values) => setValue(values)}
            searchBy="name"
            searchable={true}
            // handle={true}
            placeholder="Select"
            closeOnSelect={true}
            dropdownPosition="auto"
            style={{
              outline: "none",
              padding: "10px",
              // color: "#828ea3",
              cursor: "pointer",
            }}
            name={name}
            {...register(name)}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectiveInputV2;
