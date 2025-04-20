import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Box,
  Container,
  Paper,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import { ArrowBack, ArrowForward, ZoomIn, ZoomOut } from "@mui/icons-material";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ComingSoon = () => {
  // State variables using underscore naming
  const [num_pages, set_num_pages] = useState(null);
  const [page_number, set_page_number] = useState(1);
  const [zoom_scale, set_zoom_scale] = useState(1.0);
  const file_url = "/Report.pdf";

  // Handlers in camelCase
  function onDocumentLoadSuccess({ numPages }) {
    set_num_pages(numPages);
  }

  function handlePrev() {
    if (page_number > 1) {
      set_page_number(page_number - 1);
    }
  }

  function handleNext() {
    if (page_number < num_pages) {
      set_page_number(page_number + 1);
    }
  }

  function handleZoomIn() {
    set_zoom_scale((prev) => prev + 0.2);
  }

  function handleZoomOut() {
    set_zoom_scale((prev) => (prev > 0.5 ? prev - 0.2 : prev));
  }

  function handleSliderChange(event, value) {
    set_zoom_scale(value);
  }

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Top navigation bar */}
      <NavigationBar />

      {/* Main content area */}
      <Container maxWidth="lg" sx={{ pt: "100px", pb: 4 }}>
        <Paper elevation={4} sx={{ p: 2, borderRadius: 2 }}>
          {/* Controls toolbar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Box>
              <IconButton onClick={handlePrev} disabled={page_number <= 1}>
                <ArrowBack />
              </IconButton>
              <IconButton
                onClick={handleNext}
                disabled={page_number >= (num_pages || 1)}
              >
                <ArrowForward />
              </IconButton>
              <Typography component="span" sx={{ ml: 1, fontSize: "1rem" }}>
                {page_number} / {num_pages || "--"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleZoomOut}>
                <ZoomOut />
              </IconButton>
              <Slider
                value={zoom_scale}
                min={0.5}
                max={3}
                step={0.1}
                onChange={handleSliderChange}
                sx={{ width: 120, mx: 2 }}
              />
              <IconButton onClick={handleZoomIn}>
                <ZoomIn />
              </IconButton>
            </Box>
          </Box>

          {/* PDF Display */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Document file={file_url} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={page_number} scale={zoom_scale} />
            </Document>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ComingSoon;
