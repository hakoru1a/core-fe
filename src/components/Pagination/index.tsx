import { Link } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";
import { getUrlQuery } from "../../utils/utils";

interface Props {
  handlePage: (page: number | string) => void;
  totalPage: number;
  currentPage: number;
}

function Pagination({ totalPage, handlePage, currentPage }: Props) {
  const params = useQueryParams();

  return (
    <div className="row mg-top-40 p-0">
      <div className="homec-pagination">
        <ul className="homec-pagination__list list-none">
          <li className="homec-pagination__button">
            <Link
              style={{ cursor: "pointer" }}
              onClick={() => {
                handlePage("prev");
              }}
              to={
                currentPage === 1 ? "#" : getUrlQuery(params, currentPage - 1)
              }
            >
              Prev
            </Link>
          </li>
          {Array.from(Array(totalPage).keys()).map((item, index) =>
            index === 0 || index + 1 === totalPage ? (
              <li
                key={item + 1}
                className={currentPage === index + 1 ? "active" : ""}
              >
                <Link
                  to={getUrlQuery(params, index + 1)}
                  onClick={() => {
                    handlePage(index + 1);
                  }}
                >
                  {index < 9 ? `0${index + 1}` : index + 1}
                </Link>
              </li>
            ) : (index < 5 && currentPage < 5) ||
              (index > totalPage - 6 && currentPage > totalPage - 4) ? (
              <li
                key={item + 1}
                className={currentPage === index + 1 ? "active" : ""}
              >
                <Link
                  to={getUrlQuery(params, index + 1)}
                  onClick={() => {
                    handlePage(index + 1);
                  }}
                >
                  {index < 9 ? `0${index + 1}` : index + 1}
                </Link>
              </li>
            ) : index === currentPage - 2 ||
              index === currentPage - 1 ||
              index === currentPage ? (
              <li
                key={item + 1}
                className={currentPage === index + 1 ? "active" : ""}
              >
                <Link
                  to={getUrlQuery(params, index + 1)}
                  onClick={() => {
                    handlePage(index + 1);
                  }}
                >
                  {index < 9 ? `0${index + 1}` : index + 1}
                </Link>
              </li>
            ) : currentPage > 4 && index === 2 ? (
              <li
                key={item + 1}
                className={currentPage === index + 1 ? "active" : ""}
              >
                <Link
                  to={getUrlQuery(params, index + 1)}
                  onClick={() => {
                    handlePage(index + 1);
                  }}
                >
                  ...
                </Link>
              </li>
            ) : (
              currentPage < totalPage - 2 &&
              index === totalPage - 2 && (
                <li
                  key={item + 1}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  <Link
                    to={getUrlQuery(params, index + 1)}
                    onClick={() => {
                      handlePage(index + 1);
                    }}
                  >
                    ...
                  </Link>
                </li>
              )
            )
          )}

          <li
            style={{ cursor: "pointer" }}
            className="homec-pagination__button"
          >
            <Link
              onClick={() => {
                handlePage("next");
              }}
              to={
                currentPage === totalPage
                  ? "#"
                  : getUrlQuery(params, currentPage + 1)
              }
            >
              Next
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
