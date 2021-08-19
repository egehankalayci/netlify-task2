import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DtModal from '../../components/DtModal';
import PropTypes from 'prop-types';
import { SearchContext } from '../../context/SearchContext';
import EKButton from '../../components/EKButton';

import './episode-list-page.scss';
import '../../components/DtModal/dtmodal.scss';

function EpisodePage () {
  const [episode, setEpisode] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [characterList, setCharacterList] = useState([]);
  const [index, setIndex] = useState(0);

  function toggleModal () {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    onPageLoading();
  }, []);

  const onPageLoading = async () => {
    setLoading(true);
    const page1 = await fetchEpisodeByIndex(pageIndex);
    setPageIndex(pageIndex + 1);
    setEpisode([...episode, ...page1]);
    setLoading(false);
  };

  async function fetchEpisodeByIndex (pageIndex) {
    if (pageIndex <= 6) {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/episode?page=${pageIndex}`
      );
      return await response.data.results;
    } else {
      return [];
    }
  }

  const onLoadMoreButtonClick = async () => {
    setLoading(true);
    const page1 = await fetchEpisodeByIndex(pageIndex);
    setEpisode([...episode, ...page1]);
    setPageIndex(pageIndex + 1);
    setLoading(false);
  };

  useEffect(async () => {
    const responses = [];
    episode[index - 1]?.characters.map(async data => {
      responses.push(await axios.get(data));
      setCharacterList([...characterList, ...responses]);
    });
  }, [index]);

  return (
    <>
      <DtModal
        isOpen={ isOpen }
        onRequestClose={ toggleModal }
        contentLabel="Characters in this episode"
      >
        <div className="dtmodal">
          <div className="dtmodal__title">
            <p>Characters in This Episode</p>
          </div>
          <div className="dtmodal__items">
            { characterList.map(data => {
              return (
                <div key={ data.id } className="dtmodal__items__card">
                  <img
                    src={ data.data.image }
                    alt={ data.data.name }
                    width="100"
                    height="100"
                  />
                  <h4>{ data.data.name }</h4>
                </div>
              );
            }) }
          </div>
          <EKButton size="s" color="#F97068" onClick={ toggleModal }>
          Close
          </EKButton>
        </div>
      </DtModal>
     
      <table>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Air Date</th>
            <th scope="col">Episode</th>
            <th scope="col">Characters</th>
          </tr>
        </thead>
        <tbody>
          { episode.filter(tempEpisode => tempEpisode.name.toLowerCase().includes(useContext(SearchContext))).map(data => {
            return (
              <tr key = { data.id }>
                <th>{ data.id }</th>
                <td>{ data.name }</td>
                <td>{ data.air_date }</td>
                <td>{ data.episode }</td>
                <td>
                  <EKButton size="s" color="#F97068" onClick={ () => {
                    setIndex(data.id);
                    toggleModal();
                  } }>
                      Show
                  </EKButton>
                </td>
              </tr>
            );
          }) }
        </tbody>
      </table>
      &nbsp;
      { loading ? (
        'loading'
      ) : (
        <EKButton size="l" color="green" onClick= { onLoadMoreButtonClick }>
          Load More
        </EKButton>
      ) }
      &nbsp;
    </>
  );
}

EpisodePage.propTypes = {
  search: PropTypes.string
};

export default EpisodePage;
