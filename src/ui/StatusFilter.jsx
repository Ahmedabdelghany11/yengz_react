import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FILTER_STATUS } from "../utils/constants";

function StatusFilter({ isFilterOpen, setIsFilterOpen }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status") || "";

  const [searchFilterData, setSearchFilterData] = useState(
    statusParam ? statusParam.split("-") : []
  );

  function handleApplyFilters() {
    if (searchFilterData.length > 0) {
      searchParams.set("status", searchFilterData.join("-"));
      setSearchParams(searchParams);
    }
  }

  const handleCheckboxChange = (e) => {
    setSearchFilterData((prevState) => {
      if (e.target.value === "all") {
        if (e.target.checked) {
          return FILTER_STATUS;
        } else {
          return [];
        }
      } else {
        const updatedStatuses = e.target.checked
          ? [...prevState, e.target.value]
          : prevState.filter((status) => status !== e.target.value);

        const allStatuses = FILTER_STATUS.filter((status) => status !== "all");
        const areAllStatusesChecked = allStatuses.every((status) =>
          updatedStatuses.includes(status)
        );

        if (areAllStatusesChecked) {
          return ["all", ...updatedStatuses];
        } else {
          return updatedStatuses.filter((status) => status !== "all");
        }
      }
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleApplyFilters();
  }

  return (
    <div className={`filter side-menu ${isFilterOpen ? "active" : ""}`}>
      <div className="d-flex justify-content-between">
        <h6>حالة الطلب</h6>
        <div className="colse" onClick={() => setIsFilterOpen(false)}>
          <i className="fa-light fa-xmark"></i>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <ul className="order-status">
          {FILTER_STATUS.map((status) => (
            <li key={status}>
              <input
                type="checkbox"
                id={status}
                name="order-filter"
                value={status}
                checked={searchFilterData.includes(status)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={status}>{t(`status.${status}`)}</label>
            </li>
          ))}
          <div className="row">
            <div className="search-btn p-0" onClick={handleApplyFilters}>
              <button>{t("search.apply")}</button>
            </div>
          </div>
        </ul>
      </form>
    </div>
  );
}

export default StatusFilter;