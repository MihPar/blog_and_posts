import { startApp } from './settings'


const app = startApp();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {console.log(`Server was started at port ${PORT}`)})
