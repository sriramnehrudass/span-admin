import axios from 'axios'

export default function ({ store, redirect }) {
    // If the user is authenticated redirect to home page

    if (process.browser) {

        var token = window.localStorage.getItem('token')
        var expiration = window.localStorage.getItem('expiration')

        if (token == null || expiration == null) {
            return redirect('/login')
        } else if (new Date().getTime() > expiration) {
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('expiration')
            return redirect('/login')
        }
    }
}