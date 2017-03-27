import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import './dropdown.scss';

class Dropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    onDropdownClick = () => this.setState({isOpen: !this.state.isOpen});
    onOptionClick = id => () => this.props.onOptionChange(id);
    optionClassName = id => classNames('dropdown-option', {
        ['dropdown-option-selected']: id === this.props.selectedID
    });

    render() {
        const {
            isOpen
        } = this.state;
        const {
            options,
            selectedID
        } = this.props;

        const optionsClassNames = classNames('dropdown-options', {
            ['dropdown-options-open']: isOpen
        });

        return (
            <div className="dropdown">
                <div className="dropdown-selected" onClick={this.onDropdownClick}>
                    {
                        options.find(o => o.id === selectedID).value
                    }
                    <span className="dropdown-arrow">
                        <i className={`fa ${isOpen ? 'fa-angle-up' : 'fa-angle-down'}`}/>
                    </span>
                </div>
                <ul className={optionsClassNames}>
                    {
                        options.map(
                            (o, i) =>
                                <li key={i} className={this.optionClassName(o.id)} onClick={this.onOptionClick(o.id)}>
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
    selectedID: PropTypes.number.isRequired,
    onOptionChange: PropTypes.func.isRequired
};

export default Dropdown;
