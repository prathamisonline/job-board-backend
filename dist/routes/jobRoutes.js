"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobController_1 = require("../controllers/jobController");
const router = express_1.default.Router();
router.post('/jobs', jobController_1.createJob);
router.get('/jobs', jobController_1.getJobs);
router.get('/jobs/:id', jobController_1.getJobById);
router.put('/jobs/:id', jobController_1.updateJob);
router.delete('/jobs/:id', jobController_1.deleteJob);
exports.default = router;
