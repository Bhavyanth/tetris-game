import React from 'react'
import { StyledStartBtn } from './styles/StyledStartBtn';

const StartBtn = ({ callBack }) => (
        <StyledStartBtn onClick={callBack}>
            Start Game
        </StyledStartBtn>
    );

export default StartBtn;
