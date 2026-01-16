import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";
import notesRouter from "./routes/notes.route.js";
import subjectRouter from "./routes/subject.route.js";
import categoryRouter from "./routes/category.route.js";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json())
// app.use(cors());
app.use(cors({
  origin: true,
  credentials: true
}))

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/notes', notesRouter);
app.use('/api/v1/link', linkRouter);
app.use('/api/v1/subject', subjectRouter);
app.use('/api/v1/category', categoryRouter);

// app.listen(PORT, () => {
//     console.log("Server running on port:", PORT)
// })

export default app;