import React from 'react';
import styles from "../css/HomePage.module.css"
import { Socket } from 'socket.io-client';
import CreateGamePage from './CreateGamePage';
import JoinGamePage from './JoinGamePage';

const HomePage = (props) => {

    const random = (length = 32) => {
        // Declare all characters
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
        // Pick characers randomly
        let str = '';
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    
        return str;
    
    };

    const createGame = e => {
        const gameID = random()
        console.log(gameID)
        console.log(props.socket.emit("create game", gameID))
        props.setPage(<CreateGamePage {...props} gameID={gameID} />)
    }

    const joinGame = e => {
        props.setPage(<JoinGamePage {...props} />)
    }

    return (
        <div className={styles.HomePage}>
            <h2>Welcome to Multiplayer TicTacToe</h2>
            <div className={styles.ChoiceContainer}>
                <div onClick={createGame} className={styles.ChoiceCreateGame}>
                    Create Game
                </div>
                <div onClick={joinGame} className={styles.ChoiceJoinGame}>
                    Join Game
                </div>
            </div>
        </div>
    );
}

export default HomePage;
