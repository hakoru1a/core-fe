import { useState } from "react";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";

interface PropertyType {
  name?: string;
  id: number;
  idname?: string;
}

function SelectiveInputSearch({ title, options, classes, name }: any) {
  const params = useQueryParams();
  const defaultOption =
    options.find((option: any) => option.id === Number(params?.[name])) || null;
  const [value, setValue] = useState<PropertyType>(defaultOption || options[0]);
  const navigate = useNavigate();
  const onChange = (values: PropertyType[]) => {
    const type = { ...values[0] };
    const searchParams = new URLSearchParams(location.search);
    // Remove the 'page' parameter if it exists
    if (searchParams.has("page")) {
      searchParams.delete("page");
    }
    // Add or update the 'propertyName' parameter
    searchParams.set(name, type?.idname || String(type.id));
    // Generate the new search string
    const newQueryString = searchParams.toString();
    // Update the URL with the new search string, keeping existing parameters
    const newUrl =
      location.pathname + (newQueryString ? `?${newQueryString}` : "");
    setValue(type);
    navigate(newUrl);
  };

  return (
    <div className={`property-sidebar__single ${classes}`}>
      <div className="property-sidebar__filters">
        <h4 className="property-sidebar__title">{title}</h4>
        <div className="form-group">
          <Select
            values={[value]}
            options={options}
            labelField="name"
            valueField="id"
            onChange={(values: PropertyType[]) => onChange(values)}
            searchBy="propertyType"
            searchable={true}
            // handle={true}
            placeholder="Select"
            closeOnSelect={true}
            dropdownPosition="auto"
            style={{
              outline: "none",
              padding: "10px",
              color: "#828ea3",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectiveInputSearch;
