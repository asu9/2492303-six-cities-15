import { Link, Navigate } from 'react-router-dom';
import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { loginAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';

function Login() : JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {

    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth){
    return <Navigate to={AppRoute.Main} />;
  }

  return(
    <div className='page page--gray page--login'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Link to={AppRoute.Main} className='header__logo-link'>
                <img
                  className='header__logo'
                  src='img/logo.svg'
                  alt='6 cities logo'
                  width={81}
                  height={41}
                >
                </img>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className='page__main page__main--login' data-testid="login-page">
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <form className='login__form form' action='#' method='post' onSubmit={handleSubmit}>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>E-mail</label>
                <input
                  className='login__input form__input'
                  type='email'
                  name='email'
                  placeholder='Email'
                  ref={loginRef}
                  required
                />
              </div>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>Password</label>
                <input
                  className='login__input form__input'
                  type='password'
                  name='password'
                  placeholder='Password'
                  ref={passwordRef}
                  required
                  pattern="(?=^.{2,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Za-z]).*"
                />
              </div>
              <button className='login__submit form__submit button' type='submit'>
                  Sign in
              </button>
            </form>
          </section>
          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              <a className='locations__item-link' href='#'>
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default Login;
