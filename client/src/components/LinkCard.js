import React from 'react';
import { Link } from 'react-router-dom';

export const LinkCard = ({ link }) => {
   return (
      <>
         <h2>Link</h2>
         <hr />
         <p>
            Yours link: 
            <a 
               href={link.to} 
               target="_blank" 
               rel="noopener noreferrer"
            >
               {` ${link.to}`}
            </a>
         </p>
         <p>
            From: 
            <a 
               href={link.from} 
               target="_blank" 
               rel="noopener noreferrer"
            >
               {` ${link.from}`}
            </a>
         </p>
         <p>
            Number of clicks:  
            <strong>
               {` ${link.clicks}`}
            </strong>
         </p>
         <p>
            Link creation date:  
            <strong>
               {` ${new Date(link.date).toLocaleDateString()}`}
            </strong>
         </p>
         <hr />
         <h6>
            <Link to={`/links`}>
               Back
            </Link>
         </h6>
      </>
   )
};