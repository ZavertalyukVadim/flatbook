import React, {PropTypes} from 'react';

const Header = props => {
    const {type, value} = props;

    if (type === 'primary') {
        return <h1>{value}</h1>;
    }

    if (type === 'secondary') {
        return <h2>{value}</h2>;
    }

    return <h3>{value}</h3>;
};

Header.propTypes = {
    value: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'secondary'])
};

export default Header;
