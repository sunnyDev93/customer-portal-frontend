import { useContext } from 'react';
import { FusionAuthContext } from './FusionAuthProvider';

const useFusionAuth = () => useContext(FusionAuthContext);

export default useFusionAuth;
