export default (state, action) => {
    switch (action.type) {

        case 'JOINED':
            return {
                ...state,
                isJoined: true,
                userName: action.payload.userName,
                currentRoomID: action.payload.roomID
            }

        case 'SET_DATA':
            return {
                ...state,
                users: action.payload.users,
                messages: action.payload.messages
            }

        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            }

        case 'SET_CURRENT_RoomID':
            return {
                ...state,
                currentRoomID: action.payload
            }

        case 'SET_ROOMS_LIST':
            return {
                ...state,
                allRoomID: [...state.allRoomID, action.payload]
            }

        case 'NEW_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }

        default:
            return state
    }
}