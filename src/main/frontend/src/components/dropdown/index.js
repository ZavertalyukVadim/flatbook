import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import {isNull, noop} from 'lodash';
import Loader from '../loader';
import './dropdown.scss';

class Dropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    onDropdownClick = () => {
        this.setState({isOpen: !this.state.isOpen});
        document.body.addEventListener('click', () => this.setState({isOpen: false}))
    };
    onOptionClick = id => () => {
        this.props.onOptionChange(id);
        this.setState({
            isOpen: false
        })
    };
    optionClassName = id => classNames('dropdown-option', {
        ['dropdown-option-selected']: id === this.props.selectedID
    });

    render() {
        const {
            isOpen
        } = this.state;
        const {
            options,
            selectedID,
            loader,
            defaultMassage,
            disabled,
            className
        } = this.props;

        const optionsClassName = classNames('dropdown-options', {
            ['dropdown-options-open']: isOpen
        });

        const dropdownClassName = classNames('dropdown-selected', {
            ['dropdown-disabled']: disabled
        });

        return (
            <div className={`dropdown ${className}`}>
                <div className={dropdownClassName} onClick={disabled ? noop : this.onDropdownClick}>
                    {
                        isNull(selectedID) ? defaultMassage : options.find(o => o.id === selectedID).value
                    }
                    <span className="dropdown-arrow">
                        <i className={`fa ${isOpen ? 'fa-angle-up' : 'fa-angle-down'}`}/>
                    </span>
                </div>
                <ul className={optionsClassName} onAbort={this.onOptionClick(selectedID)}>
                    {
                        loader ? <Loader/> :
                            options.map(
                                (o, i) =>
                                    <li key={i}
                                        className={this.optionClassName(o.id)}
                                        onClick={this.onOptionClick(o.id)}>
                                        {o.value}
                                    </li>
                            )
                    }
                </ul>
            </div>
        );
    }
}

Dropdown.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            id: PropTypes.number
        })
    ).isRequired,
    selectedID: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    onOptionChange: PropTypes.func.isRequired,
    defaultMassage: PropTypes.string,
    disabled: PropTypes.bool,
    loader: PropTypes.bool,
    className: PropTypes.string
};

Dropdown.defaultProps = {
    className: '',
    defaultMassage: '',
    disabled: false,
    loader: false
};

export default Dropdown;
