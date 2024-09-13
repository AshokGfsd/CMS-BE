const Contact = require("../models/contacts");

const contactController = {
  // Create a new contact
  createContact: async (request, response) => {
    try {
      const { firstName, lastName, address, email, phoneNumber } = request.body;
      const user = request.userId;

      const contact = await Contact.findOne({ email, user });
      if (contact) {
        return response
          .status(400)
          .json({ message: "contact already registerd with this e-mail" });
      }
      const newContact = new Contact({
        user,
        firstName,
        lastName,
        address,
        email,
        phoneNumber,
      });
      const savedcontact = await newContact.save();
      response
        .status(200)
        .json({ message: "contact successfully created", savedcontact });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  },
  // Get all contacts
  getAllContacts: async (request, response) => {
    try {
      const contacts = await Contact.find({ user: request.userId });
      response.status(200).json(contacts);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  // Get a single contact by ID
  getContactById: async (request, response) => {
    try {
      const contact = await Contact.findById(request.params.id);
      if (!contact)
        return response.status(404).json({ message: "Contact not found" });
      response.status(200).json(contact);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Update a contact by ID
  updateContact: async (request, response) => {
    try {
      const { firstName, lastName, address, email, phoneNumber, OTP } =
        request.body;

      const contact = await Contact.findOne({
        email,
      });
      if (!contact) {
        return response.status(404).json({ message: "Contact not found" });
      }
      contact.firstName = firstName || contact.firstName;
      contact.lastName = lastName || contact.lastName;
      contact.address = address || contact.address;
      contact.email = email || contact.email;
      contact.phoneNumber = phoneNumber || contact.phoneNumber;
      contact.OTP = null;
      const updatedContact = await contact.save();
      response
        .status(200)
        .json({ message: "form update successfully", updatedContact });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  // Delete a contact by ID
  deleteContact: async (request, response) => {
    try {
      const deletedContact = await Contact.findByIdAndDelete(request.params.id);
      if (!deletedContact)
        return response.status(404).json({ message: "Contact not found" });
      response.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = contactController;
