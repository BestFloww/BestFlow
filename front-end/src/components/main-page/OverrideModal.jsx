import React from 'react';
import Modal from 'react-modal';
import BaseButton from '../general/BaseButton';
import PropTypes from "prop-types";

class OverrideModal extends React.Component {

    overrideFile(){
        this.props.uploadFileWithOverride();
        this.props.toggleModal();
    }

    componentDidMount() {
        Modal.setAppElement("body");
    }

    render() {
        return (
            <Modal
                isOpen={this.props.show}
                className="container w-40 md:w-60 mx-auto bg-purple-100 font-cabin rounded-lg shadow-lg py-3 mt-[40vh] flex flex-col"
                onRequestClose={this.props.toggleModal}
                shouldCloseOnEsc={true}
                ariaHideApp={false}
            >
                <h2 className="justify-center flex m-3 pl-0.5 text-center" data-testid="override-modal">
                    Project ID is already present. Do you want to override?
                </h2>
                <div className="justify-center flex m-7 flex-col">
                    <div className="justify-center flex">
                        <BaseButton
                            click={(e)=>this.overrideFile()}
                            text="Confirm"
                            size="sm"
                        />
                    </div>
                </div>
            </Modal>
        )
    }
}

OverrideModal.propTypes = {
    show: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    uploadFileWithOverride: PropTypes.func.isRequired,
}

export default OverrideModal;