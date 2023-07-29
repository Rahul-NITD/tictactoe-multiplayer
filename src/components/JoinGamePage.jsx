import React, { useEffect, useState } from 'react';
import styles from "../css/JoinGamePage.module.css"
import GamePage from './GamePage';

const JoinGamePage = (props) => {

    const [gameID, setGameID] = useState("")

    useEffect(() => {
        props.socket.on(gameID, id => {
            props.setPage(<GamePage {...props} gameID={gameID} symbol="O" />)
        })
        return () => {
            props.socket.off(props.gameID)
        }
    }, [props.socket])

    const joinGame = e => {
        props.socket.emit("join game", gameID)
        console.log("joining as X")
        props.setPage(<GamePage {...props} gameID={gameID} symbol="O" />)
    }

    return (
        <div className={styles.JoinGamePage}>
            <div className={styles.Container}>
                <div className={styles.InputComponent}>
                    <div className={styles.Heading}>
                        <h2>Enter Game ID</h2>
                    </div>
                    <div className={styles.Input}>
                        <input value={gameID} onChange={e => setGameID(e.target.value)} type="text" />
                    </div>
                    <div className={styles.Button}>
                        <button onClick={joinGame}>Join Game</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinGamePage;
