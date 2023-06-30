// import React, { useContext } from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { AuthContext } from '~/context/AuthContext';
//
// function PrivateRoute({ path, element }) {
//     const { isLoggedIn } = useContext(AuthContext);
//
//     return isLoggedIn ? (
//         <Route path={path} element={element} />
//     ) : (
//         <Navigate to="/admin/login" replace />
//     );
// }
//
// export default PrivateRoute;
