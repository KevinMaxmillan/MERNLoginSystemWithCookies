
// import { createContext, useState, useEffect } from "react";
// import API from "../api/ApiInstance";

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {  
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         if (!user) {
//             API.get('/profile')
//                 .then(({ data }) => {
//                     setUser(data);
//                 })
//                 .catch(error => console.error("Error fetching profile:", error)); 
//         }
//     }, [user]); 
//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// }
