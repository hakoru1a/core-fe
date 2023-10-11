import { cites, propertyType } from "../../data/property";
import AgentsSidebarSlider from "../Agents/AgentsSidebarSlider";
import CheckInput from "../Form/CheckInput";
import RangeInput from "../Form/RangeInput";
import SelectiveInputSearch from "../Form/SelectiveInputSearch";
function index() {
  return (
    <div className="col-lg-4 col-12 mg-top-30">
      <div className="property-sidebar">
        <SelectiveInputSearch
          title="Property Category"
          options={propertyType}
          name="propertyType"
        />
        <SelectiveInputSearch
          title="City"
          options={cites}
          classes="mg-top-20"
          name="city"
        />
        <CheckInput
          title="Number Of Rooms"
          properties={[
            "Room 1",
            "Room 2",
            "Room 3",
            "Room 4",
            "Room 5",
            "Room 6",
          ]}
          name="room"
        />
        <CheckInput
          title="Bathrooms"
          properties={[
            "Room 1",
            "Room 2",
            "Room 3",
            "Room 4",
            "Room 5",
            "Room 6",
          ]}
          name="bathrooms"
        />
        <RangeInput
          minRange={0}
          maxRange={2000}
          defaultMinRange={400}
          defaultMaxRange={1200}
          title="Square feet"
          standard="sq. ft."
        />
        <RangeInput
          minRange={0}
          maxRange={600}
          defaultMinRange={120}
          defaultMaxRange={450}
          title="Price"
          text="Range: "
          symbol="$"
        />
      </div>
      <AgentsSidebarSlider />
    </div>
  );
}

export default index;
