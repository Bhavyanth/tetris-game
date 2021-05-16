export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
    Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        // Collision detection
        for (let x = 0; x < player.tetromino[y].length; x += 1) {
               // check that we are on the actual tetro cell
               if(player.tetromino[y][x] !== 0){
                   if(
                   // Check whether our move is inside the game stage (height & width)
                   !stage[y + player.pos.y + moveY] ||
                   // Move shouldn't be below the stage
                   !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                   // Cell that we're moving isn't set to clear
                   stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
                   'clear'
                   ){
                       return true;
                   }} 
        }
    }
}