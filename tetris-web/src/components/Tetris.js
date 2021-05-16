import React, { useState } from 'react'
import { createStage, checkCollision } from '../gameHelpers';
import { usePlayer } from '../hooks/usePlayer'; 
import { useStage } from '../hooks/useStage'; 
import { useInterval } from '../hooks/useInterval'; 

import Display from './Display'
import Stage from './Stage'
import StartBtn from './StartBtn'
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { useGameStatus } from '../hooks/useGameStatus';

const Tetris = () => {

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const movePlayer = dir => {
        if(!checkCollision(player, stage, {x: dir, y:0})){
        updatePlayerPos({ x:dir, y:0 });
        }
    }

    const startGame = () => {
        //Reset everthing to intial state
        setStage(createStage());
        setDropTime(700);
        resetPlayer();   
        setGameOver(false);
        setScore(0);
        setLevel(0);
        setRows(0);
    };
    
    const drop = () => {
        //level increase upon clearing 10 rows
        if(rows > (level + 1)*10){
            setLevel(prev => prev+1);
            // increase the speed
            setDropTime(700 / (level+1)+200);
        } 
        if(!checkCollision(player, stage, {x: 0, y:1})){
        updatePlayerPos({ x:0, y:1, collided: false});
        }else{
            // Game over, last tetro is at stage height
            if(player.pos.y < 1){
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({x: 0, y: 0, collided: true});
        }
    }

    const keyUp = ({ keyCode }) => {
        if(!gameOver){
            if(keyCode === 40){
                setDropTime(700 / (level+1)+200);
            }
        }
    }
    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }
    //call back function when key is pressed from keyboard
    const move = ({ keyCode }) => {
        if(!gameOver) {
            if(keyCode === 37){
                movePlayer(-1);
            } else if(keyCode === 39){
                movePlayer(1);
            } else if(keyCode === 40){
                dropPlayer();
            } else if(keyCode === 38){
                playerRotate(stage,1);
            }
        }
    } 

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyledTetris>
            <Stage stage={stage}/>
            <aside>
                {gameOver ? (
                    <Display gameOver={gameOver} text="Game Over" />
                ) : (
                <div>
                <Display text={`Score: ${score}`} />
                <Display text={`Rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
                </div>
                )}
                <StartBtn callBack={startGame}/>
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;
