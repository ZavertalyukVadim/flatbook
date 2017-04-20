import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import './modal.scss';

class Modal extends Component {

    componentWillUpdate(nextProps) {
        if (nextProps.isOpen) {
            document.body.classList.add('scrollbar-disabled');
        } else {
            document.body.classList.remove('scrollbar-disabled');
        }
    };

    render() {

        const {
            isOpen,
            close,
            children
        } = this.props;

        const modalClassName = classNames('modal', {
            ['modal-open']: isOpen
        });

        return (
            <div className={modalClassName}>
                <div className="modal-content">
                    <span className="modal-close" onClick={close}><i className="fa fa-times"/></span>
                    {children}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
};

export default Modal;
