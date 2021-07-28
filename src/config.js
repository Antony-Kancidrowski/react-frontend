exports.backend = {
  serverURL: "http://localhost:3001",
  apiversion: "/api/v1.0.0",
  cake: "/cake",
  
  cakeApi() {
    return this.serverURL + this.apiversion + this.cake;
  }
};