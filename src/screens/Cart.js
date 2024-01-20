import React from 'react';
import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-info" role="alert">
          <h3 className="alert-heading">Your Cart is Empty!</h3>
          <p>Looks like you haven't added anything to your cart yet.</p>
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem('userEmail');
    let response = await fetch('https://go-food-umbf.onrender.com/api/auth/orderData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    if (response.status === 200) {
      dispatch({ type: 'DROP' });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="container mt-5 table-responsive table-responsive-sm table-responsive-md">
      <table className="table table-hover">
        <thead className="text-success fs-4">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Option</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td style={{ color: 'white' }}>{food.name}</td>
              <td style={{ color: 'white' }}>{food.qty}</td>
              <td style={{ color: 'white' }}>{food.size}</td>
              <td style={{ color: 'white' }}>{food.price}</td>
              <td>
                <button type="button" className="btn p-0" onClick={() => dispatch({ type: 'REMOVE', index: index })}>
                  <Delete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h1 className="fs-2" style={{ color: 'white' }}>Total Price: {totalPrice}/-</h1>
      </div>
      <div>
        <button className="btn bg-success mt-5" onClick={handleCheckOut}>
          Order Now
        </button>
      </div>
    </div>
  );
}
