import {createBrowserRouter} from "react-router-dom";
import OntologyPage from "./ontology/ontology-page";
import ErrorPage from "./error/error-page";
import RootPage from "./root-page";
import HomePage from "./home/home-page";
import FormsPage from "./forms/forms-page";
import UsersPage from "./users/users-page";
import AppPage from "./applications/applications-page";
import ConfigPage from "./config/config-page";
import {getAllOntologies} from "../client/ontoforms-api-client";


export default function routesGenerator() {
    return createBrowserRouter([
        {
            path: "/",
            element: <RootPage/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: "/",
                    element: <HomePage/>
                },
                {
                    path: "ontologies",
                    element: <OntologyPage/>,
                    loader: getAllOntologies
                },
                {
                    path: "/onto-forms",
                    element: <FormsPage/>,
                    loader: getAllOntologies
                },
                {
                    path: "/users",
                    element: <UsersPage/>
                },
                {
                    path: "/applications",
                    element: <AppPage/>
                },
                {
                    path: "/config",
                    element: <ConfigPage/>,
                    loader: getAllOntologies
                },
            ],
        },
    ]);
}