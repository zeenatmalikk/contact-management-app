import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addContact, editContact, deleteContact } from "../store/contactSlice";
import { nanoid } from "@reduxjs/toolkit";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const ContactsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector(
    (state: RootState) => state.allContacts.contacts
  );
  //email validation check
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  //state management for adding, editing, and storing the id of the contact
  const [isAdding, setIsAdding] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  //store the formdata of the contact form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    status: "Active" as "Active" | "Inactive",
    mail: "",
  });

  //Create contact button will set isAdding which will show the contact form
  const handleAddClick = () => {
    setIsAdding(true);
    setEditMode(false);
    setCurrentId(null);
    setFormData({
      firstName: "",
      lastName: "",
      status: "Active",
      mail: "",
    });
  };
  // To return back from contact form
  const handleBack = () => {
    setIsAdding(false);
  };
  //To save the contact if its new or edit the contact in redux if it was stored already
  const handleSaveClick = () => {
    if (!validateEmail(formData.mail)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (editMode && currentId) {
      dispatch(
        editContact({
          id: currentId,
          ...formData,
        })
      );
    } else {
      dispatch(
        addContact({
          id: nanoid(),
          ...formData,
        })
      );
    }

    setFormData({
      firstName: "",
      lastName: "",
      status: "Active",
      mail: "",
    });
    setIsAdding(false);
    setEditMode(false);
    setCurrentId(null);
  };

  //to handle the input of the form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //to handle the status of the contact
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      status: e.target.value as "Active" | "Inactive",
    }));
  };
  //to edit the pre-existing contact
  const handleEditContact = (id: string) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    if (contactToEdit) {
      setFormData({
        firstName: contactToEdit.firstName,
        lastName: contactToEdit.lastName,
        status: contactToEdit.status,
        mail: contactToEdit.mail,
      });
      setCurrentId(id);
      setIsAdding(true);
      setEditMode(true);
    }
  };
  //to delete the pre-existing contact
  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="flex items-center justify-center flex-col ">
      {/* Add Contact Button */}
      {!isAdding && (
        <button
          onClick={handleAddClick}
          className="bg-sage hover:bg-sageLight text-white font-bold py-2 px-4 rounded mt-4"
        >
          Create Contact
        </button>
      )}
      {/* If there is no contact saved  */}
      {!isAdding && contacts.length == 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-center my-10 sm:my-16 md:my-20 bg-white p-4 sm:p-6 md:p-8 rounded-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
          <MdCancel className="text-[40px] sm:text-[50px] mr-0 sm:mr-6 text-[#AD3B4A] mb-4 sm:mb-0" />
          <p className="font-bold text-lg sm:text-xl text-center sm:text-left">
            No Contact Found <br />
            Please add a contact from <br />
            Create Contact Button
          </p>
        </div>
      )}

      {/*form to show when creating a new contact or editing a pre-existing contact */}
      {isAdding && (
        <>
          <h2 className="mt-4 text-xl font-bold mb-4 text-center sm:text-left">
            {editMode ? "Edit Contact" : "Create Contact"}
          </h2>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full sm:w-3/4 lg:w-1/2 mx-auto">
            <div className="mb-4 flex flex-col sm:flex-row items-center">
              <label
                htmlFor="firstname"
                className="w-full sm:w-32 font-medium text-gray-700 text-center sm:text-left"
              >
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-2 sm:mt-0 p-2 border border-gray-300 rounded-md w-full sm:flex-grow"
                required
              />
            </div>
            <div className="mb-4 flex flex-col sm:flex-row items-center">
              <label
                htmlFor="lastname"
                className="w-full sm:w-32 font-medium text-gray-700 text-center sm:text-left"
              >
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-2 sm:mt-0 p-2 border border-gray-300 rounded-md w-full sm:flex-grow"
                required
              />
            </div>
            <div className="mb-4 flex flex-col sm:flex-row items-center">
              <label
                htmlFor="mail"
                className="w-full sm:w-32 font-medium text-gray-700 text-center sm:text-left"
              >
                Email :
              </label>
              <input
                type="email"
                id="mail"
                name="mail"
                value={formData.mail}
                onChange={handleInputChange}
                className="mt-2 sm:mt-0 p-2 border border-gray-300 rounded-md w-full sm:flex-grow"
                required
              />
            </div>
            <div className="mb-4 flex flex-col sm:flex-row items-center">
              <label className="w-full sm:w-32 font-medium text-gray-700 text-center sm:text-left">
                Status:
              </label>
              <div className="mt-2 sm:mt-0 flex justify-center sm:justify-start items-center w-full">
                <input
                  type="radio"
                  id="Active"
                  name="status"
                  value="Active"
                  checked={formData.status === "Active"}
                  onChange={handleRadioChange}
                  className="mr-1"
                />
                <label htmlFor="active" className="mr-4 text-gray-700">
                  Active
                </label>
                <input
                  type="radio"
                  id="inactive"
                  name="status"
                  value="Inactive"
                  checked={formData.status === "Inactive"}
                  onChange={handleRadioChange}
                  className="mr-1"
                />
                <label htmlFor="inactive" className="text-gray-700">
                  Inactive
                </label>
              </div>
            </div>
          </div>
          {/* CTA buttons to save, edit and go back to the contact list */}
          <div className="flex items-center gap-5">
            <button
              type="submit"
              onClick={handleBack}
              className="bg-yellow text-white px-4 py-2 rounded-md  transition duration-200 mt-6 mx-auto block sm:inline disabled:bg-slate-500 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={
                // disable the button until all fields are filled
                !formData.firstName || !formData.lastName || !formData.mail
              }
              onClick={handleSaveClick}
              className="bg-sage text-white px-4 py-2 rounded-md hover:bg-sageLight transition duration-200 mt-6 mx-auto block sm:inline disabled:bg-slate-500 disabled:cursor-not-allowed"
            >
              {editMode ? "Save Editted Contact" : "Save Contact"}
            </button>
          </div>
        </>
      )}
      {/* List of all contacts saved in redux */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4 gap-6 w-full ">
        {!isAdding &&
          contacts.length > 0 &&
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-center flex-col"
            >
              <div className="bg-gray-100 p-4 rounded-lg w-full h-56 overflow-hidden flex justify-center flex-col gap-5 px- relative">
                {/* View Button */}
                <Link
                  to={`/contact-details/${contact.id}`}
                  className="absolute top-2 right-2 text-blue-500 font-bold py-1 px-3 rounded text-sm flex items-center"
                >
                  <FaEye className="mr-1" /> View details
                </Link>
                <div className="flex justify-between">
                  <strong className="text-xl">First Name:</strong>{" "}
                  <p className="text-xl">{contact.firstName}</p>
                </div>
                <div className="flex justify-between">
                  <strong className="text-xl">Last Name:</strong>
                  <p className="text-xl"> {contact.lastName}</p>
                </div>
                <div className="flex justify-between">
                  <strong className="text-xl">Status:</strong>{" "}
                  <p
                    className={`text-xl font-bold ${
                      contact?.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {" "}
                    {contact.status}
                  </p>
                </div>
              </div>
              {/* Edit and Delete CTA button */}
              <div className="mt-2 w-full">
                <button
                  onClick={() => handleEditContact(contact.id)}
                  className="bg-yellow text-white font-bold py-2 px-3 rounded mr-2 text-sm w-full mt-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded text-sm w-full mt-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContactsPage;
