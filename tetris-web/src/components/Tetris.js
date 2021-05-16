import React from 'react'
import { createStage } from '../gameHelpers';
import Display from './Display'
import Stage from './Stage'
import StartBtn from './StartBtn'
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

const Tetris = () => {
    return (
        <StyledTetrisWrapper>
            <StyledTetris>
            <Stage stage={createStage}/>
            <aside>
                <div>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
                </div>
                <StartBtn />
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;
