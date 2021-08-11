import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function EpisodePage () {
  const [episode, setEpisode] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [characterList, setCharacterList] = useState([]);
  const [index, setIndex] = useState(0);

  function toggleModal () {
    console.log(characterList);
    setIsOpen(!isOpen);
    if (!isOpen) {
      someFunc();
    } else {
      setCharacterList([]);
    }
  }

  useEffect(() => {
    Modal.setAppElement('#root');
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

  const someFunc = async () => {
    const responses = [];
    episode[index].characters.map(async data => {
      responses.push(await axios.get(data));
      setCharacterList([...characterList, ...responses]);
    });
  };

  return (
    <div>
      <Modal
        isOpen={ isOpen }
        onRequestClose={ toggleModal }
        contentLabel="Characters in this episode"
      >
        <h1>Characters in This Episode</h1>
        <div className="row">
          { characterList.map(data => {
            console.log();
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
      </Modal>
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
          { episode.map(data => {
            return (
              <tr
                key={ data.id }
                className={ data.id % 2 === 0 ? '' : 'table-active' }
              >
                <th scope="row">{ data.id }</th>
                <td>{ data.name }</td>
                <td>{ data.air_date }</td>
                <td>{ data.episode }</td>
                <td>
                  <button
                    className="btn"
                    onClick={ () => {
                      toggleModal();
                      setIndex(data.id);
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

export default EpisodePage;
