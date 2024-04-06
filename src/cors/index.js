import cors from "cors";

//process.env.CORS_ORIGIN
// CORS options
const corsOptions = {
  origin: [
    "http://localhost:8001",
    "http://localhost:8003",
    "https://illuminator-admin.vercel.app"
  ],
  optionsSuccessStatus: 200,
  credentials: true
};

export default cors(corsOptions);
