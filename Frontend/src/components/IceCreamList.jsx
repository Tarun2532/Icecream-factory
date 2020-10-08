import React from 'react';
import IceCream from './IceCream';

var masterIceCreamList = [
  {
    name: 'Butter stoch',
    type: 'Deluxe',
    price: 'Rs100.00'
  },
  {
    name: 'Banana Split',
    type: 'Deluxe',
    price: 'Rs150.00'
  },
  {
    name: 'Vanilla',
    type: 'Basic',
    price: 'Rs200.00'
  },
  
];


function IceCreamList() {
  return (
    <div>
      <hr/>
      {masterIceCreamList.map((iceCream, index) => 
        <IceCream name={iceCream.name}
          type={iceCream.type}
          price={iceCream.price}
          key={index}/>
      )}
    </div>
  );
}
export default IceCreamList;
