import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Simula un usuario autenticado

  const login = (userData) => {
    // Aquí iría la lógica para obtener un token de un servidor
    // Por ahora, simulamos un token
    const token = '12345';
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      {user ? (
        <div>
          Bienvenido, {user.name}! <button onClick={logout}>Cerrar sesión</button>
          <Link to="/perfil">Mi perfil</Link>
        </div>
      ) : (
        <Link to="/login">Iniciar sesión</Link>
      )}
    </nav>
  );
}

function Formulario() {
  // ... tu código del formulario existente
}

function Perfil() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Debes iniciar sesión para ver tu perfil.</div>;
  }

  return (
    <div>
      <h2>Perfil de {user.name}</h2>
      {/* Resto de los datos del perfil */}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login">
            <Formulario />
          </Route>
          <Route path="/perfil">
            <Perfil />
          </Route>
          <Route path="/">
            {/* Página de inicio o redirección a login */}
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
