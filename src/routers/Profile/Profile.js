import React from 'react';
import styled from 'styled-components';

const Profile = () => {
    return(
        <View>
            <Close onClick={close}>&times;</Close>
            <Photo>
                <div>test</div>
            </Photo>
            <Name>지연</Name>
        </View>
    );
}

export default Profile;

const View = styled.div`
    width: 340px;
    height: 640px;
    margin: 0 auto;
    position: relative;
    padding: 7px;
    border: 1px solid;
`;

const Photo = styled.div`
    width: 100%;
    height: 120px;
    background: blue;
    margin-top: 320px;
`;

const Name = styled.div`
    font-size: 17px;
    font-weight: bold;
    width: 100%;
    text-align: center;
    padding: 5px 0;
`;

const Close = styled.div`
    font-size: 25px;
    width: 20px;
    height: 20px;
    background: red;
    line-height: 20px;
    text-align: center;
`;

