import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = props => {
  return (
    <div>
      <div>
        <div className="searchbar">
          <form onSubmit={ props.onPressSubmit }>
            <input className="search_input" type="text" name="search"  placeholder="Search..." value={ props.search } onChange={ props.onSearchChange }/>
            <i className="search_icon"><i className="fas fa-search" /></i>
          </form>
        </div>
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func,
  onPressSubmit: PropTypes.func
};

export default SearchInput;