import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon, } from '@ionic/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { close } from 'ionicons/icons';
import './GraphPage.css';

interface GraphPageProps {
  cardCount: Record<string, number>;
  decks: number;
  onClose: () => void;
}

const GraphPage: React.FC<GraphPageProps> = ({ cardCount, decks, onClose }) => {
  const data = Object.entries(cardCount).map(([Card, count]) => ({
    Card,
    Remaining: decks * 4 - count,
  }));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Remaining Cards</IonTitle>
          <IonButton slot="end" onClick={onClose}>
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="chart-container">
          <BarChart
            width={window.innerWidth * 1}
            height={window.innerHeight * 0.7}
            data={data}
            margin={{
              top: 70,
              right: 40,
              left: 0,
              bottom: 70,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Card" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Remaining" fill="#1e90ff" />
          </BarChart>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GraphPage;
