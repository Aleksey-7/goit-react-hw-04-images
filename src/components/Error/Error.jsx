import PropTypes from 'prop-types';

export default function Error({ error }) {
  return (
    <div className="error-message">
      <h1>Something went wrong!</h1>
      <p>Status {error}</p>
    </div>
  );
}

Error.propTypes = {
  Error: PropTypes.string,
};
