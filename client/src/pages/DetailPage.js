import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContect';
import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';

const DetailPage = () => {
   const { token } = useContext(AuthContext);
   const { request, loading } = useHttp();
   const linkId = useParams().id;
   const [link, setLink] = useState(null);

   const getLink = useCallback(async () => {
      try {
         const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
         });

         setLink(fetched);
      } catch (e) {}
   }, [token, linkId, request]);

   useEffect(() => {
      getLink();
   }, [getLink]);

   if (loading) {
      return <Loader />
   }

   return (
      <>
         { !loading && link && <LinkCard link={ link } /> }
      </>
   )
};

export default DetailPage;