import React from "react";

// create context object
const UserContext = React.createContext();

// the provider components to consume/ use the context and supply the necessary information needed to the context

export const UserProvider = UserContext.Provider;


export default UserContext;