import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContect';
import { LinksList } from '../components/LinksList';
import { Loader } from '../components/Loader';

const LinksPage = () => {
   const [links, setLinks] = useState([]);
   const { loading, request } = useHttp();
   const { token } = useContext(AuthContext);

   const fetchLinks = useCallback(async () => {
      try {
         const fetched = await request('/api/link', 'GET', null, {
            Authorization: `Bearer ${token}`
         });

         setLinks(fetched);
      } catch (e) {}
   }, [token, request]);

   useEffect(() => {
      fetchLinks();
   }, [fetchLinks]);

   if (loading) {
      return <Loader />
   }

   return (
      <div className="row">
         {!loading && <LinksList links={links} />}
      </div>
   )
};

export default LinksPage;