import { Provider } from "react-redux";
import Router from "./router/Router";
import store from "./components/store";

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
