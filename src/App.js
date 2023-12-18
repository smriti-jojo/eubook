import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/pages/Login";
import Dashboard from "../src/pages/Dashboard";
import View from "../src/pages/View";
import Admin from "../src/pages/Admin";
import Books from "./pages/Books";
import Users from "../src/pages/Users";
import AddInfo from "./component/AddForm/AddInfo";
import { useSelector } from "react-redux";
import Series from "./pages/Series";
import Author from "./pages/Author";
import CreateBook from "../src/pages/CreateBook";
import AllBooks from "./pages/AllBooks";
import Subject from "./pages/Subject";
import WishList from "./pages/WishList";
import AssignBooks from "./pages/AssignBooks";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserRoute from "./routes/UserRoute";
import UserBook from "./pages/UserBook";
import PageNotFound from "./pages/PageNotFound";
import Grade from "./pages/Grade";
import BookType from "./pages/BookType";
import ViewBook from "./pages/ViewBook";

function App() {
  const isAuth = useSelector((state) => state.auth.user);
  const MsAuth = useSelector((state) => state.auth.msAuth);
  const isadmin = useSelector((state) => state.auth.admin);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="*" element={<PageNotFound />} />

          <Route exact path="/admin" element={<Login />} />
          <Route
            exact
            path="/admin/dashboard"
            element={isadmin || MsAuth ? <Admin /> : <Login />}
          />
          {/* <Route
            exact
            path="/user"
            element={isAuth ? <Dashboard /> : navigate("/")}
          /> */}
          {/* <Route
            exact
            path="/user"
            element={isAuth ? <Dashboard /> : <Login />}
          /> */}
          <Route exact path="/" element={<Login />} />

          <Route element={<UserRoute />}>
            <Route exact path="/home" element={<Dashboard />} />
            <Route path="/home/:id" element={<View />} />
            <Route path="/home/view/:id" element={<View />} />
            <Route path="/home/view-book/:id" element={<ViewBook />} />
            <Route path="/all_books" element={<AllBooks />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/all_books" element={<Books />} />
            {/* <Route path="/admin/addInfo" element={<AddInfo />} /> */}
            <Route
              path="/admin/all_books/create_book"
              element={<CreateBook />}
            />
            <Route path="/admin/all_books/add_subject" element={<Subject />} />
            <Route path="/admin/all_books/add_series" element={<Series />} />
            <Route
              path="/admin/all_books/add_bookAuthor"
              element={<Author />}
            />

            <Route path="admin/all_books/add_grade" element={<Grade />} />
            <Route path="admin/all_books/add_bookType" element={<BookType />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/all_books/wish_list" element={<WishList />} />
            <Route
              path="/admin/users/assign_books/:id"
              element={<AssignBooks />}
            />
            <Route path="/admin/users/books/:id" element={<UserBook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
