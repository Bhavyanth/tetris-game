import React from 'react'
import { createStage } from '../gameHelpers';
import Display from './Display'
import Stage from './Stage'
import StartBtn from './StartBtn'

const Tetris = () => {
    return (
        <div>
            <Stage stage={createStage}/>
            <aside>
                <div>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
                </div>
                <StartBtn />
            </aside>
        </div>
    );
};

export default Tetris;
