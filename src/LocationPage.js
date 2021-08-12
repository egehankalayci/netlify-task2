import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <table className="table table-bordered table-dark">
        <thead className="thead-light" >
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Dimension</th>
          </tr>
        </thead>
        { location.map(data => {
          return (
            <tbody key={ data.id }>
              <tr className={ data.id % 2 === 0 ? '' : 'table-active' }>
                <th scope="row">{ data.id }</th>
                <td>{ data.name }</td>
                <td>{ data.type }</td>
                <td>{ data.dimension }</td>
              </tr>
            </tbody>
          );
        }) }
        { loading ? (
          'loading'
        ) : (
          <button className="btn btn-danger" onClick={ onLoadMoreButtonClick }>
            Load More
          </button>
        ) }
      </table>
    </div>
  );
}

export default LocationPage;
