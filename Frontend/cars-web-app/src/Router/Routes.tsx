import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import CarList from "../CarList";
import CarDetails from "../CarDetails";
import CarForm from "../CarForm";
import NotFound from "../NotFound";


export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {path: 'cars', element: <CarList />},
            // :id jest tzw 'root parameter', który należy odebrać w <CarDetails />
            // używamy do tego useParams
            {path: 'cars/:id', element: <CarDetails />},
            {path: 'edit/:id', element: <CarForm />},
            {path: 'not-found', element: <NotFound />},
            // za każdym razem jak będzie niepoprawny adres url odeśle nas do <NotFound />
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
]

export const router = createBrowserRouter(routes);