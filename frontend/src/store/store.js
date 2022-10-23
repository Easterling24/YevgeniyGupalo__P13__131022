// "@vitejs/plugin-react": "^1.0.7",
// "eslint": "^8.9.0",
// "eslint-config-prettier": "^8.3.0",
// "eslint-plugin-prettier": "^4.0.0",
// "eslint-plugin-react": "^7.28.0",
// "prettier": "^2.5.1",
// "vite": "^2.8.0"

import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"


const store = configureStore ({
    reducer: {
        user:userReducer
    }
})

export default store