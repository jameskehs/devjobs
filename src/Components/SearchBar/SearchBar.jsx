import { useEffect, useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ searchJobs }) => {
  const [genericSearch, setGenericSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [isFullTimeOnly, setIsFullTimeOnly] = useState(false);
  const [dimensions, setDimensions] = useState({ height: window.innerHeight, width: window.innerWidth });

  useEffect(() => {
    function handleResize() {
      setDimensions({ height: window.innerHeight, width: window.innerWidth });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="search-container">
      {dimensions.width < 650 && (
        <MobileSearchBar
          genericSearch={genericSearch}
          setGenericSearch={setGenericSearch}
          locationSearch={locationSearch}
          setLocationSearch={setLocationSearch}
          isFullTimeOnly={isFullTimeOnly}
          setIsFullTimeOnly={setIsFullTimeOnly}
          searchJobs={searchJobs}
        />
      )}
      {dimensions.width >= 650 && (
        <DesktopSearchBar
          genericSearch={genericSearch}
          setGenericSearch={setGenericSearch}
          locationSearch={locationSearch}
          setLocationSearch={setLocationSearch}
          isFullTimeOnly={isFullTimeOnly}
          setIsFullTimeOnly={setIsFullTimeOnly}
          searchJobs={searchJobs}
          dimensions={dimensions}
        />
      )}
    </div>
  );
};

const SearchIcon = () => {
  return (
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.112 15.059h-1.088l-.377-.377a8.814 8.814 0 002.15-5.784A8.898 8.898 0 008.898 0 8.898 8.898 0 000 8.898a8.898 8.898 0 008.898 8.899c2.211 0 4.23-.808 5.784-2.143l.377.377v1.081l6.845 6.832 2.04-2.04-6.832-6.845zm-8.214 0A6.16 6.16 0 118.9 2.737a6.16 6.16 0 010 12.322z"
        fill="#5964E0"
        fillRule="nonzero"
      />
    </svg>
  );
};

const LocationIcon = () => {
  return (
    <svg width="17" height="24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.358 2.451A8.3 8.3 0 008.448 0a8.3 8.3 0 00-5.911 2.451c-2.922 2.925-3.285 8.427-.786 11.76l6.697 9.683 6.687-9.669c2.508-3.347 2.145-8.85-.777-11.774zm-5.833 8.894a3.057 3.057 0 01-3.051-3.054 3.057 3.057 0 013.05-3.055 3.057 3.057 0 013.052 3.055 3.057 3.057 0 01-3.051 3.054z"
        fill="#5964E0"
        fillRule="nonzero"
      />
    </svg>
  );
};

const FilterIcon = ({ setIsFilterOpen }) => {
  return (
    <svg className="filter-icon" width="20" height="20" xmlns="http://www.w3.org/2000/svg" onClick={() => setIsFilterOpen(true)}>
      <path
        d="M19.108 0H.86a.86.86 0 00-.764.455.833.833 0 00.068.884l6.685 9.202.007.01c.242.32.374.708.375 1.107v7.502a.825.825 0 00.248.594.865.865 0 00.942.18l3.756-1.4c.337-.1.56-.41.56-.784v-6.092c0-.399.132-.787.375-1.108l.007-.009 6.685-9.202c.19-.26.217-.6.068-.884A.86.86 0 0019.108 0z"
        fill="#6E8098"
        fillRule="nonzero"
      />
    </svg>
  );
};

const DesktopSearchBar = ({
  genericSearch,
  locationSearch,
  isFullTimeOnly,
  setGenericSearch,
  setLocationSearch,
  setIsFullTimeOnly,
  searchJobs,
  dimensions,
}) => {
  return (
    <div id="search-desktop" className="search">
      <div className="generic-search">
        <SearchIcon />
        <input
          type="text"
          placeholder="Filter by title, companies, expertise..."
          value={genericSearch}
          onChange={(e) => setGenericSearch(e.target.value)}
        />
      </div>
      <div className="location-search">
        <LocationIcon />
        <input type="text" placeholder="Filter by location..." value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} />
      </div>
      <div className="full-time-search">
        <div>
          <input type="checkbox" id="full-time-toggle" checked={isFullTimeOnly} onChange={(e) => setIsFullTimeOnly(e.target.checked)} />
          <label htmlFor="full-time-toggle">{dimensions.width > 768 ? "Full Time Only" : "Full Time"}</label>
        </div>
        <button className="button1" onClick={() => searchJobs(genericSearch, locationSearch, isFullTimeOnly)}>
          Search
        </button>
      </div>
    </div>
  );
};

const MobileSearchBar = ({ genericSearch, locationSearch, isFullTimeOnly, setGenericSearch, setLocationSearch, setIsFullTimeOnly, searchJobs }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <>
      <div id="search-mobile" className="search">
        <div className="generic-search">
          <input
            type="text"
            placeholder="Filter by title, companies, expertise..."
            value={genericSearch}
            onChange={(e) => setGenericSearch(e.target.value)}
          />
        </div>
        <FilterIcon setIsFilterOpen={setIsFilterOpen} />
        <button className="button1 search-btn" onClick={() => searchJobs(genericSearch, locationSearch, isFullTimeOnly)}>
          <SearchIcon />
        </button>
      </div>
      {isFilterOpen && (
        <div className="filterModal-container">
          <div className="filterModal">
            <div className="location-search">
              <LocationIcon />
              <input type="text" placeholder="Filter by location..." value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} />
            </div>
            <div className="full-time-search">
              <div>
                <input type="checkbox" id="full-time-toggle" checked={isFullTimeOnly} onChange={(e) => setIsFullTimeOnly(e.target.checked)} />{" "}
                <label htmlFor="full-time-toggle">Full Time Only</label>
              </div>
              <button
                className="button1"
                onClick={() => {
                  searchJobs(genericSearch, locationSearch, isFullTimeOnly);
                  setIsFilterOpen(false);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
