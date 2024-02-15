import {useEffect, useState} from 'react';

const useAuth = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() =>{
       
    setLoading(false)
    }, [])

    return {user, loading}
}

export {useAuth};