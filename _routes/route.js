const registerController = require('../_controllers/register');
const momentController = require('../_controllers/moment');
var multer = require('multer');
var auth = require('../_helpers/check-auth');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null,Date.now() + ext)
    }
});

var upload = multer({ storage: storage });

module.exports = function (app){
app.post('/api/register',registerController.userRegister);
app.post('/api/login',registerController.userLogin);

app.get('/api/get-moments',auth,momentController.getAllMoments);
app.post('/api/create-moment',auth,momentController.createMoment);
app.put('/api/edit-moment',auth,momentController.editMoment);
app.delete('/api/delete-moment/:_id',auth,momentController.deleteMoment);
app.post('/api/uploadFile', upload.single('file'), momentController.uploadFile);

}