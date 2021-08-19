import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { SearchContext } from '../../context/SearchContext';
import EKButton from '../../components/EKButton';

import './location-list-page.scss';


function LocationPage () {
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    onPageLoading();
  }, []);

  const onPageLoading = async () => {
    setLoading(true);
    const page1 = await fetchLocationByIndex(pageIndex);
    setPageIndex(pageIndex + 1);
    setLocation([...location, ...page1]);
    setLoading(false);
  };

  async function fetchLocationByIndex (pageIndex) {
    if (pageIndex <= 6) {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/location?page=${pageIndex}`
      );
      return await response.data.results;
    } else {
      return [];
    }
  }

  const onLoadMoreButtonClick = async () => {
    setLoading(true);
    const page1 = await fetchLocationByIndex(pageIndex);
    setLocation([...location, ...page1]);
    setPageIndex(pageIndex + 1);
    setLoading(false);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Dimension</th>
          </tr>
        </thead>
        { location.filter(tempLocation => tempLocation.name.toLowerCase().includes(useContext(SearchContext))).map(data => {
          return (
            <tbody key={ data.id }>
              <tr>
                <th scope="row">{ data.id }</th>
                <td>{ data.name }</td>
                <td>{ data.type }</td>
                <td>{ data.dimension }</td>
              </tr>
            </tbody>
          );
        }) }
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

LocationPage.propTypes = {
  search: PropTypes.string
};

export default LocationPage;
