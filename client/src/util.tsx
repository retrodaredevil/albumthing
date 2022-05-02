import { useLocation, useNavigate, useParams } from "react-router-dom";

type IComponentWithRouterProp = {
  [x: string]: any;
};

// thanks https://stackoverflow.com/a/71608504/5434860

export function withRouter(Component: Function): Function {
  function ComponentWithRouterProp(
    props: IComponentWithRouterProp
  ): JSX.Element {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter;
