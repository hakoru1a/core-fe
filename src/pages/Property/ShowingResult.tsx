interface Props {
  currentPage?: number;
  totalPages?: number;
}
function ShowingResult({ currentPage, totalPages }: Props) {
  return (
    <div className="hoemc-showing-results">
      <p className="hoemc-showing-results__text">
        Showing <span>{currentPage}</span> of <span>{totalPages}</span> page
        results
      </p>
    </div>
  );
}

export default ShowingResult;
