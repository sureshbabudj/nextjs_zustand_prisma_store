import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <h1 className="mt-5">My Shop</h1>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
