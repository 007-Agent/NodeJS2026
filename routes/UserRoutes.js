import { handleAddUser, handlegetUsers } from "../controllers/UserControllers";

const router = express.Router();




router.post('/add', handleAddUser);


router.post('/usersall', handlegetUsers);



export default router;