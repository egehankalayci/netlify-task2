import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = props => {
  return (
    <div className="container h-100">
      <div className="d-flex justify-content-center h-100">
        <div className="searchbar">
          <input className="search_input" type="text" name="search"  placeholder="Search..." value={ props.search } onChange={ props.onSearchChange }/>
          <i className="search_icon"><i className="fas fa-search" /></i>
        </div>
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func,
};

export default SearchInput;