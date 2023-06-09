import React, { useState } from 'react';
import axios from 'axios';
import Results from './Results';
import Features from './Features';
import Definitions from './Definitions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './Dictionary.css';

export default function Dictionary(props) {
  const [keyword, setKeyword] = useState(props.defaultKeyword);
  const [result, setResult] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [photos, setPhotos] = useState(null);
  const [showDefinitionsComponent, setShowDefinitionsComponent] = useState(true);

  function search() {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(apiUrl).then(apiResponse);

    const pexelsApi = `3gp0FkQLZ594NDTECLpt4HzcmB6x8sGi4g1LVwUnwLsf4gQpwetgpmSy`;
    const pexelsUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
    axios.get(pexelsUrl, { headers: { "Authorization": `${pexelsApi}` } }).then(pexelsResponse)
      .catch(error => {
        console.error(error);
      });
  }

  function pexelsResponse(response) {
    setPhotos(response.data.photos)
  }

  function handleSearch(event) {
    event.preventDefault();
    search();
  }

  function apiResponse(response) {
    setResult(response.data[0]);
  }

  function keywordChange(event) {
    setKeyword(event.target.value);
  }

  function load() {
    setLoaded(true);
    search();
  }

  function toggleDefinitions(definitionsVisible) {
    setShowDefinitionsComponent(definitionsVisible);
  }

  if (loaded) {
    return (
      <div className="container">
        <div className="row d-flex">
          <div className="col-12 col-md-4 col-lg-4 p-0">
            <div className="Dictionary">
              <form onSubmit={handleSearch} className="dictionary-form">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="dictionary-search-icon" />
                <input
                  type="search"
                  onChange={keywordChange}
                  className="form-control dictionary-search"
                  placeholder="Search for word"
                />
              </form>
              <Results results={result} />
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-8 p-0">
            <div className="dictionary-features">
              <Features results={result} photos={photos} toggleDefinitions={toggleDefinitions} />
              {showDefinitionsComponent ? <Definitions results={result} /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    load();
    return 'Loading';
  }
}
