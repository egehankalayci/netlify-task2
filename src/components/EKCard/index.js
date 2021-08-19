import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './ek-card.scss';

const EKCard = props => {
  const { data, children } = props;

  return (
    <div key={ data.id } className="ekcard">
      <div className="ekcard__header">
        <img className="ekcard__header__image"
          src={ data.image }
          alt={ data.name }
        />
        <span className="ekcard__header__title">{ data.name }</span>
      </div>
      <hr className="rounded"/>
      <div className="ekcard__body">
        <div className="ekcard__body__status">
          <i
            className={ cx('fas fa-circle',
              `ekcard__body__status__icon--${data.status?.toLowerCase()}`) }
          />
          <p className="ekcard__body__status__title">
            { data.status } - { data.species }
          </p>
        </div>
        <hr className="rounded"/>
        <p className="ekcard__body__info__lastKnownLocation__title">Last Known Location</p>
        <p className="ekcard__body__info__lastKnownLocation__info">{ data.location?.name }</p>
        <hr className="rounded"/>
        <p className="ekcard__body__info__firstSeemIn__title">First Seem In</p>
        <p className="ekcard__body__info__firstSeemIn__info">
          { data.firstSeem }
        </p>
        <hr className="rounded"/>
      </div>
      { children }
    </div>
  );
};

EKCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    status: PropTypes.oneOf(['Alive', 'Dead', 'unknown']),
    species: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.object,
    firstSeem: PropTypes.string
  }),
  children: PropTypes.node
};

export default EKCard;