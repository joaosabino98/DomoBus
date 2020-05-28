import * as React from 'react';

const UserContext = React.createContext({
    userID: null,
    homeID: null,
    division: [],
    type: [],
    property: [],
    device: [],
    access: []
});


export default UserContext;