# BiasAware - Technical Project Overview

## 🎯 Project Summary

**BiasAware** is an end-to-end research platform that exposes and quantifies social biases in AI text-to-image generation models. The system combines AI model evaluation, statistical analysis, and interactive visualization to demonstrate how modern image generators perpetuate harmful biases across demographics.

**Key Achievement**: Generated and analyzed 3,300+ images across 11 bias categories, revealing significant demographic skews in AI-generated content.

## 📊 Research Methodology

### Bias Categories Evaluated

1. **Activities** - Sports, hobbies, recreational activities
2. **Addictions** - Substance use representations
3. **Crime** - Criminal activity depictions
4. **Emotions** - Emotional expression patterns
5. **Quality of Life** - Lifestyle and socioeconomic indicators
6. **Professions** - Career representations across domains
7. **Engineering** - Technical field representations
8. **Neighborhoods** - Geographic and socioeconomic bias

### Data Collection Process

1. **Prompt Generation**: 150 variations per category (3,300 total prompts)
2. **Image Generation**: Used Stable Diffusion and NightCafe platforms
3. **Manual Annotation**: Categorized by race, gender, and age demographics
4. **Statistical Analysis**: Calculated percentage distributions and bias patterns
5. **Custom Model Training**: Fine-tuned Stable Diffusion on Toronto neighborhood data

## 🔍 Key Findings

| Bias Category    | Primary Gender Bias | Primary Race Bias | Age Bias    |
| ---------------- | ------------------- | ----------------- | ----------- |
| Activities       | Male (65%)          | White (70%)       | Adult (83%) |
| Crime            | Male (78%)          | Racialized (60%)  | Adult (90%) |
| Healthcare Prof. | Female (62%)        | White (55%)       | Adult (88%) |
| Engineering      | Male (82%)          | Mixed             | Adult (95%) |

## 🏗️ Technical Architecture

### Frontend Stack

- **React.js** - Single Page Application
- **Material-UI** - Component library for consistent UI
- **Custom CSS** - Responsive design with viewport units
- **Interactive Components**: Carousels, heatmaps, statistical overlays

### Backend Stack

- **Node.js + Express.js** - RESTful API server
- **MongoDB Atlas** - Cloud database with GridFS for image storage
- **Image Processing** - Metadata extraction and categorization

### AI/ML Components

- **Stable Diffusion** - Primary image generation model
- **NightCafe** - Secondary generation platform
- **Custom LoRA Training** - Fine-tuned model for neighborhood bias analysis
- **HuggingFace Pipeline** - Model training and deployment

## 📈 Performance Metrics

- **Total Images Generated**: 3,300+
- **Curated Dataset**: 750+ analyzed images
- **Training Dataset**: 1,300+ neighborhood images
- **Average Page Load**: 1-40s (optimized for image-heavy content)
- **Database Storage**: GridFS-optimized for large file handling

## 🎨 User Interface Features

### Interactive Visualizations

- **Bias Heatmaps** - Visual representation of demographic distributions
- **Image Carousels** - Browse generated content by category
- **Statistical Overlays** - Real-time bias percentage displays
- **Neighborhood Maps** - Clickable Toronto district comparisons

### Navigation Structure

- **Landing Page** - Project overview and navigation
- **Category Pages** - Dedicated sections for each bias type
- **Statistics View** - PDF report integration with zoom controls
- **About Section** - Research methodology and findings

## 🔧 Development Workflow

1. **Research Phase**: Literature review and bias category definition
2. **Data Generation**: Automated prompt creation and image generation
3. **Analysis Phase**: Manual annotation and statistical processing
4. **Development**: Full-stack web application implementation
5. **Deployment**: Render hosting with MongoDB Atlas integration
6. **Optimization**: Performance tuning and UI/UX improvements

## 📚 Documentation Structure

- `PROJECT_OVERVIEW.md` - This comprehensive project summary
- `API_DOCUMENTATION.md` - Backend API endpoints and usage
- `DEPLOYMENT_GUIDE.md` - Setup and hosting instructions
- `RESEARCH_FINDINGS.md` - Detailed bias analysis results

## 🎓 Academic Impact

This capstone project demonstrates:

- **Social Science Research** - Quantitative bias analysis
- **Machine Learning Engineering** - Custom model training and evaluation
- **Full-Stack Development** - Production-ready web application
- **Data Visualization** - Interactive bias presentation
- **Technical Writing** - Comprehensive documentation and reporting
