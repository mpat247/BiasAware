# 🧠 BiasAware - Exposing Social Biases in AI Image Generation

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-biasaware.social-blue?style=for-the-badge)](https://www.biasaware.social)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/mpat247/biasaware)
[![Capstone](https://img.shields.io/badge/🎓_TMU_Capstone-2024-red?style=for-the-badge)](https://www.torontomu.ca/)

</div>

## 📋 Project Overview

**BiasAware** is a comprehensive research platform that exposes and quantifies social biases in modern AI text-to-image generation models. Through the analysis of **3,300+ generated images** across 11 bias categories, this project reveals how AI systems perpetuate harmful demographic stereotypes and societal inequalities.

Built as an undergraduate engineering capstone project at **Toronto Metropolitan University** (2024), BiasAware combines machine learning research, statistical analysis, and interactive web development to make complex bias patterns accessible and understandable.

## 🎯 Key Achievements

- 📊 **3,300+ Images Analyzed** across 11 distinct bias categories
- 🔍 **Quantified Demographic Bias** in race, gender, and age representation
- 🤖 **Custom AI Model Training** on Toronto neighborhood data
- 🌐 **Interactive Web Platform** with statistical visualizations
- 📈 **Comprehensive Research Findings** published with academic rigor

## 🧪 Research Categories

| Category          | Focus Area                        | Sample Size |
| ----------------- | --------------------------------- | ----------- |
| **Activities**    | Sports, recreation, hobbies       | 150+ images |
| **Professions**   | Career representations            | 150+ images |
| **Crime**         | Law enforcement, criminal justice | 150+ images |
| **Emotions**      | Emotional expression patterns     | 150+ images |
| **Engineering**   | Technical field diversity         | 150+ images |
| **Neighborhoods** | Socioeconomic geography           | 150+ images |

## 💻 Technical Stack

### Frontend

- **React.js** - Modern single-page application
- **Material-UI** - Consistent component library
- **Custom CSS** - Responsive design with advanced animations

### Backend

- **Node.js + Express.js** - RESTful API architecture
- **MongoDB Atlas** - Cloud database with GridFS image storage
- **Statistical APIs** - Real-time bias calculation endpoints

### AI/ML Pipeline

- **Stable Diffusion** - Primary image generation model
- **NightCafe** - Secondary generation platform
- **Custom LoRA Training** - Fine-tuned models for neighborhood bias
- **HuggingFace** - Model training and deployment infrastructure

## 🔍 Key Research Findings

### Major Bias Patterns Discovered

| Bias Type  | Most Biased Category       | Representation Gap      |
| ---------- | -------------------------- | ----------------------- |
| **Gender** | Engineering (82% male)     | 64% over-representation |
| **Race**   | Crime (60% racialized)     | 45% misrepresentation   |
| **Age**    | All categories (90% adult) | 75% age concentration   |

### Statistical Significance

- **95% Confidence Intervals** on all measurements
- **Chi-square tests** confirm bias significance (p < 0.05)
- **Custom Bias Severity Index** (0-100 scale) developed

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

## 🚀 Quick Start

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mpat247/biasaware.git
   cd biasaware
   ```

2. **Install dependencies:**

   ```bash
   # Backend
   cd server && npm install

   # Frontend
   cd ../client && npm install
   ```

3. **Start development servers:**

   ```bash
   # Backend (Terminal 1)
   cd server && npm start

   # Frontend (Terminal 2)
   cd client && npm start
   ```

Access the application at `http://localhost:3000`

## 📚 Documentation

Comprehensive technical documentation is available in the `/docs` folder:

- **[Project Overview](./docs/PROJECT_OVERVIEW.md)** - Complete technical summary
- **[API Documentation](./docs/API_DOCUMENTATION.md)** - Backend endpoints and usage
- **[Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)** - Production setup instructions
- **[Research Findings](./docs/RESEARCH_FINDINGS.md)** - Detailed bias analysis results

</div>
