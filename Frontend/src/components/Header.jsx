import React from 'react';
import { Link } from 'react-router-dom';
import icecream1 from '../assets/images/i1.jpg';

function Header(){
  return(
    <div>
      <style jsx global>{`
            h1 {
                font-size: 30px,
                color:red;
            }
        `}</style>
      <h1>Amul Ice Cream Company</h1>
      <Link to="/"><h1>Home</h1></Link>  <Link to="/newiceCream"><h1>Customize Ice Cream</h1></Link>
      <img src={icecream1} height="700"/>
      <br/><br/>
    </div>
  );
}

export default Header;