import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SearchContext } from '../../context/SearchContext';
import EKButton from '../../components/EKButton';
import EKCard from '../../components/EKCard';

import './character-list-page.scss';

function DataList () {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [episodeIndex, setEpisodeIndex] = useState(1);

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

  async function fetchPageByIndex (pageIndex) {
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

  async function fetchEpisodeByIndex (pageIndex) {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/episode?page=${pageIndex}`
    );
    return await response.data.results;
  }

  
  function getName (index) {
    const arr = characters[index]?.episode[0].split('/') ?? [];
    const lastElement = arr[arr.length - 1];
    const episodeName = episodes[lastElement - 1]?.name;
    return episodeName;
  }

  return (
    <div className="datalist__page">
      <div className="datalist__page__cards">
        { characters
          .filter(character =>
            character.name.toLowerCase().includes(useContext(SearchContext))
          )
          .map((data, index) => {
            return (
              <div key={ data.id }>
                <EKCard data={ { ...data, firstSeem: getName(index) } } >
                  <Link
                    to={ {
                      pathname: `detail/${data.id}`,
                    } }
                  >
                    <EKButton size="m" color="#D1D646">
                        Detail
                    </EKButton>
                  </Link>
                </EKCard>
                
              </div>
            );
          }) }
      </div>
      { loading ? (
        'loading'
      ) : (
        <EKButton size="l" color="green" onClick= { onLoadMoreButtonClick }>
          Load More
        </EKButton>
      ) }
    </div>
  );
}

DataList.propTypes = {
  search: PropTypes.string,
};

export default DataList;
