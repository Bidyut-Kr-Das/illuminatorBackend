import cors from "cors";

//process.env.CORS_ORIGIN
// CORS options
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:8001",
  optionsSuccessStatus: 200,
credentials:true,
};

export default cors(corsOptions);
