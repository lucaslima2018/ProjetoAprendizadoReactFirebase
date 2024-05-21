import { useState, createContext, useEffect, useContext } from "react";
import { auth, db} from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const [showNotificationError, setShowNotificationError] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const [currentUser, setCurrentUser] = useState(null);

    const showSnackbarError = (message) => {
        setNotificationMessage(message);
        setShowNotificationError(true);
      };
      
      const showSnackbarSuccess = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
      };


    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser(){
            const storageUser = localStorage.getItem('@sistema')

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false);
            }

            setLoading(false);
        }

        loadUser();
    }, [])


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setCurrentUser(user);
          setLoading(false);
        });
    
        return unsubscribe;
      }, []);

    async function signIn(email, password){
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid;

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
            }

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            // toast.success("Bem-vindo(a) de volta!")
            // alert("Bem-vindo(a) de volta!");
            showSnackbarSuccess("Bem-vindo(a) de volta!");
            navigate("/homeuser");
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            // toast.error("Ops algo deu errado!");
            // alert("Usuário ou senha inválidos!");
            showSnackbarError("Usuário ou senha inválidos!");
        })
    }

        
    // Cadastrar um novo user
    async function signUp(email, password, name){
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, "users", uid), {
                nome: name,
                avatarUrl: null
            })
            .then( () => {

                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                    avatarUrl: null
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                // toast.success("Seja bem-vindo ao sistema!");
                // alert("Seja bem-vindo ao sistema!");
                showSnackbarSuccess("Seja bem-vindo(a) ao sistema!");
                navigate("/home");
            })
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        })
    }

    function storageUser(data){
        localStorage.setItem('@sistema', JSON.stringify(data))
    }

    async function logout(){
        await signOut(auth);
        localStorage.removeItem('@sistema');
        setUser(null);
    }

    async function changePassword(newPassword){
        
        const user = auth.currentUser;

        await updatePassword(user, newPassword).then(() => {
            // alert("Senha alterada com sucesso!");
            showSnackbarSuccess("Senha alterada com sucesso!");
        })
        .catch((error) => {
            console.log("Erro ao alterar a senha", error);
            // alert("Erro ao alterar a senha");
            showSnackbarError("Erro ao alterar a senha");
        })
    }

    return(
        <AuthContext.Provider 
            value={{
                signed: !!user, //false
                user,
                signIn,
                signUp,
                logout,
                loadingAuth,
                loading,
                storageUser,
                setUser,
                changePassword,
                currentUser
            }}
        >
            {/* {children} */}

            {!loading && children}

            <Snackbar open={showNotificationError} autoHideDuration={3000} onClose={() => setShowNotificationError(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} style={{ top: '30px' }}>
                <MuiAlert elevation={6} variant="filled" onClose={() => setShowNotificationError(false)} severity="error">
                {notificationMessage}
                </MuiAlert>
            </Snackbar>
            <Snackbar open={showNotification} autoHideDuration={3000} onClose={() => setShowNotification(false)} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
                style={{ top: '30px' }}>
                <MuiAlert elevation={6} variant="filled" onClose={() => setShowNotification(false)} severity="success">
                {notificationMessage}
                </MuiAlert>
            </Snackbar>
        </AuthContext.Provider>
    )
}

export default AuthProvider;