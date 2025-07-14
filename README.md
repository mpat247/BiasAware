# BiasAware - Exposing Social Biases in AI Image Generation

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-biasaware.social-blue?style=for-the-badge)](https://www.biasaware.social)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/mpat247/biasaware)
[![Capstone](https://img.shields.io/badge/TMU_Capstone-2024-red?style=for-the-badge)](https://www.torontomu.ca/)

</div>

## Project Overview

BiasAware is a comprehensive research platform that exposes and quantifies social biases in modern AI text-to-image generation models. Through the analysis of over 3,300 generated images across 11 bias categories, this project reveals how AI systems perpetuate harmful demographic stereotypes and societal inequalities.

Built as an undergraduate engineering capstone project at Toronto Metropolitan University (2024), BiasAware combines machine learning research, statistical analysis, and interactive web development to make complex bias patterns accessible and understandable.

## Key Achievements

- **3,300+ Images Analyzed** across 11 distinct bias categories
- **Quantified Demographic Bias** in race, gender, and age representation
- **Custom AI Model Training** on Toronto neighborhood data
- **Interactive Web Platform** with statistical visualizations
- **Comprehensive Research Findings** published with academic rigor

## Research Categories

Based on our comprehensive analysis documented in the [research findings](./docs/RESEARCH_FINDINGS.md), we examined bias across the following categories:

| Category              | Focus Area                              | Sample Size | Key Bias Patterns                           |
| --------------------- | --------------------------------------- | ----------- | ------------------------------------------- |
| **Activities**        | Sports, recreation, hobbies             | 150+ images | Male-dominated (65%), White majority (70%)  |
| **Addictions**        | Substance use representations           | 150+ images | Gender and racial stereotyping              |
| **Crime**             | Law enforcement, criminal justice       | 150+ images | Severe racial bias (60% racialized)        |
| **Emotions**          | Emotional expression patterns           | 150+ images | White bias in positive emotions (72%)      |
| **Engineering**       | Technical field diversity               | 150+ images | Strong male bias (82%), varies by field    |
| **Healthcare**        | Medical profession representations      | 150+ images | Female majority (62%), moderate diversity  |
| **Neighborhoods**     | Socioeconomic geography (Toronto focus) | 150+ images | Clear wealth-based architectural patterns  |
| **Professions**       | Career representations across sectors   | 150+ images | Varies significantly by profession type     |
| **Quality of Life**   | Lifestyle and socioeconomic indicators  | 150+ images | Racial disparities in affluence depiction  |

## Technical Stack

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

## Key Research Findings

### Major Bias Patterns Discovered

Based on our detailed analysis in the [research findings documentation](./docs/RESEARCH_FINDINGS.md), we discovered significant bias patterns:

| Bias Type  | Most Biased Category               | Representation Gap      |
| ---------- | ---------------------------------- | ----------------------- |
| **Gender** | Engineering (82% male)             | 64% over-representation |
| **Race**   | Crime (60% racialized)             | 45% misrepresentation   |
| **Age**    | All categories (90% adult average) | 75% age concentration   |

### Statistical Significance

All findings are statistically validated with 95% confidence intervals on all measurements. Chi-square tests confirm bias significance (p < 0.05), and we developed a custom Bias Severity Index (0-100 scale) to quantify bias levels across categories. Complete statistical analysis is available in our [research findings](./docs/RESEARCH_FINDINGS.md).

## Process Overview

Our research methodology followed a systematic approach to identify and quantify bias patterns:

1. **Initial Research**

   - Conducted a comprehensive literature review on AI biases
   - Explored and evaluated multiple image generation platforms

2. **Prompt Development**

   - Created diverse prompts targeting bias categories including age, gender, and race
   - Generated multiple image variations for each prompt to ensure statistical validity

3. **Image Analysis**

   - Manually annotated and quantified biases using demographic distribution metrics
   - Applied statistical methods to validate findings across all categories

4. **Web Development**

   - Built an interactive web application using the MERN stack
   - Integrated dynamic UI components including heatmaps and image galleries

5. **Model Fine-Tuning**

   - Trained custom models with Toronto neighborhood datasets to explore geographical bias
   - Compared pre-training and post-training bias patterns

6. **Evaluation**
   - Visualized comprehensive results through the web application
   - Documented prominent stereotypes and demographic disparities across all categories

## Quick Start

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

## Documentation

Comprehensive technical documentation is available in the `/docs` folder:

- **[Project Overview](./docs/PROJECT_OVERVIEW.md)** - Complete technical summary and architecture details
- **[API Documentation](./docs/API_DOCUMENTATION.md)** - Backend endpoints and usage guidelines
- **[Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)** - Production setup instructions
- **[Research Findings](./docs/RESEARCH_FINDINGS.md)** - Detailed bias analysis results and statistical validation

</div>
