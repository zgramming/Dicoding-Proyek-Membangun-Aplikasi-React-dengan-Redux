import PropTypes from 'prop-types';

function Container({ children, className }) {
  return (
    <div className={`w-full px-5 mx-auto h-full 2xl:px-0 2xl:w-[800px] ${className}`}>
      {children}
    </div>
  );
}

Container.defaultProps = {
  className: '',
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;
