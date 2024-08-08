import { RouterProvider } from 'react-router-dom';
import useAuthCheck from './hooks/useAuthCheck';
import router from './routes/router';

const App = () => {
  const authChecked = useAuthCheck();

  return (
    <>
      {
        !authChecked ? (
          <div>Checking authenticating...</div>
        ) : (
          <RouterProvider router={router} />
        )
      }
    </>
  )
}

export default App;