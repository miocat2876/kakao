import React, {useState , useEffect } from 'react';
import './Chats.css';
import MakeChat from '../MakeChat/MakeChat';


const Chats = ({ history }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const enterChat = () => {
        history.push('/chat/default');
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
		
    }, []);
    
    return (
        <div className="chats">
            <div className="header"></div>
            <div className="chatBoxList">
                <div className="chatBox">
                    <div className="chatBoxInner">
                        <div className="leftSection">
                            <div className="img"></div>
                            <div className="userName">chat1</div>
                        </div>
                        <div className="rightSection">
                            <button className="enterBtn" type="submit" onClick={enterChat}>Enter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="findChat">find</div>
                <div className="makeChat" onClick={openModal}>openModal</div>
                <MakeChat isOpen={isModalOpen} close={closeModal} history={history}/>
                
                {/* {
                    isModalOpen && <MakeChat 
                        visible={isModalOpen}
                        />
                } */}
            </div>
        </div>
    );
}

export default Chats;