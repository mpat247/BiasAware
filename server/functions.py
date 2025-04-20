from pymongo import MongoClient
import csv
import string
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Download NLTK resources
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

def preprocess_prompt(prompt):
    # Lowercase the prompt
    prompt = prompt.lower()
    # Remove punctuation
    prompt = prompt.translate(str.maketrans('', '', string.punctuation))
    # Tokenize the prompt
    tokens = word_tokenize(prompt)
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    # Lemmatize the tokens
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    # Return the preprocessed prompt as a single string
    return ' '.join(tokens)

def update_image_descriptions(csv_file_path, mongo_uri):
    print("Initializing image description update process...")
    
    # Parse QOL CSV file to get prompt-description pairs
    print("Reading CSV file...")
    prompt_descriptions = {}
    with open(csv_file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            prompt = row['prompt']
            description = row['description']
            prompt_descriptions[prompt] = description
            print(f"Prompt '{prompt}' read from CSV with description '{description}'.")

    print("CSV file read successfully.")

    # Connect to MongoDB
    print("Connecting to MongoDB...")
    client = MongoClient(mongo_uri)
    db = client.BiasAware
    images_collection = db.images
    print("Connected to MongoDB successfully.")

    # Retrieve images with Bias_name 'Quality of Life'
    print("Fetching images from MongoDB...")
    images_to_update = images_collection.find({'Bias_name': 'Quality of Life'})
    print("Images fetched successfully.")

    # Update image descriptions
    print("Updating image descriptions...")
    for image in images_to_update:
        prompt = image['prompt']
        if prompt in prompt_descriptions:
            description = prompt_descriptions[prompt]
            # Update the image document with the corresponding description
            images_collection.update_one({'_id': image['_id']}, {'$set': {'description': description}})
            print(f"Prompt '{prompt}' found in MongoDB. Description '{description}' added and successfully saved.")
        else:
            print(f"No description found for prompt: {prompt}")

    client.close()
    print("Image descriptions updated successfully.")

# Example usage
csv_file_path = 'D:/manav/Documents/Engineering/4th Year/Capstone/BiasAware/server/qol.csv'
mongo_uri = 'mongodb+srv://manav:biasaware@biasaware.ipjjs0e.mongodb.net/?retryWrites=true&w=majority&appName=biasaware'

update_image_descriptions(csv_file_path, mongo_uri)
