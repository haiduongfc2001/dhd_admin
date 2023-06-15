// import React, {useEffect, useState} from "react";
// import 'react-toastify/dist/ReactToastify.css';
// import api from '~/api/api'
// import {Table} from 'react-bootstrap';
// import {MDBContainer} from "mdb-react-ui-kit";
//
// function ListMovies() {
//     const [movies, setMovies] = useState([]);
//
//     useEffect(() => {
//         api.get('/movies')
//             .then(response => {
//                 setMovies(response.data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     });
//
//     return (
//         <>
//             <div>
//                 <MDBContainer>
//                     <h2>Search:</h2>
//                     <input
//                         type="text"
//                         className={cx('search-hover', 'ms-3')}
//                         placeholder="search here..."
//                     />
//                 </MDBContainer>
//             </div>
//
//             <Table>
//                 <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Movie Title</th>
//                 </tr>
//
//                 </thead>
//                 <tbody>
//                 {movies
//                     .sort((a, b) => a.id - b.id)
//                     .map((movie) => (
//                         <tr key={movie._id}>
//                             <td>{movie.id}</td>
//                             <td>{movie.title}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </>
//     );
// }
//
// export default ListMovies;
//
//
//
