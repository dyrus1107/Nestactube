import { HashRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import Header from "./Navbar/Header";
import Video from "./Video/Video";
import VideoList from "./Video/VideoList";

export default function Index(props) {
  const { isLoggedIn, setLoggedIn } = props;
  
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <HashRouter>
        {isLoggedIn ? (
          <Routes>
            <Route
              path="/video"
              element={<VideoList setLoggedIn={setLoggedIn} />}
            ></Route>
            <Route
              path="/video/:id"
              element={<Video setLoggedIn={setLoggedIn} />}
            ></Route>
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <SignIn setIsLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />
              }
            ></Route>
            <Route
              path="/signup"
              element={<SignUp setIsLoggedIn={setLoggedIn} />}
            ></Route>
          </Routes>
        )}
      </HashRouter>
    </div>
  );
}
