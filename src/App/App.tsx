import { FC, PropsWithChildren } from 'react';
import { MainPage } from '../pages/main';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const';
import Login from '../pages/login';
import {Favorites} from '../pages/favorites';
import { NotFoundScreen } from '../pages/not-found-screen';
import PrivateRoute from '../components/private-route/private-route';
import Offer from '../pages/offer';

export type TAppProps = {
  cardAmount: number;
  offersData: TOffersData[];
  favoriteData: TFavoriteData[];
}

export type TOffersData = {
  id: number;
  name: string;
  type: string;
  price: number;
  period: string;
  rating: string;
}

export type TFavoriteData = {
  id: number;
  name: string;
  type: string;
  price: number;
  period: string;
  rating: string;
}

export const App: FC<PropsWithChildren<TAppProps>> = ({cardAmount, offersData, favoriteData}) => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes >
        <Route
          path={AppRoute.Main}
          element={<MainPage cardAmount={cardAmount} offersData={offersData} />}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route path= {AppRoute.Offer}>
          <Route index element={<Offer/>} />
          <Route path=':id' element={<Offer />} />
        </Route>
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={false}
            >
              <Favorites favoriteData={favoriteData} cardAmount={3}/>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);


export default App;