import cors from "cors";

//process.env.CORS_ORIGIN
// CORS options
const corsOptions = {
  // origin: [process.env.CORS_ORIGIN2, process.env.CORS_ORIGIN1],
  // origin: ["http://localhost:8003", "http://localhost:8001"],
  origin: function (origin, callback) {
    const allowedOrigin = [process.env.CORS_ORIGIN1, process.env.CORS_ORIGIN2];
    if (!origin || allowedOrigin.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
};

export default cors(corsOptions);
