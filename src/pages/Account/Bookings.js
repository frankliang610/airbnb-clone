import React from 'react';
import moment from 'moment';
import swal from 'sweetalert2';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const Bookings = (props) => {
  const bookings = props.bookings.map((booking, i) => {
    const dates = `${moment(booking.checkIn).format('MMM Do')} - ${moment(
      booking.checkOut
    ).format('MMM Do YYYY')}`;

    const cancelBooking = async (bid, location) => {
      const confirmCancellation = await new swal({
        text: `Are you sure you want to cancel your trip to ${location}?`,
        icon: 'warning',
        showCancelButton: true,
        buttons: true,
      });
      if (confirmCancellation) {
        const cancelUrl = `${baseUrl}/reservation/cancel`;
        const data = {
          token: props.token,
          bid,
        };
        const cancelResponse = await axios.post(cancelUrl, data);
        if (cancelResponse.data.msg === 'cancelled') {
          new swal({
            title: 'Cancelled!',
            icon: 'success',
          });
        } else {
          new swal({
            title: 'The was an error cancelling...',
            icon: 'error',
          });
        }
      }
    };
    return (
      <tr key={i} className='booking-row'>
        <td>
          {booking.status === 'confirmed' && props.type === 'past'
            ? 'completed'
            : booking.status}
        </td>
        <td>
          <div className='booking-detail'>{dates}</div>
          <div className='booking-detail'>{booking.venueData.title}</div>
          <div className='booking-detail'>{booking.venueData.location}</div>
        </td>
        <td>
          <div className='booking-detail'>Confirmation #: {booking.conf}</div>
          <div className='booking-detail'>
            {booking.numberOfGuests} Guests, {booking.totalNights} Nights
          </div>
          <div className='booking-detail'>
            ${booking.pricePerNight} per night
          </div>
          <div className='booking-detail'>${booking.totalPrice} Total</div>
        </td>
        <td>
          <div className='booking-detail pointer'>Print Reservation</div>
          {props.type === 'upcoming' && booking.status !== 'cancelled' ? (
            <div
              className='booking-detail pointer'
              onClick={() =>
                cancelBooking(booking.id, booking.venueData.location)
              }
            >
              Cancel Confirmation
            </div>
          ) : (
            <></>
          )}
        </td>
      </tr>
    );
  });
  return (
    <div>
      <table className='booking'>
        <thead>
          <tr>
            <th>Status</th>
            <th>Dates and location</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{bookings}</tbody>
      </table>
    </div>
  );
};

export default Bookings;
