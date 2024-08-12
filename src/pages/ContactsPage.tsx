import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addContact, editContact, deleteContact } from "../store/contactSlice";
import { nanoid } from "@reduxjs/toolkit";

type Props = {};

const ContactsPage = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector((state: RootState) => state.allContacts.contacts);

  const [isAdding, setIsAdding] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    status: "active" as "active" | "inactive",
  });

  const handleAddClick = () => {
    setIsAdding(true);
    setEditMode(false);
    setCurrentId(null);
    setFormData({
      firstName: "",
      lastName: "",
      status: "active",
    });
  };

  const handleSaveClick = () => {
    if (editMode && currentId) {
      dispatch(editContact({
        id: currentId,
        ...formData,
      }));
    } else {
      dispatch(addContact({
        id: nanoid(),
        ...formData,
      }));
    }

    setFormData({
      firstName: "",
      lastName: "",
      status: "active",
    });
    setIsAdding(false);
    setEditMode(false);
    setCurrentId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      status: e.target.value as "active" | "inactive",
    }));
  };

  const handleEditContact = (id: string) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    if (contactToEdit) {
      setFormData({
        firstName: contactToEdit.firstName,
        lastName: contactToEdit.lastName,
        status: contactToEdit.status,
      });
      setCurrentId(id);
      setIsAdding(true);
      setEditMode(true);
    }
  };

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="flex items-center justify-center flex-col ">
      {/* Add Contact Button */}
      {!isAdding && (
        <button
          onClick={handleAddClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Contact
        </button>
      )}
      {isAdding && (
        <>
          <h2 className="mt-4 text-xl font-bold mb-4">{editMode ? "Edit Contact" : "Add Contact"}</h2>

          <div className=" bg-white p-6 rounded-lg shadow-md w-[95%]">
            <div className="mb-4 flex">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                className="border border-gray-300 rounded py-2 px-4 mt-1  w-full "
              />
            </div>
            <div className="mb-4 flex">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className="border border-gray-300 rounded py-2 px-4 mt-1 w-full"
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="block text-gray-700">Status</label>
              <div className="block w-full mt-2">
                <input
                  type="radio"
                  id="status-active"
                  name="status"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={handleRadioChange}
                  className="mr-2"
                />
                <label htmlFor="status-active" className="mr-4">
                  Active
                </label>
                <input
                  type="radio"
                  id="status-inactive"
                  name="status"
                  value="inactive"
                  checked={formData.status === "inactive"}
                  onChange={handleRadioChange}
                  className="mr-2"
                />
                <label htmlFor="status-inactive">Inactive</label>
              </div>
            </div>
            <button
              onClick={handleSaveClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </>
      )}
      {contacts.length > 0 &&
        contacts.map((contact) => (
          <div key={contact.id} className="mt-4 bg-gray-100 p-4 rounded-lg w-[95%]">
            <div><strong>First Name:</strong> {contact.firstName}</div>
            <div><strong>Last Name:</strong> {contact.lastName}</div>
            <div><strong>Status:</strong> {contact.status}</div>
            <button 
              onClick={() => handleEditContact(contact.id)} 
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
            >
              Edit
            </button>
            <button 
              onClick={() => handleDeleteContact(contact.id)} 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default ContactsPage;
