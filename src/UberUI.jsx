import React, { useState, useEffect } from "react";
import ubermoto from "./images/ubermoto.webp";
import uberauto from "./images/uberauto.webp";
import ubergo from "./images/ubergo.jpg";
import uberblack from "./images/uberblack.webp";
import rideDetails from "./rideDetails.json";

const UberUI = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [tripDetails, setTripDetails] = useState(null); // State to store trip vehicle details
  const [rides, setRides] = useState([]);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setRides(rideDetails); // Set the ride details from the JSON file
  }, []);

  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [isAnimating, setIsAnimating] = useState(false); // Track animation state

  // Handler for booking the ride
  const handleBook = () => {
    setIsLoading(true);
    setIsAnimating(true);

    // Simulate an API call or process delay
    setTimeout(() => {
      setIsLoading(false); // Hide loading after 5 seconds (simulating booking process)
      setIsAnimating(false); // Stop the animation after completion
    }, 5000); // 5 seconds for the color animation
  };

  const getCurrentTime = () => {
    // const now = new Date();

    // // Set the time zone offset for IST (Indian Standard Time - UTC +5:30)
    // now.setMinutes(now.getMinutes() + now.getTimezoneOffset() + 330); // 330 minutes = 5.5 hours

    // let hours = now.getHours();
    // const minutes = now.getMinutes().toString().padStart(2, "0");

    // const ampm = hours >= 12 ? "PM" : "AM"; // Check if it's AM or PM
    // hours = hours % 12; // Convert to 12-hour format
    // hours = hours ? hours : 12; // If hour is 0 (midnight), set it to 12

    // return `${hours}:${minutes} ${ampm} IST`;

    const now = new Date();

    // Set the time zone offset for IST (Indian Standard Time - UTC +5:30)
    now.setMinutes(now.getMinutes() + now.getTimezoneOffset() + 330); // 330 minutes = 5.5 hours

    // Generate a random number of minutes to add (for example, between 1 and 30 minutes)
    const randomMinutes = Math.floor(Math.random() * 30) + 1; // Random minutes between 1 and 30
    now.setMinutes(now.getMinutes() + randomMinutes);

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM"; // Check if it's AM or PM
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // If hour is 0 (midnight), set it to 12

    return `${hours}:${minutes} ${ampm} IST`;
  };
  const convertToIST = (randomTime) => {
    // Parse the random time (e.g., "12:50 PM")
    const [time, period] = randomTime.split(" "); // Split into time and AM/PM
    let [hours, minutes] = time.split(":"); // Split hours and minutes

    // Convert to 24-hour format
    hours = parseInt(hours, 10);
    if (period === "PM" && hours !== 12) {
      hours += 12; // Convert PM hours to 24-hour format, except for 12 PM
    }
    if (period === "AM" && hours === 12) {
      hours = 0; // Convert 12 AM to 00 hours
    }

    // Adjust the time for IST (UTC +5:30)
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    // Set the timezone to IST (Indian Standard Time - UTC +5:30)
    const istOffset = 330; // IST offset in minutes (5 hours 30 minutes)
    date.setMinutes(date.getMinutes() + istOffset); // Apply the IST offset

    // Convert the adjusted time back to 12-hour format
    let adjustedHours = date.getHours();
    const adjustedMinutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = adjustedHours >= 12 ? "PM" : "AM";
    adjustedHours = adjustedHours % 12;
    adjustedHours = adjustedHours ? adjustedHours : 12; // If hour is 0, set to 12

    // Return the formatted time
    return `${adjustedHours}:${adjustedMinutes} ${ampm} IST`;
  };
  const handleSearch = (event) => {
    // Toggle the visibility of the search results section
    event.preventDefault();
    setCurrentTime(getCurrentTime());
    setRides(rideDetails);
    setIsSearchOpen(!isSearchOpen);
    //setTripDetails(sampleTripDetails); // Populate with sample data
  };
  const [pickupLocation, setPickupLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = ["560103", "560102", "560101", "560104", "560105"];

  // Handle input change
  const handleInputChange = (event) => {
    setPickupLocation(event.target.value);
  };

  // Handle focus event to show suggestions
  const handleFocus = () => {
    setShowSuggestions(true);
  };

  // Handle click on a suggestion
  const handleSuggestionClick = (suggestion) => {
    // event.preventDefault();
    setPickupLocation(suggestion);
    setShowSuggestions(false); // Hide suggestions after selection
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
            className="h-8 mr-6"
          />
          <ul className="flex space-x-6 text-gray-800 font-medium">
            <li className="hover:text-blue-600 cursor-pointer">Trip</li>
            <li className="hover:text-blue-600 cursor-pointer">Package</li>
            <li className="hover:text-blue-600 cursor-pointer">Rentals</li>
            <li className="hover:text-blue-600 cursor-pointer">Shuttle</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-800 hover:text-blue-600 font-medium">
            Activity
          </button>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
        </div>
      </nav>

      {/* Middle Section */}
      <div className="flex flex-1 p-4">
        {/* Search Section */}
        <div className="w-4/12 bg-white border-spacing-5 shadow-lg rounded-lg p-4 mr-4">
          <div className="bg-white  border border-gray-300 rounded-lg shadow-2xl p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Find a Trip
            </h2>
            <div className="bg-white-200 p-2 rounded-lg">
              <form className="space-y-4">
                {/* Pick-up Location */}
                <div>
                  <label
                    htmlFor="pickup-location"
                    className="block text-sm font-medium  text-gray-700"
                  >
                    Pick-up Location
                  </label>
                  <input
                    type="text"
                    id="dropoff-location"
                    placeholder="Enter drop-off location"
                    value={pickupLocation}
                    // onChange={handleInputChange}
                    // onFocus={handleFocus}
                    className="mt-1 block w-[250px] h-8 rounded-md border-red-300 shadow-sm focus:border-red-300 focus:ring-red-500 sm:text-sm placeholder-gray-500"
                  />
                  {/*                   
{showSuggestions && pickupLocation && (
                    <div className="mt-2 bg-white shadow-lg border border-gray-300 rounded-md max-h-48 overflow-y-auto">
                      {suggestions
                        .filter((suggestion) =>
                          suggestion.includes(pickupLocation)
                        )
                        .map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </div>
                        ))}
                    </div>
                  )} */}
                </div>
                {/* Drop-off Location */}
                <div>
                  <label
                    htmlFor="dropoff-location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Drop-off Location
                  </label>
                  <input
                    type="text"
                    id="dropoff-location"
                    placeholder="Enter drop-off location"
                    className="mt-1 block w-[250px] h-8 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm placeholder-gray-500"
                  />
                </div>
                {/* Pick-up Now Dropdown */}
                <div>
                  <label
                    htmlFor="pickup-now"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Pick-up Now
                  </label>
                  <select
                    id="pickup-now"
                    className="mt-1 block w-[250px] h-8 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  >
                    <option>Now</option>
                    <option>In 10 minutes</option>
                    <option>In 20 minutes</option>
                    <option>Schedule</option>
                  </select>
                </div>
                {/* For Me Dropdown */}
                <div>
                  <label
                    htmlFor="for-me"
                    className="block text-sm font-medium text-gray-700"
                  >
                    For Me
                  </label>
                  <select
                    id="for-me"
                    className="mt-1 block w-[80px] h-8 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  >
                    <option>For Me</option>
                    <option>For Someone Else</option>
                  </select>
                </div>
                {/* Search Button */}
                <div>
                  <button
                    type="submit"
                    onClick={handleSearch}
                    className="w-full bg-black text-white py-2 px-4 rounded-xl shadow-md hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div
            className="w-4/12 bg-white shadow-lg rounded-lg p-4 ml-4 transition-all duration-300 ease-in-out h-full"
            style={{ maxHeight: "5000px", overflowY: "auto" }}
          >
            {/* Choose Ride Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Choose Ride
            </h2>

            {/* Ride Options Container */}
            <div className="space-y-4">
              {/* Ride Types Grouped */}
              <div className="space-y-4 cursor-pointer">
                {rides.map((ride, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 border hover:border-black hover:bg-white-100 rounded-lg transition duration-300 ease-in-out"
                  >
                    {/* First Column: Photo */}
                    <div className="w-[80px] h-[80px] bg-gray-200 rounded-lg flex items-center justify-center">
                      <img
                        src={ride.imageUrl} // Dynamic image source
                        alt={ride.rideType}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>

                    {/* Second Column: Ride Info */}
                    <div className="flex flex-col justify-between pl-4">
                      <div className="text-lg font-semibold">
                        {ride.rideType}
                      </div>
                      <div className="text-sm text-gray-500">
                        {ride.timeLeft}
                      </div>
                      <div className="text-sm text-gray-500">{currentTime}</div>
                      <div className="text-sm text-gray-500 text-blue-500">
                        {ride.specialMessage}
                      </div>
                    </div>

                    {/* Third Column: Price */}
                    <div className="text-lg font-semibold text-black">
                      INR {ride.price + Math.floor(Math.random() * 100)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <div className="mt-6">
              {/* <button
                type="button"
                className="w-full bg-black text-white py-2 px-4 rounded-md shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Book
              </button> */}

              {/* Book Button */}
              <button
                //
                className={` mt-4 w-full px-4 py-2 rounded-lg text-white font-semibold transition-all duration-500 ease-in-out 
               
                     ${
                       isAnimating
                         ? "bg-gradient-to-r from-black to-white animate-progress"
                         : "bg-black"
                     }`}
                onClick={handleBook}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                    <span>Looking for your rides...</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="w-full bg-black text-white py-2 px-4 rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  >
                    Book
                  </button>
                  // "Book"
                )}
              </button>

              {/* CSS for animation */}
              <style jsx>{`
                @keyframes progress {
                  0% {
                    background-position: -100% 0;
                  }
                  100% {
                    background-position: 100% 0;
                  }
                }

                .animate-progress {
                  background-size: 200% 100%;
                  animation: progress 5s linear forwards;
                }
              `}</style>
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="flex-1 bg-white shadow-lg rounded-lg">
          <div
            className="rounded-lg overflow-hidden"
            style={{ height: "800px" }}
          >
            <iframe
              title="Full Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62222.51215571564!2d77.5699597265382!3d12.84956985620451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13edbbcc37c7%3A0x7c4313f8468fdc9d!2s560103%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1682432827084!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UberUI;
