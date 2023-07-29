import React, { useEffect} from 'react';
import styles from "../css/CreateGamePage.module.css"
import GamePage from './GamePage';

const CreateGamePage = (props) => {

    useEffect(() => {
        props.socket.on(props.gameID, id => {
            props.setPage(<GamePage {...props} symbol="X" />)
        })
        return () => {
            props.socket.off(props.gameID)
        }
    }, [props.socket])

    return (
        <div className={styles.CreateGamePage}>
            <div className={styles.Container}>
                <h3>Your Game ID is : {props.gameID}</h3>
                <div className={styles.InnerContainer}>
                    Waiting for opponent to join...
                </div>
            </div>
        </div>
    );
}

export default CreateGamePage;
