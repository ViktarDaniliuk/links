import React from 'react';
import { Link } from 'react-router-dom';

export const LinksList = ({ links }) => {
   if (!links.length) {
      return <p className="center">There are no links</p>
   }

   return (
      <div className="col s12">
         <table>
            <thead>
               <tr>
                  <th>Nr.</th>
                  <th>Original length link</th>
                  <th>Abbreviated link</th>
                  <th>Open</th>
               </tr>
            </thead>

            <tbody>
               { links.map((link, index) => {
                  return (
                     <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                           <Link to={`/detail/${link._id}`}>
                              Open
                           </Link>
                        </td>
                     </tr>
                  )
               })}
            </tbody>
         </table>
      </div>
   )
};