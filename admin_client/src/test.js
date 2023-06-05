// import React, {useEffect, useState} from "react";
// import 'react-toastify/dist/ReactToastify.css';
// import api from '~/api/api'
// import {Table} from 'react-bootstrap';
//
// function ListProducts() {
//     const [products, setProducts] = useState([]);
//
//     useEffect(() => {
//         api.get('/products')
//             .then(response => {
//                 setProducts(response.data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }, []);
//
//     return (
//         <>
//             <Table striped bordered hover>
//                 <thead>
//                 <tr>
//                     <th>Product ID</th>
//                     <th>Product Name</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {products.map((product) => (
//                     <tr key={product._id}>
//                         <td>{product._id}</td>
//                         <td>{product.supplier.name}</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </Table>
//         </>
//     );
// }
//
// export default ListProducts;
//
