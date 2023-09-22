import express from "express";
import pets from "./petList.js";
const app = express();
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// index route
app.get("/", (req, res) => {
  res.render("index.ejs", {
    myTitle: "Adopt a pet!",
    content: pets,
  });
});

// animals route (dynamic)
app.get("/animals/:pet_type", (req, res) => {
  const petType = req.params.pet_type;
  const animalList = pets[petType];
  if (!animalList) {
    return res.status(404).send("No animals of this type found.");
  } else {
    res.render("content.ejs", {
      myTitle: req.params.pet_type,
      content: pets[req.params.pet_type],
    });
  }
});

// animal profile (dynamic)
app.get("/animals/:pet_type/:pet_id", (req, res) => {
  const petType = req.params.pet_type;
  const animal = pets[petType][req.params.pet_id];
  if (!animal) {
    return res.status(404).send("No animal with this id found.");
  } else {
    res.render("pet.ejs", {
      myTitle: req.params.pet_type,
      pet: pets[req.params.pet_type][req.params.pet_id],
      type: req.params.pet_type,
    });
  }
});
