import cors from "cors";

//process.env.CORS_ORIGIN
// CORS options
const corsOptions = {
  origin: "http://localhost:8001",
  optionsSuccessStatus: 200
};

export default cors(corsOptions);
