# Research Findings and Statistical Analysis

## Executive Summary

BiasAware's comprehensive analysis of 3,300+ AI-generated images reveals systematic demographic biases across all tested categories. The research demonstrates clear patterns of over-representation and under-representation that reflect societal stereotypes embedded in training data.

## Methodology

### Data Collection

- **Total Prompts**: 3,300 across 11 bias categories
- **Images per Category**: ~150 variations
- **Generation Platforms**: Stable Diffusion, NightCafe
- **Analysis Method**: Manual demographic annotation

### Demographic Categories

- **Gender**: Male, Female, Non-binary
- **Race**: White, Black, Asian, Latino/Hispanic, Middle Eastern, Other
- **Age**: Child (0-17), Adult (18-64), Senior (65+)

## Detailed Findings by Category

### Activities and Recreation

**Key Statistics:**

- Male representation: 65%
- White representation: 70%
- Adult representation: 83%

**Specific Patterns:**

- Sports activities heavily skewed male (cycling: 78% male)
- Outdoor activities show strong white bias
- Fitness content predominantly features young adults

### Crime and Law Enforcement

**Key Statistics:**

- Male representation: 78%
- Racialized representation: 60%
- Adult representation: 90%

**Critical Observations:**

- Criminal depictions show significant racial bias
- Law enforcement images more diverse than criminal ones
- Strong age bias toward adults in all crime-related content

### Professional Representation

#### Healthcare Professions

- **Gender**: 62% Female, 38% Male
- **Race**: 55% White, 45% Diverse
- **Age**: 88% Adult

#### Business and Corporate

- **Gender**: 68% Male, 32% Female
- **Race**: 52% Racialized, 48% White
- **Age**: 92% Adult

#### Labor and Trade Work

- **Gender**: 82% Male, 18% Female
- **Race**: 48% Black, 35% White, 17% Other
- **Age**: 89% Adult

### Engineering Disciplines

**Overall Engineering Bias:**

- Male representation: 82%
- Mixed racial representation
- Adult representation: 95%

**Discipline-Specific Findings:**

- Computer Engineering: Highest male bias (87%)
- Biomedical Engineering: Most gender-balanced (68% male)
- Civil Engineering: Strong white representation (65%)

### Emotional Expression

**Key Statistics:**

- Male representation: 58%
- White representation: 72%
- Adult representation: 76%

**Pattern Analysis:**

- Positive emotions more commonly depicted with white subjects
- Anger and aggression skewed toward male representation
- Children underrepresented in emotional content

### Socioeconomic Indicators

#### Quality of Life Representations

- **High QOL**: 67% White, 23% Other races
- **Low QOL**: 45% White, 55% Racialized
- **Gender Distribution**: Relatively balanced

#### Neighborhood Bias (Toronto Study)

- **Forest Hill (Affluent)**: Modern architecture, well-maintained
- **Jane & Finch (Lower Income)**: Older buildings, visible wear

## Statistical Significance

### Confidence Intervals

- Sample sizes of 100+ images per category provide 95% confidence
- Margin of error: ±10% for major demographic categories
- Chi-square tests confirm statistical significance (p < 0.05)

### Bias Severity Index

Created a weighted bias score (0-100) based on deviation from census data:

| Category    | Bias Score | Severity |
| ----------- | ---------- | -------- |
| Crime       | 87         | Severe   |
| Engineering | 76         | High     |
| Activities  | 64         | Moderate |
| Healthcare  | 34         | Low      |

## Comparison with Real-World Demographics

### US Census Data Comparison

**Engineering Field Reality vs AI:**

- Real: 20% Female, AI Generated: 18% Female
- Real: 65% White, AI Generated: 58% White
- Real: 25% Asian, AI Generated: 31% Asian

**Healthcare Field Reality vs AI:**

- Real: 78% Female (nursing), AI Generated: 62% Female
- Real: 35% Diverse, AI Generated: 45% Diverse

## Model Training Experiment Results

### Custom Neighborhood Model

Trained Stable Diffusion on 1,300 Toronto neighborhood images:

**Pre-training Prompts:**

- "A house" → 78% suburban/middle-class imagery

**Post-training Results:**

- Forest Hill prompts → 89% luxury homes
- Jane & Finch prompts → 67% apartment buildings/social housing

## Implications and Impact

### Societal Impact

- Reinforcement of occupational stereotypes
- Perpetuation of racial bias in crime representation
- Under-representation of diverse professionals

### Technical Implications

- Training data bias directly affects output
- Need for balanced datasets in AI development
- Importance of bias detection in AI systems
