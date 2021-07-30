exports.backend = {
  serverURL: process.env.BACKEND || "http://localhost:3001",
  apiversion: "/api/v1.0.0",
  cake: "/cake",
  
  cakeApi() {
    return this.serverURL + this.apiversion + this.cake;
  },
  server() {
    return this.serverURL;
  }
};