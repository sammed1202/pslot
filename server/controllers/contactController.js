import Contact from "../models/Contact.js";

/* 🔹 Save Contact Message */
export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔹 Get All Messages (Admin) */
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔹 Delete Message */
export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};