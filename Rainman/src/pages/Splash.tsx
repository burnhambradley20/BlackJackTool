import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  useIonPicker,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonModal,
} from '@ionic/react';
import './Splash.css';
import GraphPage from './GraphPage';

const Splash: React.FC = () => {
  // State variables
  const [count, setCount] = useState(0);
  const [cards, setCards] = useState(0);
  const [decks, setDecks] = useState(1);
  const numCardsInPlay = 52 * decks;
  const [recommendedMove, setRecommendedMove] = useState('');
  const [previousCard, setPreviousCard] = useState<CardKey | null>(null);
  const [showGraph, setShowGraph] = useState(false);

  const [cardCount, setCardCount] = useState({
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': 0,
    'J': 0,
    'Q': 0,
    'K': 0,
    'A': 0,
  });

  // Card types
  type CardKey = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
  type CardValues = Record<CardKey, number>;

  // Hi-Lo card values
  const hiLo: CardValues = {
    '2': 1,
    '3': 1,
    '4': 1,
    '5': 1,
    '6': 1,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': -1,
    'J': -1,
    'Q': -1,
    'K': -1,
    'A': -1,
  };

  // Update the count based on the played card
  const updateCount = (card: CardKey) => {
    if (card in hiLo && cardCount[card] < decks * 4) {
      setPreviousCard(card);
      setCardCount({ ...cardCount, [card]: cardCount[card] + 1 });
      setCards(cards + 1);
      setCount(count + hiLo[card]);
      setRecommendedMove(getRecommendedMove(count + hiLo[card], numCardsInPlay - cards - 1));
    }
  };

  // Reset the count and card counts
  const resetCount = () => {
    setCount(0);
    setCards(0);
    setRecommendedMove('');
    setCardCount({
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      'J': 0,
      'Q': 0,
      'K': 0,
      'A': 0,
    });
  };

  // Picker for selecting the number of decks
  const [present] = useIonPicker();
  const openPicker = async () => {
    present({
      cssClass: 'picker-at-bottom',
      columns: [
        {
          name: 'DeckSize',
          options: Array.from({ length: 12 }, (_, i) => ({
            text: `${i + 1}`,
            value: `${i + 1}`,
          })),
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            setDecks(Number(value.DeckSize.value));
            resetCount();
          },
        },
      ],
    });
  };

  // Get the recommended move based on the count and remaining cards
  const getRecommendedMove = (count: number, remainingCards: number) => {
    const trueCount = count / (remainingCards / 52);
    if (count >= 4) {
      return 'STAY';
    } else if (count <= 0) {
      return 'HIT';
    } else {
      if (trueCount >= 1) {
        return 'STAY';
      } else {
        return 'HIT';
      }
    }
  };

  const undo = () => {
    if (previousCard) {
      setCardCount({ ...cardCount, [previousCard]: cardCount[previousCard] - 1 });
      setCards(cards - 1);
      setCount(count - hiLo[previousCard]);
      setRecommendedMove(getRecommendedMove(count - hiLo[previousCard], numCardsInPlay - cards + 1));
      setPreviousCard(null);
    }
  };
  const close = () => {
    setShowGraph(false);
  };
  
  return (
    <div className="container" id="data">
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButton slot="start" onClick={undo}>
              Undo
            </IonButton>
            <IonTitle>
              {previousCard ? `Last Card: ${previousCard}` : 'Last: -'}
            </IonTitle>
            <IonButton slot="end" onClick={() => setShowGraph(true)}>
              Graph
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent onClick={() => setShowGraph(false)}>
          <h1 id="count">{count}</h1>
          <p>CARD COUNT</p>
          <h1 id="recommendedMove">{recommendedMove}</h1>
          <p>Selected Amount of Decks: {decks}</p>
          <div className="card-buttons">
            {Object.entries(hiLo).map(([key, value]) => {
              const suit = '♠';
              const cardReachedMax = cardCount[key as CardKey] >= decks * 4;
              return (
                <IonButton
                  key={key}
                  className={`card-button ${cardReachedMax ? 'disabled' : ''}`}
                  onClick={() => updateCount(key as CardKey)}
                  disabled={cardReachedMax}
                >
                  <div className="top-left">
                    <span className="card-value">{key}</span>
                    <span className="card-suit">{suit}</span>
                  </div>
                  <div className="bottom-right">
                    <span className="card-value">{key}</span>
                    <span className="card-suit">{suit}</span>
                  </div>
                </IonButton>
              );
            })}
          </div>
          <div className="action-buttons">
            <IonButton onClick={resetCount}>
              Clear
            </IonButton>
            <IonButton onClick={openPicker}>
              Select Number of Decks
            </IonButton>
          </div>
        </IonContent>
        <IonModal isOpen={showGraph} onDidDismiss={() => setShowGraph(false)}>
          <GraphPage onClose={() => setShowGraph(false)} cardCount={cardCount} decks={decks} />
          <IonButton onClick={() => setShowGraph(false)}>Close</IonButton>
        </IonModal>
      </IonPage>
    </div>
  );
};

export default Splash;