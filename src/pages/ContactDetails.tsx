import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store";

const ContactDetailsPage = () => {
  //fetch contact details from contact id which is in params
  const { id } = useParams<{ id: string }>();
  const contact = useSelector((state: RootState) =>
    state.allContacts.contacts.find((contact) => contact.id === id)
  );

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center text-sage">
          Contact Details
        </h2>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-sm sm:text-base md:text-lg text-gray-700 font-semibold">
            First Name:
          </label>
          <p className="text-sm sm:text-xl md:text-2xl text-gray-900 truncate max-w-xs">
            {contact?.firstName}
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-sm sm:text-base md:text-lg text-gray-700 font-semibold">
            Last Name:
          </label>
          <p className="text-sm sm:text-xl md:text-2xl text-gray-900 truncate max-w-xs">
            {contact?.lastName}
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-sm sm:text-base md:text-lg text-gray-700 font-semibold">
            Email:
          </label>
          <p className="text-sm sm:text-xl md:text-2xl text-gray-900 ">
            {contact?.mail}
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-sm sm:text-base md:text-lg text-gray-700 font-semibold">
            Status:
          </label>
          <p
            className={`text-lg sm:text-xl md:text-2xl font-bold ${
              contact?.status === "Active" ? "text-green-600" : "text-red-600"
            }`}
          >
            {contact?.status}
          </p>
        </div>

        <button
          onClick={() => window.history.back()}
          className="bg-sage text-white px-4 py-2 rounded-md hover:bg-sageLight transition duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ContactDetailsPage;
