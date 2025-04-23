
# Dark Side of the Net: Exploring Social Biases in AI Image Generators

## Description
This project investigates and highlights social biases in AI image generation systems. By analyzing over 1300 images generated from popular platforms like Stable Diffusion and NightCafe, this project identifies, categorizes, and quantifies biases such as race, gender, and age disparities. An interactive web tool was developed to showcase these findings and promote awareness. This is a final year engineering capstone project.

## Link
🔗 www.biasaware.social

## Goals
- **Raise Awareness:** Educate users about biases embedded in AI-generated images.
- **Develop Tools:** Build an interactive web application to visualize and explore biases.
- **Encourage Ethical AI Development:** Promote responsible practices in AI design.

## Features
- Comprehensive statistical analysis of biases in generated images.
- Use of advanced AI image generation tools: Stable Diffusion and NightCafe.
- Interactive web-based interface with features like heatmaps, carousels, and visual guides.
- Dataset of 1300+ analyzed images for transparency and reproducibility.

## Technologies Used
- **Backend:** Node.js and Express.js
- **Frontend:** React.js
- **Database:** MongoDB (GridFS for handling large datasets)
- **AI Models:** Stable Diffusion, NightCafe
- **Statistical Tools:** Python libraries for analysis, MongoDB for data organization
- **Web Deployment:** Render Service

## Process Overview
1. **Initial Research**
   - Conducted a literature review on AI biases.
   - Explored and finalized image generators.

2. **Prompt Development**
   - Created diverse prompts targeting bias categories like Age, Gender, and Race.
   - Generated multiple image variations for each prompt.

3. **Image Analysis**
   - Quantified biases using metrics such as race, gender, and age distribution.

4. **Web Development**
   - Built an interactive web app using the MERN stack.
   - Integrated dynamic UI components like heatmaps and galleries.

5. **Model Fine-Tuning**
   - Trained models with a custom dataset to better capture and explore biases.

6. **Evaluation**
   - Visualized results on the web app, revealing prominent stereotypes and disparities.

## Future Work
- Expand the dataset to include more diverse scenarios and regions.
- Collaborate with policymakers to integrate findings into ethical AI guidelines.
- Enhance the scalability and interactivity of the web application.

---

## Project Structure
```
- /frontend
  - React.js code for the web app UI
- /backend
  - Express.js API for data retrieval and processing
- /database
  - MongoDB with GridFS for image and metadata storage
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Navigate to the project directory:
   ```
   cd your-repo-name
   ```
3. Install dependencies for the backend:
   ```
   cd backend
   npm install
   ```
4. Install dependencies for the frontend:
   ```
   cd ../frontend
   npm install
   ```
5. Start the development server:
   - Backend:
     ```
     cd ../backend
     npm start
     ```
   - Frontend:
     ```
     cd ../frontend
     npm start
     ```
