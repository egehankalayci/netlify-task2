import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DtModal from './components/DtModal';
import PropTypes from 'prop-types';

function EpisodePage (props) {
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
    setLoading(false);git add .
    git commit -m'add netlify folder'
    git push
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
    <div>
      <DtModal
        isOpen={ isOpen }
        onRequestClose={ toggleModal }
        contentLabel="Characters in this episode"
        title="Deneme"
      >
        <h1>Characters in This Episode</h1>
        <div className="row">
          { characterList.map(data => {
            return (
              <div key={ data.id } className="col-md-4">
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
        <button className="btn btn-danger" onClick={ toggleModal }>
            Close
        </button>
        <h1 style={ { color: 'black' } }>{ }</h1>
      </DtModal>
      <table className="table table-bordered table-dark">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Air Date</th>
            <th scope="col">Episode</th>
            <th scope="col">Characters</th>
          </tr>
        </thead>
        <tbody>
          { episode.filter(tempEpisode => tempEpisode.name.toLowerCase().includes(props.search)).map(data => {
            return (
              <tr key = { data.id }
                className={ data.id % 2 === 0 ? '' : 'table-active' }
              >
                <th key = { data.id } scope="row">{ data.id }</th>
                <td>{ data.name }</td>
                <td>{ data.air_date }</td>
                <td>{ data.episode }</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={ () => {
                      setIndex(data.id);
                      toggleModal();
                    } }
                  >
                    Show
                  </button>
                </td>
              </tr>
            );
          }) }
        </tbody>
      </table>
      { loading ? (
        'loading'
      ) : (
        <button className="btn btn-danger" onClick={ onLoadMoreButtonClick }>
          Load More
        </button>
      ) }
    </div>
  );
}

EpisodePage.propTypes = {
  search: PropTypes.string
};

export default EpisodePage;
