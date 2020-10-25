import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

export class FirebaseProvider {
    // Initializes Firebase.
    firebaseConfig = {
        apiKey: "AIzaSyCeqMAiVwiQOUIRiZ6ndBSKa7BLYrgUMsk",
        authDomain: "uaec-2020.firebaseapp.com",
        databaseURL: "https://uaec-2020.firebaseio.com",
        projectId: "uaec-2020",
        storageBucket: "uaec-2020.appspot.com",
        messagingSenderId: "584353556169",
        appId: "1:584353556169:web:541f41efb92c04a6b30f18",
        measurementId: "G-DG62LPQLZ1"
    };
    initialized = false;
    instance;

    static getInstance() {
        if (initialized) {
            return instance;
        }
        firebase.initializeApp(firebaseConfig);
        instance = FirebaseProvider();
        return instance;
    }

    storeHouseholdInfo(householdID, info) {
        firebase.database.ref(`households/${householdID}`).set(
            info
        );
    }

    setupHouseholdInfoListener(householdId) {
        firebase.database().ref(`users/${householdId}`).on("value", (snapshot) => {
            const addressData = snapshot.val().address;

            const street = addressData.street;
            const city = addressData.city;
            const prov = addressData.prov;
            const postalCode = addressData.postalCode

            const familyMembers = snapshot.val().familyMembers;
            // iterates through each family member in a household
            for (i = 0; i < familyMembers.length; i++) {
                const firstName = familyMembers[i].firstName;
                const lastName = familyMembers[i].lastName;
                const PHN = familyMembers[i].PHN;
                const HIN = familyMembers[i].HIN;
                const medicalConditions = familyMembers[i].medicalConditions;
                console.log(`${firstName} ${lastName} is living at: ${street} ${city} ${postalCode}`);
            }
        })
    }

    storeHighScore(userId) {
        firebase.database().ref(`users/${userId}`).set({
            highscore: 9000
        });
    }

    setupHighscoreListener(userId) {
        firebase.database().ref(`users/${userId}`).on("value", (snapshot) => {
            const highscore = snapshot.val().highscore;
            console.log("New high score: " + highscore);
        });
    }
}