////////////////////////////////////////////////////
// Player Factory Function
////////////////////////////////////////////////////

const player = (name, id, pic) => {
    const getName = () => name
    const getId   = () => id
    const getPic  = () => pic

    return {getName, getId, getPic}
}

////////////////////////////////////////////////////
// Declare Global Variables
////////////////////////////////////////////////////

let x = 'img/x.svg'
let o = 'img/o.svg'

const player1 = player('jon', 1, x)
const player2 = player('glenn', 2, o)

////////////////////////////////////////////////////
// GameBoard Module
////////////////////////////////////////////////////

let GameBoard = (() => {
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    const getBoard  = () => board
    const placeMark = (player, square) => {
        if (board[square] == 0) {
            board[square] = player.getId()
            console.log(`Player ${player.getId()} marked square ${square}!`)
            return true
        }
        console.log(`Player ${board[square]} has already marked square ${square}! Try again!`)
        return false
    }

    const reset = function() {
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }

    const checkWin = (player) => {
        let id = player.getId()
        return ( // Horizontals
                 (board[0] == board[1] && board[1] == board[2] && board[2] == id) ||
                 (board[3] == board[4] && board[4] == board[5] && board[5] == id) ||
                 (board[6] == board[7] && board[7] == board[8] && board[8] == id) ||
                 // Verticals
                 (board[0] == board[3] && board[3] == board[6] && board[6] == id) ||
                 (board[1] == board[4] && board[4] == board[7] && board[7] == id) ||
                 (board[2] == board[5] && board[5] == board[8] && board[8] == id) ||
                 // Diagonals
                 (board[0] == board[4] && board[4] == board[8] && board[8] == id) ||
                 (board[2] == board[4] && board[4] == board[6] && board[6] == id) )
    }

    return {getBoard, placeMark, checkWin, reset}
})()

////////////////////////////////////////////////////
// Game Logic
////////////////////////////////////////////////////

let GameController = ((player1, player2) => {
    let turn = 0
    let playing = true;
    let currentPlayer = player1

    const switchPlayer = function() {
        if (currentPlayer == player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        }
    }

    const setSquare = function(square, index) {
        if (GameBoard.placeMark(currentPlayer, index) && playing) {
            
            // Set X or O
            let pic = new Image(140, 140)
            pic.src = currentPlayer.getPic()
            square.appendChild(pic)

            // Increment turn
            turn++
            
            // See if the move ends the game
            if (GameBoard.checkWin(currentPlayer)) {
                alert(`Game Over! Player ${currentPlayer.getId()} wins!`)
                playing = false;
            } else if (turn >= 9) {
                alert('The game is a tie!')
                playing = false;
            }
    
            // Switch to the other player
            switchPlayer()
        }
    }

    // Set square logic
    const squares = document.querySelectorAll('div.square')
    squares.forEach( function(square, index) {
        square.addEventListener('click', function() {
            setSquare(square, index)
        })
    })
    
    const reset = function() {
        squares.forEach( function(square) {
            while (square.firstChild) {
                square.removeChild(square.firstChild)
            }
        })

        currentPlayer = player1
        turn = 0
        playing = true;
    }

    return {reset}
})(player1, player2)

const resetGame = function() {
    GameBoard.reset()
    GameController.reset()
}