import { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <form
      className="homec-form__form homec-form__form--bar"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        type="text"
        name="search"
        placeholder="Search Properties..."
        required={true}
        value={search}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button type="submit" className="homec-btn">
        <span>Search Now</span>
      </button>
    </form>
  );
}

export default Search;
