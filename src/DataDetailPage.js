import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import rip from './rip.png';

function DataDetailPage () {
  const [loading, setLoading] = useState(true);
  const [characterData, setCharacterData] = useState([]);
  const [episodeData, setEpisodeData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    onPageLoading();
  }, []);

  useEffect(() => {
    afterFetchData();
  }, [loading]);

  const onPageLoading = async () => {
    setLoading(true);
    const tempCharacterData = await fetchDataByIndex(id);
    setCharacterData(tempCharacterData);
    setLoading(false);
  };

  const afterFetchData = async () => {
    if (loading === true) {
      return;
    } else {
      const tempEpisodeData = await fetchEpisodeByIndex();
      setEpisodeData(tempEpisodeData);
    }
  };

  async function fetchDataByIndex (pageIndex) {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${pageIndex}`
    );
    return await response.data;
  }

  async function fetchEpisodeByIndex () {
    const response = await axios.get(characterData.episode[0]);
    return await response.data;
  }

  function changeStatusColor (status) {
    switch (status) {
      case 'Alive':
        return '#55cc44';
      case 'Dead':
        return '#d63d2e';
      default:
        return '#9e9e9e';
    }
  }

  return (
    <div className="container">
      <Link to={ { pathname: '/' } } className="btn btn-danger btn-lg">
        <i className="fas fa-arrow-left" />
      </Link>

      <div className="row">
        <div
          key={ characterData.id }
          className="col-md-6"
          style={ { marginLeft: 'auto', marginRight: 'auto' } }
        >
          <div className="card p-3">
            <div className="flex-row mb-3">
              <div style={ { position: 'relative' } }>
                <img
                  src={ characterData.image }
                  alt={ characterData.name }
                  width="100"
                  height="100"
                />
                { characterData.status === 'Dead' ? (
                  <img
                    alt={ 'rip' }
                    src={ rip }
                    style={ { position: 'absolute', left: '203px', top: 'px' } }
                  />
                ) : null }
              </div>

              <div className="d-flex flex-column ml-2">
                <span style={ { fontSize: '20px' } }>{ characterData.name }</span>
                <span style={ { fontSize: '20px' } } className="text-black-50">
                  { ' ' }
                  <i
                    className="fas fa-circle"
                    style={ {
                      color: changeStatusColor(characterData.status)
                    } }
                  />
                  { characterData.status } - { characterData.species }
                </span>
              </div>
            </div>
            <h6>Last known location:</h6>
            <h6 style={ { color: 'black' } }>{ characterData.location?.name }</h6>
            <h6>First seem in:</h6>
            <h6 style={ { color: 'black' } }>{ episodeData.name }</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataDetailPage;
