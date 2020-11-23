import React, {useState} from 'react';

const Modal = () =>{
    const [modalVisible, setModalVisible] = useState(false)
    const openModal = () => {
        setModalVisible(true)
    }
    const closeModal = () => {
        setModalVisible(false)
    }
    return (
        <>
        <button onClick={openModal}>Open Modal</button>
        {
            modalVisible && <Modal
            visible={modalVisible}
            >Hello</Modal>
        }
        </>
    );
}

export default Modal;