// import {MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
// import api from "~/api/api";
// import React, {useEffect, useState} from "react";
//
// const Ratings = () => {
//
//     const [movies, setMovies] = useState([]);
//
//     useEffect(() => {
//         api.get('/movies/ratings')
//             .then((response) => {
//                 setMovies(response.data);
//             })
//             .catch((error) => {
//                 console.error(error);
//             })
//     })
//
//     const tableArray = ['ID', 'Ratings'];
//
//     return (
//             <div>
//                 <MDBTable align='middle'>
//                     <MDBTableHead>
//                         <tr>
//                             {tableArray.map((table, index) => (
//                                 <th key={index} scope='col'>{table}</th>
//                             ))}
//                         </tr>
//                     </MDBTableHead>
//                     <MDBTableBody>
//                         {movies.map((movie) => (
//                             <tr key={movie._id}>
//                                 <td>{movie.id}</td>
//                                 <td>
//                                     {
//                                         movie.ratings &&
//                                         movie.ratings.map(r => (
//                                             <div key={r._id}>
//                                                     <span>{r.rating}</span>
//                                                     <span>{r.user && r.user.email}</span>
//                                             </div>
//                                         ))
//                                     }
//                                 </td>
//                             </tr>
//                         ))}
//                     </MDBTableBody>
//                 </MDBTable>
//             </div>
//     )
// }
//
// export default Ratings;