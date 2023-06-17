// import {Button} from "react-bootstrap";
// import React from "react";
// import api from "~/api/api";
//
//
// const FilterMovieGenre = ({cx, setMovies}) => {
//
//     const handleMovieGenre = (e) => {
//         e.preventDefault();
//
//         api.get('/movie/genre/romance')
//             .then(response => {
//                 setMovies(response.data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }
//
//     return (
//         <div>
//             <Button
//                 onClick={handleMovieGenre}
//                 value="action"
//             >
//                 Romance
//             </Button>
//         </div>
//     )
// }
//
// export default FilterMovieGenre;