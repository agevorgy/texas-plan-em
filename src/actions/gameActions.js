import ActionList from './ActionList';
import socket from '../socket';

export const submitCard = value => ({
  type: ActionList.GAME.SUBMIT_CARD,
  value,
});

export const selectCard = value => ({
  type: ActionList.GAME.SELECT_CARD,
  value,
});

export const flipCards = value => ({
  type: ActionList.GAME.FLIP_CARDS,
  value,
});

export const resetGame = () => ({
  type: ActionList.GAME.RESET_GAME,
});

export const playerList = players => ({
  type: ActionList.GAME.UPDATE_PLAYERS,
  players,
});

export const submittedCards = cards => ({
  type: ActionList.GAME.SUBMITTED_CARDS,
  cards,
});

export const watchPlayerList = (dispatch, gameId) => {
  // retrieves player list from server
  socket.on('user-joined', (players) => {
    dispatch(playerList(players));
  });
};

export const watchCardsUp = (dispatch, gameId) => {
  socket.on('flip-cards', (value) => {
    dispatch(flipCards(value));
  });
};

export const watchSubmittedCards = (dispatch, gameId) => {
  // retrieve cards from server
  socket.on('watch-submit-card', (cards) => {
    dispatch(submittedCards(cards));
  });
};

export const setSubmitCard = (gameId, player, card) => {
  return () => {
    const postData = {
      session: gameId,
      user: player,
      card,
    };
    socket.emit('set-card', postData);
  };
};

export const setCardsUp = (gameId) => {
  return () => socket.emit('set-cards-up', gameId);
};

export const sendResetGame = (gameId) => {
  return () => socket.emit('reset-game', gameId);
};
