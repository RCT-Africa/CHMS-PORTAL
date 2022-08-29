import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getToken } from '../service/shared/LocalStorage';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if(getToken() == null){
      navigate('/login', { replace: true });
    console.log("here")
    }
  });

  return null;
}
