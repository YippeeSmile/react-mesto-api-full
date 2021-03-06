class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    get _headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        }
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            Promise.reject(res.status)
        }
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "GET",
                headers: this._headers
            })
            .then(this._getResponse)
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
                method: "GET",
                headers: this._headers
            })
            .then(this._getResponse)
    }

    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name,
                    about
                })
            })
            .then(this._getResponse)
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name,
                    link
                })
            })
            .then(this._getResponse)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
                method: "DELETE",
                headers: this._headers
            })
            .then(this._getResponse)
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: "PUT",
                headers: this._headers
            })
            .then(this._getResponse)
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: "DELETE",
                headers: this._headers
            })
            .then(this._getResponse)
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: isLiked ? "PUT" : "DELETE",
                headers: this._headers
            })
            .then(this._getResponse)
    }

    changeAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar
                })
            })
            .then(this._getResponse)
    }
}

export const api = new Api({
    baseUrl: 'https://api.yippee.smile.nomoredomains.xyz',
});