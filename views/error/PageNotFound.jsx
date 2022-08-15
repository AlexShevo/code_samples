import React from 'react';
import PropType from 'prop-types';

import { useScrollTop } from 'hooks';

const PageNotFound = ({ history }) => {
  useScrollTop();

  return (
    <div className="page-not-found">
      <h1>:( Page you are looking for doesn&apos;t exists.</h1>
      <br />
      <button
        className="button"
        onClick={history.goBack}
        type="button"
      >
        Go back
      </button>
    </div>
  );
};

PageNotFound.propTypes = {
  history: PropType.shape({
    goBack: PropType.func
  }).isRequired
};

export default PageNotFound;
