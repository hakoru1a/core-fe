import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";

function Search() {
  const params = useQueryParams();
  const [search, setSearch] = useState(params?.propertyName);
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Parse the current query string
    const searchParams = new URLSearchParams(location.search);
    // Remove the 'page' parameter if it exists
    if (searchParams.has("page")) {
      searchParams.delete("page");
    }
    // Add or update the 'propertyName' parameter
    searchParams.set("propertyName", search);
    // Generate the new search string
    const newQueryString = searchParams.toString();
    // Update the URL with the new search string, keeping existing parameters
    const newUrl =
      location.pathname + (newQueryString ? `?${newQueryString}` : "");

    navigate(newUrl);
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
      <button
        type="button"
        className="homec-btn"
        onClick={() => navigate("/property")}
      >
        <span> Our properties</span>
      </button>
    </form>
  );
}

export default Search;
