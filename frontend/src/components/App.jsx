import React, {useEffect, useState} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import '../index';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as mestoAuth from '../utils/mestoAuth.jsx';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isSuccessInfoTooltipOpen, setIsSuccessInfoTooltipOpen] = useState(false);
  const [isErrorInfoTooltipOpen, setIsErrorInfoTooltipOpen] = useState(false);
  const [email, setEmail] = useState('');
  
  const history = useHistory();

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      history.push('/signin');
      return;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
       .then(([res, cards]) => {
          const userData = {
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        }
        setCurrentUser(userData);
        setCards(cards.reverse());
        })
        .catch((err) => {
        console.log(`????????????: ${err}`)
      })
    }
  }, [history, loggedIn]);

  const checkToken = () => {
    const jwt = localStorage.getItem('token');
    if(jwt) {
      mestoAuth.getContent(jwt)
      .then((res) => {  
        if (res) {
          setLoggedIn(true);
          setEmail(res.email);
          history.push('/')
      }
      })
      .catch((err) => console.log(err));
      localStorage.removeItem('token');
    }
  }

    const handleSignOut = () => {
      setLoggedIn(false);
      localStorage.removeItem('jwt');
      setCurrentUser({});
      history.push('/signin');
    }

    const handleRegister = ({ email, password }) => {
      return mestoAuth
      .register({ email, password})
      .then(() => {
        setIsSuccessInfoTooltipOpen(true);
        history.push('/signin');
      })
      .catch((err) => {
        setIsErrorInfoTooltipOpen(true);
        console.log(`????????????: ${err}`)
      })
    }

    const handleLogin = (email, password) => {
      return mestoAuth
      .authorize({ email, password})
      .then(() => {
        if (!email || !password) {
          return
        }
        setLoggedIn(true);
        setEmail(email);
          
          //setIsSuccessInfoTooltipOpen(true);
        history.push('/');
      })
      .catch((err) => {
        setIsErrorInfoTooltipOpen(true);
        console.log(`????????????: ${err}`)
      })
    }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({
      name: "",
      link: "",
    }); //null
    setIsImagePopupOpen(false);
    setIsSuccessInfoTooltipOpen(false);
    setIsErrorInfoTooltipOpen(false);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true)
    setSelectedCard(card)
  }

  const handleUpdateUser = (obj) => {
    api
      .editProfile(obj.name, obj.about)
      .then((res) => {
        setCurrentUser({ ...currentUser, name: res.name, about: res.about })
        closeAllPopups()
      })
      .catch((e) => console.error(e))
  }

  const handleUpdateAvatar = (obj) => {
    api
      .changeAvatar(obj.avatar)
      .then((res) => {
        setCurrentUser({ ...currentUser, avatar: res.avatar })
        closeAllPopups()
      })
      .catch((e) => console.error(e))
  }

  const handleAddPlaceSubmit = (card) => {
    api
      .addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((e) => console.error(e))
  }

  //?????? ????????????????

  const handleCardLike = (card) => {
    // ?????????? ??????????????????, ???????? ???? ?????? ???????? ???? ???????? ????????????????
    const isLiked = card.likes.some((item) => item === currentUser._id)
    // ???????????????????? ???????????? ?? API ?? ???????????????? ?????????????????????? ???????????? ????????????????s
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((c) => {
        console.log('like', c)
        setCards((cards) =>
          cards.map((item) => (item._id === card._id ? c : item)),
        )
      })
      .catch((e) => console.error(e))
  }

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id))
      })
      .catch((e) => console.error(e))
  }

  return (
    
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email}
        handleSignOut={handleSignOut}/>
      
      <Switch>
      <ProtectedRoute
            loggedIn={loggedIn}
            exact path="/"
          >
           <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          handleCardClick={handleCardClick}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
          cards={cards}
           />
          </ProtectedRoute>
       
        <Route path='/signup'>
          <Register onRegister={handleRegister} />
        </Route> 
        <Route path='/signin'>
          <Login onLogin={handleLogin}/>
        </Route>
        </Switch>
        {loggedIn && <Footer />}

        <InfoTooltip
        isOpen={isSuccessInfoTooltipOpen || isErrorInfoTooltipOpen}
        isSuccess={isSuccessInfoTooltipOpen}
        isError={isErrorInfoTooltipOpen}
        onClose={closeAllPopups} />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} 
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen} />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
        />
        <AddPlacePopup
          onAddPlaceSubmit={handleAddPlaceSubmit}
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
        />
        <PopupWithForm
          onClose={closeAllPopups}
          name="card-delete"
          title="???? ???????????????"
          formName="card-form"
          submitButtonValue="????"
        />
      </div>
    </CurrentUserContext.Provider>
    
  )
}

export default App;