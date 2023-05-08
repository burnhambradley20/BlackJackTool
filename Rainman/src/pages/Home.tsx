import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rain Man</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="home-container">
          <h1>Instrutions.</h1>
          <p>-Results will not be instant.</p>
          <p>-You must input every card played by dealer and players or results will not be accurate.</p>
          <p>-For best results bet at least 200 units. A unit refers to the minimum bet at your table. If the minimum bet is 5 chips, one unit is equivalent to 5 chips.</p>
          <p>-Most professional card counters prefer to play with 1000 units or more.</p>
          <p>    Disclaimer: This application is intended for educational and entertainment purposes only. Using card counting techniques or similar strategies to gain an unfair advantage in casinos may be against the law in some jurisdictions. The developer of this application is not responsible for any losses, legal consequences, or damages arising from the use or misuse of this application. Users are solely responsible for complying with their local laws and regulations.</p>
          <IonButton routerLink="/Splash" expand="block">
            Get Started
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
