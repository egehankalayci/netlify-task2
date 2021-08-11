import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DataList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [episodeIndex, setEpisodeIndex] = useState(1);
  var iconColor = "";

  useEffect(() => {
    onLoadMoreButtonClick();
    onPageLoading();
  }, []);

  const onLoadMoreButtonClick = async () => {
    setLoading(true);
    const page1 = await fetchPageByIndex(pageIndex);
    setCharacters([...characters, ...page1]);
    setPageIndex(pageIndex + 1);
    setLoading(false);
  };

  async function fetchPageByIndex(pageIndex) {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${pageIndex}`
    );
    return await response.data.results;
  }

  const onPageLoading = async () => {
    setLoading(true);

    const page1 = await fetchEpisodeByIndex(episodeIndex);
    setEpisodeIndex(episodeIndex + 1);
    const page2 = await fetchEpisodeByIndex(episodeIndex);
    setEpisodeIndex(episodeIndex + 1);
    const page3 = await fetchEpisodeByIndex(episodeIndex);
    setEpisodeIndex(episodeIndex + 1);

    setEpisodes([...episodes, ...page1, ...page2, ...page3]);
    setLoading(false);
  };

  async function fetchEpisodeByIndex(pageIndex) {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/episode?page=${pageIndex}`
    );
    return await response.data.results;
  }

  function getName(props) {
    const arr = characters[props.id - 1].episode[0].split("/");
    const lastElement = arr[arr.length - 1];
    return episodes[lastElement - 1]?.name;
  }

  return (
    <div>
      {" "}
      <div className="container">
        <div className="row">
          {characters.map((data) => {
            return (
              <div key={data.id} className="col-md-4">
                <div className="card p-3">
                  <div className="flex-row mb-3">
                    <img
                      src={data.image}
                      alt={data.name}
                      width="100"
                      height="100"
                    />
                    <div className="d-flex flex-column ml-2">
                      <span style={{ fontSize: "20px" }}>{data.name}</span>
                      <span
                        style={{ fontSize: "20px" }}
                        className="text-black-50"
                      >
                        {" "}
                        <i
                          className="fas fa-circle"
                          style={{ color: (data.status=== "Alive") ? ("green") : ((data.status=== "Dead") ? ("red") : ("gray")) }}
                        ></i>
                        {data.status} - {data.species}
                      </span>
                    </div>
                  </div>
                  <h6>Last known location:</h6>
                  <h6 style={{ color: "black" }}>{data.location.name}</h6>
                  <h6>First seem in:</h6>
                  <h6 style={{ color: "black" }}>
                    {getName({ id: data.id })}{" "}
                  </h6>
                  <div className="btn btn-danger btn-block">
                    <Link
                      to={{
                        pathname: `detail/${data.id}`,
                      }}
                      className="btn btn-dark btn-block"
                    >
                      Load More
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {loading ? (
        "loading"
      ) : (
        <button className="btn btn-danger" onClick={onLoadMoreButtonClick}>
          Load More
        </button>
      )}
      <div>
        {pageIndex}, {characters.length}
      </div>
    </div>
  );
}

export default DataList;
