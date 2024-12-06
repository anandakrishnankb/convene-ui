import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import VideoBackground from "../components/VideoBackground";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

const steps = ["Basic Details", "Speakers", "Images"];

const EventCreation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [eventStatus, setEventStatus] = useState<"Draft" | "Published">(
    "Draft"
  );
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "Exhibition",
    startingPrice: 0,
    speakers: [] as {
      name: string;
      designation: string;
      picture: File | null;
    }[],
    images: [] as File[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSpeaker = () => {
    setEvent((prev) => ({
      ...prev,
      speakers: [
        ...prev.speakers,
        { name: "", designation: "", picture: null },
      ],
    }));
  };

  const handleSpeakerChange = (
    index: number,
    field: "name" | "designation",
    value: string
  ) => {
    setEvent((prev) => {
      const updatedSpeakers = [...prev.speakers];
      updatedSpeakers[index][field] = value;
      return { ...prev, speakers: updatedSpeakers };
    });
  };

  const handleSpeakerPicture = (index: number, file: File | null) => {
    setEvent((prev) => {
      const updatedSpeakers = [...prev.speakers];
      updatedSpeakers[index].picture = file;
      return { ...prev, speakers: updatedSpeakers };
    });
  };

  const handleRemoveSpeaker = (index: number) => {
    setEvent((prev) => {
      const updatedSpeakers = [...prev.speakers];
      updatedSpeakers.splice(index, 1);
      return { ...prev, speakers: updatedSpeakers };
    });
  };

  const handleSaveDraft = () => {
    console.log("Event saved as draft:", event);
    setEventStatus("Draft");
    alert("Event saved as draft!");
  };

  const handlePublishEvent = () => {
    console.log("Event published:", event);
    setEventStatus("Published");
    alert("Event published successfully!");
  };

  const handleAddImages = (files: FileList | null) => {
    if (files) {
      setEvent((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)],
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setEvent((prev) => {
      const updatedImages = [...prev.images];
      updatedImages.splice(index, 1);
      return { ...prev, images: updatedImages };
    });
  };

  const handleNextStep = () => setActiveStep((prev) => prev + 1);
  const handlePrevStep = () => setActiveStep((prev) => prev - 1);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <FormControl fullWidth margin="dense">
              <InputLabel id="event-type-label">Event Type</InputLabel>
              <Select
                labelId="event-type-label"
                value={event.category}
                onChange={(e) =>
                  setEvent((prev) => ({
                    ...prev,
                    category: e.target.value as string,
                  }))
                }
                label="Event Type"
              >
                <MenuItem value="" disabled>
                  Select Event Type
                </MenuItem>
                <MenuItem value="Exhibition">Exhibition</MenuItem>
                <MenuItem value="Workshop">Workshop</MenuItem>
                <MenuItem value="Concert">Concert</MenuItem>
                <MenuItem value="Seminar">Seminar</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Event Title"
              name="title"
              value={event.title}
              onChange={handleInputChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Event Description"
              name="description"
              value={event.description}
              onChange={handleInputChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Event Date"
              name="date"
              type="date"
              value={event.date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Event Time"
              name="time"
              type="time"
              value={event.time}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              required
              margin="normal"
            />
          </>
        );
      case 1:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Add Speakers
            </Typography>
            {event.speakers.map((speaker, index) => (
              <Grid
                container
                spacing={2}
                key={index}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={speaker.name}
                    onChange={(e) =>
                      handleSpeakerChange(index, "name", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Designation"
                    value={speaker.designation}
                    onChange={(e) =>
                      handleSpeakerChange(index, "designation", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" component="label" fullWidth>
                    Upload Picture
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) =>
                        handleSpeakerPicture(
                          index,
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                    />
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={() => handleRemoveSpeaker(index)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button variant="contained" onClick={handleAddSpeaker}>
              Add Speaker
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Upload Images
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {event.images.map((image, index) => (
                <Grid item xs={12} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <Typography variant="body1">{image.name}</Typography>
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Button variant="contained" component="label" sx={{ mb: 2 }}>
              Add Images
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => handleAddImages(e.target.files)}
              />
            </Button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <VideoBackground />
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 1,
          mt: 5,
          p: 4,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "15px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create Event
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Status: <strong>{eventStatus}</strong>
        </Typography>

        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>{renderStepContent()}</Box>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item>
            <Button
              variant="contained"
              onClick={handlePrevStep}
              disabled={activeStep === 0}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleNextStep}
              disabled={activeStep === steps.length - 1}
            >
              Next
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveDraft}
            >
              Save as Draft
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              startIcon={<PublishIcon />}
              onClick={handlePublishEvent}
            >
              Publish Event
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EventCreation;
