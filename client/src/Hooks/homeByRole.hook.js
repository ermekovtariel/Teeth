import Worker from '../Pages/Home/worker';
import Client from '../Pages/Home/client';
import Admin from '../Pages/Home/admin';

export const getRole = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user?.role) {
        localStorage.removeItem('user');
        window.location.href = '/';
    }
    return user;
};

export const getHomeByRole = () => {
    const {role = false} = getRole()
    
    switch (role) {
      case 'admin':
        return <Admin />;
      case 'worker':
        return <Worker />;
      default:
        return <Client />;
    }
};