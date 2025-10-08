import React, { useRef, useState } from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';
import ConfettiCannon from 'react-native-confetti-cannon';


function App() {
  const [isCross, setIsCross] = useState<boolean>(true);
  const [gameWinner, setGameWinner] = useState<string>('');
  const setEmptyGame = () => new Array(9).fill('empty', 0, 9);
  const [gameState, setGameState] = useState(setEmptyGame);
  const confettiRef = useRef<any>(null);
  const isWinner = gameWinner !== 'Draw game... ⏳' && gameWinner

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(setEmptyGame);
  };

  const checkIsWinner = () => {
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⏳');
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (isWinner) {
      confettiRef.current.start()

      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#ffffff',
      });
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#ffffff',
      });
    }

    checkIsWinner();
  };

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#121212" />
      <View style={styles.container}>
        <Text style={styles.title}>Tic Tac Toe</Text>

        {gameWinner ? (
          <View style={styles.winnerBox}>
            <Text style={styles.winnerText}>{gameWinner}</Text>
          </View>
        ) : (
          <View style={styles.turnBox}>
            <Text style={styles.turnText}>
              Player {isCross ? 'X' : 'O'}'s turn
            </Text>
          </View>
        )}

        <FlatList
          numColumns={3}
          data={gameState}
          contentContainerStyle={styles.grid}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              style={styles.cell}
              onPress={() => onChangeItem(index)}>
              <Icons name={item} />
            </Pressable>
          )}
        />

        <Pressable style={styles.reloadBtn} onPress={reloadGame}>
          <Text style={styles.reloadText}>
            {gameWinner ? 'Start New Game 🆕' : 'Reload Game 🔁'}
          </Text>
        </Pressable>

        {isWinner && <ConfettiCannon
          count={100}
          origin={{ x: 200, y: 500 }}
          autoStart={true}
          ref={confettiRef}
          fadeOut={true}
          explosionSpeed={300}
          fallSpeed={2000}
          colors={['orange', 'white', 'lightgreen', 'blue']}
        />}

      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    color: '#f8f8f8ff',
    fontWeight: '700',
    marginBottom: 10,
    borderBottomColor: "white",
    borderBottomWidth: 1
  },
  turnBox: {
    marginVertical: 10,
  },
  turnText: {
    fontSize: 20,
    color: '#ffffff',
  },
  grid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: '#2b2b2b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    shadowColor: '#00e676',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  reloadBtn: {
    backgroundColor: '#00e676',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  reloadText: {
    color: '#1b1b1b',
    fontSize: 18,
    fontWeight: '700',
  },
  winnerBox: {
    marginVertical: 10,
    backgroundColor: '#2e7d32',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  winnerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default App;
