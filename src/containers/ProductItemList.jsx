import React from 'react';
import { Link } from 'react-router-dom';


const ProductItemList = (props) => {
  let product = props.product;
  return (
    <li className="product-item-list">
      <div className="product-item" >
        <h4>{product.name}</h4>
        <span>{product.vin}</span>
        <span>{product.order_date}</span>
        <span>{product.wariancy}</span>
        <div className="item-actions">
          <button data-product={product.id} onClick={props.orderService} disabled={product.status_reqular_fix === '1' ? true : false} className={product.status_reqular_fix === '1' ? 'submited' : ''}>{product.status_reqular_fix === '1' ? 'Serwis zamówiony' : 'Zamów serwis'}</button>
          <Link to={`product/${product.id}/report`} disabled={product.status === '1' ? true : false} onClick={props.reportAnError} className={`button report-button ${product.status === '1' ? 'submited' : ''}`}>{product.status === '1' ? 'Usterka zgłoszona' : 'Zgłoś usterke'}</Link>
          <Link to={`product/${product.id}`} className="button dark">Szczegóły</Link>
        </div>
      </div>
    </li>
  )
}

export default ProductItemList;