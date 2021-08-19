import React from 'react';
import PropTypes from 'prop-types';

import './ek-table.scss';

const EKTable = props => {
  return (
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
  );
};

EKTable.propTypes = {
  children: PropTypes.node
};

export default EKTable;