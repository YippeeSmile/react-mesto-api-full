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
  const [selectedCard, setSelectedCard] = useState(null);
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
        .then(([ProfileData, cardsData]) => {
          console.log('ProfileData, cardsData', ProfileData, cardsData)
        const data = {
          name: ProfileData.name,
          about: ProfileData.about,
          avatar: ProfileData.avatar,
          _id: ProfileData._id,
        }
        console.log(cardsData, 'cardsdata')
        setCurrentUser(data);
        setCards(cardsData);
        })
        .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
    }
  }, [loggedIn]);

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      mestoAuth.getContent(jwt)
      .then((res) => {  
        console.log(res, 'res')
        if (res) {
          console.log('tokencheckres', res)
          setLoggedIn(true);
          setEmail(res.email);
          history.push('/')
      }
      })
      .catch((err) => console.log(err));
      localStorage.removeItem('jwt');
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
        console.log(`Ошибка: ${err}`)
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
        console.log(`Ошибка: ${err}`)
      })
    }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
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

  const handleCardClick = (obj) => {
    setSelectedCard(obj)
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

  //про карточки

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((item) => item._id === currentUser._id)
    // Отправляем запрос в API и получаем обновлённые данные карточкиs
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((c) => {
        setCards((cards) =>
          cards.map((item) => (item._id === card._id ? c : item)),
        )
      })
      .catch((e) => console.error(e))
  }

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((res) => {
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
          title="Вы уверены?"
          formName="card-form"
          submitButtonValue="Да"
        />
      </div>
    </CurrentUserContext.Provider>
    
  )
}

export default App;