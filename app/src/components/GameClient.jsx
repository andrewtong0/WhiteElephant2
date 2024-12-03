import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import AnswerInput from './AnswerInput';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const GameClient = () => {
    const [socket, setSocket] = useState(null);
    const [nickname, setNickname] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [clientId, setClientId] = useState(null);
    const [gamedata, setGamedata] = useState(null);
    const [playerCount, setPlayerCount] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    const roomName = 'gameRoom1';

    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket);

        newSocket.on('connect', () => {
            const savedNickname = localStorage.getItem('nickname');
            const savedIsAdmin = localStorage.getItem('isAdmin') === 'true';
            const savedClientId = localStorage.getItem('clientId');

            if (savedNickname && savedClientId) {
                rejoinRoom(newSocket, savedNickname, savedIsAdmin, savedClientId);
            }
        });

        newSocket.on('reconnected', (data) => {
            setClientId(data.id);
            setNickname(data.nickname);
            setIsAdmin(data.isAdmin);
            setIsConnected(true);
        });

        return () => newSocket.disconnect();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('gamedataUpdated', (newData) => setGamedata(newData));
            socket.on('joinedRoom', (data) => {
                setClientId(data.id);
                setNickname(data.nickname);
                setIsAdmin(data.isAdmin);
                setIsConnected(true);
                localStorage.setItem('clientId', data.id);
            });
            socket.on('gamedataUpdated', (newData) => {
                setGamedata(newData);
                console.log('Gamedata received:', newData);
            });
            socket.on('playerCountUpdated', (count) => setPlayerCount(count));
            socket.on('error', (message) => setError(message));
        }
    }, [socket]);

    const handleSubmit = (answer) => {
        if (answer) {
            // Emit the 'submitAnswer' event to the server with the current answer
            socket.emit('submitAnswer', { roomName, clientId, answer });
        } else {
            alert('Please enter an answer before submitting.');
        }
    };

    const handleJoinRoom = () => {
        if (nickname.trim()) {
            saveSessionData(nickname, isAdmin);
            socket.emit('joinRoom', { roomName, nickname, isAdmin, clientId: null });
        } else {
            alert('Please enter a nickname.');
        }
    };

    const handleDisconnect = () => {
        if (socket) {
            socket.emit('disconnectAndRemove', { roomName, clientId });
            localStorage.clear(); // Clear all stored client data
            socket.disconnect();
            setIsConnected(false); // Update state to reflect disconnection
        }
    };

    const rejoinRoom = (currentSocket, savedNickname, savedIsAdmin, savedClientId) => {
        currentSocket.emit('joinRoom', {
            roomName,
            nickname: savedNickname,
            isAdmin: savedIsAdmin,
            clientId: savedClientId,
        });
    };

    const saveSessionData = (nickname, isAdmin) => {
        localStorage.setItem('nickname', nickname);
        localStorage.setItem('isAdmin', isAdmin.toString());
    };

    const updateGamedata = () => {
        if (socket && isConnected) {
            socket.emit('updateGamedata', {
                roomName,
                clientId,
                newData: { score: Math.floor(Math.random() * 100), status: 'running' },
            });
        }
    };

    const advanceGameState = () => {
        if (socket && isConnected) {
            socket.emit('advanceGameState', { roomName, clientId });
        }
    }

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

    return (
        <ThemeProvider theme={darkTheme}>
            <h1>React Socket.IO Client</h1>
            {isConnected ? (
                <div>
                    <p>Nickname: {nickname}</p>
                    <p>Admin Status: {isAdmin ? 'Admin' : 'Player'}</p>
                    <p>Client ID: {clientId || 'Waiting for ID...'}</p>
                    <p>Score: {gamedata?.scores?.[clientId] || 0}</p>
                    {
                        gamedata?.questionPointGain?.[clientId] !== undefined && (
                            <p style={{ color: gamedata?.questionPointGain?.[clientId] > 0 ? 'green' : 'red' }}>+{gamedata?.questionPointGain?.[clientId]}</p>
                        )
                    }
                    <div style={{textAlign: 'left', fontSize: '14px'}}>Gamedata: {gamedata ? <pre>{JSON.stringify(gamedata, null, 2)}</pre> : 'Waiting for updates...'}</div>
                    <p>Players Connected: {playerCount}</p>
                    {isAdmin && (<>
                        <button onClick={advanceGameState}>Advance Game State</button>
                        <button onClick={updateGamedata}>Update Gamedata</button>
                    </>)}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button onClick={handleDisconnect}>Disconnect and Remove</button>
                    {
                        gamedata?.gamestate === "QUESTION" && (
                            <AnswerInput gamedata={gamedata} handleSubmit={handleSubmit} />
                        )
                    }
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Enter your nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            Join as Admin
                        </label>
                    </div>
                    <button onClick={handleJoinRoom}>Join Room</button>
                </div>
            )}
        </ThemeProvider>
    );
};

export default GameClient;
