import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import EKCard from '../../components/EKCard';
import EKButton from '../../components/EKButton';

import './character-detail-page.scss';

const DataDetailPage = () => {
  const [characterData, setCharacterData] = useState({});
  const [episodeData, setEpisodeData] = useState({});
  const [isDataGet, setIsDataGet] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    onPageLoading();
  }, []);

  useEffect(() => {
    afterFetchCharacter();
  }, [isDataGet]);

  const onPageLoading = async () => {
    const tempCharacterData = await fetchDataByIndex(id);
    setCharacterData(tempCharacterData);
    setIsDataGet(true);
  };

  async function fetchDataByIndex (pageIndex) {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${pageIndex}`
    );
    return await response.data;
  }

  const afterFetchCharacter = async () => {
    if (isDataGet === false) {
      return;
    } else {
      const tempEpisodeData = await fetchEpisodeByIndex();
      setEpisodeData(tempEpisodeData);
    }
  };

  async function fetchEpisodeByIndex () {
    const response = await axios.get(characterData.episode[0]);
    return await response.data;
  }


  return (
    <div className="datadetailpage">
      <div className="datadetailpage__backButton">
        <Link to={ { pathname: '/' } } >
          <EKButton size="s" color="red">
            <i className="fas fa-arrow-left" style={ { fontSize: '1.5vw' } }/>
          </EKButton>
        </Link>
      </div>
      
      <EKCard data={ characterData } firstSeem= { episodeData.name }/>
    </div>
  );
};

export default DataDetailPage;
