import React, { createContext, useContext, useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import { auth, db, doc, getDoc, setDoc } from "../helpers/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { CLIENT_ID } from "@env";
import { devMustWatch } from "../helpers/constants";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: CLIENT_ID,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let newUser = {
          uid: user.uid,
          name: user.displayName,
          watchLists: [
            // {
            //   title: "Dev's must watch",
            //   items: devMustWatch,
            //   desc: "A curated list of movies and TV everyone should watch once in their life!",
            // },
          ],
          readLists: [],
          profilePic: `https://avatars.dicebear.com/api/croodles-neutral/12345.svg`,
        };
        addUserToDB(newUser).catch((error) => console.log(error));
      } else {
        setUser(null);
      }
    });
  }, []);

  const getUserData = async () => {
    console.log("yo");
    const userRef = doc(db, "users", user.uid);
    const data = await getDoc(userRef);
    setUser(data.data());
  };

  const addUserToDB = async (newUser) => {
    const userRef = doc(db, "users", newUser.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, newUser).then(() => setUser(newUser));
    } else {
      setUser(newUser);
    }
    await getUserData();
  };

  const signInWithGoogle = async () => {
    await promptAsync().then(async (response) => {
      if (response?.type === "success") {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);
      }
    });
  };

  const logOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, logOut, getUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
