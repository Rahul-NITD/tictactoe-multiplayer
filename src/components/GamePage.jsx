import React, { useEffect, useState } from 'react';
import styles from "../css/GamePage.module.css"
import { ImCross } from "react-icons/im"
import { FaCircleDot } from "react-icons/fa6"
import HomePage from './HomePage';

const GamePage = (props) => {

    const [turn, setTurn] = useState("X")
    const [board, setBoard] = useState({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
    })

    const [gameResult, setGameResult] = useState(null)

    useEffect(() => {
        props.socket.on(`recv move`, move => {
            if (move.gameID === props.gameID)
                setTurn(prev => {
                    setBoard(prev => {
                        return {
                            ...prev,
                            [move.num]: move.symbol
                        }
                    })
                    return move.symbol === "X" ? "O" : "X"
                })
        })

        props.socket.on("end game", res => {
            if (res.gameID === props.gameID) {
                setGameResult(res.result)
            }
        })

        return () => {
            props.socket.off(`recv move`)
            props.socket.off(`end game`)
        }
    }, [props.socket])

    const handleInput = num => {
        if (turn === props.symbol && board[num] === null) {
            console.log(turn)
            props.socket.emit(`make move`, {
                gameID: props.gameID,
                num: num,
                symbol: props.symbol
            })
        }
    }

    return (
        <div className={styles.GamePage}>
            <div className={styles.Container}>
                {
                    gameResult !== null ? 
                    <>
                    <div className={styles.GameResult}>
                        {
                            gameResult !== "D" ? 
                            gameResult === props.symbol ? "You Win 🥳" : "You Lose 😖"
                            : "Game Draw 💩"
                        }

                        <button onClick={e => props.setPage(<HomePage socket={props.socket} setPage={props.setPage} />)}>Home</button>
                    </div>
                    <div className={styles.GameOver}>
                        Game Over
                    </div>
                    </>
                    :
                    <>
                        <div className={styles.GameContainer}>
                            <div className={styles.Game}>
                                <div onClick={e => handleInput(0)} className={styles.GameBrick}>{board[0] ? board[0] === "X" ? <ImCross /> : <FaCircleDot /> : ""}</div>
                                <div onClick={e => handleInput(1)} className={styles.GameBrick}>{board[1] ? board[1] === "X" ? <ImCross /> : <FaCircleDot /> : ""}</div>
                                <div onClick={e => handleInput(2)} className={styles.GameBrick}>{board[2] ? board[2] === "X" ? <ImCross /> : <FaCircleDot /> : ""}</div>
                                <div onClick={e => handleInput(3)} className={styles.GameBrick}>{board[3] ? board[3] === "X" ? <ImCross /> : <FaCircleDot /> : ""}</div>
                                <div onClick={e => handleInput(4)} className={styles.GameBrick}>{board[4] ? board[4] === "X" ? <ImCross /> : <FaCircleDot /> : ""}</div>
                                <div onClick={e => handleInput(5)} className={styles.GameBrick}>{board[5] ? board[5] === "X" ? <ImCross /> : <FaCircleDot /> : ""}</div>
                                <div onClick={e => handleInput(6)} className={styles.GameBrick}>{board[6] ? board[6] === "X" ? <ImCross /> : <FaCircleDot /> : ""}</div>
                                <div onClick={e => handleInput(7)} className={styles.GameBrick}>{board[7] ? board[7] === "X" ? <ImCross /> : <FaCircleDot /> : ""}</div>
                                <div onClick={e => handleInput(8)} className={styles.GameBrick}>{board[8] ? board[8] === "X" ? <ImCross /> : <FaCircleDot /> : ""}</div>
                            </div>
                        </div>
                        <div className={styles.TurnIndicator}>
                            {
                                turn === props.symbol ? "Your Turn" : "Opponent's turn"
                            }
                        </div>
                    </>
                }

            </div>
        </div>
    );
}

export default GamePage;
