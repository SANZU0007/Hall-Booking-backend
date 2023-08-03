import express  from "express";
const app = express()
app.use(express.json());

let Room = [
  {
    roomID: 1,
    capacity: 10,
    amenities: ["ac", "fan"],
    price: 1000,
    bookedStatus: "",
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
  },
  {
    roomID: 2,
    capacity: 12,
    amenities: ["ac", "fan"],
    price: 1500,
    bookedStatus: "",
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
  },
];

app.post("/Create-Room", (req, res) => {
  const {
    roomID,
    capacity,
    amenities,
    price,
    bookedStatus,
    customerName,
    date,
    startTime,
    endTime,
  } = req.body;
  const newHall = {
    roomID,
    capacity,
    amenities,
    price,
    bookedStatus,
    customerName,
    date,
    startTime,
    endTime,
  };
  Room.push(newHall);
  res.json(newHall);
});

// All-Room-Details
app.get("/All-Rooms", (req, res) => {
  res.json(Room);
});

app.post("/Booking-Room", (req, res) => {
    const { roomId, customerName, date, startTime, endTime } = req.body;
    const hall = Room.find((hall) => hall.roomID === roomId);
    if (hall) {
      if (hall.bookedStatus === "Booked") {
        res.status(400).json({ error: "Hall is already booked" });
      } else {
        hall.bookedStatus = "Booked";
        hall.customerName = customerName;
        hall.date = date;
        hall.startTime = startTime;
        hall.endTime = endTime;
        res.json({ message: "Hall booked successfully" });
      }
    } else {
      res.status(404).json({ error: "Hall not found" });
    }
  });

  // booked data
  app.get("/booked-room-details", (req, res) => {
    let data = [];
    Room.map((e) => {
      if (e.bookedStatus == "Booked") {
        data.push({
          roomID: e.roomID,
          bookedStatus: e.bookedStatus,
          customerName: e.customerName,
          date: e.date,
          startTime: e.startTime,
          endTime: e.endTime,
        });
      }
    });
    res.send(data);
  });

  app.get("/All-Customers", (req, res) => {
    let data=[];
    Room.filter((hall) => hall.bookedStatus === "Booked").map((hall) => data.push({
      roomID: hall.roomID,
      customerName: hall.customerName,
      date: hall.date,
      startTime: hall.startTime,
      endTime: hall.endTime,
    }));
    res.json(data);
  });
  
// Count the number of times a customer has booked a room
app.get("/Customer-Bookings-Count", (req, res) => {
    data=[];
    const { customerName } = req.query;
    Room.filter(
      (hall) =>
        hall.bookedStatus === "Booked" && hall.customerName === customerName
    ).map((hall) =>data.push({
      roomID: hall.roomID,
      customerName: hall.customerName,
      date: hall.date,
      startTime: hall.startTime,
      endTime: hall.endTime,
    }));
    const bookingsCount = data.length;
    res.json({ data, bookingsCount });
  });








  


app.listen(8004,()=>{
    console.log("the port is connecting")
})