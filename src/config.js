exports.backend = {
  serverURL: process.env.REACT_APP_BACKEND || "http://localhost:3001",
  apiversion: "v1.0.0",
  cake: "/cake",
  
  cakeApi() {
    return this.serverURL + '/api/' + this.apiversion + this.cake;
  },
  server() {
    return this.serverURL;
  }
};