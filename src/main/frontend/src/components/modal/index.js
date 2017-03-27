import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './modal.scss';

const Modal = props => {
    const {
        isOpen,
        close,
        children
    } = props;

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
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
};

export default Modal;
