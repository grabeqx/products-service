import React from 'react';
import { Link } from 'react-router-dom';

import OrderDetails from './OredeDetails';

const OrdersAcordian = ({items, isService, showContent, serviceUsers, changeServiceUser}) => (
  <div>
    {items.map((item) => (
      <div key={item.id} className="acc-item">
        <div className="acc-item-title" data-id={item.id} onClick={showContent}>
          <span className="acc-item-id">Id: {item.record_index ? item.record_index : item.id}</span>
          <span className="acc-product-name">Produkt: {item.name}</span>
          <span className="acc-postcode">Kod pocztowy: {item.postcode}</span>
          <span>{item.type === 'service' ? 'Serwis' : item.type === 'repair' ? 'Naprawa pogwarancyjna' : item.type === 'parts' ? 'Części' : 'Usterka'}</span>
          {!isService ? <span className="with-events">Przypisane: <select value={item.service_id} onChange={(e) => changeServiceUser(e, item.id)}>
              <option value={0}>Nie przypisano</option>
            {serviceUsers.map(user => (
              <option key={user.id} value={user.id}>{user.firstname} {user.lastname}</option>
            ))}  
          </select></span> : null}
          <Link to={`orders/${item.id}`} className="button">Szczegóły</Link>
        </div>
        <OrderDetails item={item} />
      </div>
    ))}
  </div>
);

export default OrdersAcordian;