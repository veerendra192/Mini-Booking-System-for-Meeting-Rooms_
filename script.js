// data structure for room information and bookings
let rooms = [
    {
        name: "Room A",
        availability: {
            "09:00": true,
            "09:30": true,
            "10:00": true,
            "10:30": true,
            "11:00": true,
        },
        bookings: [],
    },
    {
        name: "Room B",
        availability: {
            "09:00": true,
            "09:30": true,
            "10:00": true,
            "10:30": true,
            "11:00": true,
        },
        bookings: [],
    },

];

// Function to display available rooms and their booking status
function displayAvailableRooms() {
    const availableRoomsSection = document.getElementById("available-rooms");
    availableRoomsSection.innerHTML = "";

    rooms.forEach((room, index) => {
        const roomDiv = document.createElement("div");
        roomDiv.classList.add("room");

        const roomName = document.createElement("h2");
        roomName.textContent = room.name;
        roomDiv.appendChild(roomName);

        const timeSlotsList = document.createElement("ul");
        Object.entries(room.availability).forEach(([timeSlot, available]) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${timeSlot}: ${available ? "Available" : "Booked"}`;
            timeSlotsList.appendChild(listItem);
        });
        roomDiv.appendChild(timeSlotsList);

        roomDiv.addEventListener("click", () => {
            handleRoomSelection(index);
        });

        availableRoomsSection.appendChild(roomDiv);
    });
}

// Function to handle room selection
function handleRoomSelection(roomIndex) {
    const selectedRoom = rooms[roomIndex];

    // Display booking form for the selected room
    const bookingFormSection = document.getElementById("booking-form");
    bookingFormSection.innerHTML = `
        <h2>Book ${selectedRoom.name}</h2>
        <label for="time-slot">Select a Time Slot:</label>
        <select id="time-slot">
            <option value="09:00">09:00 - 09:30</option>
            <option value="09:30">09:30 - 10:00</option>
            <option value="10:00">10:00 - 10:30</option>
            <option value="10:30">10:30 - 11:00</option>
            <option value="11:00">11:00 - 11:30</option>
        </select>
        <button onclick="handleBooking(${roomIndex})">Book</button>
    `;
}

// Function to handle booking submission
function handleBooking(roomIndex) {
    const selectedRoom = rooms[roomIndex];
    const selectedTimeSlot = document.getElementById("time-slot").value;

    if (!selectedRoom.availability[selectedTimeSlot]) {
        alert("This room is already booked for the selected time slot.");
        return;
    }

    // Get user input for booking details
    const bookingDetails = prompt("Enter your name and additional details:");

    if (bookingDetails) {
        // Update room availability and store booking details
        selectedRoom.availability[selectedTimeSlot] = false;
        selectedRoom.bookings.push({
            timeSlot: selectedTimeSlot,
            details: bookingDetails,
        });

        // Display a confirmation message
        alert("Booking successful!");
        // Update the UI
        displayAvailableRooms();
    }
}

// Initialize by calling displayAvailableRooms()
displayAvailableRooms();
