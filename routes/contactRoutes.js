const express = require("express");
const contactController = require("../controllers/contactController");
const auth = require("../middlewares/auth");

const contactRouter = express.Router();

contactRouter.post("/", auth.verifyToken, contactController.createContact);
contactRouter.get("/", auth.verifyToken, contactController.getAllContacts);
contactRouter.put("/:id", auth.verifyToken, contactController.updateContact);
contactRouter.get("/:id", auth.verifyToken, contactController.getContactById);
contactRouter.delete("/:id", auth.verifyToken, contactController.deleteContact);

module.exports = contactRouter;
