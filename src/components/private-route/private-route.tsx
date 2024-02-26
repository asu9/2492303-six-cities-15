import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';

type PrivateRouteProps = {
  authorizationStatus: boolean;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
